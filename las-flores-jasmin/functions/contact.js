export async function onRequestPost(context) {
  try {
    const formData = await context.request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    const RESEND_API_KEY = context.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      return new Response("Missing RESEND_API_KEY", { status: 500 });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Las Flores Jasmin <hello@lasfloresjasmin.com>",
        to: "ol19469@gmail.com",
        subject: `New Contact Form Submission from ${name}`,
        html: `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong><br/>${message}</p>
          `,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return new Response(`Resend error: ${JSON.stringify(data)}`, {
        status: 500,
      });
    }

    return new Response("Message sent!", { status: 200 });
  } catch (err) {
    return new Response("Server error: " + err.message, { status: 500 });
  }
}
