import { ScenePosition } from "./types.ts";

export const tilfeldigInnenRekkevidde = (min: number, maks: number) => {
    return Math.random() * (maks - min) + min;
};

export const regnUtDistanseMellomToPunkter = (a: ScenePosition, b: ScenePosition) => {
    return Math.hypot(a.x - b.x, a.y - b.y);
};
