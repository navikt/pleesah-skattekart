export interface ScenePosition {
    x: number;
    y: number;
}

export interface PiratskipDrift {
    startX: number;
    startY: number;
    controlX: number;
    controlY: number;
    targetX: number;
    targetY: number;
    t: number;
    speed: number;
    currentX: number;
    currentY: number;
}

export interface Lag {
    navn: string;
    hexKode: string;
    progresjon: ScenePosition[];
}
