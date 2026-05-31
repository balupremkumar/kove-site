export async function onRequestPost(context) {
  const { request } = context;

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid request" }, 400);
  }

  const { name, email, phone, business, message, company_url } = body;

  if (company_url) return json({ ok: true }, 200); // honeypot

  if (!name || !email || !message) return json({ error: "Missing required fields" }, 400);

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    business ? `Business: ${business}` : null,
    ``,
    `Message:`,
    message,
  ].filter((l) => l !== null).join("\n");

  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "authorization": `Bearer ${context.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Kove Contact Form <hello@kove.nz>",
      to: ["balu@kove.nz"],
      reply_to: email,
      subject: `New enquiry from ${name}`,
      text: lines,
    }),
  });

  if (!resp.ok) {
    console.error("Resend:", await resp.text());
    return json({ error: "Send failed" }, 500);
  }

  return json({ ok: true }, 200);
}

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}
