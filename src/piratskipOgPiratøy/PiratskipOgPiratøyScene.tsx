import { PiratskipSprite } from "../piratskip/PiratskipSprite.tsx";
import { PiratøySprite } from "../piratøy/PiratøySprite.tsx";

export interface PiratskipOgPiratøySceneProps {
    x: number;
    y: number;
}

const PIRATSKIP_OFFSET_X = -30;
const PIRATSKIP_OFFSET_Y = 20;

export const PiratskipOgPiratøyScene = ({ x, y }: PiratskipOgPiratøySceneProps) => {
    return (
        <>
            <PiratøySprite x={x} y={y} />
            <PiratskipSprite x={x + PIRATSKIP_OFFSET_X} y={y + PIRATSKIP_OFFSET_Y} />
        </>
    );
};
