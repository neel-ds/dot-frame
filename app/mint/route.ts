import { mintNft } from "@/utils/mint";
import {
  FrameRequest,
  getFrameHtmlResponse,
  getFrameMessage,
} from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();

  const { isValid, message } = await getFrameMessage(body);

  if (!isValid) {
    return new NextResponse("Invalid Frame Request", { status: 400 });
  }

  const fid = message?.interactor?.fid || 1;
  const addressResponse = await fetch(
    `https://api.neynar.com/v2/farcaster/user/bulk?fids=${fid}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        api_key: process.env.NEYNAR_API_KEY as string,
      },
    }
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
  const address = addressResponse.users[0].custody_address;

  if (address) {
    const transaction = mintNft(address);
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: `Check transaction`,
            action: "link",
            target: `https://base-sepolia.blockscout.com/address/${address}?tab=token_transfers`,
          },
        ],
        image: `${process.env.HOST_URL}/minted.png`,
      })
    );
  } else {
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: `Try again`,
            action: "post",
          },
        ],
        image: `${process.env.HOST_URL}/error.png`,
        postUrl: `${process.env.HOST_URL}/mint`,
      })
    );
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}
