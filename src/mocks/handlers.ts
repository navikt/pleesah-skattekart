import { HttpResponse, http } from "msw";

export const handlers = [
    http.get("/api/alle-lag", () => {
        return HttpResponse.json({ lag: [] });
    }),
];
