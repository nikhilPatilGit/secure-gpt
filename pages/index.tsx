import Image from 'next/image';

const Main = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <Image
          alt=""
          src="/storm.png"
          width={200}
          height={200}
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">StormGPT</h1>
          <p className="py-6">
            StormGPT will protect your personal information when you speak with
            ChatGPT.
          </p>
          <a
            href="https://twitter.com/StormGpt"
            role="button"
            className="btn btn-primary"
          >
            Connect
          </a>
        </div>
      </div>
    </div>
  );
};

export default Main;
