import { Image } from "@nextui-org/react";
import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";

interface VideosData {
  name: string;
  video: string;
}

interface VideosProps {
  videos: VideosData[];
}

const Gallery: React.FC<VideosProps> = ({ videos }) => {
  return (
    <PhotoProvider>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 py-8">
        {videos.map((media, index) => {
          const videoUrl = `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}videos/${media.video}`;

          return (
            <PhotoView key={index} src={videoUrl}>
              <Image
                alt={media.name}
                className="object-cover max-h-[250px]"
                src={videoUrl}
                width="100%"
              />
            </PhotoView>
          );
        })}
      </div>
    </PhotoProvider>
  );
};

export default Gallery;
