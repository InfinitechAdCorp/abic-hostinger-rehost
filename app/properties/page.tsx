import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import PropertyCard from "@/components/card/propertycard";
import NoData from "@/components/error/nodata";

export const metadata: Metadata = {
  title: "Properties",
  description:
    "Browse a diverse selection of properties for sale and rent. Find your dream home or next investment with ABIC Realty's expert listings.",
  openGraph: {
    title: "Properties | ABIC Realty",
    description:
      "Discover premium properties for sale and rent. Explore condos, houses, and commercial spaces available with ABIC Realty.",
    url: "https://www.abic-website.vercel.app/properties",
    siteName: "ABIC Realty",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}media/abic-realty-properties-banner.png`,
        width: 1200,
        height: 630,
        alt: "ABIC Realty Property Listings",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@AbicRealty",
    creator: "@AbicRealty",
    title: "Properties | ABIC Realty",
    description:
      "Explore ABIC Realty's curated selection of properties for sale and rent. Find your perfect home or investment today.",
    images: [
      `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}media/abic-realty-properties-banner.png`,
    ],
  },
  other: {
    "og:image:width": "1200",
    "og:image:height": "630",
  },
};

interface Property {
  id: string;
  name: string;
  images: string;
  description: string;
  location: string;
  price: number;
  max_price: number;
  status: string;
  unit_type: string;
  unit_status: string;
  sale: string;
  sale_type: string;
}

const fetchProperties = async (): Promise<Property[]> => {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/properties`;
  const res = await fetch(endpoint, { cache: "no-store" });

  if (!res.ok) {
    throw new Error(`Failed to fetch properties: ${res.statusText}`);
  }

  const data = await res.json();
  return data.records || [];
};

export const dynamic = "force-dynamic";

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams?: { search?: string };
}) {
  const search = searchParams?.search?.toLowerCase() || "";
  const properties = await fetchProperties();

  const filtered = properties.filter((p) => {
    return (
      p.name.toLowerCase().includes(search) ||
      p.location.toLowerCase().includes(search) ||
      p.description.toLowerCase().includes(search) ||
      p.unit_status.toLowerCase().includes(search) ||
      p.unit_type.toLowerCase().includes(search) ||
      p.status.toLowerCase().includes(search) ||
      p.price.toString().includes(search)
    );
  });

  const forRent = filtered
    .filter((p) => p.status === "For Rent")
    .sort((a, b) => a.name.localeCompare(b.name));

  const forSale = filtered
    .filter((p) => p.status === "For Sale")
    .sort((a, b) => a.name.localeCompare(b.name));

  const sortedProperties = [...forRent, ...forSale];

  return (
    <section className="flex flex-col items-center w-full">
      <div className="container mx-auto px-4">
        <div>
          <h1 className="font-bold text-4xl md:text-5xl text-violet-700 dark:text-white uppercase">
            Properties
          </h1>
          <p className="text-sm md:text-lg text-default-500 dark:text-gray-300">
            Discover the perfect property with unmatched quality, dedication,
            and personalized guidance.
          </p>
        </div>

        {/* Search form aligned to the right */}
        <form className="my-6 flex justify-end" action="/properties" method="get">
          <input
            type="text"
            name="search"
            placeholder="Search..."
            defaultValue={searchParams?.search || ""}
            className="w-full max-w-xs border border-gray-300 rounded-md p-2 dark:bg-gray-800 dark:text-white"
          />
        </form>

        <div className="grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 py-12">
          {sortedProperties.length > 0 ? (
            sortedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))
          ) : (
            <div className="col-span-full">
              <NoData />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
