import { Lag, ScenePosition } from "../types.ts";
import { tilfeldigInnenRekkevidde } from "../utils.ts";

// TODO: Hvis progresjon liste fra backend er tom, finn et sted å plasser første posisjon for øya og post kordinatene til backend

export const genererScenePosisjoner = (lag: Lag[], bredde: number, høyde: number, margin: number): ScenePosition[] => {
    return lag.map((l) => {
        const førstePosisjon = l.progresjon[0] ?? {
            x: tilfeldigInnenRekkevidde(margin, bredde - margin),
            y: tilfeldigInnenRekkevidde(margin, høyde - margin),
        };

        return {
            x: Math.min(Math.max(førstePosisjon.x, margin), bredde - margin),
            y: Math.min(Math.max(førstePosisjon.y, margin), høyde - margin),
        };
    });
};
