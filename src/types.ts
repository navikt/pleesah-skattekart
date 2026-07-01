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

export interface AlleLagResponse {
    lag: Lag[];
}

export interface Lag {
    navn: string;
    hexKode: string;
    progresjon: Progresjon[];
}

export interface Progresjon {
    oppgave: Oppgave;
    status: "IKKE_PÅBEGYNT" | "GJENNOMFØRT";
    koordinat: {
        x: number;
        y: number;
    };
}

export enum Oppgave {
    OPPGAVE_1 = "OPPGAVE_1",
    OPPGAVE_2 = "OPPGAVE_2",
    OPPGAVE_3 = "OPPGAVE_3",
    OPPGAVE_4 = "OPPGAVE_4",
    OPPGAVE_5 = "OPPGAVE_5",
}
