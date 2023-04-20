import {Canvas} from "@react-three/fiber";
import {Environment} from "@react-three/drei";
import CameraRig from "./CameraRig.jsx";
import BackDrop from "./BackDrop.jsx";
import Shirt from "./Shirt.jsx";


const CanvasModel = () => {

    return (
        <Canvas
            shadows
            camera={{position: [0, 0, 0], fov: 25}}
            gl={{preserveDrawingBuffer: true}}
            className={'w-full max-w-full h-full transition-all ease-in'}
        >
            <ambientLight intesity={0.5}/>
            <Environment preset={'city'}/>
            <CameraRig>
                <BackDrop/>
                <Shirt/>
            </CameraRig>
        </Canvas>
    )
}
export default CanvasModel