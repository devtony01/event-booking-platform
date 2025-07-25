import type { Config } from "tailwindcss"

import plugin from "./plugin"

const preset = {
    content: [],
    plugins: [plugin],
} satisfies Config

export { preset }