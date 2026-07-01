import { extend } from "@pixi/react";
import { Graphics } from "pixi.js";
import { useCallback } from "react";
import { DASH_LENGTH, GAP_LENGTH, LINE_ALPHA, LINE_COLOR, LINE_WIDTH } from "../consts.ts";
import { ScenePosition } from "../types.ts";

extend({ Graphics });

export const PiratskipTrail = ({ trail }: { trail: ScenePosition[] }) => {
    const draw = useCallback(
        (graphics: Graphics) => {
            graphics.clear();

            if (trail.length < 2) return;

            for (let index = 0; index < trail.length - 1; index++) {
                const start = trail[index];
                const end = trail[index + 1];
                const dx = end.x - start.x;
                const dy = end.y - start.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance === 0) continue;

                const unitX = dx / distance;
                const unitY = dy / distance;
                let currentDistance = 0;

                while (currentDistance < distance) {
                    const dashStart = currentDistance;
                    const dashEnd = Math.min(currentDistance + DASH_LENGTH, distance);

                    graphics.moveTo(start.x + unitX * dashStart, start.y + unitY * dashStart);
                    graphics.lineTo(start.x + unitX * dashEnd, start.y + unitY * dashEnd);

                    currentDistance += DASH_LENGTH + GAP_LENGTH;
                }
            }

            graphics.stroke({ width: LINE_WIDTH, color: LINE_COLOR, alpha: LINE_ALPHA });
        },
        [trail],
    );

    return <pixiGraphics draw={draw} />;
};
