import { ScenePosition } from "../types.ts";

const tilfeldigInnenRekkevidde = (min: number, maks: number) => {
    return Math.random() * (maks - min) + min;
};

const regnUtDistanseMellomToPunkter = (a: ScenePosition, b: ScenePosition) => {
    return Math.hypot(a.x - b.x, a.y - b.y);
};

export const genererScenePosisjoner = (
    antall: number,
    bredde: number,
    høyde: number,
    minimumDistanseMellomPunkter: number,
    margin: number,
    maksForsøk: number,
): ScenePosition[] => {
    const posisjoner: ScenePosition[] = [];
    const forsøk = 0;

    while (posisjoner.length < antall && forsøk < maksForsøk) {
        const kandidat: ScenePosition = {
            x: tilfeldigInnenRekkevidde(margin, bredde - margin),
            y: tilfeldigInnenRekkevidde(margin, høyde - margin),
        };

        const overlapper = posisjoner.some(
            (eksisterende) => regnUtDistanseMellomToPunkter(kandidat, eksisterende) < minimumDistanseMellomPunkter,
        );

        if (!overlapper) posisjoner.push(kandidat);
    }

    while (posisjoner.length < antall) {
        posisjoner.push({
            x: tilfeldigInnenRekkevidde(margin, bredde - margin),
            y: tilfeldigInnenRekkevidde(margin, høyde - margin),
        });
    }

    return posisjoner;
};
