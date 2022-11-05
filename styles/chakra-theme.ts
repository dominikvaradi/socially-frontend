import { extendTheme } from "@chakra-ui/react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config";

const tailwind = resolveConfig(tailwindConfig);

const config = {
    initialColorMode: "light",
    useSystemColorMode: false,
};

const theme = extendTheme({
    config: config,
    colors: tailwind.theme?.colors,
});

export default theme;
