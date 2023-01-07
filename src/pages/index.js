import axios from "axios";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  const Images = () =>
    [...Array(10)].map((e, i) => (
      <div
        className="w-[25vh] h-[25vh] bg-cover rounded-[12px]"
        style={{ backgroundImage: `url(covers/${i}.jpg` }}
      />
    ));

  const OAuth = async () => {
    const {data} = await axios.post("api/oauth");
    console.log(data)
    router.push(data);
  };

  return (
    <div className="w-screen h-screen flex flex-col space-y-4 items-center justify-center overflow-hidden px-4">
      <div className="flex-1 grid place-items-center">
        <span className="font-serif text-6xl">L A M I N A</span>
        <span className="absolute font-yellowtail text-[80px] text-[rgba(0,0,0,0.08)]">L A M I N A</span>
      </div>
      <div class="relative flex space-x-4">
        <div class="animate-marquee whitespace-nowrap flex space-x-4">
          <Images />
        </div>
        <div class="animate-marquee2 whitespace-nowrap flex space-x-4 absolute top-0">
          <Images />
        </div>
      </div>
      <div className="flex-1 container max-w-screen-lg flex justify-between items-center px-8 py-16">
          <div className="flex flex-col max-w-lg space-y-4">
            <span className="font-serif text-4xl">NFC Album Coverek</span>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
          <div className="flex space-x-8 items-center">
            <button
              className="h-12 px-8 font-serif text-white bg-black rounded-full"
              onClick={OAuth}
            >
              Spotify
            </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
