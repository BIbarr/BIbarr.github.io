if (!self.define) {
  const e = (e) => {
      "require" !== e && (e += ".js");
      let i = Promise.resolve();
      return (
        c[e] ||
          (i = new Promise(async (i) => {
            if ("document" in self) {
              const c = document.createElement("script");
              (c.src = e), document.head.appendChild(c), (c.onload = i);
            } else importScripts(e), i();
          })),
        i.then(() => {
          if (!c[e]) throw new Error(`Module ${e} didn’t register its module`);
          return c[e];
        })
      );
    },
    i = (i, c) => {
      Promise.all(i.map(e)).then((e) => c(1 === e.length ? e[0] : e));
    },
    c = { require: Promise.resolve(i) };
  self.define = (i, r, f) => {
    c[i] ||
      (c[i] = Promise.resolve().then(() => {
        let c = {};
        const d = { uri: location.origin + i.slice(1) };
        return Promise.all(
          r.map((i) => {
            switch (i) {
              case "exports":
                return c;
              case "module":
                return d;
              default:
                return e(i);
            }
          })
        ).then((e) => {
          const i = f(...e);
          return c.default || (c.default = i), c;
        });
      }));
  };
}
define("./sw.js", ["./workbox-2b7abdc2"], function (e) {
  "use strict";
  self.addEventListener("message", (e) => {
    e.data && "SKIP_WAITING" === e.data.type && self.skipWaiting();
  }),
    e.precacheAndRoute(
      [
        { url: "css/home.css", revision: "d18a6cb182a07845f5255e3f365cfe83" },
        { url: "css/index.css", revision: "ab28e6683b8bda3cf7559cadfd5455ca" },
        { url: "css/meter.css", revision: "f0d17f6cffd5bf61e925715e26bf588e" },
        {
          url: "css/profile.css",
          revision: "25fc8acd8a23d47fe39dc20580820a3f",
        },
        {
          url: "css/registro.css",
          revision: "7ae30d0dbd8f162df42314c18d9f63d6",
        },
        {
          url: "favicon/android-chrome-192x192.png",
          revision: "ff4fc27cacfc121b9b7e263499c243d6",
        },
        {
          url: "favicon/android-chrome-512x512.png",
          revision: "4ce6aa4c36f12b0d7652c75d49ddcbb6",
        },
        {
          url: "favicon/apple-touch-icon.png",
          revision: "56b0a92bf1c918f9b63f0cffa3bd373e",
        },
        {
          url: "favicon/favicon-16x16.png",
          revision: "b63530980b786078575b6c538098525c",
        },
        {
          url: "favicon/favicon-32x32.png",
          revision: "90d3fc7b274fb283e556cfb8b4f4e7ae",
        },
        {
          url: "favicon/favicon.ico",
          revision: "4efa3501c2e5767e106261b05d0a681b",
        },
        {
          url: "font/flaticon.css",
          revision: "07ce7c4919a7008eff1d0ce200bf463a",
        },
        {
          url: "font/flaticon.eot",
          revision: "6592ead8b31d6dcab9d6de0dc9fa0930",
        },
        {
          url: "font/flaticon.html",
          revision: "8516d090cafded223d2e084fdd476626",
        },
        {
          url: "font/flaticon.scss",
          revision: "91c3ce78ddf863dd65d81bb67a9a1c18",
        },
        {
          url: "font/flaticon.svg",
          revision: "eeb65c63f27e4ebc1523012cf3b6393a",
        },
        {
          url: "font/flaticon.ttf",
          revision: "472dd078554d2e901a6e028719d67e0c",
        },
        {
          url: "font/flaticon.woff",
          revision: "0d275addac4cf69046bf35fc13b227b8",
        },
        {
          url: "font/flaticon.woff2",
          revision: "55b20735a1db5950cc5497d86306c8dc",
        },
        { url: "html/home.html", revision: "1b5ead448c3809d608009bff24b6e004" },
        {
          url: "html/meter.html",
          revision: "1e58b21d580b2cbcc1f20da33fd90cf4",
        },
        {
          url: "html/offline.html",
          revision: "fddde3cea302d227786aa8ac9e4ca703",
        },
        {
          url: "html/profile.html",
          revision: "4bbc2113247c24e15a3ae8197fa174a0",
        },
        {
          url: "html/registro.html",
          revision: "d1b1da8ad82bf2163c9f4d52a698c304",
        },
        {
          url: "img/Insignia1.png",
          revision: "4a8cee662fc475f9963584465fdd532a",
        },
        {
          url: "img/Insignia5.png",
          revision: "7a3a2882d685d06ad417b1d4b90bd7c3",
        },
        { url: "index.html", revision: "7a626a5dd4e4251846f10c3a16d33c27" },
        { url: "js/home.js", revision: "b387ddefd58fd82ad6ba17d8657dd0c7" },
        { url: "js/index.js", revision: "1def4d8223bfc673164024ce405ddc4d" },
        { url: "js/meter.js", revision: "5f366ed6961d1eacdda8c51893239363" },
        { url: "js/profile.js", revision: "2759bcc02eda1a43e409b18621571bf5" },
        { url: "js/registro.js", revision: "b87ba87ab09e464dec0b6664ba367518" },
        { url: "script.js", revision: "054b1413b7d4fbe70ab6e8406d16e6a0" },
        {
          url: "site.webmanifest",
          revision: "15389481f52526c498fb2bfb6667a890",
        },
      ],
      { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] }
    );
});
//# sourceMappingURL=sw.js.map
