import { PiratskipSprite } from "../piratskip/PiratskipSprite.tsx";
import { PiratøySprite } from "../piratøy/PiratøySprite.tsx";

export interface PiratskipOgPiratøySceneProps {
    startX: number;
    startY: number;
    piratskipX: number;
    piratskipY: number;
}

export const PiratskipOgPiratøyScene = ({ startX, startY, piratskipX, piratskipY }: PiratskipOgPiratøySceneProps) => {
    return (
        <>
            <PiratøySprite x={startX} y={startY} />
            <PiratskipSprite x={piratskipX} y={piratskipY} />
        </>
    );
};
