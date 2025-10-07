import "@/styles/globals.scss";
import { Figtree } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import {
  saveScrollPosition,
  getScrollPosition,
  restoreScrollPosition,
} from "@/utils/scrollRestoration";

export const figtree = Figtree({
  variable: "--font-figtree",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isBack = useRef(false);

  useEffect(() => {
    // Save scroll position before route change
    const handleRouteChangeStart = () => {
      const url = router.asPath;
      saveScrollPosition(url, window.scrollY);
    };

    // Restore scroll position after route change
    const handleRouteChangeComplete = (url) => {
      if (isBack.current) {
        // Use setTimeout to ensure DOM is fully rendered
        setTimeout(() => {
          const savedPosition = getScrollPosition(url);
          if (savedPosition !== null) {
            window.scrollTo({
              top: savedPosition,
              behavior: "instant",
            });
          }
        }, 0);
      }
      isBack.current = false;
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.beforePopState(() => {
      isBack.current = true;
      return true;
    });

    // Cleanup
    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router]);

  return (
    <div>
      <style jsx global>{`
        html {
          font-family: ${figtree.style.fontFamily}, ui-sans-serif, system-ui,
            -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            "Helvetica Neue", Arial, "Noto Sans", sans-serif,
            "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
            "Noto Color Emoji";
        }
      `}</style>

      <Component {...pageProps} />
    </div>
  );
}
