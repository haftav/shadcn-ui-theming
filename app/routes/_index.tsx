import * as React from 'react';
import { useTheme } from '@/components/theme';

import { Color, useColorStore } from '@/stores/color-store';
import { Label } from '@/ui/label';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectItem,
    SelectContent,
} from '@/ui/select';
import { Separator } from '@/ui/separator';
import { Skeleton } from '@/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@/ui/tabs';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/ui/card';
import { ColorPicker } from '@/components/color-picker';
import { Button } from '@/ui/button';

function useSyncThemeVariable(
    variableName: string,
    theme: 'light' | 'dark',
    lightColor: Color,
    darkColor: Color
) {
    React.useEffect(() => {
        const rootLight = document.querySelector(':root') as HTMLElement;
        const rootDark = document.querySelector('.dark') as HTMLElement;

        if (theme === 'light') {
            if (rootLight) {
                rootLight.style.setProperty(variableName, lightColor.toHSL());
            }
        } else {
            if (rootDark) {
                rootDark.style.setProperty(variableName, darkColor.toHSL());
            }
        }

        // value of variableName should never change
        // eslint-disable-next-line
    }, [theme, lightColor, darkColor]);
}

const BackgroundAndForegroundThemes = () => {
    const [theme] = useTheme();

    const setColor = useColorStore((store) => store.setColor);

    const backgroundLight = useColorStore((store) => store.light.background);
    const backgroundDark = useColorStore((store) => store.dark.background);

    const foregroundLight = useColorStore((store) => store.light.foreground);
    const foregroundDark = useColorStore((store) => store.dark.foreground);

    useSyncThemeVariable(
        '--background',
        theme,
        backgroundLight,
        backgroundDark
    );
    useSyncThemeVariable(
        '--foreground',
        theme,
        foregroundLight,
        foregroundDark
    );

    return (
        <div>
            <Label htmlFor="background">Background</Label>
            <ColorPicker
                id="background"
                value={theme === 'light' ? backgroundLight : backgroundDark}
                onChange={(newColor) => {
                    setColor(theme, 'background', newColor);
                }}
            />
            <Label htmlFor="foreground">Foreground</Label>
            <ColorPicker
                id="foreground"
                value={theme === 'light' ? foregroundLight : foregroundDark}
                onChange={(newColor) => setColor(theme, 'foreground', newColor)}
            />
        </div>
    );
};

const MutedThemes = () => {
    const [theme] = useTheme();

    const setColor = useColorStore((store) => store.setColor);

    const mutedLight = useColorStore((store) => store.light.muted);
    const mutedDark = useColorStore((store) => store.dark.muted);

    const mutedForegroundLight = useColorStore(
        (store) => store.light.mutedForeground
    );
    const mutedForegroundDark = useColorStore(
        (store) => store.dark.mutedForeground
    );

    useSyncThemeVariable('--muted', theme, mutedLight, mutedDark);
    useSyncThemeVariable(
        '--muted-foreground',
        theme,
        mutedForegroundLight,
        mutedForegroundDark
    );

    return (
        <div>
            <Label htmlFor="muted-background">Muted Background</Label>
            <ColorPicker
                id="muted-background"
                value={theme === 'light' ? mutedLight : mutedDark}
                onChange={(newColor) => setColor(theme, 'muted', newColor)}
            />
            <Label>Muted Foreground</Label>
            <ColorPicker
                value={
                    theme === 'light'
                        ? mutedForegroundLight
                        : mutedForegroundDark
                }
                onChange={(newColor) =>
                    setColor(theme, 'mutedForeground', newColor)
                }
            />
            <div>Tabs example</div>
            <Tabs defaultValue="account">
                <TabsList>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>
            </Tabs>
            <div>Skeleton example</div>
            <Skeleton className="w-full mb-2 h-6" />
            <Skeleton className="w-full mb-2 h-6" />
            <Skeleton className="w-full h-6" />
        </div>
    );
};

const CardThemes = () => {
    const [theme] = useTheme();

    const setColor = useColorStore((store) => store.setColor);

    const cardLight = useColorStore((store) => store.light.card);
    const cardDark = useColorStore((store) => store.dark.card);

    const cardForegroundLight = useColorStore(
        (store) => store.light.cardForeground
    );
    const cardForegroundDark = useColorStore(
        (store) => store.dark.cardForeground
    );

    useSyncThemeVariable('--card', theme, cardLight, cardDark);
    useSyncThemeVariable(
        '--card-foreground',
        theme,
        cardForegroundLight,
        cardForegroundDark
    );

    return (
        <div>
            <Label htmlFor="card-background">Card Background</Label>
            <ColorPicker
                id="card-background"
                value={theme === 'light' ? cardLight : cardDark}
                onChange={(newColor) => setColor(theme, 'card', newColor)}
            />
            <Label htmlFor="card-background">Card Foreground</Label>
            <ColorPicker
                id="card-foreground"
                value={
                    theme === 'light' ? cardForegroundLight : cardForegroundDark
                }
                onChange={(newColor) =>
                    setColor(theme, 'cardForeground', newColor)
                }
            />
            <Card>
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card description</CardDescription>
                </CardHeader>
                <CardContent>I am the content of the card.</CardContent>
                <CardFooter>I am the footer</CardFooter>
            </Card>
        </div>
    );
};

