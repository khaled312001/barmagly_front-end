import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function stripQuotes(s?: string) {
    return s ? s.replace(/^"(.*)"$/, '$1').trim() : s;
}

export async function POST(req: NextRequest) {
    let body: { email?: string };
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const email = String(body.email || '').trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    const smtpHost = stripQuotes(process.env.SMTP_HOST);
    const smtpUser = stripQuotes(process.env.SMTP_USER);
    const smtpPass = stripQuotes(process.env.SMTP_PASS);
    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const mailFrom = stripQuotes(process.env.MAIL_FROM) || smtpUser;

    if (!smtpHost || !smtpUser || !smtpPass) {
        return NextResponse.json(
            { error: 'Subscription temporarily unavailable.' },
            { status: 503 }
        );
    }

    try {
        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 465,
            auth: { user: smtpUser, pass: smtpPass },
            tls: { rejectUnauthorized: false },
        });
        await transporter.sendMail({
            from: mailFrom,
            to: smtpUser,
            replyTo: email,
            subject: `Newsletter subscription: ${email}`,
            text: `New newsletter subscriber: ${email}\nSubmitted at ${new Date().toISOString()}`,
        });
        return NextResponse.json({ success: true, message: 'Subscribed — thank you!' });
    } catch (err) {
        console.error('Newsletter mail failed:', err);
        return NextResponse.json({ error: 'Could not subscribe right now.' }, { status: 502 });
    }
}
