import {Canvas} from "@react-three/fiber";
import {Environment} from "@react-three/drei";
import CameraRig from "./CameraRig.jsx";
import BackDrop from "./BackDrop.jsx";
import Shirt from "./Shirt.jsx";


const CanvasModel = () => {

    return (
        <Canvas>
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