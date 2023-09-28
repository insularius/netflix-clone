/** @type {import('next').NextConfig} */
const nextConfig = {};
// module.exports = {
//   images: {
//     domains: [
//       "assets.nflxext.com",
//       "avatars.mds.yandex.net",
//       "n1s2.hsmedia.ru",
//       "myshows.me",
//       "m.media-amazon.com",
//       "www.spieltimes.com",
//       "static.independent.co.uk",
//       "wallpapercave.com",
//       "minhaseriefavorita.com",
//       "images.frandroid.com",
//     ],
//   },
// };

module.exports = {
  images: {
    domains: ["example.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "kz"],
  },
};
