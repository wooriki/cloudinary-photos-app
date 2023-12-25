"use client";
import { useEffect, useState } from "react";
import { CluodinaryImage } from "../gallery/cloudinary-image";
import { SearchResult } from "../gallery/page";

export default function FavoritesList({
  initialResources,
}: {
  initialResources: SearchResult[];
}) {
  const [resources, setResources] = useState(initialResources);

  useEffect(() => {
    setResources(initialResources);
  }, [initialResources]);
  return (
    <div className="grid grid-cols-4 gap-4">
      {resources.map((result) => (
        <CluodinaryImage
          key={result.public_id}
          imagedata={result}
          width="400"
          height="300"
          alt="an image of something"
          onUnheart={(unheartResource) => {
            setResources((currentResources) =>
              currentResources.filter(
                (resource) => resource.public_id !== unheartResource.public_id
              )
            );
          }}
        />
      ))}
    </div>
  );
}
