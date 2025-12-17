if (!self.define) {
  let e,
    s = {};
  const a = (a, t) => (
    (a = new URL(a + ".js", t).href),
    s[a] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = a), (e.onload = s), document.head.appendChild(e);
        } else (e = a), importScripts(a), s();
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (t, i) => {
    const n =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[n]) return;
    let c = {};
    const r = (e) => a(e, n),
      d = { module: { uri: n }, exports: c, require: r };
    s[n] = Promise.all(t.map((e) => d[e] || r(e))).then((e) => (i(...e), c));
  };
}
define(["./workbox-f1770938"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: "/Peerlist.svg", revision: "064651f55bd3ec9e4037a02e923a4dc9" },
        {
          url: "/_next/static/chunks/212-a7578df9608a83da.js",
          revision: "jbt3d2-V2dkybUeaeLi6j",
        },
        {
          url: "/_next/static/chunks/4bd1b696-909a567029ac2082.js",
          revision: "jbt3d2-V2dkybUeaeLi6j",
        },
        {
          url: "/_next/static/chunks/63-a74822dc16caca87.js",
          revision: "jbt3d2-V2dkybUeaeLi6j",
        },
        {
          url: "/_next/static/chunks/721-421c640fe8d7f6a9.js",
          revision: "jbt3d2-V2dkybUeaeLi6j",
        },
        {
          url: "/_next/static/chunks/874-d838538b6160b8c4.js",
          revision: "jbt3d2-V2dkybUeaeLi6j",
        },
        {
          url: "/_next/static/chunks/app/(home)/layout-bd04c94ae7608d23.js",
          revision: "jbt3d2-V2dkybUeaeLi6j",
        },
        {
          url: "/_next/static/chunks/app/(home)/page-9bbb52bb4ac8b291.js",
          revision: "jbt3d2-V2dkybUeaeLi6j",
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-c939a96901c33267.js",
          revision: "jbt3d2-V2dkybUeaeLi6j",
        },
        {
          url: "/_next/static/chunks/app/blog/%5B...slug%5D/page-4a72d73b036e4a4c.js",
          revision: "jbt3d2-V2dkybUeaeLi6j",
        },
        {
          url: "/_next/static/chunks/app/blog/%5Bslug%5D/page-43d11d1d616bee6e.js",
          revision: "jbt3d2-V2dkybUeaeLi6j",
        },
        {
          url: "/_next/static/chunks/app/blog/layout-3f2f6f3fd26e25fc.js",
          revision: "jbt3d2-V2dkybUeaeLi6j",
        },
        {
          url: "/_next/static/chunks/app/blog/page-e83547c8b139f0fd.js",
          revision: "jbt3d2-V2dkybUeaeLi6j",
        },
        {
          url: "/_next/static/chunks/app/experience/layout-949ca76874bf16c0.js",
          revision: "jbt3d2-V2dkybUeaeLi6j",
        },
        {
          url: "/_next/static/chunks/app/experience/page-deeb09be63697e42.js",
          revision: "jbt3d2-V2dkybUeaeLi6j",
        },
        {
          url: "/_next/static/chunks/app/layout-d2b1541b065464da.js",
          revision: "jbt3d2-V2dkybUeaeLi6j",
        },
        {
          url: "/_next/static/chunks/app/manifest.webmanifest/route-d96e98d79044ab7b.js",
          revision: "jbt3d2-V2dkybUeaeLi6j",
        },
        {
          url: "/_next/static/chunks/app/not-found-60d70e2edfe0db91.js",
          revision: "jbt3d2-V2dkybUeaeLi6j",
        },
        {
          url: "/_next/static/chunks/app/projects/layout-850b05b95118bfb9.js",
          revision: "jbt3d2-V2dkybUeaeLi6j",
        },
        {
          url: "/_next/static/chunks/app/projects/page-d1eb024e5f110e90.js",
          revision: "jbt3d2-V2dkybUeaeLi6j",
        },
        {
          url: "/_next/static/chunks/app/resume/layout-79fdfb1460a76971.js",
          revision: "jbt3d2-V2dkybUeaeLi6j",
        },
        {
          url: "/_next/static/chunks/app/resume/page-6e5f581f729588d1.js",
          revision: "jbt3d2-V2dkybUeaeLi6j",
        },
        {
          url: "/_next/static/chunks/app/robots.txt/route-ebeb0a033341c956.js",
          revision: "jbt3d2-V2dkybUeaeLi6j",
        },
        {
          url: "/_next/static/chunks/framework-f593a28cde54158e.js",
          revision: "jbt3d2-V2dkybUeaeLi6j",
        },
        {
          url: "/_next/static/chunks/main-0a26aed6860bcd7e.js",
          revision: "jbt3d2-V2dkybUeaeLi6j",
        },
        {
          url: "/_next/static/chunks/main-app-6d01a60f9c0f13cc.js",
          revision: "jbt3d2-V2dkybUeaeLi6j",
        },
        {
          url: "/_next/static/chunks/pages/_app-da15c11dea942c36.js",
          revision: "jbt3d2-V2dkybUeaeLi6j",
        },
        {
          url: "/_next/static/chunks/pages/_error-cc3f077a18ea1793.js",
          revision: "jbt3d2-V2dkybUeaeLi6j",
        },
        {
          url: "/_next/static/chunks/polyfills-42372ed130431b0a.js",
          revision: "846118c33b2c0e922d7b3a7676f81f6f",
        },
        {
          url: "/_next/static/chunks/webpack-ee37390d73aea060.js",
          revision: "jbt3d2-V2dkybUeaeLi6j",
        },
        {
          url: "/_next/static/css/459cf66e253ff2b9.css",
          revision: "459cf66e253ff2b9",
        },
        {
          url: "/_next/static/css/f0f9a06170929e00.css",
          revision: "f0f9a06170929e00",
        },
        {
          url: "/_next/static/jbt3d2-V2dkybUeaeLi6j/_buildManifest.js",
          revision: "5afa8211dc2a10d7e72ad2466d2f726f",
        },
        {
          url: "/_next/static/jbt3d2-V2dkybUeaeLi6j/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/_next/static/media/2abeb75a5e332dc3-s.p.woff2",
          revision: "89c1a154a5d90a8447afe6ee26a2f453",
        },
        {
          url: "/_next/static/media/45cf6616ee386f2d-s.woff2",
          revision: "70802a651b042044b4ab5b435b6de303",
        },
        {
          url: "/_next/static/media/5b01f339abf2f1a5.p.woff2",
          revision: "c36289c8eb40b089247060459534962c",
        },
        {
          url: "/_next/static/media/Peerlist.2a856f02.svg",
          revision: "064651f55bd3ec9e4037a02e923a4dc9",
        },
        { url: "/file.svg", revision: "d09f95206c3fa0bb9bd9fefabfd0ea71" },
        { url: "/globe.svg", revision: "2aaafa6a49b6563925fe440891e32717" },
        { url: "/icon.png", revision: "899f62aa2315496ad569486a31ebc0fa" },
        { url: "/next.svg", revision: "8e061864f388b47f33a1c3780831193e" },
        { url: "/og-image.jpg", revision: "990039f8c250315ef6352ef714c6b667" },
        {
          url: "/swe-worker-5c72df51bb1f6ee0.js",
          revision: "5a47d90db13bb1309b25bdf7b363570e",
        },
        { url: "/vercel.svg", revision: "c0af2f507b369b085b35ef4bbe3bcf1e" },
        { url: "/window.svg", revision: "a2760511c65806022ad20adf74370ff3" },
      ],
      { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: function (e) {
              return _ref.apply(this, arguments);
            },
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 2592e3 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/static.+\.js$/i,
      new e.CacheFirst({
        cacheName: "next-static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4|webm)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 48, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      function (e) {
        var s = e.sameOrigin,
          a = e.url.pathname;
        return !(
          !s ||
          a.startsWith("/api/auth/callback") ||
          !a.startsWith("/api/")
        );
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      function (e) {
        var s = e.request,
          a = e.url.pathname,
          t = e.sameOrigin;
        return (
          "1" === s.headers.get("RSC") &&
          "1" === s.headers.get("Next-Router-Prefetch") &&
          t &&
          !a.startsWith("/api/")
        );
      },
      new e.NetworkFirst({
        cacheName: "pages-rsc-prefetch",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      function (e) {
        var s = e.request,
          a = e.url.pathname,
          t = e.sameOrigin;
        return "1" === s.headers.get("RSC") && t && !a.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "pages-rsc",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      function (e) {
        var s = e.url.pathname;
        return e.sameOrigin && !s.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "pages",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      function (e) {
        return !e.sameOrigin;
      },
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET"
    );
});
