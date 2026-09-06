import { FormattingOptionsType } from "types"

const arcangelOptions: FormattingOptionsType = {
  "^arcangel/": {
    maxLevel: 2,
  },
  "^arcangel/classes/arcangel\\.(Store*|Admin*)": {
    reflectionGroups: {
      Constructors: false,
    },
  },
}

export default arcangelOptions
