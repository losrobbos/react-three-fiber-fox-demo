import { Box } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export const Cube = () => {
  const refCube = useRef();

  const rotate = () => {
    const cube = refCube.current;
    // cube.rotation.y += Math.PI / 4;
    cube.rotation.y += 0.01;
  };

  // useFrame runs 60times per second (60 frames per second => frame rate = 60fps)
  useFrame(() => {
    rotate();
    // console.log("Rendering...", Date.now());
  });

  return (
    <Box
      ref={refCube}
      rotation={[0, 100, 0]}
      position={[0, 0.51, 0]}
      onClick={rotate}
    >
      <meshNormalMaterial />
    </Box>
  );
};
