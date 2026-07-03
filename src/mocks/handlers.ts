import { HttpResponse, http } from "msw";

export const lagMock = [
    {
        navn: "Pelle",
        hexKode: "FF0000",
        progresjon: ["150,150", "200,200", "300,100"],
    },
    {
        navn: "Kari",
        hexKode: "00FF00",
        progresjon: ["400,400", "250,250", "350,150"],
    },
    {
        navn: "Ola",
        hexKode: "0000FF",
        progresjon: [],
    },
];

export const handlers = [
    http.get("/api/v1/teams", () => {
        return HttpResponse.json(lagMock);
    }),
    http.post("/api/v1/team/:lagnavn/progression", async ({ request }) => {
        const body = await request.json();
        return HttpResponse.json(body, { status: 200 });
    }),
];
