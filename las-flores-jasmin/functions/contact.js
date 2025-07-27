// functions/contact.js
import { Resend } from "resend";

export async function onRequestPost(context) {
  const formData = await context.request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  // Use environment variable for API key in production!
  const resend = new Resend(env.Resend);

  const result = await resend.emails.send({
    from: "onboarding@resend.dev", // Or your verified sender
    to: "ol19469@gmail.com", // Your email
    subject: `New Contact Form Submission from ${name}`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `,
  });

  if (result.error) {
    return new Response("Failed to send message: " + result.error.message, {
      status: 500,
    });
  }

  return new Response("Message sent!", { status: 200 });
}
