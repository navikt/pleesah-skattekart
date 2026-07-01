import { PiratskipSprite } from "../piratskip/PiratskipSprite.tsx";
import { PiratskipTrail } from "../piratskip/PiratskipTrail.tsx";
import { PiratøySprite } from "../piratøy/PiratøySprite.tsx";
import { ScenePosition } from "../types.ts";

export interface PiratskipOgPiratøySceneProps {
    startX: number;
    startY: number;
    piratskipX: number;
    piratskipY: number;
    trail: ScenePosition[];
}

export const PiratskipOgPiratøyScene = ({
    startX,
    startY,
    piratskipX,
    piratskipY,
    trail,
}: PiratskipOgPiratøySceneProps) => {
    return (
        <>
            <PiratskipTrail trail={trail} />
            <PiratøySprite x={startX} y={startY} />
            <PiratskipSprite x={piratskipX} y={piratskipY} />
        </>
    );
};
