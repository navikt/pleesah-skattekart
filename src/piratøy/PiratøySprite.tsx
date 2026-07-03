import { extend } from "@pixi/react";
import { Assets, Sprite, Text, TextStyle, Texture } from "pixi.js";
import { useEffect, useRef, useState } from "react";

extend({
    Sprite,
    Text,
});

interface Props {
    x: number;
    y: number;
    navn: string;
    hexKode: string;
}

const lagTextStyle = (hexKode: string) =>
    new TextStyle({
        fontFamily: "Arial",
        fontSize: 40,
        fontWeight: "bold",
        fill: hexKode,
        align: "center",
        dropShadow: {
            color: "#000000",
            blur: 4,
            distance: 1,
        },
    });

export const PiratøySprite = ({ x, y, navn, hexKode }: Props) => {
    const spriteRef = useRef<Sprite>(null);

    const [texture, setTexture] = useState(Texture.EMPTY);

    useEffect(() => {
        if (texture === Texture.EMPTY) {
            Assets.load("/assets/piratøy-medium.png").then((result) => {
                setTexture(result);
            });
        }
    }, [texture]);

    return (
        <>
            <pixiSprite ref={spriteRef} texture={texture} anchor={0.5} x={x} y={y} scale={1.5} />
            <pixiText text={navn} style={lagTextStyle(hexKode)} anchor={{ x: 0.5, y: 1 }} x={x} y={y - 60} />
        </>
    );
};
