import { Suspense, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { ScrollControls, Scroll, useScroll } from "components/ScrollControls";
import { Break, First, Footer, Second } from "components/index";

const HTMLComponents = () => {
  const Components = ({ ...args }) => {
    return (
      <div {...args} id="html-components">
        <div className="w-screen pr-[14px]">
          <First />
          <Break />
          <Second />
          <Footer />
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
    
    const resize = () => {
      console.log(window.innerHeight)
    };
    window.addEventListener("resize", resize);
    resize();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className="w-screen h-screen overflow-auto">
      <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <ScrollControls
            infinite={!isMobile}
            damping={isMobile ? 80 : 8}
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
