import Navbar from "@/components/Navbar";
import React from "react";
import Footer from "@/components/Footer";   

export default function ContactPage() {
  return (
    <>
    <Navbar />
    <section className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Contact Us</h1>
      <p className="text-gray-700 text-lg mb-4">
        Have questions or need support? We're here to help! Reach out to us using the information below, and our team will get back to you as soon as possible.
      </p>
      <div className="mb-4">
        <p className="font-semibold">Email:</p>
        <p>support@richdev.dev</p>
      </div>
      <div className="mb-4">
        <p className="font-semibold">Phone:</p>
        <p>+233 532700248</p>
      </div>
      <div>
        <p className="font-semibold">Address:</p>
        <p>Labadi, Accra, Ghana</p>
      </div>
    </section>
    <Footer />
  </>
  );
}
