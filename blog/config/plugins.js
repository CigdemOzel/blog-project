module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("STRAPI_CLOUDINARY_NAME"),
        api_key: env("STRAPI_CLOUDINARY_KEY"),
        api_secret: env("STRAPI_CLOUDINARY_SECRET"),
      },
    },
  },
});
