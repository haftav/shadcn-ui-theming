import { parse } from 'cookie';

export function parseTheme(cookies: string | null) {
    if (!cookies) {
        return null;
    }

    return parse(cookies).theme ?? null;
}
