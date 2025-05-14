import React from "react";
import { Metadata } from "next";

import ContactSection from "../home/contactsection";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with ABIC Realty for inquiries, support, or to learn more about our services. We are here to assist you.",

  openGraph: {
    title: "Contact Us | ABIC Realty",
    description:
      "Get in touch with ABIC Realty for inquiries, support, or to learn more about our services. We are here to assist you.",
    url: "https://www.abic-website.vercel.app/contact",
    siteName: "ABIC Realty",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}media/abic-realty-contact-banner.png`, // Replace with actual contact page image
        width: 1200,
        height: 630,
        alt: "ABIC Realty Contact Information",
      },
    ],
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    site: "@AbicRealty",
    creator: "@AbicRealty",
    title: "Contact Us | ABIC Realty",
    description:
      "Have questions? Contact ABIC Realty for support, inquiries, or more information about our real estate services.",
   images: [
  `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}media/abic-realty-contact-banner.png`,
]

  },

  other: {
    "og:image:width": "1200",
    "og:image:height": "630",
  },
};


const ContactPage = () => {
  return (
    <section className="flex flex-col items-center w-full">
      <div className="container mx-auto">
        <ContactSection />
      </div>
    </section>
  );
};

export default ContactPage;
