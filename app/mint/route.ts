import {
  FrameRequest,
  getFrameHtmlResponse,
  getFrameMessage,
} from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();

  const { isValid } = await getFrameMessage(body);

  if (!isValid) {
    return new NextResponse("Invalid Frame Request", { status: 400 });
  }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: `Mint`,
        },
      ],
      image: `${process.env.HOST_URL}/azuki.png`,
      postUrl: `${process.env.HOST_URL}/afterMint`,
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}
