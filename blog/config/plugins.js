module.exports = {
  upload: {
    config: {
      provider: "@strapi/provider-upload-cloudinary",
      providerOptions: {
        cloud_name: process.env.STRAPI_CLOUDINARY_NAME,
        api_key: process.env.STRAPI_CLOUDINARY_KEY,
        api_secret: process.env.STRAPI_CLOUDINARY_SECRET,
      },
    },
  },
};
