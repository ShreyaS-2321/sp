"use client"

import { useState } from "react"
import { Upload } from "lucide-react"

export default function AddPG() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    pgName: "",
    address: "",
    city: "",
    college: "",
    rent: "",
    gender: "boys",
    totalRooms: "",
    availableRooms: "",
    amenities: [],
    ownerName: "",
    phone: "",
    email: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleAmenityChange = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (step < 5) {
      setStep(step + 1)
    } else {
      setSubmitted(true)
    }
  }

  const amenities = ["WiFi", "Food", "AC", "Laundry", "Parking", "Attached Bath"]

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Submission Successful!</h2>
          <p className="text-gray-400 mb-6">Your PG has been submitted! It'll appear after verification.</p>
          <button
            onClick={() => (window.location.href = "/")}
            className="px-6 py-2 bg-green-500 text-black rounded-lg hover:bg-green-600 transition font-semibold"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-screen min-h-screen bg-background py-12 px-6 overflow-x-hidden">
      {/* Remove all max-width wrappers */}
      <div className="w-full">
        {/* Progress Bar */}
        <div className="mb-10 px-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={`h-1 flex-1 mx-1 rounded ${i <= step ? "bg-green-500" : "bg-gray-700"}`} />
            ))}
          </div>
          <p className="text-gray-400 text-sm">Step {step} of 5</p>
        </div>

        <div className="bg-gray-900 rounded-2xl p-10 shadow-lg mx-8">
          <form onSubmit={handleSubmit} className="w-full">
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white mb-6">Basic Information</h2>
                <input
                  type="text"
                  name="pgName"
                  placeholder="PG Name"
                  value={formData.pgName}
                  onChange={handleInputChange}
                  className="w-full px-5 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-5 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-5 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                />
                <select
                  name="college"
                  value={formData.college}
                  onChange={handleInputChange}
                  className="w-full px-5 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:outline-none"
                >
                  <option value="">Select Nearby College</option>
                  <option value="Delhi University">Delhi University</option>
                  <option value="Jamia Millia">Jamia Millia</option>
                  <option value="IP University">IP University</option>
                </select>
              </div>
            )}

            {/* Step 2: Room Details */}
            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white mb-6">Room Details</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="number"
                    name="rent"
                    placeholder="Rent per month (₹)"
                    value={formData.rent}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                  />
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:outline-none"
                  >
                    <option value="boys">Boys</option>
                    <option value="girls">Girls</option>
                    <option value="coed">Co-ed</option>
                  </select>
                  <input
                    type="number"
                    name="totalRooms"
                    placeholder="Total Rooms"
                    value={formData.totalRooms}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                  />
                  <input
                    type="number"
                    name="availableRooms"
                    placeholder="Available Rooms"
                    value={formData.availableRooms}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Amenities */}
            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white mb-6">Amenities</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {amenities.map((amenity) => (
                    <label key={amenity} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.amenities.includes(amenity)}
                        onChange={() => handleAmenityChange(amenity)}
                        className="w-5 h-5 rounded border-gray-700 text-green-500"
                      />
                      <span className="text-gray-300">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Photos */}
            {step === 4 && (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white mb-6">Upload Photos</h2>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-12 text-center w-full">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-300 mb-2">Drag and drop images here</p>
                  <input type="file" multiple className="hidden" />
                  <button type="button" className="text-green-500 hover:text-green-400 transition">
                    Or click to browse
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Owner Info */}
            {step === 5 && (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white mb-6">Owner Information</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="ownerName"
                    placeholder="Your Name"
                    value={formData.ownerName}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Contact Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email (Optional)"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="md:col-span-2 w-full px-5 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-10">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="flex-1 px-6 py-3 border border-gray-700 text-white rounded-lg hover:bg-gray-800 transition font-semibold"
                >
                  Previous
                </button>
              )}
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-green-500 text-black rounded-lg hover:bg-green-600 transition font-semibold"
              >
                {step === 5 ? "List My PG" : "Next"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
