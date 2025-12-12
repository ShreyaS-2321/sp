"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, Phone, Mail, Wifi, Shield, Heart, Share2, ChevronLeft, ChevronRight } from "lucide-react"

const PG_DETAILS = {
  id: 1,
  name: "Modern Studio Apartment",
  location: "Koramangala, Bangalore",
  price: 12000,
  rating: 4.8,
  images: [
    "/modern-studio-bedroom.jpg",
    "/studio-living-area.jpg",
    "/studio-kitchen.jpg",
    "/studio-bathroom.jpg",
  ],
  description: "Beautiful, fully furnished studio apartment in the heart of Koramangala with all modern amenities.",
  amenities: ["WiFi", "AC", "Power Backup", "Parking", "Kitchen", "Washing Machine", "Gym", "Security"],
  rules: ["No smoking", "No pets", "Quiet hours after 10 PM", "No guests after 11 PM"],
  owner: { name: "Rajesh Kumar", phone: "+91-9999999999", email: "rajesh@example.com" },
  similarPGs: [
    {
      id: 2,
      name: "Spacious Apartment",
      location: "Indiranagar",
      price: 15000,
      rating: 4.6,
      image: "/spacious-apartment.png",
    },
    {
      id: 3,
      name: "Garden Room",
      location: "Whitefield",
      price: 10000,
      rating: 4.9,
      image: "/garden-room.jpg",
    },
  ],
}

export default function PGDetailsPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative w-full aspect-video bg-secondary rounded-lg overflow-hidden">
              <img
                src={PG_DETAILS.images[currentImageIndex] || "/placeholder.svg"}
                alt="PG"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setCurrentImageIndex(Math.max(0, currentImageIndex - 1))}
                disabled={currentImageIndex === 0}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => setCurrentImageIndex(Math.min(PG_DETAILS.images.length - 1, currentImageIndex + 1))}
                disabled={currentImageIndex === PG_DETAILS.images.length - 1}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            <div className="flex gap-2">
              {PG_DETAILS.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${i === currentImageIndex ? "border-primary" : "border-border"}`}
                >
                  <img src={img || "/placeholder.svg"} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-4xl font-bold">{PG_DETAILS.name}</h1>
                    <div className="flex items-center gap-2 mt-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span className="text-lg text-muted-foreground">{PG_DETAILS.location}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Heart className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div>
                    <p className="text-4xl font-bold text-primary">₹{PG_DETAILS.price}</p>
                    <p className="text-muted-foreground">per month</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{PG_DETAILS.rating}</p>
                    <p className="text-muted-foreground">★ Rating</p>
                  </div>
                </div>
              </div>

              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">About</h2>
                <p className="text-muted-foreground leading-relaxed">{PG_DETAILS.description}</p>
              </Card>

              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 gap-4">
                  {PG_DETAILS.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2">
                      <Wifi className="w-5 h-5 text-primary" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">House Rules</h2>
                <ul className="space-y-2">
                  {PG_DETAILS.rules.map((rule, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Similar PGs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {PG_DETAILS.similarPGs.map((pg) => (
                    <div
                      key={pg.id}
                      className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <img src={pg.image || "/placeholder.svg"} alt={pg.name} className="w-full h-48 object-cover" />
                      <div className="p-4">
                        <h3 className="font-bold">{pg.name}</h3>
                        <p className="text-sm text-muted-foreground">{pg.location}</p>
                        <div className="flex justify-between items-center mt-4">
                          <p className="font-bold">₹{pg.price}</p>
                          <p className="text-sm">{pg.rating} ★</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24 space-y-6">
                <div>
                  <h2 className="text-xl font-bold mb-4">Contact Owner</h2>
                  <div className="space-y-3">
                    <p>
                      <span className="font-semibold">{PG_DETAILS.owner.name}</span>
                    </p>
                    <div className="flex items-center gap-2">
                      <Phone className="w-5 h-5 text-primary" />
                      <a href={`tel:${PG_DETAILS.owner.phone}`} className="text-primary hover:underline">
                        {PG_DETAILS.owner.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-5 h-5 text-primary" />
                      <a href={`mailto:${PG_DETAILS.owner.email}`} className="text-primary hover:underline">
                        {PG_DETAILS.owner.email}
                      </a>
                    </div>
                  </div>
                </div>
                <Button className="w-full">Schedule Visit</Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Message Owner
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
