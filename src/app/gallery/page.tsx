// "use client";

import { CldImage } from "next-cloudinary";
import UploadBtn from "./upload-button";
import cloudinary from "cloudinary";
import { CluodinaryImage } from "./cloudinary-image";

export type SearchResult = {
  public_id: string;
  tags: string[];
};
export default async function GalleryPage() {
  const results = (await cloudinary.v2.search
    .expression("resource_type:image")
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(30)
    .execute()) as { resources: SearchResult[] };

  // console.log("results", results);
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
              imagedata={result}
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
