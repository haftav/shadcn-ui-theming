import { useTheme } from '@/components/theme';
import { InjectStyles } from '@/components/inject-styles';

import { useColorStore } from '@/stores/color-store';
import { Input } from '@/ui/input';
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
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/ui/tabs';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/ui/card';

const BackgroundAndForeground = () => {
    const [theme] = useTheme();

    const setColor = useColorStore((store) => store.setColor);

    const backgroundLight = useColorStore((store) => store.light.background);
    const backgroundDark = useColorStore((store) => store.dark.background);

    const foregroundLight = useColorStore((store) => store.light.foreground);
    const foregroundDark = useColorStore((store) => store.dark.foreground);

    return (
        <div>
            <Label>Background</Label>
            <Input
                type="color"
                value={
                    theme === 'light'
                        ? backgroundLight.toHex()
                        : backgroundDark.toHex()
                }
                onChange={(e) => {
                    setColor(theme, 'background', e.target.value);
                }}
            />
            <Label>Foreground</Label>
            <Input
                type="color"
                value={
                    theme === 'light'
                        ? foregroundLight.toHex()
                        : foregroundDark.toHex()
                }
                onChange={(e) => setColor(theme, 'foreground', e.target.value)}
            />
            <InjectStyles
                themeVariables={{
                    '--background': {
                        light: backgroundLight,
                        dark: backgroundDark,
                    },
                    '--foreground': {
                        light: foregroundLight,
                        dark: foregroundDark,
                    },
                }}
            />
        </div>
    );
};

const Muted = () => {
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

    return (
        <div>
            <Label htmlFor="muted-background">Muted Background</Label>
            <Input
                id="muted-background"
                type="color"
                value={
                    theme === 'light' ? mutedLight.toHex() : mutedDark.toHex()
                }
                onChange={(e) => setColor(theme, 'muted', e.target.value)}
            />
            <Label>Muted Foreground</Label>
            <Input
                type="color"
                value={
                    theme === 'light'
                        ? mutedForegroundLight.toHex()
                        : mutedForegroundDark.toHex()
                }
                onChange={(e) =>
                    setColor(theme, 'mutedForeground', e.target.value)
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
            <InjectStyles
                themeVariables={{
                    '--muted': {
                        light: mutedLight,
                        dark: mutedDark,
                    },
                    '--muted-foreground': {
                        light: mutedForegroundLight,
                        dark: mutedForegroundDark,
                    },
                }}
            />
        </div>
    );
};

const CardTheme = () => {
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

    return (
        <div>
            <Label htmlFor="card-background">Card Background</Label>
            <Input
                id="card-background"
                type="color"
                value={theme === 'light' ? cardLight.toHex() : cardDark.toHex()}
                onChange={(e) => setColor(theme, 'card', e.target.value)}
            />
            <Label htmlFor="card-background">Card Foreground</Label>
            <Input
                id="card-foreground"
                type="color"
                value={
                    theme === 'light'
                        ? cardForegroundLight.toHex()
                        : cardForegroundDark.toHex()
                }
                onChange={(e) =>
                    setColor(theme, 'cardForeground', e.target.value)
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
            <InjectStyles
                themeVariables={{
                    '--card': {
                        light: cardLight,
                        dark: cardDark,
                    },
                    '--card-foreground': {
                        light: cardForegroundLight,
                        dark: cardForegroundDark,
                    },
                }}
            />
        </div>
    );
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
            <Separator className="my-8" />
            <BackgroundAndForeground />
            <Separator className="my-8" />
            <Muted />
            <Separator className="my-8" />
            <CardTheme />
        </div>
    );
}
