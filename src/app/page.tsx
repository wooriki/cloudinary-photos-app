"use client";

import { CldImage, CldUploadButton } from "next-cloudinary";
import { useState } from "react";

export type UploadResult = {
  info: {
    public_id: string;
  };
  event: "success";
};
export default function Home() {
  const [imageId, setImgId] = useState("pyk2tqljbyp2yqaqzqqe");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CldUploadButton
        onUpload={(result) => {
          const uploadResult = result as UploadResult;
          setImgId(uploadResult.info.public_id);
        }}
        uploadPreset="typkyma5"
      />
      {imageId && (
        <CldImage
          width="500"
          height="300"
          src={imageId}
          sizes="100vw"
          alt="Description of my image"
        />
      )}
    </main>
  );
}
