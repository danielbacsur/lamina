import axios from "axios";
import { useEffect, useState } from "react";

const Test = () => {
  const [ddata, setDData] = useState();

  const items = [
    {
      url: "https://open.spotify.com/track/7MXVkk9YMctZqd1Srtv4MB",
      title: "Starboy",
      image: "https://i.scdn.co/image/ab67616d00001e024718e2b124f79258be7bc452",
      type: "track",
      quantity: 1,
      price: 5000,
    },
    {
      url: "https://open.spotify.com/track/0WtDGnWL2KrMCk0mI1Gpwz",
      title: "Redbone",
      image: "https://i.scdn.co/image/ab67616d00001e027582716b3666a5235d5af4ea",
      type: "track",
      quantity: 1,
      price: 5000,
    },
    {
      url: "https://open.spotify.com/track/0D6Aewbxit6kZYncgVohxU",
      title: "Kukásautó",
      image: "https://i.scdn.co/image/ab67616d00001e02a6484915a1f2f361c8f5f7f4",
      type: "track",
      quantity: 2,
      price: 5000,
    },
  ];
  useEffect(() => {
    const sum = Object.values(items).reduce((accumulator, value) => {
      return accumulator + value.quantity;
    }, 0);
    console.log(sum);
  }, []);
};

export default Test;
