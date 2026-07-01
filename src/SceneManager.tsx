import { useApplication } from "@pixi/react";
import { useEffect, useState } from "react";
import { genererScenePosisjoner } from "./piratskipOgPiratøy/genererScenePosisjoner.ts";
import { PiratskipOgPiratøyScene } from "./piratskipOgPiratøy/PiratskipOgPiratøyScene.tsx";
import { ScenePosition } from "./types.ts";

export const SceneManager = () => {
    const { app } = useApplication();
    const [posisjoner, setPosisjoner] = useState<ScenePosition[]>([]);

    useEffect(() => {
        if (!app) return;

        const regenerer = () => {
            setPosisjoner(genererScenePosisjoner(5, app.screen.width, app.screen.height, 400, 140, 5));
        };

        regenerer();
        window.addEventListener("resize", regenerer);
        return () => {
            window.removeEventListener("resize", regenerer);
        };
    }, [app]);

    return (
        <>
            {posisjoner.map((posisjon, index) => (
                <PiratskipOgPiratøyScene key={index} x={posisjon.x} y={posisjon.y} />
            ))}
        </>
    );
};
