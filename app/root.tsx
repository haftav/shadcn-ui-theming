import type { LinksFunction, MetaFunction, LoaderArgs } from '@remix-run/node';

import { json } from '@remix-run/node';
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
} from '@remix-run/react';

import type { Theme } from '@/components/theme';
import { ThemeProvider, ThemeScript, isTheme } from '@/components/theme';
import { parseTheme } from '@/lib/cookie.server';

import styles from './tailwind.css';
import { useColorStore } from './stores/color-store';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'Classical Stack',
    viewport: 'width=device-width,initial-scale=1',
});

export async function loader({ request }: LoaderArgs) {
    const cookies = request.headers.get('Cookie');
    const themeData = parseTheme(cookies);

    const theme: Theme = themeData && isTheme(themeData) ? themeData : 'system';

    return json({
        theme,
    });
}

export default function App() {
    const { theme } = useLoaderData<typeof loader>();

    return (
        <html
            lang="en"
            className={theme === 'dark' ? 'dark' : ''}
            suppressHydrationWarning
        >
            <head>
                <ThemeScript initialTheme={theme} />
                <Meta />
                <Links />
                <style>
                    {`
html {
    --background: 0 0% 100%;
    --foreground: 222.2 47.4% 11.2%;
 
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 222.2 47.4% 11.2%;
 
    --card: 0 0% 100%;
    --card-foreground: 222.2 47.4% 11.2%;
 
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
 
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
 
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
 
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
 
    --destructive: 0 100% 50%;
    --destructive-foreground: 210 40% 98%;
 
    --ring: 215 20.2% 65.1%;
 
    --radius: 0.5rem;
}
 
.dark {
    --background: 224 71% 4%;
    --foreground: 213 31% 91%;
 
    --muted: 223 47% 11%;
    --muted-foreground: 215.4 16.3% 56.9%;
 
    --popover: 224 71% 4%;
    --popover-foreground: 215 20.2% 65.1%;
 
    --card: 0 0% 100%;
    --card-foreground: 222.2 47.4% 11.2%;
 
    --border: 216 34% 17%;
    --input: 216 34% 17%;
 
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 1.2%;
 
    --secondary: 222.2 47.4% 11.2%;
    --secondary-foreground: 210 40% 98%;
 
    --accent: 216 34% 17%;
    --accent-foreground: 210 40% 98%;
 
    --destructive: 0 63% 31%;
    --destructive-foreground: 210 40% 98%;
 
    --ring: 216 34% 17%;
 
    --radius: 0.5rem;
}
`}
                </style>
            </head>
            <body>
                <ThemeProvider value={theme}>
                    <Outlet />
                </ThemeProvider>
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
