// src/pages/api/contact.ts
import type { APIRoute } from "astro";

export const prerender = false;
export const runtime = "edge";

export const POST: APIRoute = async ({ request }) => {
  try {
    const form = await request.formData();

    // Honeypot
    if ((form.get("phone_number") ?? "").toString().trim() !== "") {
      return new Response("Spam detected", { status: 400 });
    }

    const name = (form.get("name") ?? "").toString().slice(0, 100);
    const email = (form.get("email") ?? "").toString().slice(0, 200);
    const message = (form.get("message") ?? "").toString().slice(0, 5000);
    if (!name || !email || !message) {
      return new Response("Missing required fields", { status: 400 });
    }

    // reCAPTCHA v2 (Invisible)
    const token = (form.get("g-recaptcha-response") ?? "").toString();
    if (!token) return new Response("Missing CAPTCHA token", { status: 400 });

    const SECRET = import.meta.env.RECAPTCHA_SECRET;
    if (!SECRET)
      return new Response("Server misconfigured: RECAPTCHA_SECRET", {
        status: 500,
      });

    const verifyRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret: SECRET, response: token }),
      }
    );
    const verify = await verifyRes.json();
    if (!verify.success) {
      return new Response("Failed CAPTCHA verification", { status: 400 });
    }

    // Send email via Resend REST (edge-friendly)
    const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
    const RESEND_FROM =
      import.meta.env.RESEND_FROM ||
      "Las Flores Jasmin <contact@yourdomain.com>";
    const RESEND_TO = import.meta.env.RESEND_TO || "you@yourdomain.com";
    if (!RESEND_API_KEY) {
      return new Response("Server misconfigured: RESEND_API_KEY", {
        status: 500,
      });
    }

    const payload = {
      from: RESEND_FROM,
      to: [RESEND_TO],
      reply_to: email,
      subject: `New contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    };

    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      const t = await r.text();
      return new Response(`Email error: ${t}`, { status: 502 });
    }

    return new Response("OK", { status: 200 });
  } catch {
    return new Response("Unexpected server error", { status: 500 });
  }
};
