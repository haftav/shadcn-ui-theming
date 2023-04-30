import { create } from 'zustand';
import tinycolor from 'tinycolor2';

export class Color {
    value: tinycolor.Instance;

    static fromHex(hex: string): Color {
        return new Color(hex);
    }

    static fromHSL(hsl: string): Color {
        return new Color(hsl);
    }

    static fromString(value: string): Color {
        return new Color(value);
    }

    constructor(hex: string) {
        this.value = tinycolor(hex);
    }

    toHex(): string {
        return this.value.toHexString();
    }

    toHSL(): string {
        const { h, s, l } = this.value.toHsl();

        const sNormalized = Math.min(s * 100, 100);
        const lNormalized = Math.min(l * 100, 100);

        return `${h} ${sNormalized}% ${lNormalized}%`;
    }
}

interface ColorTheme {
    background: Color;
    foreground: Color;
    muted: Color;
    mutedForeground: Color;
    popover: Color;
    popoverForeground: Color;
    card: Color;
    cardForeground: Color;
    border: Color;
    input: Color;
    primary: Color;
    primaryForeground: Color;
    secondary: Color;
    secondaryForeground: Color;
    accent: Color;
    accentForeground: Color;
    destructive: Color;
    destructiveForeground: Color;
    ring: Color;
}

const initialLightColors: ColorTheme = {
    background: Color.fromHSL('hsl(0 0% 100%)'),
    foreground: Color.fromHSL('hsl(222.2 47.4% 11.2%)'),
    muted: Color.fromHSL('hsl(210 40% 96.1%)'),
    mutedForeground: Color.fromHSL('hsl(215.4 16.3% 46.9%)'),
    popover: Color.fromHSL('hsl(0 0% 100%)'),
    popoverForeground: Color.fromHSL('hsl(222.2 47.4% 11.2%)'),
    card: Color.fromHSL('hsl(0 0% 100%)'),
    cardForeground: Color.fromHSL('hsl(222.2 47.4% 11.2%)'),
    border: Color.fromHSL('hsl(214.3 31.8% 91.4%)'),
    input: Color.fromHSL('hsl(214.3 31.8% 91.4%)'),
    primary: Color.fromHSL('hsl(222.2 47.4% 11.2%)'),
    primaryForeground: Color.fromHSL('hsl(210 40% 98%)'),
    secondary: Color.fromHSL('hsl(210 40% 96.1%)'),
    secondaryForeground: Color.fromHSL('hsl(222.2 47.4% 11.2%)'),
    accent: Color.fromHSL('hsl(210 40% 96.1%)'),
    accentForeground: Color.fromHSL('hsl(222.2 47.4% 11.2%)'),
    destructive: Color.fromHSL('hsl(0 100% 50%)'),
    destructiveForeground: Color.fromHSL('hsl(210 40% 98%)'),
    ring: Color.fromHSL('hsl(215 20.2% 65.1%)'),
};

const initialDarkColors: ColorTheme = {
    background: Color.fromHSL('hsl(0 0% 100%)'),
    foreground: Color.fromHSL('hsl(222.2 47.4% 11.2%)'),
    muted: Color.fromHSL('hsl(210 40% 96.1%)'),
    mutedForeground: Color.fromHSL('hsl(215.4 16.3% 46.9%)'),
    popover: Color.fromHSL('hsl(0 0% 100%)'),
    popoverForeground: Color.fromHSL('hsl(222.2 47.4% 11.2%)'),
    card: Color.fromHSL('hsl(0 0% 100%)'),
    cardForeground: Color.fromHSL('hsl(222.2 47.4% 11.2%)'),
    border: Color.fromHSL('hsl(214.3 31.8% 91.4%)'),
    input: Color.fromHSL('hsl(214.3 31.8% 91.4%)'),
    primary: Color.fromHSL('hsl(222.2 47.4% 11.2%)'),
    primaryForeground: Color.fromHSL('hsl(210 40% 98%)'),
    secondary: Color.fromHSL('hsl(210 40% 96.1%)'),
    secondaryForeground: Color.fromHSL('hsl(222.2 47.4% 11.2%)'),
    accent: Color.fromHSL('hsl(210 40% 96.1%)'),
    accentForeground: Color.fromHSL('hsl(222.2 47.4% 11.2%)'),
    destructive: Color.fromHSL('hsl(0 100% 50%)'),
    destructiveForeground: Color.fromHSL('hsl(210 40% 98%)'),
    ring: Color.fromHSL('hsl(215 20.2% 65.1%)'),
};

interface ColorStoreState {
    light: ColorTheme;
    dark: ColorTheme;
    setColor: (
        theme: 'light' | 'dark',
        newColor: keyof ColorTheme,
        value: string
    ) => void;
}

export const useColorStore = create<ColorStoreState>((set) => ({
    light: initialLightColors,
    dark: initialDarkColors,
    setColor: (
        theme: 'light' | 'dark',
        newColor: keyof ColorTheme,
        value: string
    ) =>
        set((state) => ({
            [theme]: { ...state[theme], [newColor]: Color.fromString(value) },
        })),
}));
