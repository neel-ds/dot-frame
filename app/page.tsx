import { FrameMetadata } from "@coinbase/onchainkit";

const Home = () => {
  return (
    <FrameMetadata
      buttons={[
        {
          label: "Mint",
        },
      ]}
      image={{
        src: `${process.env.HOST_URL}/elemental.png`,
        aspectRatio: "1:1",
      }}
      postUrl={`${process.env.HOST_URL}/mint`}
    />
  );
};

export default Home;
