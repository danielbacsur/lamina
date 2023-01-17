import { Suspense, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { ScrollControls, Scroll, useScroll } from "components/ScrollControls";

const HTMLComponents = () => {
  const Components = ({ ...args }) => {
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
  return (
    <Scroll html>
      <Components className="absolute top-0 left-0" />
      <Components className="absolute top-0 left-0 -translate-y-full" />
      <Components className="absolute top-0 left-0 translate-y-full" />
    </Scroll>
  );
};

const ImageComponents = ({ infinite }) => {
  const { height } = useThree((state) => state.viewport);
  const { pages } = useScroll();

  const Components = ({ ...args }) => {
    return <group {...args}></group>;
  };
  return (
    <Scroll>
      <Components position={[0, 0, 0]} />
      <Components position={[0, -height * (pages - (infinite ? 0 : 1)), 0]} />
    </Scroll>
  );
};

const Index = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    );
  }, []);

  return (
    <div className="w-screen h-screen overflow-auto">
      <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <ScrollControls
            infinite={!isMobile}
            damping={isMobile ? 40 : 4}
            pages={2.4 + (isMobile ? 0 : 1)}
          >
            <ImageComponents infinite={isMobile} />
            <HTMLComponents />
          </ScrollControls>
          <Preload />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Index;