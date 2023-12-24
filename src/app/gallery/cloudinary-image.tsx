"use client";

import { Heart } from "@/components/icons/heart";
import { CldImage } from "next-cloudinary";
import { setAsFavoriteAaction } from "./actions";
import { useTransition } from "react";
import { SearchResult } from "./page";
import { FullHeart } from "@/components/icons/full-heart ";

export function CluodinaryImage(
  props: any & { imagedata: SearchResult; path: string }
) {
  const [transition, startTansition] = useTransition();
  const { imagedata } = props;
  const isFavorited = imagedata.tags.includes("favorite");
  // const isFavorited =
  //   imagedata && imagedata.tags && imagedata.tags.includes("favorite");

  // if (!imagedata || !imagedata.public_id) {
  //   // 이미지 데이터가 없거나 public_id가 없는 경우
  //   return <div>No Image Data</div>;
  // }

  return (
    <div className="relative">
      <CldImage {...props} src={imagedata.public_id} />
      {isFavorited ? (
        <FullHeart
          onClick={() => {
            startTansition(() => {
              setAsFavoriteAaction(imagedata.public_id, false, props.path);
            });
          }}
          className="absolute top-2 right-2 hover:text-white text-red-500 cursor-pointer"
        />
      ) : (
        <Heart
          onClick={() => {
            startTansition(() => {
              setAsFavoriteAaction(imagedata.public_id, true, props.path);
            });
          }}
          className="absolute top-2 right-2 hover:text-red-500 cursor-pointer"
        />
      )}
    </div>
  );
}
