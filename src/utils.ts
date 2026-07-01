import {
    CURVE_BULGE_MAX,
    CURVE_BULGE_MIN,
    MAX_RANDOM_DRIFT,
    PIRATSKIP_OFFSET_X,
    PIRATSKIP_OFFSET_Y,
    SPEED_MAX,
    SPEED_MIN,
} from "./consts.ts";
import { PiratskipDrift, ScenePosition } from "./types.ts";

export const tilfeldigInnenRekkevidde = (min: number, maks: number) => {
    return Math.random() * (maks - min) + min;
};

export const regnUtDistanseMellomToPunkter = (a: ScenePosition, b: ScenePosition) => {
    return Math.hypot(a.x - b.x, a.y - b.y);
};

export const bezierKurve = (t: number, p0: number, p1: number, p2: number) => {
    const inv = 1 - t;
    return inv * inv * p0 + 2 * inv * t * p1 + t * t * p2;
};

export const lagKontrollpunkt = (startX: number, startY: number, targetX: number, targetY: number): ScenePosition => {
    const midX = (startX + targetX) / 2;
    const midY = (startY + targetY) / 2;

    const dx = targetX - startX;
    const dy = targetY - startY;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;

    // Unit perpendicular vector
    const perpX = -dy / len;
    const perpY = dx / len;

    const bulge = tilfeldigInnenRekkevidde(CURVE_BULGE_MIN, CURVE_BULGE_MAX) * (Math.random() < 0.5 ? -1 : 1);

    return {
        x: midX + perpX * bulge,
        y: midY + perpY * bulge,
    };
};

export const lagNyDrift = (baseX: number, baseY: number, currentX: number, currentY: number): PiratskipDrift => {
    const targetX = baseX + PIRATSKIP_OFFSET_X + tilfeldigInnenRekkevidde(-MAX_RANDOM_DRIFT, MAX_RANDOM_DRIFT);
    const targetY = baseY + PIRATSKIP_OFFSET_Y + tilfeldigInnenRekkevidde(-MAX_RANDOM_DRIFT, MAX_RANDOM_DRIFT);
    const kontrollpunkt = lagKontrollpunkt(currentX, currentY, targetX, targetY);

    return {
        startX: currentX,
        startY: currentY,
        controlX: kontrollpunkt.x,
        controlY: kontrollpunkt.y,
        targetX,
        targetY,
        t: 0,
        speed: tilfeldigInnenRekkevidde(SPEED_MIN, SPEED_MAX),
        currentX,
        currentY,
    };
};
