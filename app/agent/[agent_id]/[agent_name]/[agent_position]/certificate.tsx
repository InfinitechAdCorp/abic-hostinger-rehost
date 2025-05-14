import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";

interface CertificateData {
  id: string;
  name: string;
  image: string;
  date: string;
}

interface CertificateProps {
  cert: CertificateData[];
}

// Format date to: 21-Jan-2025
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const Certificates: React.FC<CertificateProps> = ({ cert }) => {
  // Sort certificates from latest to oldest (non-mutating)
  const sortedCerts = [...cert].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <PhotoProvider>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 py-6">
        {sortedCerts.map((certificate) => {
          const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}certificates/${certificate.image}`;
          return (
            <Card key={certificate.id}>
              <CardBody className="overflow-visible p-1">
                <PhotoView src={imageUrl}>
                  <Image
                    alt={certificate.name}
                    className="object-cover object-center overflow-hidden"
                    shadow="md"
                    src={imageUrl}
                    width={1000}
                    height={250}
                  />
                </PhotoView>
              </CardBody>
              <CardFooter className="pb-0 py-2 px-4 flex-col items-start">
                <h1 className="text-large font-bold capitalize">
                  {certificate.name}
                </h1>
                <p className="text-small text-foreground/80 leading-4">
                  {formatDate(certificate.date)}
                </p>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </PhotoProvider>
  );
};

export default Certificates;
