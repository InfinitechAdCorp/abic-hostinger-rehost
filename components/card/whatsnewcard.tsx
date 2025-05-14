"use client";
import React, { useState } from "react";
import { Card, CardBody, Image } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";

interface Data {
  id: number;
  title: string;
  image: string;
  date: string;
  content?: string | null;
}

interface DataProps {
  data: Data[];
}

const WhatsNewCard: React.FC<DataProps> = ({ data }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState<Data | null>(null);

  const handleCardClick = (item: Data) => {
    setSelectedItem(item);
    onOpen();
  };

  // Sort data by latest date first
  const sortedData = [...data].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Format the date to "27-Jan-2025"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' });  // Get short month
    const year = date.getFullYear();
    
    // Ensure first letter is capitalized and others remain lowercase
    return `${day}-${month.charAt(0).toUpperCase() + month.slice(1).toLowerCase()}-${year}`;
  };
  
  return (
    <>
      {sortedData.map((item) => (
        <Link href={'#'} key={item.id} onClick={() => handleCardClick(item)}>
          <Card className="cursor-pointer w-full">
            <CardBody className="overflow-visible">
              {item.image ? (
                item.image.includes('mp4') ? (
                  <video
                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}articles/${item.image}`}
                    className="w-full object-cover object-center rounded-xl h-[250px]"
                    controls
                  />
                ) : (
                  <Image
                    isBlurred
                    isZoomed
                    alt="Card background"
                    className="w-full object-cover object-center rounded-xl"
                    height={250}
                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}articles/${item.image}`}
                    width={500}
                  />
                )
              ) : (
                <p>No media available</p>
              )}

              <div className="py-4">
                <h4 className="font-bold text-large line-clamp-1">
                  {item.title}
                </h4>
                {item.content && (
                  <p className="text-tiny  text-default-500 font-bold line-clamp-2">
                    {item.content}
                  </p>
                )}

                <div className="mt-4">
                  <p className="text-tiny  text-default-500 font-bold">
                    {item.date
                      ? formatDate(item.date)
                      : "No Date Available"}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </Link>
      ))}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside" size="3xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 mt-6">
                <h2 className="text-lg md:text-2xl font-bold text-gray-800">{selectedItem?.title}</h2>
                <p className="text-sm text-gray-500">
                  {selectedItem?.date ? formatDate(selectedItem.date) : "No Date Available"}
                </p>
              </ModalHeader>
              <ModalBody className="p-4 overflow-x-hidden">
                <div className="space-y-6">
                  {selectedItem?.image ? (
                    selectedItem.image.includes('mp4') ? (
                      <video
                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}articles/${selectedItem?.image}`}
                        className="w-full object-cover object-center rounded-xl"
                        controls
                      />
                    ) : (
                      <Image
                        isBlurred
                        alt="Modal background"
                        className="w-full object-cover object-center rounded-xl"
                        height={400}
                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}articles/${selectedItem?.image}`}
                        width={800}
                      />
                    )
                  ) : (
                    <p>No media available</p>
                  )}
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      {selectedItem?.content
                        ?.split(/(?<=[.!?])\s+/)
                        .reduce<React.ReactNode[]>((acc, sentence, index) => {
                          if (index % 2 === 0 && index !== 0) acc.push(<br key={`br-${index}`} />, <br key={`br2-${index}`} />);
                          acc.push(sentence + " ");
                          return acc;
                        }, [])}
                    </p>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default WhatsNewCard;
