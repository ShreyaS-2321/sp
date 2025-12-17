"use client";

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PinIcon } from "lucide-react";
import {
  ChevronLeft,
  ChevronRight,
  Phone,
  MessageCircle,
  MapPin,
  ArrowLeft,
  Bookmark,
} from "lucide-react";
import { pgListings } from "../src/data/pgdata";

export default function PGDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [saved, setSaved] = useState(false);

  const pg = pgListings.find((p) => p.id === Number(id));

  if (!pg) {
    return (
      <div className="text-white text-center mt-20 text-xl">PG not found</div>
    );
  }

  const nextImage = () =>
    setCurrentImage((prev) => (prev + 1) % pg.images.length);

  const prevImage = () =>
    setCurrentImage((prev) => (prev === 0 ? pg.images.length - 1 : prev - 1));

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#383838] font-semibold"
        >
          <ArrowLeft size={18} />
          Back to listings
        </button>

        {/* Image Carousel */}
        <div className="relative rounded-xl overflow-hidden">
          <img
            src={pg.images[currentImage]}
            className="w-full h-[400px] object-cover"
            alt="PG"
          />

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 p-2 rounded-full"
          >
            <ChevronLeft className="text-white" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 p-2 rounded-full"
          >
            <ChevronRight className="text-white" />
          </button>

          {/* Bookmark */}
          <button
            onClick={() => setSaved(!saved)}
            className="absolute top-4 right-4 bg-black/70 p-2 rounded-full"
          >
            <Bookmark
              className={saved ? "text-[#87E64B] fill-[#87E64B]" : "text-white"}
            />
          </button>
        </div>

        {/* Header Info */}
        <div className="bg-[#191919] rounded-xl p-6">
          <div className="flex justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">{pg.name}</h1>
              <p className="text-gray-400 flex items-center gap-1 mt-1">
                <MapPin size={16} /> {pg.address}
              </p>
              <p className="text-yellow-400 mt-2">
                ★ {pg.rating} ({pg.reviews} reviews)
              </p>
            </div>

            <div className="text-right">
              <p className="text-3xl font-bold text-[#87E64B]">₹{pg.rent}</p>
              <p className="text-gray-400">/month</p>
            </div>
          </div>
        </div>

        {/*  Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-[#191919] rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-3">
                About this PG
              </h2>
              <p className="text-gray-300">{pg.description}</p>
              <p className="text-[#87E64B] mt-2 flex items-center gap-1">
                <MapPin size={16} />
                Near {pg.college}
              </p>
              <p className="text-red-500 flex items-center gap-1">
                <PinIcon size={16} />
                {pg.available} rooms available
              </p>
            </div>
            <div className="bg-[#191919] rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Amenities</h2>
              <div className="grid grid-cols-2 gap-3">
                {pg.amenities.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-gray-300"
                  >
                    <span className="text-[#87E64B]">✔</span> {item}
                  </div>
                ))}
              </div>
            </div>

            {/*Google Map */}
            <div className="bg-[#191919] rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Location</h2>
              <iframe
                className="w-full h-64 rounded-lg"
                loading="lazy"
                src={`https://www.google.com/maps?q=${pg.latitude},${pg.longitude}&output=embed`}
              ></iframe>
            </div>
          </div>

          {/* RIGHT - CONTACT */}
          <div className="bg-[#191919] rounded-xl p-6 h-fit sticky top-20">
            <h3 className="text-xl font-bold text-white mb-4">Contact Owner</h3>

            <p className="text-gray-300 font-semibold mb-4">{pg.ownerName}</p>

            <a
              href={`tel:${pg.ownerPhone}`}
              className="w-full flex justify-center items-center gap-2 bg-[#87E64B] text-black py-3 rounded-lg font-semibold mb-3"
            >
              <Phone size={18} />
              Call Owner
            </a>

            <a
              href={`https://wa.me/91${pg.ownerPhone}`}
              target="_blank"
              className="w-full flex justify-center items-center gap-2 border border-[#87E64B] text-[#87E64B] py-3 rounded-lg font-semibold"
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
