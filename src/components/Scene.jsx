import { Environment, OrbitControls, Plane, useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { DoubleSide } from "three";

export const Scene = () => {

  // load 3D Model from file (GLTF => JSON format, GLB => binary format of GLTF)
  const { scene: model, animations } = useGLTF("/models/Fox.glb")
  // load animations from loaded model
  const { actions } = useAnimations(animations, model)

  // access 3D mesh node just like usual with REF
  const refModel = useRef()

  // läuft nach dem first render
  useEffect(() => {
    // shrink down too big model after loading
    refModel.current.scale.set(0.03,0.03,0.03)
  }, [])

  // render 3D scene
  return (
    <>
      <Environment background preset="forest" />
      <primitive
        ref={refModel}
        object={model}
        onClick={() => {
          const action = actions.Run
          action.reset()
          // action.setLoop(LoopRepeat)
          action.setDuration(1);
          action.fadeIn(0.2)
          action.play()
          setTimeout(() => {
            action.fadeOut(0.2);
          }, 500)
        }
        }
      />
      {/* <color attach="background" args={["lightsalmon"]} /> */}
      <Plane args={[10, 10]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="darkgray" side={DoubleSide} />
      </Plane>
      <OrbitControls />
    </>
  );
};
