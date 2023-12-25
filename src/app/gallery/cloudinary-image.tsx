"use client";

import { Heart } from "@/components/icons/heart";
import { CldImage, CldImageProps } from "next-cloudinary";
import { setAsFavoriteAaction } from "./actions";
import { useState, useTransition } from "react";
import { SearchResult } from "./page";
import { FullHeart } from "@/components/icons/full-heart ";

export function CluodinaryImage(
  props: {
    imagedata: SearchResult;
    onUnheart?: (unheartResource: SearchResult) => void;
  } & Omit<CldImageProps, "src">
) {
  const [transition, startTansition] = useTransition();
  const { imagedata, onUnheart } = props;
  const [isFavorited, setIsFavorited] = useState(
    imagedata.tags.includes("favorite")
  );
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
            onUnheart?.(imagedata);
            setIsFavorited(false);
            startTansition(() => {
              setAsFavoriteAaction(imagedata.public_id, false);
            });
          }}
          className="absolute top-2 right-2 hover:text-white text-red-500 cursor-pointer"
        />
      ) : (
        <Heart
          onClick={() => {
            setIsFavorited(true);
            startTansition(() => {
              setAsFavoriteAaction(imagedata.public_id, true);
            });
          }}
          className="absolute top-2 right-2 hover:text-red-500 cursor-pointer"
        />
      )}
    </div>
  );
}
