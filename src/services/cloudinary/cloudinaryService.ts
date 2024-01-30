import { v2 as cloudinary } from "cloudinary";

export const uploadImg = async (path: string, publicId: string | undefined) => {
  const result = await cloudinary.uploader.upload(
    path,
    {
      public_id: publicId && publicId,
    },
    function (error, result) {
      console.log(result);
    }
  );
  return result;
};
