/**
 * app/api/contact/route.ts
 *
 * POST-only handler for the contact/quote form.
 * Validates input server-side, then sends a formatted email via Resend.
 *
 * Environment:
 *   RESEND_API_KEY  — from https://resend.com/api-keys
 *
 * Sender note:
 *   `from` must be a Resend-verified domain in production.
 *   Use onboarding@resend.dev only during development/testing.
 */

import { NextResponse } from 'next/server';
import { Resend } from 'resend';

/* Simple regex — accepts anything with an @ and a dot after it */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  /* ── Guard: fail at runtime, not at build time ──────────────────────── */
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: 'Email service not configured.' },
      { status: 500 }
    );
  }

  /* Instantiated inside the handler so the module loads without the env var */
  const resend = new Resend(process.env.RESEND_API_KEY);

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { name, email, phone, company, message, service } =
    body as Record<string, string | undefined>;

  /* ── Field validation ───────────────────────────────────────────────── */
  if (!name?.trim())    return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
  if (!phone?.trim())   return NextResponse.json({ error: 'Phone is required.' }, { status: 400 });
  if (!service?.trim()) return NextResponse.json({ error: 'Service type is required.' }, { status: 400 });
  if (!message?.trim()) return NextResponse.json({ error: 'Message is required.' }, { status: 400 });

  if (email?.trim() && !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  /* ── Send ───────────────────────────────────────────────────────────── */
  try {
    await resend.emails.send({
      /* Change to a verified sender domain before going live */
      from: 'Emaar Contact Form <onboarding@resend.dev>',
      to: 'info@emaar-intl.ae',
      replyTo: email?.trim() ?? undefined,
      subject: `Quote Request: ${service.trim()} — ${name.trim()}`,
      html: buildHtml({ name, email, phone, company, message, service }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[contact/route] Resend error:', err);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again or call us directly.' },
      { status: 500 }
    );
  }
}

/* ── Email template ─────────────────────────────────────────────────────── */

function buildHtml(fields: {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
  service?: string;
}) {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:8px 12px 8px 0;font-weight:700;color:#1A1A1A;white-space:nowrap;vertical-align:top;">${label}</td>
      <td style="padding:8px 0;color:#3D3A37;">${value}</td>
    </tr>`;

  const companyRow = fields.company?.trim()
    ? row('Company', fields.company.trim())
    : '';

  return `
    <!DOCTYPE html>
    <html lang="en">
    <body style="margin:0;padding:0;background:#F5F4F0;font-family:Arial,sans-serif;">
      <div style="max-width:600px;margin:32px auto;background:#FFFFFF;border:1px solid #E4E2DC;">
        <div style="background:#E74C3C;padding:20px 28px;">
          <h2 style="margin:0;color:#FFFFFF;font-size:18px;letter-spacing:0.05em;text-transform:uppercase;">
            New Quote Request — Emaar International
          </h2>
        </div>
        <div style="padding:28px;">
          <table style="width:100%;border-collapse:collapse;">
            ${row('Name', fields.name!.trim())}
            ${row('Email', fields.email!.trim())}
            ${row('Phone', fields.phone!.trim())}
            ${companyRow}
            ${row('Service', fields.service!.trim())}
          </table>
          <div style="margin-top:24px;padding:16px 20px;background:#F5F4F0;border-left:3px solid #E74C3C;">
            <strong style="display:block;color:#1A1A1A;margin-bottom:8px;font-size:13px;text-transform:uppercase;letter-spacing:0.08em;">Message</strong>
            <p style="margin:0;color:#3D3A37;line-height:1.7;white-space:pre-wrap;">${fields.message!.trim()}</p>
          </div>
        </div>
        <div style="padding:16px 28px;border-top:1px solid #E4E2DC;font-size:11px;color:#7F8C8D;">
          Sent from the Emaar International website contact form.
        </div>
      </div>
    </body>
    </html>`;
}
