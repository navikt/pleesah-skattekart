import { extend, useApplication, useTick } from "@pixi/react";
import { Assets, Container, Sprite, Texture } from "pixi.js";
import { useEffect, useRef, useState } from "react";

extend({
    Container,
    Sprite,
});

export const PiratskipSprite = () => {

    const { app } = useApplication();

    const spriteRef = useRef<Sprite>(null);
    const angleRef = useRef(0);

    const [texture, setTexture] = useState(Texture.EMPTY);

    useEffect(() => {
        if (texture === Texture.EMPTY) {
            Assets.load("/assets/piratskip.png").then((result) => {
                setTexture(result);
            });
        }
    }, [texture]);

    useTick((ticker) => {
        if (!spriteRef.current) return;

        angleRef.current += 0.05 * ticker.deltaTime;

        const radius = 150;
        const centerX = app.screen.width / 2;
        const centerY = app.screen.height / 2;

        spriteRef.current.x = centerX + Math.cos(angleRef.current) * radius;
        spriteRef.current.y = centerY + Math.sin(angleRef.current) * radius;
    });

    return <pixiSprite
        ref={spriteRef}
        texture={texture}
        anchor={0.5}
    />
}