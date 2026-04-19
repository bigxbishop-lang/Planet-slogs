import { neon } from "@neondatabase/serverless";

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ message: "Method not allowed" }), { status: 405 });
  }

  try {
    const { walletAddress, twitterHandle, discordHandle, whyDeserve, referralCode } = await req.json();

    if (!walletAddress || !twitterHandle || !discordHandle || !whyDeserve) {
      return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
    }

    const sql = neon(process.env.DATABASE_URL!);

    await sql`
      INSERT INTO applications (wallet_address, twitter_handle, discord_handle, why_deserve, referral_code)
      VALUES (${walletAddress}, ${twitterHandle}, ${discordHandle}, ${whyDeserve}, ${referralCode || null})
    `;

    return new Response(JSON.stringify({ message: "Application submitted!" }), { status: 200 });

  } catch (error: unknown) {
    if (error instanceof Error && error.message.includes("unique")) {
      return new Response(JSON.stringify({ message: "This wallet has already applied!" }), { status: 409 });
    }
    return new Response(JSON.stringify({ message: "Server error, please try again." }), { status: 500 });
  }
}

export const config = { runtime: "edge" };
