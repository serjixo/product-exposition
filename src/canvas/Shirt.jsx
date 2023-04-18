import {useSnapshot} from "valtio";
import state from "../store/Store.jsx";
import {Decal, useGLTF, useTexture} from "@react-three/drei";
import {useEffect} from "react";
import {useFrame} from "@react-three/fiber";
import {easing} from "maath";

export default function Shirt() {
    const snap = useSnapshot(state)
    const {nodes, materials} = useGLTF('./shirt_baked.glb')

    const logoTexture = useTexture(snap.logoDecal)
    const fullTexture = useTexture(snap.fullDecal)
    useFrame((state, delta) => {
            easing.dampC(materials.lambert1.color, snap.color, 0.25, delta)
        console.log(materials.lambert1.color, snap.color)
        // debugger;
        }
    )

    useEffect(() => {

        return () => {

        };
    }, []);

    const stateString = JSON.stringify(snap)

    return (
        <group
            key={stateString}>
            <mesh
                castShadow
                geometry={nodes.T_Shirt_male.geometry}
                material={materials.lambert1}
                material-roughness={1}
                dispose={null}
            >


                {snap.isFullTexture && (
                    <Decal
                        position={[0, 0.04, 0]}
                        rotation={[0, 0, 0]}
                        scale={1}
                        map={fullTexture}
                    />

                )
                }
                {snap.isLogoTexture && (
                    <Decal
                        position={[0, 0.04, 0.15]}
                        rotation={[0, 0, 0]}
                        scale={0.15}
                        map={logoTexture}
                        map-anisotropy={16}
                        depthTest={false}
                        depthWrite={false}
                    />

                )
                }
            </mesh>
        </group>
        // <primitive object={nodes.scene}/>
    )
}