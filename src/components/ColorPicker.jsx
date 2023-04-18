import {useSnapshot} from "valtio";
import state from "../store/Store.jsx";
import {SketchPicker} from "react-color";

export default function ColorPicker() {
    let snap = useSnapshot(state);

    return (
        <div className={'absolute left-full ml-3'}>
            <SketchPicker
                color={snap.color}
                disableAlpha
                onChange={(color) => state.color = color.hex}
            />
        </div>
    )
}