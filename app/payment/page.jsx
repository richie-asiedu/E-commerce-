'use client'
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import cashOD from '@/assets/Cash-On-Delivery.png';
import stripe_icon from '@/assets/Stripe_Logo.png';
import { ToastContainer, toast } from 'react-toastify';
import validator from "validator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const paymentMethods = [
  {
    id: "cod",
    label: "Cash On Delivery",
    icon: cashOD,
    description: "Pay with cash when your order is delivered."
  },
  {
    id: "stripe",
    label: "Stripe (Visa/MasterCard)",
    icon: stripe_icon,
    description: "Pay securely online with Visa or MasterCard via Stripe."
  }
];

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0].id);
  const router = useRouter();
  const emailRef = useRef();
  const countryRef = useRef();
  const cardNumberRef = useRef();
  const expiryRef = useRef();
  const cvcRef = useRef();
  const nameRef = useRef();

  const handlePayment = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const country = countryRef.current.value;
    let valid = true;
    let errorMsg = "";
    if (!validator.isEmail(email)) {
      valid = false;
      errorMsg = "Please enter a valid email address.";
    } else if (validator.isEmpty(country)) {
      valid = false;
      errorMsg = "Please enter your country or region.";
    }
    if (selectedMethod === "stripe") {
      const cardNumber = cardNumberRef.current.value;
      const expiry = expiryRef.current.value;
      const cvc = cvcRef.current.value;
      const name = nameRef.current.value;
      if (!validator.isCreditCard(cardNumber)) {
        valid = false;
        errorMsg = "Please enter a valid card number.";
      } else if (!validator.matches(expiry, /^(0[1-9]|1[0-2])\/(\d{2})$/)) {
        valid = false;
        errorMsg = "Please enter a valid expiry date (MM/YY).";
      } else if (!validator.isLength(cvc, { min: 3, max: 4 }) || !validator.isNumeric(cvc)) {
        valid = false;
        errorMsg = "Please enter a valid CVC.";
      } else if (validator.isEmpty(name)) {
        valid = false;
        errorMsg = "Please enter the name on card.";
      }
    }
    if (valid) {
      toast.success("Payment successful! Redirecting to My Orders...", { theme: "dark" });
      setTimeout(() => {
        router.push("/my-orders");
      }, 2000);
    } else {
      toast.error(errorMsg);
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      <section className="max-w-2xl mx-auto py-16 px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-extrabold mb-8 text-gray-900 text-center tracking-tight">Choose Payment Method</h1>
          <form onSubmit={handlePayment} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paymentMethods.map((method) => (
                <label key={method.id} className={`flex flex-col items-center gap-3 p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 shadow-sm hover:shadow-lg ${selectedMethod === method.id ? 'border-orange-600 bg-orange-50 scale-105' : 'border-gray-200 bg-gray-50'}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={selectedMethod === method.id}
                    onChange={() => setSelectedMethod(method.id)}
                    className="accent-orange-600 mb-2"
                  />
                  <Image src={typeof method.icon === 'string' ? method.icon : method.icon.src} alt={method.label} width={150} height={120} />
                  <span className="font-semibold text-lg text-gray-900">{method.label}</span>
                  <p className="text-xs text-gray-500 text-center">{method.description}</p>
                </label>
              ))}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input ref={emailRef} type="email" placeholder="you@example.com" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country/Region</label>
              <input ref={countryRef} type="text" placeholder="Country or Region" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
            </div>
            {selectedMethod === "stripe" && (
              <div className="bg-gray-50 rounded-xl p-6 shadow-inner">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input ref={cardNumberRef} type="text" placeholder="1234 5678 9012 3456" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                      <input ref={expiryRef} type="text" placeholder="MM/YY" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                      <input ref={cvcRef} type="text" placeholder="CVC" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
                    </div>
                  </div>
                </div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                <input ref={nameRef} type="text" placeholder="Cardholder Name" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
              </div>
            )}
            <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-[30px] font-[600] text-lg shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200">
              {selectedMethod === "cod" ? "Pay" : "Pay"}
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}
