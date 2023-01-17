const HTMLComponents = ({ ...args }) => {
  return (
    <div {...args}>
      <div className="w-screen h-[80vh] bg-red-500">11</div>
      <div className="w-screen h-[40vh] bg-green-500">12</div>
      <div className="w-screen h-[80vh] bg-blue-500">13</div>
      <div className="w-screen h-[40vh] bg-purple-500">ad</div>
    </div>
  );
};
const HTMLComponentsWrapper = () => {
  return (
    <Scroll html>
      <HTMLComponents className="absolute top-0 left-0" />
      <HTMLComponents className="absolute top-0 left-0 -translate-y-full" />
      <HTMLComponents className="absolute top-0 left-0 translate-y-full" />
    </Scroll>
  );
};
const ImageComponents = ({ ...args }) => {
  const { width: w, height: h } = useThree((state) => state.viewport);

  return (
    <group {...args}>
      {/* <Image
        position={[w / 4, 0, 0]}
        scale={[w / 3, w / 3, 1]}
        url="/trip1.jpg"
      /> */}
    </group>
  );
};
const ImageComponentsWrapper = ({ infinite }) => {
  const { height } = useThree((state) => state.viewport);
  const { pages } = useScroll();
  return (
    <Scroll>
      <ImageComponents position={[0, 0, 0]} />
      <ImageComponents
        position={[0, -height * (pages - (infinite ? 1 : 0)), 0]}
      />
    </Scroll>
  );
};

export {
  HTMLComponents,
  HTMLComponentsWrapper,
  ImageComponents,
  ImageComponentsWrapper,
};
