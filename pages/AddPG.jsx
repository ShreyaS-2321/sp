"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Upload, ArrowRight, ArrowLeft, Check, Plus, Trash2 } from "lucide-react";

/* Brand constants matching UI theme */
const INK = "#15170F";
const PAPER = "#F4F1EA";
const PANEL = "#FBFAF5";
const GREEN = "#4F7B1E";
const LINE = "rgba(21,23,15,0.12)";

export default function AddPG() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    pgName: "",
    address: "",
    city: "",
    college: "",
    gender: "boys",
    sharingOptions: [{ type: "Single", rent: "" }],
    amenities: [],
    ownerName: "",
    phone: "",
    email: "",
  });

  const amenitiesList = ["WiFi", "Food", "AC", "Laundry", "Parking", "Attached Bath"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmenityChange = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const addSharingOption = () => {
    setFormData((prev) => ({
      ...prev,
      sharingOptions: [...prev.sharingOptions, { type: "Single", rent: "" }],
    }));
  };

  const updateSharingOption = (index, field, value) => {
    const newOptions = [...formData.sharingOptions];
    newOptions[index][field] = value;
    setFormData({ ...formData, sharingOptions: newOptions });
  };

  const removeSharingOption = (index) => {
    setFormData({
      ...formData,
      sharingOptions: formData.sharingOptions.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 5) {
      setStep(step + 1);
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 grain" style={{ background: PAPER, color: INK }}>
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: GREEN }}>
            <Check className="w-8 h-8" style={{ color: PAPER }} />
          </div>
          <h2 className="ff-display text-3xl mb-3">Submission Successful!</h2>
          <p className="ff-mono text-sm mb-8" style={{ color: "#6B6A5C" }}>Your PG has been submitted. It will appear live after verification.</p>
          <Link to="/" className="inline-block px-8 py-3 ff-mono uppercase tracking-[0.15em]" style={{ background: INK, color: PAPER, fontSize: "0.75rem" }}>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-6 grain" style={{ background: PAPER, color: INK }}>
      <style>{`
        .ff-display { font-family: var(--font-display); }
        .ff-mono { font-family: var(--font-mono); }
        .grain { background-image: radial-gradient(${GREEN}14 0.5px, transparent 0.5px); background-size: 18px 18px; }
      `}</style>

      <div className="max-w-[700px] mx-auto">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between mb-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={`h-1 flex-1 mx-1 ${i <= step ? "opacity-100" : "opacity-20"}`} style={{ background: GREEN }} />
            ))}
          </div>
          <p className="ff-mono uppercase tracking-[0.2em]" style={{ fontSize: "0.65rem", color: "#6B6A5C" }}>Step {step} of 5</p>
        </div>

        <div className="p-8 md:p-12" style={{ background: PANEL, border: `1px solid ${LINE}` }}>
          <form onSubmit={handleSubmit}>
            <div className="min-h-[350px]">
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="ff-display text-4xl mb-8">Basic Information</h2>
                  <input type="text" name="pgName" placeholder="PG Name" value={formData.pgName} onChange={handleInputChange} className="w-full p-4 outline-none" style={{ background: PAPER, border: `1px solid ${LINE}` }} />
                  <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleInputChange} className="w-full p-4 outline-none" style={{ background: PAPER, border: `1px solid ${LINE}` }} />
                  <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} className="w-full p-4 outline-none" style={{ background: PAPER, border: `1px solid ${LINE}` }} />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="ff-display text-4xl mb-6">Room Sharing & Rent</h2>
                  <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full p-4 outline-none mb-4" style={{ background: PAPER, border: `1px solid ${LINE}` }}>
                    <option value="boys">Boys PG</option>
                    <option value="girls">Girls PG</option>
                    <option value="coed">Co-ed PG</option>
                  </select>
                  <div className="space-y-4">
                    {formData.sharingOptions.map((option, index) => (
                      <div key={index} className="flex gap-3 items-center">
                        <select className="p-4 outline-none w-1/3" style={{ background: PAPER, border: `1px solid ${LINE}` }} value={option.type} onChange={(e) => updateSharingOption(index, 'type', e.target.value)}>
                          <option>Single</option><option>Double</option><option>Triple</option>
                        </select>
                        <input type="number" placeholder="Rent (₹)" className="p-4 outline-none flex-1" style={{ background: PAPER, border: `1px solid ${LINE}` }} value={option.rent} onChange={(e) => updateSharingOption(index, 'rent', e.target.value)} />
                        <button type="button" onClick={() => removeSharingOption(index)} className="p-4 text-red-400"><Trash2 size={18} /></button>
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={addSharingOption} className="ff-mono text-xs underline flex items-center gap-2" style={{ color: GREEN }}>
                    <Plus size={14} /> Add another sharing type
                  </button>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="ff-display text-4xl mb-8">Amenities</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {amenitiesList.map((a) => (
                      <label key={a} className="flex items-center gap-3 p-4 cursor-pointer" style={{ border: `1px solid ${formData.amenities.includes(a) ? GREEN : LINE}` }}>
                        <input type="checkbox" checked={formData.amenities.includes(a)} onChange={() => handleAmenityChange(a)} className="w-4 h-4" style={{ accentColor: GREEN }} />
                        <span className="ff-mono text-sm">{a}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <h2 className="ff-display text-4xl mb-8">Upload Photos</h2>
                  <div className="p-12 text-center" style={{ border: `2px dashed ${LINE}` }}>
                    <Upload className="w-10 h-10 mx-auto mb-4" style={{ color: GREEN }} />
                    <p className="ff-mono text-sm" style={{ color: "#6B6A5C" }}>Click or drag images here</p>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-6">
                  <h2 className="ff-display text-4xl mb-8">Owner Information</h2>
                  <input type="text" name="ownerName" placeholder="Owner Name" value={formData.ownerName} onChange={handleInputChange} className="w-full p-4 outline-none" style={{ background: PAPER, border: `1px solid ${LINE}` }} />
                  <input type="tel" name="phone" placeholder="Contact Number" value={formData.phone} onChange={handleInputChange} className="w-full p-4 outline-none" style={{ background: PAPER, border: `1px solid ${LINE}` }} />
                  <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} className="w-full p-4 outline-none" style={{ background: PAPER, border: `1px solid ${LINE}` }} />
                </div>
              )}
            </div>

            <div className="flex gap-4 mt-12">
              {step > 1 && (
                <button type="button" onClick={() => setStep(step - 1)} className="flex items-center gap-2 px-8 py-4 ff-mono uppercase tracking-[0.15em] border" style={{ borderColor: LINE, fontSize: "0.75rem" }}>
                  <ArrowLeft size={15} /> Prev
                </button>
              )}
              <button type="submit" className="flex-1 flex items-center justify-center gap-2 px-8 py-4 ff-mono uppercase tracking-[0.15em]" style={{ background: INK, color: PAPER, fontSize: "0.75rem" }}>
                {step === 5 ? "Submit Listing" : "Next"} <ArrowRight size={15} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}