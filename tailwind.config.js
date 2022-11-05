/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./flows/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                brand: {
                    50: "var(--chakra-colors-blue-50)",
                    100: "var(--chakra-colors-blue-100)",
                    200: "var(--chakra-colors-blue-200)",
                    300: "var(--chakra-colors-blue-300)",
                    400: "var(--chakra-colors-blue-400)",
                    500: "var(--chakra-colors-blue-500)",
                    600: "var(--chakra-colors-blue-600)",
                    700: "var(--chakra-colors-blue-700)",
                    800: "var(--chakra-colors-blue-800)",
                    900: "var(--chakra-colors-blue-900)",
                },
            },
        },
    },
    plugins: [],
};
