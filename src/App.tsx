import { Application } from "@pixi/react";
import {PiratskipSprite} from "./piratskip/PiratskipSprite.tsx";
import {Piratøy} from "./piratøy/Piratøy.tsx";

export default function App() {
  return (
    <Application background={"#0077BE"} resizeTo={window}>
      <PiratskipSprite />
        <Piratøy />
    </Application>
  );
}
