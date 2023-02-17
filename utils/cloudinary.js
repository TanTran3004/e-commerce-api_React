const cloudinary = require("cloudinary");
// Configuration
cloudinary.config({
  cloud_name: "dujnozd29",
  api_key: "381883725648811",
  api_secret: "sz3KFopYkxS3bgALifWtizEtEUE",
});

const cloudinaryUploadImg = async (fileToUploads) => {
  return new Promise(async (resolve) => {
    cloudinary.uploader.upload(fileToUploads, (result) => {
      resolve(
        {
          url: result.secure_url,
        },
        {
          resource_type: "auto",
        }
      );
    });
  });
};

module.exports = cloudinaryUploadImg;
