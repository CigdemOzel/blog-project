module.exports = ({ env }) => [
  "strapi::errors",
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      origin: ["https://blog-project-bice-iota.vercel.app"],
      headers: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    },
  },
  "strapi::security",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
