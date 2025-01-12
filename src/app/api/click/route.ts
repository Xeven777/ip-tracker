import { NextRequest, NextResponse, userAgent } from "next/server";
import { headers } from "next/headers";
import { generateEmailBody, sendEmail } from "@/lib/utils";

export async function GET(req: NextRequest) {
  try {
    const { browser, os, device, isBot } = userAgent(req);
    const headersList = await headers();
    if (isBot) {
      return NextResponse.json({
        success: false,
        error: "Bot detected",
        status: 403,
      });
    }
    const ip =
      headersList.get("x-forwarded-for") ||
      headersList.get("x-real-ip") ||
      headersList.get("x-client-ip") ||
      headersList.get("x-remote-ip") ||
      headersList.get("x-remote-addr") ||
      "unknown ip address";
    let geoLocation = {};
    if (ip) {
      const ipdata = await fetch(
        `http://ip-api.com/json/${ip}?fields=status,country,region,regionName,city,district,zip,lat,lon,isp,org,as,mobile`
      );
      geoLocation = await ipdata.json();
    }
    const userData = {
      ip_address: ip,
      browser: browser?.name || "Unknown browser",
      os: os?.name || "Unknown OS",
      device: device?.model || "Unknown device",
      geo: geoLocation ? geoLocation : null,
    };
    const emailbody = await generateEmailBody(userData);
    await sendEmail(emailbody);
    return NextResponse.json({ success: true, status: 200 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Server Error",
      status: 500,
    });
  }
}
