import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!process.env.CONTACT_EMAIL) {
      throw new Error("CONTACT_EMAIL no está definido en .env.local");
    }

    const safeMessage = (message || "").replace(/\n/g, "<br/>");
    const sentAt = new Date().toLocaleString("es-ES");

    const html = `
      <div style="margin:0;padding:0;background-color:#020617;">
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif;padding:32px 16px;">
          <div style="max-width:640px;margin:0 auto;
                      background:radial-gradient(circle at top,#1d4ed8 0,#020617 45%,#000 100%);
                      border-radius:24px;
                      padding:28px 24px 24px;
                      border:1px solid rgba(148,163,184,0.35);
                      box-shadow:0 22px 45px rgba(0,0,0,0.6);">

            <p style="margin:0 0 6px;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#9ca3af;">
              Nuevo mensaje desde tu portfolio
            </p>

            <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;
                       background:linear-gradient(90deg,#3b82f6,#a855f7,#ec4899);
                       -webkit-background-clip:text;color:transparent;">
              Tienes un mensaje nuevo 💌
            </h1>

            <p style="margin:0 0 14px;font-size:14px;line-height:1.6;color:#e5e7eb;">
              Hola Inna, alguien ha completado el formulario de contacto de tu portfolio.
            </p>

            <div style="margin:18px 0 20px;
                        padding:14px 16px;
                        border-radius:16px;
                        background-color:rgba(15,23,42,0.9);
                        border:1px solid rgba(148,163,184,0.5);">
              <p style="margin:0 0 6px;font-size:13px;color:#e5e7eb;">
                <strong style="color:#c4b5fd;">Nombre:</strong> ${name}
              </p>
              <p style="margin:0 0 6px;font-size:13px;color:#e5e7eb;">
                <strong style="color:#c4b5fd;">Email:</strong>
                <a href="mailto:${email}" style="color:#93c5fd;text-decoration:none;">
                  ${email}
                </a>
              </p>
              <p style="margin:0;font-size:13px;color:#e5e7eb;">
                <strong style="color:#c4b5fd;">Asunto:</strong> ${subject}
              </p>
            </div>

            <div style="margin:0 0 20px;
                        padding:16px 18px;
                        border-radius:18px;
                        background-color:rgba(15,23,42,0.95);
                        border:1px solid rgba(55,65,81,0.9);">
              <p style="margin:0 0 10px;font-size:13px;font-weight:600;
                        letter-spacing:.08em;text-transform:uppercase;color:#9ca3af;">
                Mensaje
              </p>
              <p style="margin:0;font-size:14px;line-height:1.7;color:#e5e7eb;">
                ${safeMessage}
              </p>
            </div>

            <p style="margin:0 0 4px;font-size:11px;color:#6b7280;">
              Enviado el <span style="color:#e5e7eb;">${sentAt}</span>.
            </p>

            <p style="margin:0;font-size:11px;line-height:1.6;color:#6b7280;">
              Puedes responder directamente a este correo para continuar la conversación
              con <span style="color:#c4b5fd;">${name}</span>.
            </p>
          </div>

          <p style="max-width:640px;margin:16px auto 0;
                    font-size:11px;color:#4b5563;text-align:center;">
            Este mensaje ha sido enviado desde el formulario de contacto de tu portfolio.
          </p>
        </div>
      </div>
    `;

    const data = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `[PORTFOLIO] ${subject}`,
      html,
    });

    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    console.error("Error enviando email:", error);
    let errorMessage = "Error desconocido";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
