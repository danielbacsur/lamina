const NotFound = () => {
  return (
    <div className="w-screen h-screen grid place-items-center">
      <div className="flex flex-col gap-8 items-center">
        <div className="flex gap-4">
          <span className="text-9xl font-cormorant font-extrabold">4</span>
          <img className="mt-11 w-24 aspect-square animate-spin" src="record.png" />
          <span className="text-9xl font-cormorant font-extrabold">4</span>
        </div>
        <p className="font-playfair text-xl">A mindenit. Az oldal nem található.</p>
      </div>
    </div>
  );
};

export default NotFound;
