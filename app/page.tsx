'use server';
import { FrameMetadata } from "@coinbase/onchainkit";

const HOST_URL = process.env.HOST_URL;

export default async function Home() {
  return (
    <FrameMetadata
      buttons={[
        {
          label: "Get Started",
        },
      ]}
      image={{
        src: `${HOST_URL}/collectible.jpeg`,
        aspectRatio: "1:1",
      }}
      postUrl={`${HOST_URL}/mint`}
    />
  );
}
