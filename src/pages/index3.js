import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  const Images = () =>
    [...Array(10)].map((e, i) => (
      <div
        className="w-[25vh] h-[25vh] bg-cover rounded"
        style={{ backgroundImage: `url(covers/${i}.jpg` }}
      />
    ));

  const login = async () => router.push("/login");

  return (
    <div className="w-screen h-screen flex flex-col space-y-4 items-center justify-center overflow-hidden px-4">
      <div className="flex-1 grid place-items-center">
        <span className="font-serif text-[5vh]">L A M I N A</span>
        <span className=" absolute font-yellowtail text-[6vh] text-[rgba(0,0,0,0.05)]">
          L A M I N A
        </span>
      </div>
      <div class="relative flex space-x-4">
        <div class="animate-marquee whitespace-nowrap flex space-x-4">
          <Images />
        </div>
        <div class="animate-marquee2 whitespace-nowrap flex space-x-4 absolute top-0">
          <Images />
        </div>
      </div>
      <div className="flex-1 flex-col lg:flex-row container max-w-screen-lg flex justify-between items-center px-8 py-16 space-y-8 lg:space-y-0">
        <div className="flex flex-col max-w-lg space-y-4 items-center lg:items-start">
          <span className="font-serif text-4xl text-center">NFC Album Coverek</span>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
          <button
            className="h-12 px-8 font-serif text-white bg-black rounded-full"
            onClick={login}
          >
            Bejelentkezés
          </button>
      </div>
    </div>
  );
};

export default Index;
