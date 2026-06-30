import {Application} from "@pixi/react";
import {PiratskipOgPiratøyScene} from "./piratskipOgPiratøy/PiratskipOgPiratøyScene.tsx";

export default function App() {


    return (
        <Application background={"#0077BE"} resizeTo={window}>
            <PiratskipOgPiratøyScene />
        </Application>
  );
}
