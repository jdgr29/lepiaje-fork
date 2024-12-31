'use server';

import { cookies } from 'next/headers';
import { Locale, defaultLocale } from '@/i18n/config';

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = 'NEXT_LOCALE';

export async function getUserLocale() {
    const cook = await cookies();
    const localeCookie = cook.get(COOKIE_NAME)?.value || defaultLocale;
    return localeCookie
}

export async function setUserLocale(locale: Locale) {
    const setLocaleCookie = await cookies();
    setLocaleCookie.set(COOKIE_NAME, locale)
}