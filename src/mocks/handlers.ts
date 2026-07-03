import { HttpResponse, http } from "msw";
import { Lag } from "../types.ts";

export const lagMock: Lag[] = [
    {
        navn: "Pelle",
        hexKode: "#FF0000",
        progresjon: [
            { x: 150, y: 150 },
            { x: 200, y: 200 },
            { x: 300, y: 100 },
        ],
    },
    {
        navn: "Kari",
        hexKode: "#00FF00",
        progresjon: [
            { x: 400, y: 400 },
            { x: 250, y: 250 },
            { x: 350, y: 150 },
        ],
    },
    {
        navn: "Ola",
        hexKode: "#0000FF",
        progresjon: [],
    },
];

export const handlers = [
    http.get("/api/alle-lag", () => {
        return HttpResponse.json(lagMock);
    }),
    http.post("/api/lag/:lagnavn/progresjon", () => {
        return HttpResponse.json(null, { status: 200 });
    }),
];
