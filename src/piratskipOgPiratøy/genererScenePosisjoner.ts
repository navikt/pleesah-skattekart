import { PIRATSKIP_OFFSET_X, PIRATSKIP_OFFSET_Y } from "../consts.ts";
import { Lag, ScenePosition } from "../types.ts";
import { regnUtDistanseMellomToPunkter, tilfeldigInnenRekkevidde } from "../utils.ts";

const SPRITE_BUFFER = 100;
const MIN_AVSTAND = 200;
const MAX_FORSØK = 100;

export const lagreFørstePosisjon = async (lagnavn: string, førstePosisjon: ScenePosition) => {
    await fetch(`/api/v1/team/${lagnavn}/progression`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(førstePosisjon),
    });
};

// TODO: Hvis progresjon liste fra backend er tom, finn et sted å plasser første posisjon for øya og post kordinatene til backend
export const genererScenePosisjoner = (lag: Lag[], bredde: number, høyde: number, margin: number): ScenePosition[] => {
    // Safe bounds: margin + sprite visual extent + ship offset per edge
    const minX = Math.max(0, margin + SPRITE_BUFFER - Math.min(0, PIRATSKIP_OFFSET_X)); // 50+100+30 = 180
    const maxX = Math.min(bredde, bredde - margin - SPRITE_BUFFER - Math.max(0, PIRATSKIP_OFFSET_X)); // bredde-150
    const minY = Math.max(0, margin + SPRITE_BUFFER - Math.min(0, PIRATSKIP_OFFSET_Y)); // 50+100 = 150
    const maxY = Math.min(høyde, høyde - margin - SPRITE_BUFFER - Math.max(0, PIRATSKIP_OFFSET_Y)); // høyde-170

    // Fallback: if screen is too small for safe bounds, use center of screen
    const safeMinX = Math.min(minX, bredde / 2);
    const safeMaxX = Math.max(maxX, bredde / 2);
    const safeMinY = Math.min(minY, høyde / 2);
    const safeMaxY = Math.max(maxY, høyde / 2);

    const posisjoner: ScenePosition[] = [];

    lag.map(async (l) => {
        const førstePosisjon = l.progresjon[0];

        if (førstePosisjon) {
            posisjoner.push({
                x: Math.min(Math.max(førstePosisjon.x, safeMinX), safeMaxX),
                y: Math.min(Math.max(førstePosisjon.y, safeMinY), safeMaxY),
            });
        } else {
            let bestePosisjon: ScenePosition = {
                x: tilfeldigInnenRekkevidde(safeMinX, safeMaxX),
                y: tilfeldigInnenRekkevidde(safeMinY, safeMaxY),
            };

            for (let forsøk = 0; forsøk < MAX_FORSØK; forsøk++) {
                const kandidat: ScenePosition = {
                    x: tilfeldigInnenRekkevidde(safeMinX, safeMaxX),
                    y: tilfeldigInnenRekkevidde(safeMinY, safeMaxY),
                };

                const overlapper = posisjoner.some((p) => regnUtDistanseMellomToPunkter(p, kandidat) < MIN_AVSTAND);

                if (!overlapper) {
                    bestePosisjon = kandidat;
                    break;
                }
            }

            posisjoner.push(bestePosisjon);
            await lagreFørstePosisjon(l.navn, førstePosisjon);
        }
    });

    return posisjoner;
};
