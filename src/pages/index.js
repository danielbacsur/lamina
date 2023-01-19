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
import { useRouter } from "next/router";

const Index = () => (
  <>
    <Three />
    <Hero />
  </>
);

const Arrow = () => (
  <svg
    class="ml-3 h-5 w-5"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
);

const Hero = () => {
  const router = useRouter();
  const login = async () => router.push("/login");

  return (
    <div class="w-screen h-screen grid place-items-center p-8 md:p-12 lg:px-16 lg:py-24">
      <div class="text-center space-y-16">
        <h4 class="max-w-4xl mx-auto font-cormorant font-extrabold text-4xl sm:text-5xl md:text-6xl">
          <div className="flex flex-col gap-8">
            <span>Tedd egyedivé szobádat</span>
            <span>kedvend zenéid borítóival.</span>
          </div>
        </h4>

        <button
          onClick={login}
          className="inline-flex items-center rounded-full bg-brand px-8 py-3 shadow-lg transition hover:bg-brand-hover focus:outline-none border-t"
        >
          <span class="text-sm font-medium"> Rendelj Most </span>
          <Arrow />
        </button>
      </div>
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
        <color attach="background" args={["#f0f0f0"]} />
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
const Covers = ({ count = 96, rand = MathUtils.randFloatSpread }) => {
  const positions = Array.from({ length: count }, (_, i) => [
    rand(32),
    16 + i / 2,
    rand(32),
  ]);
  const rotations = Array.from({ length: count }, () => [
    Math.random(),
    Math.random(),
    Math.random(),
  ]);
  const colorIndex = Math.floor(Math.random() * 10);
  const colorMap = useLoader(TextureLoader, `covers/2.jpg`);
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
        <boxBufferGeometry args={[1, 0.025, 1]} />
        {/* <meshPhongMaterial color="#18a36e" attach="material" /> */}
        <meshStandardMaterial map={colorMap} />
      </instancedMesh>
    </InstancedRigidBodies>
  );
};

export default Index;
