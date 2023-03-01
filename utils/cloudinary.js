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
          asset_id: result.asset_id,
          public_id: result.public_id,
        },
        {
          resource_type: "auto",
        }
      );
    });
  });
};

const cloudinaryDeleteImg = async (fileToDelete) => {
  const deleteResult = await cloudinary.uploader.destroy(fileToDelete, {
    resource_type: "auto",
  });

  return {
    url: deleteResult.secure_url,
    asset_id: deleteResult.asset_id,
    public_id: deleteResult.public_id,
  };
};

module.exports = { cloudinaryUploadImg, cloudinaryDeleteImg };
