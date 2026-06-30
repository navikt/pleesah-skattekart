import { Application } from "@pixi/react";
import {PiratskipSprite} from "./piratskip/PiratskipSprite.tsx";

export default function App() {
  return (
    <Application background={"#0077BE"} resizeTo={window}>
      <PiratskipSprite />
    </Application>
  );
}
