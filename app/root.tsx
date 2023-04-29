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

import type { Theme} from '@/components/theme';
import { ThemeProvider, ThemeScript, isTheme } from '@/components/theme';
import { parseTheme } from '@/lib/cookie.server';

import styles from './tailwind.css';

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
