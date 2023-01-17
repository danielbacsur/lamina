import { Suspense, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { ScrollControls, Scroll, useScroll } from "components/ScrollControls";

const HTMLComponents = ({ ...args }) => {
  return (
    <div {...args}>
      <div className="w-screen pr-[14px]">
        <div className="h-[80vh] bg-red-500">11</div>
        <div className="h-[40vh] bg-blue-500">12</div>
        <div className="h-[80vh] bg-blue-500">13</div>
        <div className="h-[40vh] bg-purple-500">13</div>
      </div>
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

const Index = () => {
  const [infinite, setInfinite] = useState(false);

  useEffect(() => {
    setInfinite(
      !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    );
  }, []);

  return (
    <div className="w-screen h-screen overflow-auto">
      <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <ScrollControls
            infinite={infinite}
            damping={infinite ? 4 : 40}
            pages={2.4 + (infinite ? 1 : 0)}
          >
            <ImageComponentsWrapper infinite={infinite} />
            <HTMLComponentsWrapper />
          </ScrollControls>
          <Preload />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Index;
