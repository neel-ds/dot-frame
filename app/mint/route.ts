import {
  getFrameHtmlResponse,
} from "@coinbase/onchainkit";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: "Visit Website",
            action: "link",
            target: "https://myriad-zk.vercel.app",
          },
        ],
        image: `${process.env.HOST_URL}/azuki.png`,
        postUrl: `${process.env.HOST_URL}`,
      })
    );
  } catch (e: any) {
    return new Response(e, { status: 500 });
  }
}
