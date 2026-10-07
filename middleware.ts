import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLang, LOCALE_COOKIE, locales, type Lang } from "@/lib/i18n";

/**
 * Elige el idioma para una visita sin idioma en la URL: primero el que se
 * eligió con el botón (cookie) y, si no, el del navegador del visitante.
 */
function pickLocale(request: NextRequest): Lang {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  if (isLang(saved)) return saved;

  const header = request.headers.get("accept-language") ?? "";
  const preferred = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { tag: tag.toLowerCase(), q: q ? Number(q.trim().slice(2)) : 1 };
    })
    .filter(({ tag, q }) => tag && q > 0)
    .sort((a, b) => b.q - a.q);

  for (const { tag } of preferred) {
    const base = tag.split("-")[0];
    if (isLang(base)) return base;
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];
  if (locales.includes(first as Lang)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${pickLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Todo menos los archivos internos de Next y los de /public (los que tienen extensión).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
