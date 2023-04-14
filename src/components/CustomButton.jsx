import {useSnapshot} from "valtio";
import state from "../store/Store.jsx";

export default function CustomButton(props) {
    let snapshot = useSnapshot(state);
    const generateStyle = (type) => {
        if (type == 'filled') {
            return {
                backgroundColor: snapshot.color,
                color: '#ffffff'
            }
        }
    }

    return (
        <button
            className={`px-2 py-1 flex-1 rounded-md ${props.customStyles}`}
            {...props}
            style={generateStyle(props.type)}
            onClick={props.handleClick}
        >
            {props.title}
        </button>
    )
}