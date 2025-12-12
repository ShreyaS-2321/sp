"use client"

import { useState } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, MapPin } from "lucide-react"

const MOCK_PGs = [
  {
    id: 1,
    name: "Modern Studio",
    location: "Koramangala, Bangalore",
    price: 12000,
    rating: 4.8,
    image: "/modern-studio-room-with-bed-and-desk.jpg",
    amenities: ["WiFi", "Gym", "Power Backup"],
  },
  {
    id: 2,
    name: "Spacious Apartment",
    location: "Indiranagar, Bangalore",
    price: 15000,
    rating: 4.6,
    image: "/spacious-apartment-with-balcony.jpg",
    amenities: ["WiFi", "Kitchen", "Parking"],
  },
  {
    id: 3,
    name: "Garden Room",
    location: "Whitefield, Bangalore",
    price: 10000,
    rating: 4.9,
    image: "/peaceful-garden-room-with-plants.jpg",
    amenities: ["WiFi", "Garden", "Power Backup"],
  },
  {
    id: 4,
    name: "Business District",
    location: "MG Road, Bangalore",
    price: 18000,
    rating: 4.7,
    image: "/professional-business-district-apartment.jpg",
    amenities: ["WiFi", "Gym", "AC"],
  },
  {
    id: 5,
    name: "University Zone",
    location: "Near Bangalore University",
    price: 8000,
    rating: 4.5,
    image: "/student-friendly-university-area-room.jpg",
    amenities: ["WiFi", "Common Room", "Study Area"],
  },
  {
    id: 6,
    name: "Premium Flat",
    location: "Banjara Hills, Hyderabad",
    price: 20000,
    rating: 5.0,
    image: "/luxury-premium-apartment-with-view.jpg",
    amenities: ["WiFi", "Gym", "Premium Food"],
  },
]

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState(25000)
  const [roomType, setRoomType] = useState("all")

  const filteredPGs = MOCK_PGs.filter((pg) => {
    return (
      pg.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      pg.price <= priceRange &&
      (roomType === "all" || pg.name.toLowerCase().includes(roomType))
    )
  })

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background">
        <section className="py-12 px-4 bg-secondary/20">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Explore PGs</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <input
                type="text"
                placeholder="Search location or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-border rounded-lg bg-background text-foreground"
              />

              <div>
                <label className="block text-sm font-medium mb-2">Max Price: ₹{priceRange}</label>
                <input
                  type="range"
                  min="5000"
                  max="25000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="px-4 py-2 border border-border rounded-lg bg-background text-foreground"
              >
                <option value="all">All Room Types</option>
                <option value="studio">Studio</option>
                <option value="apartment">Apartment</option>
              </select>
            </div>
          </div>
        </section>

        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <p className="text-muted-foreground mb-8">{filteredPGs.length} properties found</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPGs.map((pg) => (
                <Card key={pg.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative pb-[66.66%] bg-secondary overflow-hidden">
                    <img
                      src={pg.image || "/placeholder.svg"}
                      alt={pg.name}
                      className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                    <button className="absolute top-4 right-4 bg-background rounded-full p-2 shadow-lg hover:bg-secondary">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="p-4 space-y-4">
                    <div>
                      <h3 className="font-bold text-lg">{pg.name}</h3>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{pg.location}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-2xl font-bold text-primary">₹{pg.price}</p>
                        <p className="text-sm text-muted-foreground">per month</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{pg.rating}</p>
                        <p className="text-sm text-muted-foreground">★ Rating</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {pg.amenities.slice(0, 2).map((amenity, i) => (
                        <span key={i} className="text-xs bg-secondary px-2 py-1 rounded-full text-muted-foreground">
                          {amenity}
                        </span>
                      ))}
                    </div>

                    <Link href={`/pg/${pg.id}`}>
                      <Button className="w-full">View Details</Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
