import {
    CURVE_BULGE_MAX,
    CURVE_BULGE_MIN,
    MAX_RANDOM_DRIFT,
    PIRATSKIP_OFFSET_X,
    PIRATSKIP_OFFSET_Y,
    SCREEN_MARGIN,
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

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export const lagKontrollpunkt = (
    startX: number,
    startY: number,
    targetX: number,
    targetY: number,
    screenWidth: number,
    screenHeight: number,
): ScenePosition => {
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
        x: clamp(midX + perpX * bulge, SCREEN_MARGIN, screenWidth - SCREEN_MARGIN),
        y: clamp(midY + perpY * bulge, SCREEN_MARGIN, screenHeight - SCREEN_MARGIN),
    };
};

export const lagNyDrift = (
    baseX: number,
    baseY: number,
    currentX: number,
    currentY: number,
    screenWidth: number,
    screenHeight: number,
): PiratskipDrift => {
    const targetX = clamp(
        baseX + PIRATSKIP_OFFSET_X + tilfeldigInnenRekkevidde(-MAX_RANDOM_DRIFT, MAX_RANDOM_DRIFT),
        SCREEN_MARGIN,
        screenWidth - SCREEN_MARGIN,
    );
    const targetY = clamp(
        baseY + PIRATSKIP_OFFSET_Y + tilfeldigInnenRekkevidde(-MAX_RANDOM_DRIFT, MAX_RANDOM_DRIFT),
        SCREEN_MARGIN,
        screenHeight - SCREEN_MARGIN,
    );
    const kontrollpunkt = lagKontrollpunkt(currentX, currentY, targetX, targetY, screenWidth, screenHeight);

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
