import { v2 as cloudinary } from "cloudinary";
import ClientError from "../../errors/clientError";

export const uploadImg = async (path: string, publicId?: string) => {
  if (!path) throw new ClientError("path is required", 400);
  const result = await cloudinary.uploader.upload(
    path,
    {
      public_id: publicId && publicId,
    },
    function (error, result) {
      console.log(result);
    },
  );
  return result;
};
