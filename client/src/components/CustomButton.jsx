import {useSnapshot} from "valtio";
import state from "../store/Store.jsx";
import {getContrastingColor} from "../config/helpers.js";

export default function CustomButton(props) {
    let snap = useSnapshot(state);
    const generateStyle = (type) => {
        if (type == 'filled') {
            return {
                backgroundColor: snap.color,
                color: getContrastingColor(snap.color)
            }
        } else if (type === 'outline') {
            return {
                borderWidth: '1px',
                borderColor: snap.color,
                color: snap.color
            }
        }
    }

    return (
        <button
            className={`px-2 py-1 flex-1 rounded-md ${props.customStyles}`}

            style={generateStyle(props.type)}
            onClick={props.handleClick}
        >
            {props.title}
        </button>
    )
}