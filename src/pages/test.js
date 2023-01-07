const Test = () => {
    const price = (quantity) =>
  Math.floor((40 * quantity - (quantity - 1) * 10) / quantity) * 100;
  // console.log([...Array(10)].map((_, i) => price(i+1)))

  console.log( "https://open.spotify.com/playlist/7mi20Wf0et5RghdxQIHYlR".split("open.spotify.com")[1].substring(1).split("/")[1])
}

export default Test