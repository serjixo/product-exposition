import Home from "./pages/Home.jsx";
import CanvasModel from "./canvas/CanvasModel.jsx";
import Customizer from "./pages/Customizer.jsx";

function App() {

    return (
        <main className={"app transition-all ease-in"}>
            <Home/>
            <CanvasModel/>
            <Customizer/>
        </main>
    )
}

export default App
