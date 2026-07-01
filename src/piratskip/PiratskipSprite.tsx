import { extend } from "@pixi/react";
import { Assets, Sprite, Texture } from "pixi.js";
import { useEffect, useRef, useState } from "react";

extend({
    Sprite,
});

interface Props {
    x: number;
    y: number;
}

export const PiratskipSprite = ({ x, y }: Props) => {
    const spriteRef = useRef<Sprite>(null);

    const [texture, setTexture] = useState(Texture.EMPTY);

    useEffect(() => {
        if (texture === Texture.EMPTY) {
            Assets.load("/assets/piratskip-medium.png").then((result) => {
                setTexture(result);
            });
        }
    }, [texture]);

    return <pixiSprite ref={spriteRef} texture={texture} anchor={0.5} scale={0.75} x={x} y={y} />;
};
