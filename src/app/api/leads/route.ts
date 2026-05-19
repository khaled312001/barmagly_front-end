import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function stripQuotes(s?: string) {
    return s ? s.replace(/^"(.*)"$/, '$1').trim() : s;
}

function escapeHtml(s: string) {
    return s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

export async function POST(req: NextRequest) {
    let body: Record<string, any>;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const phone = String(body.phone || '').trim();
    const company = String(body.company || '').trim();
    const service = String(body.service || '').trim();
    const message = String(body.message || '').trim();

    if (!name || !email || !message) {
        return NextResponse.json(
            { error: 'Name, email, and message are required' },
            { status: 400 }
        );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }
    if (message.length > 5000 || name.length > 200) {
        return NextResponse.json({ error: 'Field too long' }, { status: 400 });
    }

    const smtpHost = stripQuotes(process.env.SMTP_HOST);
    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const smtpUser = stripQuotes(process.env.SMTP_USER);
    const smtpPass = stripQuotes(process.env.SMTP_PASS);
    const mailFrom = stripQuotes(process.env.MAIL_FROM) || smtpUser;

    if (!smtpHost || !smtpUser || !smtpPass) {
        console.error('SMTP env vars missing on this deployment');
        return NextResponse.json(
            { error: 'Mail service is not configured. Please contact us directly at info@barmagly.tech.' },
            { status: 503 }
        );
    }

    const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: { user: smtpUser, pass: smtpPass },
        tls: { rejectUnauthorized: false },
    });

    const safe = {
        name: escapeHtml(name),
        email: escapeHtml(email),
        phone: phone ? escapeHtml(phone) : 'N/A',
        company: company ? escapeHtml(company) : 'N/A',
        service: service ? escapeHtml(service) : 'General Inquiry',
        message: escapeHtml(message).replace(/\n/g, '<br/>'),
    };

    const html = `
        <div style="font-family: Arial, sans-serif; padding: 24px; color: #1a1a1a; max-width: 640px; margin: 0 auto;">
            <h2 style="color: #0070f3; margin: 0 0 24px;">New Lead from barmagly.tech</h2>
            <table style="width:100%; border-collapse: collapse; font-size: 15px;">
                <tr><td style="padding:6px 0; color:#666; width:120px;">Name</td><td style="padding:6px 0;"><strong>${safe.name}</strong></td></tr>
                <tr><td style="padding:6px 0; color:#666;">Email</td><td style="padding:6px 0;"><a href="mailto:${safe.email}">${safe.email}</a></td></tr>
                <tr><td style="padding:6px 0; color:#666;">Phone</td><td style="padding:6px 0;">${safe.phone}</td></tr>
                <tr><td style="padding:6px 0; color:#666;">Company</td><td style="padding:6px 0;">${safe.company}</td></tr>
                <tr><td style="padding:6px 0; color:#666;">Service</td><td style="padding:6px 0;">${safe.service}</td></tr>
            </table>
            <hr style="border:none; border-top:1px solid #eee; margin: 20px 0;" />
            <h3 style="margin:0 0 12px;">Message</h3>
            <div style="background:#f9f9f9; padding:16px; border-radius:8px; line-height:1.6;">${safe.message}</div>
            <p style="margin-top:24px; font-size:12px; color:#999;">
                Submitted via www.barmagly.tech contact form · ${new Date().toISOString()}
            </p>
        </div>
    `;

    try {
        await transporter.sendMail({
            from: mailFrom,
            to: smtpUser,
            replyTo: email,
            subject: `New Lead: ${name} — ${service || 'General Inquiry'}`,
            html,
            text: `New lead from ${name} <${email}>\nPhone: ${phone}\nCompany: ${company}\nService: ${service}\n\n${message}`,
        });
        return NextResponse.json({ success: true, message: 'Thank you — we will be in touch shortly.' });
    } catch (err: any) {
        console.error('Lead email failed:', err);
        return NextResponse.json(
            { error: 'Could not send your message right now. Please email info@barmagly.tech.' },
            { status: 502 }
        );
    }
}
