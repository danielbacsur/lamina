export default function Home() {
  const example = {
    title: "Starboy",
    artist: "The Weekend",
    image: "https://m.media-amazon.com/images/I/819e05qxPEL.jpg",
    quantity: 2,
    price: 5000,
    subval: 500,
  };

  console.log((5000 * example.quantity - (example.quantity-1) * 2000) / example.quantity);

  return <div>alma</div>;
}
