import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { firstName, email } = await req.json();

  if (!firstName || !email) {
    return NextResponse.json(
      { error: "firstName and email are required" },
      { status: 400 }
    );
  }

  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!apiKey || !locationId) {
    console.error("Missing GHL_API_KEY or GHL_LOCATION_ID environment variables");
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  const ghlRes = await fetch("https://rest.gohighlevel.com/v1/contacts/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      firstName,
      email,
      locationId,
      tags: ["testosterone-guide"],
    }),
  });

  if (!ghlRes.ok) {
    const body = await ghlRes.text();
    console.error("GoHighLevel API error:", ghlRes.status, body);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
