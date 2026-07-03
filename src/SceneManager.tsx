import { useApplication, useTick } from "@pixi/react";
import { useEffect, useRef, useState } from "react";
import useSWR, { SWRResponse } from "swr";
import { MAX_TRAIL_POINTS, MIN_TRAIL_DISTANCE, PIRATSKIP_OFFSET_X, PIRATSKIP_OFFSET_Y } from "./consts.ts";
import { fetcher } from "./fetcher.ts";
import { genererScenePosisjoner } from "./piratskipOgPiratøy/genererScenePosisjoner.ts";
import { PiratskipOgPiratøyScene } from "./piratskipOgPiratøy/PiratskipOgPiratøyScene.tsx";
import { Lag, PiratskipDrift, ScenePosition } from "./types.ts";
import { bezierKurve, lagNyDrift } from "./utils.ts";

export const SceneManager = () => {
    const { app } = useApplication();

    const { data }: SWRResponse<Lag[], boolean> = useSWR("/api/api/v1/teams", fetcher, { refreshInterval: 1000 });

    const [posisjoner, setPosisjoner] = useState<ScenePosition[]>([]);
    const [piratskipPosisjoner, setPiratskipPosisjoner] = useState<ScenePosition[]>([]);
    const [trails, setTrails] = useState<ScenePosition[][]>([]);

    const piratskipDriftRef = useRef<PiratskipDrift[]>([]);
    const posisjonerRef = useRef<ScenePosition[]>([]);
    const trailsRef = useRef<ScenePosition[][]>([]);

    // TODO: Hvis progresjon liste fra backend er tom, finn et sted å plasser første posisjon for øya og post kordinatene til backend
    useEffect(() => {
        if (!app) return;

        const regenerer = () => {
            const nyePosisjoner = genererScenePosisjoner(data ?? [], app.screen.width, app.screen.height, 50);
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

            trailsRef.current = nyePosisjoner.map((posisjon) => [
                { x: posisjon.x + PIRATSKIP_OFFSET_X, y: posisjon.y + PIRATSKIP_OFFSET_Y },
            ]);
            setTrails(trailsRef.current.map((t) => [...t]));
        };

        regenerer();
        window.addEventListener("resize", regenerer);
        return () => {
            window.removeEventListener("resize", regenerer);
        };
    }, [app, data]);

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

            let trailEndret = false;
            drifts.map((drift, index) => {
                const trail = trailsRef.current[index];
                if (!trail) return;

                const last = trail[trail.length - 1];
                const dx = drift.currentX - last.x;
                const dy = drift.currentY - last.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance > MIN_TRAIL_DISTANCE) {
                    trail.push({ x: drift.currentX, y: drift.currentY });

                    if (trail.length > MAX_TRAIL_POINTS) {
                        trail.shift();
                    }
                    trailEndret = true;
                }
            });

            if (trailEndret) {
                setTrails(trailsRef.current.map((t) => [...t]));
            }
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
                    trail={trails[index] ?? []}
                />
            ))}
        </>
    );
};
