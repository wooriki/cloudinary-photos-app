// "use client";

import { CldImage } from "next-cloudinary";
import UploadBtn from "./upload-button";
import cloudinary from "cloudinary";
import { CluodinaryImage } from "./cloudinary-image";

type SearchResult = {
  public_id: string;
};
export default async function GalleryPage() {
  const results = (await cloudinary.v2.search
    .expression("resource_type:image")
    .sort_by("created_at", "desc")
    .max_results(10)
    .execute()) as { resources: SearchResult[] };

  return (
    <section>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Gallery</h1>
          <UploadBtn />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {results.resources.map((result) => (
            <CluodinaryImage
              key={result.public_id}
              src={result.public_id}
              width="400"
              height="300"
              alt="an image of something"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
