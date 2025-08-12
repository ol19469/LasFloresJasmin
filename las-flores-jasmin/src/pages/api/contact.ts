// src/pages/api/contact.ts
import type { APIRoute } from "astro";

export const prerender = false;
export const runtime = "edge"; // Cloudflare Pages/Workers friendly

export const POST: APIRoute = async ({ request }) => {
  try {
    const form = await request.formData();

    // Honeypot: bots fill hidden fields
    if ((form.get("phone_number") ?? "").toString().trim() !== "") {
      return new Response("Spam detected", { status: 400 });
    }

    const name = (form.get("name") ?? "").toString().slice(0, 100);
    const email = (form.get("email") ?? "").toString().slice(0, 200);
    const message = (form.get("message") ?? "").toString().slice(0, 5000);
    if (!name || !email || !message) {
      return new Response("Missing required fields", { status: 400 });
    }

    // Verify reCAPTCHA (Invisible v2)
    const token = (form.get("g-recaptcha-response") ?? "").toString();
    const secret = import.meta.env.RECAPTCHA_SECRET;
    if (!secret)
      return new Response("Server misconfigured: RECAPTCHA_SECRET not set", {
        status: 500,
      });

    const verifyRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret, response: token }),
      }
    );
    const verify = await verifyRes.json();
    if (!verify.success) {
      return new Response("Failed CAPTCHA verification", { status: 400 });
    }

    // Build email using env vars
    const apiKey = import.meta.env.RESEND_API_KEY;
    if (!apiKey)
      return new Response("Server misconfigured: RESEND_API_KEY not set", {
        status: 500,
      });

    const from =
      import.meta.env.RESEND_FROM ||
      "Las Flores Jasmin <hello@lasfloresjasmin.com>";
    const to = import.meta.env.RESEND_TO || "jasmincarrera12@gmail.com";

    const payload = {
      from,
      to: [to],
      reply_to: email,
      subject: `New contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    };

    // Call Resend REST API (edge-safe)
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      const err = await r.text();
      return new Response(`Email error: ${err}`, { status: 502 });
    }

    return new Response("OK", { status: 200 });
  } catch (e) {
    return new Response("Unexpected server error", { status: 500 });
  }
};
