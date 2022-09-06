


const SIZES = {
  base: 8,
  small: 14,
  medium: 20,
  large: 24,
  extraLarge: 28,
  massive: 32
}

const TEXT = {
  base: 16,
  small: 20,
  medium: 30,
  large: 40,
  extraLarge: 50,
  massive: 60
}

type THEME_TYPE = {
  main: string,
  sub: string,
  black: string,
  white: string,
  light: string,
  gray: string,
  shadow: string,
  darker: string
}

const LIGHT_THEME = {
  main: "#2196F3",
  sub: "#90CAF9",
  black: "#000000",
  white: "#ffffff", 
  light: "#faf8f7",
  gray: "lightgray",
  shadow: "#E0E0E0",
  darker: "#1565C0"
}

const DARK_THEME = {
  main: "#0D47A1",
  sub: "#1E88E5",
  black: "#000000",
  white: "#ffffff",
  light: "#faf8f7",
  gray: "#9E9E9E",
  shadow: "#BBDEFB",
  darker: "#132036"
}

export { SIZES, LIGHT_THEME, DARK_THEME, TEXT, THEME_TYPE }