import Home from "./pages/Home.jsx";
import Canvas from "./canvas/canvas.jsx";
import Customizer from "./pages/Customizer.jsx";

function App() {

    return (
        <main className={"app transition-all ease-in"}>
            <Home/>
            <Canvas/>
            <Customizer/>
        </main>
    )
}

export default App
