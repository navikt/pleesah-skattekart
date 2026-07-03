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
    navn: string;
    hexKode: string;
}

export const PiratskipOgPiratøyScene = ({
    startX,
    startY,
    piratskipX,
    piratskipY,
    trail,
    navn,
    hexKode,
}: PiratskipOgPiratøySceneProps) => {
    return (
        <>
            <PiratskipTrail trail={trail} />
            <PiratøySprite x={startX} y={startY} navn={navn} hexKode={hexKode} />
            <PiratskipSprite x={piratskipX} y={piratskipY} />
        </>
    );
};
