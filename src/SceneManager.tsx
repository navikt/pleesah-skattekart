import { useApplication, useTick } from "@pixi/react";
import { useEffect, useRef, useState } from "react";
import { PIRATSKIP_OFFSET_X, PIRATSKIP_OFFSET_Y } from "./consts.ts";
import { genererScenePosisjoner } from "./piratskipOgPiratøy/genererScenePosisjoner.ts";
import { PiratskipOgPiratøyScene } from "./piratskipOgPiratøy/PiratskipOgPiratøyScene.tsx";
import { PiratskipDrift, ScenePosition } from "./types.ts";
import { bezierKurve, lagNyDrift } from "./utils.ts";

export const SceneManager = () => {
    const { app } = useApplication();
    const [posisjoner, setPosisjoner] = useState<ScenePosition[]>([]);
    const [piratskipPosisjoner, setPiratskipPosisjoner] = useState<ScenePosition[]>([]);

    const piratskipDriftRef = useRef<PiratskipDrift[]>([]);
    const posisjonerRef = useRef<ScenePosition[]>([]);

    useEffect(() => {
        if (!app) return;

        const regenerer = () => {
            const nyePosisjoner = genererScenePosisjoner(5, app.screen.width, app.screen.height, 400, 140, 5);
            setPosisjoner(nyePosisjoner);
            posisjonerRef.current = nyePosisjoner;

            piratskipDriftRef.current = nyePosisjoner.map((posisjon) => {
                const initX = posisjon.x + PIRATSKIP_OFFSET_X;
                const initY = posisjon.y + PIRATSKIP_OFFSET_Y;
                return lagNyDrift(posisjon.x, posisjon.y, initX, initY, app.screen.width, app.screen.height);
            });

            setPiratskipPosisjoner(
                nyePosisjoner.map((posisjon) => ({
                    x: posisjon.x + PIRATSKIP_OFFSET_X,
                    y: posisjon.y + PIRATSKIP_OFFSET_Y,
                })),
            );
        };

        regenerer();
        window.addEventListener("resize", regenerer);
        return () => {
            window.removeEventListener("resize", regenerer);
        };
    }, [app]);

    useTick(() => {
        const drifts = piratskipDriftRef.current;
        const baser = posisjonerRef.current;
        if (drifts.length === 0) return;

        let endret = false;

        drifts.map((drift, index) => {
            if (drift.t < 1) {
                drift.t = Math.min(drift.t + drift.speed, 1);
                drift.currentX = bezierKurve(drift.t, drift.startX, drift.controlX, drift.targetX);
                drift.currentY = bezierKurve(drift.t, drift.startY, drift.controlY, drift.targetY);
                endret = true;
            } else if (baser[index]) {
                drifts[index] = lagNyDrift(
                    baser[index].x,
                    baser[index].y,
                    drift.currentX,
                    drift.currentY,
                    app.screen.width,
                    app.screen.height,
                );
                endret = true;
            }
        });

        if (endret) {
            setPiratskipPosisjoner(drifts.map((drift) => ({ x: drift.currentX, y: drift.currentY })));
        }
    });

    return (
        <>
            {posisjoner.map((posisjon, index) => (
                <PiratskipOgPiratøyScene
                    key={index}
                    startX={posisjon.x}
                    startY={posisjon.y}
                    piratskipX={piratskipPosisjoner[index]?.x ?? posisjon.x + PIRATSKIP_OFFSET_X}
                    piratskipY={piratskipPosisjoner[index]?.y ?? posisjon.y + PIRATSKIP_OFFSET_Y}
                />
            ))}
        </>
    );
};
