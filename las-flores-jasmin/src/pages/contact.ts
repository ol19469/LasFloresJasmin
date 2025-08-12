// src/pages/contact.ts
import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false; // ensure this runs as a serverless function

export const POST: APIRoute = async ({ request }) => {
  try {
    const form = await request.formData();

    // Honeypot check
    if ((form.get("phone_number") ?? "").toString().trim() !== "") {
      return new Response("Spam detected", { status: 400 });
    }

    const name = (form.get("name") ?? "").toString().slice(0, 100);
    const email = (form.get("email") ?? "").toString().slice(0, 200);
    const message = (form.get("message") ?? "").toString().slice(0, 5000);

    // Basic validation
    if (!name || !email || !message) {
      return new Response("Missing required fields", { status: 400 });
    }

    // Verify reCAPTCHA (Invisible v2)
    const token = (form.get("g-recaptcha-response") ?? "").toString();
    if (!token) {
      return new Response("Missing CAPTCHA token", { status: 400 });
    }

    const secret = import.meta.env.RECAPTCHA_SECRET;
    if (!secret) {
      return new Response("Server misconfigured: RECAPTCHA_SECRET not set", {
        status: 500,
      });
    }

    const verifyRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret, response: token }),
      }
    );

    const verify = (await verifyRes.json()) as {
      success: boolean;
      challenge_ts?: string;
      hostname?: string;
      "error-codes"?: string[];
    };

    if (!verify.success) {
      return new Response("Failed CAPTCHA verification", { status: 400 });
    }

    // Send via Resend
    const resendKey = import.meta.env.RESEND_API_KEY;
    if (!resendKey) {
      return new Response("Server misconfigured: RESEND_API_KEY not set", {
        status: 500,
      });
    }

    const resend = new Resend(resendKey);

    // Customize "from" with a verified sender/domain in Resend
    const result = await resend.emails.send({
      from: "Las Flores Jasmin <contact@yourdomain.com>",
      to: ["you@yourdomain.com"],
      reply_to: email,
      subject: `New contact from ${name}`,
      text: [`Name: ${name}`, `Email: ${email}`, "", message].join("\n"),
    });

    if ("error" in result && result.error) {
      return new Response(`Email error: ${result.error.message ?? "Unknown"}`, {
        status: 502,
      });
    }

    return new Response("OK", { status: 200 });
  } catch (err: any) {
    return new Response("Unexpected server error", { status: 500 });
  }
};
