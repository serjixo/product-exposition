import {useSnapshot} from "valtio";
import state from "../store/Store.jsx";
import {Decal, useGLTF, useTexture} from "@react-three/drei";
import {useEffect} from "react";

export default function Shirt() {
    const snap = useSnapshot(state)
    const {nodes, materials} = useGLTF('./shirt_baked.glb')

    const logoTexture = useTexture(snap.logoDecal)
    const fullTexture = useTexture(snap.fullDecal)

    useEffect(() => {
        console.log(nodes)
        console.log(materials)
        console.log('====================')
        return () => {

        };
    }, []);

    return (
        <group>
            <mesh
                geometry={nodes.T_Shirt_male.geometry}
                dispose={null}
                material={materials.lambert1}
                material-roughness={1}
                dispose={null}
            />
            {snap.isFullTexture && (
                <Decal
                    position={[0, 0.04, 0]}
                    rotation={[0, 0, 0]}
                    scale={1}
                    map={fullTexture}
                />

            )
            }
            <meshStandardMaterial/>
        </group>
        // <primitive object={nodes.scene}/>
    )
}