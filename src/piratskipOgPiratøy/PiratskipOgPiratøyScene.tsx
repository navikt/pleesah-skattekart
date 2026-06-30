import {PiratøySprite} from "../piratøy/PiratøySprite.tsx";
import {useApplication} from "@pixi/react";
import {PiratskipSprite} from "../piratskip/PiratskipSprite.tsx";

export const PiratskipOgPiratøyScene = () => {
    const { app } = useApplication()

    const startX = app.screen.width / 2
    const startY = app.screen.height / 2

    const piratSkipOffsetX = -30
    const piratSkipOffsety = 20

    return (
        <>
            <PiratøySprite x={startX} y={startY} />
            <PiratskipSprite x={startX + piratSkipOffsetX} y={startY + piratSkipOffsety} />
        </>
    )
}