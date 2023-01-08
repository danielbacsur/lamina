import { useState } from "react";

const Test = () => {
  const price = (quantity) =>
    Math.floor((40 * quantity - (quantity - 1) * 10) / quantity) * 100;
  // console.log([...Array(10)].map((_, i) => price(i+1)))

  console.log(
    "https://open.spotify.com/playlist/7mi20Wf0et5RghdxQIHYlR"
      .split("open.spotify.com")[1]
      .substring(1)
      .split("/")[1]
  );

  const [page, setPage] = useState(0);

  return (
    <div class="snap-y snap-mandatory h-screen overflow-hidden">
      <div class="bg-amber-200 w-screen h-[40vh]" />
      {[...Array(5)].map((_, i) => (
        <div
          class="snap-center bg-amber-200 w-screen h-[40vh] flex items-center justify-center text-8xl"
          id={i}
        >
          <a href={`#4`}>-</a>
          {i}
          <button onClick={() => setPage(page + 1)} href={`${page + 1}`}>
            +
          </button>
        </div>
      ))}
      <div class="bg-amber-200 w-screen h-[40vh]" />

    </div>
  );
};

export default Test;
