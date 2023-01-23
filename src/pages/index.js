import { MathUtils, TextureLoader } from "three";
import { Canvas, useLoader } from "@react-three/fiber";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";
import {
  Lightformer,
  Environment,
  OrbitControls,
  RandomizedLight,
  AccumulativeShadows,
} from "@react-three/drei";
import {
  Physics,
  RigidBody,
  CuboidCollider,
  InstancedRigidBodies,
} from "@react-three/rapier";

const Index = () => (
  <>
    <Three />
    <Content />
  </>
);

const Content = () => {
  const Hero = () => {
    const Title = () => (
      <span className="text-3xl font-bold text-gray-900 sm:text-5xl">
        Egyedi NFC Borítóképek
      </span>
    );
    const Subtitle = () => (
      <p className="max-w-sm mx-auto mt-6 text-gray-500">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum maiores
        ipsum eos temporibus ea nihil.
      </p>
    );
    const Button = () => (
      <a
        className="pointer-events-auto inline-block px-12 py-3 mt-8 text-sm font-medium text-brand-900 border border-brand-900 rounded-full hover:bg-brand-900 hover:text-white focus:outline-none focus:ring active:bg-brand-800"
        href="/product"
      >
        Tovább a rendeléshez
      </a>
    );
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <Title />
        <Subtitle />
        <Button />
      </div>
    );
  };
  const Footer = () => {
    const Legal = () => {
      const Reference = ({ href, text }) => {
        return (
          <a
            href={href}
            className="text-gray-500 transition hover:opacity-75 pointer-events-auto"
          >
            {text}
          </a>
        );
      };
      return (
        <div className="flex flex-wrap justify-center gap-4 text-xs lg:justify-end">
          <Reference href="#" text="Terms & Conditions" />
          <Reference href="#" text="Privacy Policy" />
          <Reference href="#" text="Cookies" />
        </div>
      );
    };
    const Socials = () => {
      const Facebook = () => (
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clip-rule="evenodd"
          />
        </svg>
      );
      const Instagram = () => (
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clip-rule="evenodd"
          />
        </svg>
      );
      const Twitter = () => (
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      );
      const Reference = ({ href, title, icon }) => {
        return (
          <a
            className="text-gray-700 transition hover:opacity-75 pointer-events-auto"
            href={href}
          >
            <span className="sr-only">{title}</span>
            {icon}
          </a>
        );
      };
      return (
        <div className="flex justify-center gap-6 mt-8 sm:mt-0 lg:justify-end">
          <Reference
            href="https://www.facebook.com"
            title="Facebook"
            icon={<Facebook />}
          />
          <Reference
            href="https://www.facebook.com"
            title="Facebook"
            icon={<Instagram />}
          />
          <Reference
            href="https://www.facebook.com"
            title="Facebook"
            icon={<Twitter />}
          />
        </div>
      );
    };
    return (
      <div className="absolute bottom-12 left-12 right-12 sm:flex sm:items-center sm:justify-between">
        <Legal />
        <Socials />
      </div>
    );
  };
  return (
    <div className="pointer-events-none">
      <Hero />
      <Footer />
    </div>
  );
};
const Three = () => {
  return (
    <div className="w-screen h-screen absolute -z-[999]">
      <Canvas
        shadows
        gl={{ antialias: false }}
        camera={{ position: [-30, 35, -15], near: 30, far: 55, fov: 12 }}
      >
        <color attach="background" args={["#ffffff"]} />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[-10, 10, 5]}
          shadow-mapSize={[256, 256]}
          shadow-bias={-0.0001}
          castShadow
        >
          <orthographicCamera
            attach="shadow-camera"
            args={[-10, 10, -10, 10]}
          />
        </directionalLight>
        <Environment resolution={32}>
          <Lightformer position={[10, 10, 10]} scale={10} intensity={4} />
          <Lightformer
            position={[10, 0, -10]}
            scale={10}
            color="red"
            intensity={6}
          />
          <Lightformer position={[-10, -10, -10]} scale={10} intensity={4} />
        </Environment>
        <Physics gravity={[0, -4, 0]}>
          <Covers />
          <RigidBody position={[0, -1, 0]} type="fixed" colliders="false">
            <CuboidCollider restitution={0.1} args={[1000, 1, 1000]} />
          </RigidBody>
        </Physics>
        <AccumulativeShadows
          temporal
          frames={Infinity}
          alphaTest={1}
          blend={200}
          limit={1500}
          scale={25}
          position={[0, -0.05, 0]}
        >
          <RandomizedLight
            amount={1}
            mapSize={512}
            radius={5}
            ambient={0.5}
            position={[-10, 10, 5]}
            size={10}
            bias={0.001}
          />
        </AccumulativeShadows>
        <EffectComposer>
          <DepthOfField target={[0, 0, 0]} focusRange={0.15} bokehScale={8} />
        </EffectComposer>
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.32}
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
};
const Covers = () => {
  const rand = MathUtils.randFloatSpread;
  const InstancedCovers = ({ image, count = 4 }) => {
    const scale = [1, 0.025, 1];
    const positions = Array.from({ length: count }, (_, i) => [
      rand(32),
      scale[1]/2,
      rand(32),
    ]);
    const rotations = Array.from({ length: count }, () => [
      0,
      2 + Math.random(),
      0,
    ]);
    const colorMap = useLoader(TextureLoader, image);

    return (
      <InstancedRigidBodies
        positions={positions}
        rotations={rotations}
        colliders="hull"
      >
        <instancedMesh
          receiveShadow
          castShadow
          args={[undefined, undefined, count]}
          dispose={null}
        >
          <boxBufferGeometry args={scale} />
          {/* <meshPhongMaterial color="#b0b91a" attach="material" /> */}
          <meshStandardMaterial map={colorMap} />
        </instancedMesh>
      </InstancedRigidBodies>
    );
  };
  return (
    <group>
      {[...Array(10)].map((_, i) => (
        <InstancedCovers image={`covers/${i}.jpg`} />
      ))}
    </group>
  );
};

export default Index;
