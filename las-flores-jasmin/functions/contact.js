// functions/contact.js

export async function onRequestPost(context) {
  const formData = await context.request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  const RESEND_API_KEY = context.env.RESEND_API_KEY;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "onboarding@resend.dev", // or a verified sender
      to: "ol19469@gmail.com",
      subject: `New Contact Form Submission from ${name}`,
      html: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong><br/>${message}</p>
        `,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    return new Response(
      "Failed to send message: " + JSON.stringify(errorData),
      {
        status: 500,
      }
    );
  }

  return new Response("Message sent!", { status: 200 });
}
