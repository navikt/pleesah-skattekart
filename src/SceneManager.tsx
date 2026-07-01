import { useApplication, useTick } from "@pixi/react";
import { useEffect, useRef, useState } from "react";
import { genererScenePosisjoner } from "./piratskipOgPiratøy/genererScenePosisjoner.ts";
import { PiratskipOgPiratøyScene } from "./piratskipOgPiratøy/PiratskipOgPiratøyScene.tsx";
import { ScenePosition } from "./types.ts";
import { tilfeldigInnenRekkevidde } from "./utils.ts";

const PIRATSKIP_OFFSET_X = -30;
const PIRATSKIP_OFFSET_Y = 20;
const MAX_RANDOM_DRIFT = 45;
const FOLLOW_SPEED = 0.08;

interface PiratskipDrift {
    currentX: number;
    currentY: number;
    targetX: number;
    targetY: number;
}

export const SceneManager = () => {
    const { app } = useApplication();
    const [posisjoner, setPosisjoner] = useState<ScenePosition[]>([]);
    const [piratskipPosisjoner, setPiratskipPosisjoner] = useState<ScenePosition[]>([]);

    const piratskipDriftRef = useRef<PiratskipDrift[]>([]);

    useEffect(() => {
        if (!app) return;

        const regenerer = () => {
            const nyePosisjoner = genererScenePosisjoner(5, app.screen.width, app.screen.height, 400, 140, 5);
            setPosisjoner(nyePosisjoner);

            piratskipDriftRef.current = nyePosisjoner.map((posisjon) => ({
                currentX: posisjon.x + PIRATSKIP_OFFSET_X,
                currentY: posisjon.y + PIRATSKIP_OFFSET_Y,
                targetX: posisjon.x + PIRATSKIP_OFFSET_X,
                targetY: posisjon.y + PIRATSKIP_OFFSET_Y,
            }));

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

    useEffect(() => {
        if (posisjoner.length === 0) return;

        const timeouts: ReturnType<typeof setTimeout>[] = [];

        const scheduleTarget = (index: number) => {
            const velg = () => {
                const base = posisjoner[index];

                if (!base || !piratskipDriftRef.current[index]) return;

                piratskipDriftRef.current[index].targetX =
                    base.x + PIRATSKIP_OFFSET_X + tilfeldigInnenRekkevidde(-MAX_RANDOM_DRIFT, MAX_RANDOM_DRIFT);
                piratskipDriftRef.current[index].targetY =
                    base.y + PIRATSKIP_OFFSET_Y + tilfeldigInnenRekkevidde(-MAX_RANDOM_DRIFT, MAX_RANDOM_DRIFT);

                timeouts[index] = setTimeout(velg, tilfeldigInnenRekkevidde(700, 1800));
            };

            velg();
        };

        posisjoner.forEach((_, index) => scheduleTarget(index));
        return () => timeouts.forEach(clearTimeout);
    }, [posisjoner]);

    useTick(() => {
        const drifts = piratskipDriftRef.current;
        if (drifts.length === 0) return;

        let endret = false;

        drifts.map((drift) => {
            const dx = drift.targetX - drift.currentX;
            const dy = drift.targetY - drift.currentY;

            if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
                drift.currentX += dx * FOLLOW_SPEED;
                drift.currentY += dy * FOLLOW_SPEED;
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
