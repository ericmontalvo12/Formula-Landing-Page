import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { firstName, email, phone } = await req.json();

  if (!firstName || !email) {
        return NextResponse.json(
          { error: "firstName and email are required" },
          { status: 400 }
              );
  }

  const webhookRes = await fetch(
        "https://services.leadconnectorhq.com/hooks/EakYnXEQy1hvVFmdShYB/webhook-trigger/8CWcQR8qmduFx6Fwwxhv",
    {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstName, email, phone }),
    }
      );

  if (!webhookRes.ok) {
        const body = await webhookRes.text();
        console.error("GHL webhook error:", webhookRes.status, body);
        return NextResponse.json(
          { error: "Failed to subscribe" },
          { status: 502 }
              );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
