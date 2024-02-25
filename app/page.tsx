import { FrameMetadata } from "@coinbase/onchainkit";

const Home = () => {
  return (
    <FrameMetadata
      buttons={[
        {
          label: "Get your NFT",
          action: "post",
        },
      ]}
      image={{
        src: `${process.env.HOST_URL}/collectible.jpeg`,
        aspectRatio: "1:1",
      }}
      postUrl={`${process.env.HOST_URL}/mint`}
    />
  );
};

export default Home;