const BorderThemes = () => {
    const [theme] = useTheme();

    const setColor = useColorStore((store) => store.setColor);

    const borderLight = useColorStore((store) => store.light.border);
    const borderDark = useColorStore((store) => store.dark.border);

    useSyncThemeVariable('--border', theme, borderLight, borderDark);

    return (
        <div>
            <Label>Border color</Label>
            <ColorPicker
                value={theme === 'light' ? borderLight : borderDark}
                onChange={(newValue) => setColor(theme, 'border', newValue)}
            />
        </div>
    );
};

const InputThemes = () => {
    const [theme] = useTheme();

    const setColor = useColorStore((store) => store.setColor);

    const inputLight = useColorStore((store) => store.light.input);
    const inputDark = useColorStore((store) => store.dark.input);

    useSyncThemeVariable('--input', theme, inputLight, inputDark);

    return (
        <div>
            <Label>Input border color</Label>
            <ColorPicker
                value={theme === 'light' ? inputLight : inputDark}
                onChange={(newValue) => setColor(theme, 'input', newValue)}
            />
        </div>
    );
};

const PrimaryButtonThemes = () => {
    const [theme] = useTheme();

    const setColor = useColorStore((store) => store.setColor);

    const primaryLight = useColorStore((store) => store.light.primary);
    const primaryDark = useColorStore((store) => store.dark.primary);

    const primaryForegroundLight = useColorStore(
        (store) => store.light.primaryForeground
    );
    const primaryForegroundDark = useColorStore(
        (store) => store.dark.primaryForeground
    );

    useSyncThemeVariable('--primary', theme, primaryLight, primaryDark);
    useSyncThemeVariable(
        '--primary-foreground',
        theme,
        primaryForegroundLight,
        primaryForegroundDark
    );

    return (
        <div>
            <Label>Primary button background</Label>
            <ColorPicker
                value={theme === 'light' ? primaryLight : primaryDark}
                onChange={(newValue) => setColor(theme, 'primary', newValue)}
            />
            <Label>Primary button foreground</Label>
            <ColorPicker
                value={
                    theme === 'light'
                        ? primaryForegroundLight
                        : primaryForegroundDark
                }
                onChange={(newValue) =>
                    setColor(theme, 'primaryForeground', newValue)
                }
            />
            <Button>Primary Button</Button>
        </div>
    );
};

const AccentThemes = () => {
    const [theme] = useTheme();

    const setColor = useColorStore((store) => store.setColor);
    return (
        <div>
            <Label>Border color</Label>
            <ColorPicker
                value={theme === 'light' ? borderLight : borderDark}
                onChange={(newValue) => setColor(theme, 'border', newValue)}
            />
        </div>
    );
};

const DestructiveActionThemes = () => {
    const [theme] = useTheme();

    const setColor = useColorStore((store) => store.setColor);
    return (
        <div>
            <Label>Border color</Label>
            <ColorPicker
                value={theme === 'light' ? borderLight : borderDark}
                onChange={(newValue) => setColor(theme, 'border', newValue)}
            />
        </div>
    );
};

const FocusThemes = () => {
    const [theme] = useTheme();

    const setColor = useColorStore((store) => store.setColor);
    return (
        <div>
            <Label>Border color</Label>
            <ColorPicker
                value={theme === 'light' ? borderLight : borderDark}
                onChange={(newValue) => setColor(theme, 'border', newValue)}
            />
        </div>
    );
};

const BorderRadiusTheme = () => {
    const [theme] = useTheme();

    const setColor = useColorStore((store) => store.setColor);
    return <div></div>;
};

export default function Index() {
    const [theme, setTheme] = useTheme();

    return (
        <div className="bg-background container pt-8 pb-8 m-auto">
            <h1 className="text-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Shadcn UI
            </h1>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                Customize your theme
            </h2>
            <p>Use the color pickers below to customize your theme.</p>
            <p>Change between dark/lighttheme options using the toggle.</p>
            <p>
                When you're ready, copy the stylesheet and add to your own
                project!
            </p>
            <Separator className="my-8" />
            <Label htmlFor="toggle-theme">Theme</Label>
            <Select
                value={theme}
                onValueChange={(newValue) =>
                    setTheme(newValue as 'light' | 'dark')
                }
            >
                <SelectTrigger id="toggle-theme">
                    <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                </SelectContent>
            </Select>
            <Separator />
            <BackgroundAndForegroundThemes />
            <Separator />
            <MutedThemes />
            <Separator />
            <CardThemes />
            <Separator />
            <BorderThemes />
            <Separator />
            <InputThemes />
            <Separator />
            <PrimaryButtonThemes />
        </div>
    );
}
