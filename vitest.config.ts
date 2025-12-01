import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        reporters: ["default", "html"],
        coverage: {
            enabled: true,
            provider: "v8", // or 'istanbul'
            include: ["src/**/*.js"],
        },
    },
});
