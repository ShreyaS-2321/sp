"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check } from "lucide-react"

const AMENITIES = [
  "WiFi",
  "AC",
  "Power Backup",
  "Parking",
  "Kitchen",
  "Washing Machine",
  "Gym",
  "Security",
  "Housekeeping",
  "Hot Water",
]

export default function AddPGPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: "",
    description: "",
    amenities: [],
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAmenityToggle = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }))
  }

  const handleSubmit = () => {
    setSubmitted(true)
    setTimeout(() => {
      router.push("/explore")
    }, 2000)
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background py-12 px-4">
        {submitted ? (
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col items-center justify-center space-y-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">Property Listed Successfully!</h1>
                <p className="text-muted-foreground">Your PG has been added to StayPoint. Redirecting...</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">List Your Property</h1>

            {/* Progress Bar */}
            <div className="mb-12">
              <div className="flex justify-between mb-4">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${s <= step ? "bg-primary text-white" : "bg-secondary text-muted-foreground"}`}
                  >
                    {s}
                  </div>
                ))}
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all" style={{ width: `${(step / 3) * 100}%` }}></div>
              </div>
            </div>

            <Card className="p-8">
              {/* Step 1 */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Basic Information</h2>
                  <div>
                    <label className="block text-sm font-medium mb-2">Property Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Modern Studio"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g., Koramangala, Bangalore"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Monthly Rent (₹)</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="e.g., 12000"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                  </div>
                  <Button onClick={() => setStep(2)} className="w-full">
                    Next
                  </Button>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Description & Amenities</h2>
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Tell us about your property..."
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground h-32"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-4">Amenities</label>
                    <div className="grid grid-cols-2 gap-3">
                      {AMENITIES.map((amenity) => (
                        <label key={amenity} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.amenities.includes(amenity)}
                            onChange={() => handleAmenityToggle(amenity)}
                            className="w-4 h-4 rounded border-border"
                          />
                          <span>{amenity}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep(1)} className="w-full">
                      Back
                    </Button>
                    <Button onClick={() => setStep(3)} className="w-full">
                      Next
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Contact Information</h2>
                  <div>
                    <label className="block text-sm font-medium mb-2">Owner Name</label>
                    <input
                      type="text"
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="ownerPhone"
                      value={formData.ownerPhone}
                      onChange={handleInputChange}
                      placeholder="Your phone number"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="ownerEmail"
                      value={formData.ownerEmail}
                      onChange={handleInputChange}
                      placeholder="Your email"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep(2)} className="w-full">
                      Back
                    </Button>
                    <Button onClick={handleSubmit} className="w-full">
                      Submit
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}
      </main>

      <Footer />
    </>
  )
}
