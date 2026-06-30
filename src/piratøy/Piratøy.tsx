import { extend, useApplication, useTick } from "@pixi/react";
import { Assets, Sprite, Texture } from "pixi.js";
import { useEffect, useRef, useState } from "react";

extend({
    Sprite,
});

export const Piratøy = () => {

    const { app } = useApplication();

    const spriteRef = useRef<Sprite>(null);

    const [texture, setTexture] = useState(Texture.EMPTY);

    useEffect(() => {
        if (texture === Texture.EMPTY) {
            Assets.load("/assets/piratøy-medium.png").then((result) => {
                setTexture(result);
            });
        }
    }, [texture]);

    useTick(() => {
        if (!spriteRef.current) return;

        const centerX = app.screen.width / 2;
        const centerY = app.screen.height / 2;

        spriteRef.current.x = centerX
        spriteRef.current.y = centerY
    })

    return <pixiSprite
        ref={spriteRef}
        texture={texture}
        anchor={0.5}
    />

}