import { HttpResponse, http } from "msw";

export const handlers = [
    http.get("/api/lag", () => {
        return HttpResponse.json({ lag: [] });
    }),
];
