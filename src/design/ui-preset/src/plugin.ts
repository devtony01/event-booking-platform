import plugin from "tailwindcss/plugin"
import { FONT_FAMILY_SANS } from "./constants";
import { theme } from "./theme/extension/theme"
import { colors } from "./theme/token/colors"
import { typography } from "./theme/token/typography"


export default plugin(
  function Ui({ addBase, addComponents }) {

  addComponents(typography)

  addBase({
    ":root": { ...colors.light },
  })
},
{
  theme: {
    extend: {
      ...theme.extend,
      fontFamily: {
        sans: FONT_FAMILY_SANS
      }
    }
  }
}
);
