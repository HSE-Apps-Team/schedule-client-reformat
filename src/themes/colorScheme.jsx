import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react"
// 2. Call `extendTheme` and pass your custom values

const colorScheme = extendTheme({
    colors: {
        colorScheme: {
            50: "var(--background)",
            100: "var(--background-secondary)",
            200: "var(--color-light)",
            300: "var(--color-light)",
            400: "var(--color-primary)",
            500: "var(--color-primary)",
            600: "var(--color-muted)",
            700: "var(--color-muted)",
            800: "var(--color-dark)",
            900: "var(--color-dark)",
        },
    },
},    
withDefaultColorScheme({ colorScheme: "colorScheme" }),
)

export default colorScheme