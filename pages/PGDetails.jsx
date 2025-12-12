"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Phone, MessageCircle, MapPin } from "lucide-react"

export default function PGDetails() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const pgDetails = {
    id: 1,
    name: "Green Haven PG",
    address: "Sector 5, Delhi",
    rent: 8500,
    college: "Delhi University",
    available: 3,
    status: "vacant",
    rating: 4.5,
    reviews: 24,
    description:
      "A well-maintained PG with modern amenities, friendly atmosphere, and excellent management. Perfect for students looking for comfort and safety.",
    fullAmenities: ["WiFi", "Food", "AC", "Laundry", "Parking", "Attached Bath", "Hot Water", "Study Room"],
    ownerName: "Rajesh Kumar",
    ownerPhone: "+91 9876543210",
  }

  const images = ["/pg-room-modern-1.jpg", "/pg-room-modern-2.jpg", "/pg-room-modern-3.jpg"]

  const similarPGs = [
    { name: "Student Comfort", rent: 12000, distance: 3.2 },
    { name: "Elite Residency", rent: 15000, distance: 4.8 },
    { name: "Home Away Home", rent: 9500, distance: 3.8 },
  ]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Image Carousel */}
        <div className="relative mb-8 rounded-xl overflow-hidden">
          <img src={images[currentImageIndex] || "/placeholder.svg"} alt="PG" className="w-full h-96 object-cover" />
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black p-2 rounded-full text-white transition"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black p-2 rounded-full text-white transition"
          >
            <ChevronRight size={24} />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-2 h-2 rounded-full transition ${idx === currentImageIndex ? "bg-green-500" : "bg-gray-400"}`}
              />
            ))}
          </div>
        </div>

        {/* Header Info */}
        <div className="bg-gray-900 rounded-xl p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{pgDetails.name}</h1>
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <MapPin size={16} />
                <span>{pgDetails.address}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-yellow-400">
                  ★ {pgDetails.rating} ({pgDetails.reviews} reviews)
                </span>
                <span className="bg-green-500 text-black px-3 py-1 rounded-full text-sm font-semibold">🟢 Vacant</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-green-500">₹{pgDetails.rent}</p>
              <p className="text-gray-400">/month</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-gray-900 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4">About this PG</h2>
              <p className="text-gray-300 mb-4">{pgDetails.description}</p>
              <p className="text-gray-400">
                Near {pgDetails.college} - {pgDetails.available} rooms available
              </p>
            </div>

            {/* Amenities */}
            <div className="bg-gray-900 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4">What this place offers</h2>
              <div className="grid grid-cols-2 gap-4">
                {pgDetails.fullAmenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                      ✓
                    </div>
                    <span className="text-gray-300">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="bg-gray-900 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Location on Map</h2>
              <img src="/google-maps-location.jpg" alt="Map" className="w-full h-64 rounded-lg object-cover" />
            </div>

            {/* Similar PGs */}
            <div className="bg-gray-900 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Similar PGs</h2>
              <div className="space-y-3">
                {similarPGs.map((pg, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                    <div>
                      <p className="text-white font-semibold">{pg.name}</p>
                      <p className="text-sm text-gray-400">{pg.distance}km away</p>
                    </div>
                    <p className="text-green-500 font-bold">₹{pg.rent}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Contact Card */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-xl p-6 sticky top-20">
              <h3 className="text-xl font-bold text-white mb-4">Contact Owner</h3>
              <p className="text-gray-300 mb-4 font-semibold">{pgDetails.ownerName}</p>

              <div className="space-y-3 mb-6">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-black rounded-lg hover:bg-green-600 transition font-semibold">
                  <Phone size={18} />
                  Call Owner
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-green-500 text-green-500 rounded-lg hover:bg-green-500 hover:text-black transition font-semibold">
                  <MessageCircle size={18} />
                  WhatsApp
                </button>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <p className="text-sm text-gray-400 mb-2">Phone</p>
                <p className="text-white font-semibold">{pgDetails.ownerPhone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
