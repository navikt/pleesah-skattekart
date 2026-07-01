import { Application } from "@pixi/react";
import { SceneManager } from "./SceneManager.tsx";

export default function App() {
    return (
        <Application background={"#0077BE"} resizeTo={window}>
            <SceneManager />
        </Application>
    );
}
