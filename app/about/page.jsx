import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <section className="max-w-3xl mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">About Us</h1>
        <p className="text-gray-700 text-lg mb-4">
          Welcome to RichDev QuickCart! We are dedicated to providing a seamless online shopping experience, offering a wide range of quality products, fast delivery, and exceptional customer service. Our mission is to make shopping easy, secure, and enjoyable for everyone.
      </p>
      <p className="text-gray-700 text-lg">
        Whether you're looking for the latest tech gadgets, fashion, or home essentials, RichDev QuickCart is your trusted partner. Thank you for choosing us!
      </p>
    </section>
    <Footer />
    </>
  );
}
