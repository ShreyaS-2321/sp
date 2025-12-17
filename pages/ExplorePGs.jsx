"use client";

import { useState, useMemo } from "react";
import {
  Grid2X2 as MapGrid2x2,
  Map,
  Wifi,
  UtensilsCrossed,
  Snowflake,
  Droplet,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function ExplorePGs() {
  const [view, setView] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Rent (Low→High)");
  const [filters, setFilters] = useState({
    rentMin: 5000,
    rentMax: 50000,
    gender: "all",
    distance: 10,
    vacancy: false,
  });

  const pgListings = [
    {
      id: 1,
      name: "Adhya PG",
      address: "Beside Aayakar Bhawan, Gobindpur",
      rent: 6000,
      college: "Asansol Engineering College",
      available: 3,
      gender: "girls",
      status: "vacant",
      distance: 2.5,
      amenities: ["wifi", "food", "ac"],
    },
    {
      id: 2,
      name: "Lok Santosh PG",
      address: "GT Road, Ushagram",
      rent: 5200,
      college: "BB College",
      available:5,
      gender: "boys",
      status: "vacant",
      distance: 3.4,
      amenities: ["wifi", "laundry","food"],
    },
    {
      id: 3,
      name: "Malobika Girls PG",
      address: "B B College Road, Ushagram",
      rent: 7000,
      college: "BB College",
      available: 1,
      gender: "girls",
      status: "few",
      distance: 2.9,
      amenities: ["wifi", "food", "ac"],
    },
    {
      id: 4,
      name: "Arun PG",
      address: "Gobindapur Road, Asansol",
      rent: 6500,
      college: "Asansol Engineering College",
      available: 5,
      gender: "boys",
      status: "vacant",
      distance: 1.5,
      amenities: ["wifi","food"],
    },
    {
      id: 5,
      name: "BrightStay PG ",
      address: "Near SBSTC Bus Stand, Asansol",
      rent: 7000,
      college: "Asansol Engineering College",
      available: 2,
      gender: "coed",
      status: "few",
      distance: 1.2,
      amenities: ["wifi", "food", "ac", "laundry"],
    },
    {
      id: 6,
      name: "Sunrise Girls PG",
      address: "Hutton Road, Asansol",
      rent: 6500,
      college: "Asansol Engineering College",
      available: 4,
      gender: "girls",
      status: "vacant",
      distance: 3.5,
      amenities: ["wifi", "food","ac"],
    },
    {
      id: 7,
      name: "Comfort PG",
      address: "Near SBSTC Bus Stand, Asansol",
      rent: 5500,
      college: "Asansol Engineering College",
      available: 0,
      gender: "girls",
      status: "full",
      distance: 1.1,
      amenities: ["wifi", "food"],
    },
    {
      id: 8,
      name: "Maple PG ",
      address: "Sen Raleigh Road, Asansol",
      rent: 7500,
      college: "Asansol Engineering College",
      available: 0,
      gender: "coed",
      status: "full",
      distance: 3.5,
      amenities: ["wifi", "food","ac","laundry"],
    },
  ];

  const amenityIcons = {
    wifi: <Wifi size={16} />,
    food: <UtensilsCrossed size={16} />,
    ac: <Snowflake size={16} />,
    laundry: <Droplet size={16} />,
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "vacant":
        return "bg-green-100 text-green-800";
      case "full":
        return "bg-red-100 text-red-800";
      case "few":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "vacant":
        return "Vacant";
      case "full":
        return "Full";
      case "few":
        return "Few Left";
      default:
        return "Unknown";
    }
  };

  //  Filter + Sort logic
  const filteredPGs = useMemo(() => {
    let data = [...pgListings];

    // Search
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      data = data.filter(
        (pg) =>
          pg.name.toLowerCase().includes(term) ||
          pg.college.toLowerCase().includes(term) ||
          pg.address.toLowerCase().includes(term)
      );
    }

    // Rent Range
    data = data.filter(
      (pg) => pg.rent >= filters.rentMin && pg.rent <= filters.rentMax
    );

    // Gender
    if (filters.gender !== "all") {
      data = data.filter((pg) => pg.gender === filters.gender);
    }

    // Distance
    data = data.filter((pg) => pg.distance <= filters.distance);

    // Vacancy
    if (filters.vacancy) {
      data = data.filter(
        (pg) => pg.status === "vacant" || pg.status === "few"
      );
    }

    // Sorting
    switch (sortBy) {
      case "Rent (Low→High)":
        data.sort((a, b) => a.rent - b.rent);
        break;
      case "Rent (High→Low)":
        data.sort((a, b) => b.rent - a.rent);
        break;
      case "Distance":
        data.sort((a, b) => a.distance - b.distance);
        break;
      case "Newest":
        data.sort((a, b) => b.id - a.id);
        break;
    }

    return data;
  }, [pgListings, searchTerm, filters, sortBy]);

  return (
    <div className="min-h-screen w-screen bg-[#FFFEF9] py-12 px-4 md:px-10 lg:px-16">
      <div className="w-full space-y-10">
        {/* 🔍 Search Bar */}
        <div className="w-full">
          <input
            type="text"
            placeholder="Search PG by College Name or City..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 bg-[#191919] border border-gray-700 rounded-lg text-white placeholder-white focus:border-green-500 focus:outline-none shadow-sm"
          />
        </div>

        {/* Filter Section */}
        <div className="bg-[#191919] rounded-xl p-6 shadow-lg border border-gray-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-center">
            {/* Rent */}
            <div className="min-w-0">
              <label className="block text-white text-sm font-medium mb-2">
                Rent: ₹{filters.rentMin / 1000}k - ₹{filters.rentMax / 1000}k
              </label>
              <input
                type="range"
                min="5000"
                max="50000"
                step="1000"
                value={filters.rentMax}
                onChange={(e) =>
                  setFilters({ ...filters, rentMax: parseInt(e.target.value) })
                }
                className="w-full accent-[#87E64B]"
              />
            </div>

            {/* Gender */}
            <div className="min-w-0">
              <label className="block text-white text-sm font-medium mb-2">
                Gender
              </label>
              <select
                value={filters.gender}
                onChange={(e) =>
                  setFilters({ ...filters, gender: e.target.value })
                }
                className="w-full px-3 py-2 bg-[#383838] rounded-lg text-white focus:border-green-500 focus:outline-none transition-all duration-200"
              >
                <option value="all">All</option>
                <option value="boys">Boys</option>
                <option value="girls">Girls</option>
                <option value="coed">Co-ed</option>
              </select>
            </div>

            {/* Distance */}
            <div className="min-w-0">
              <label className="block text-white text-sm font-medium mb-2">
                Distance: {filters.distance} km
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={filters.distance}
                onChange={(e) =>
                  setFilters({ ...filters, distance: parseInt(e.target.value) })
                }
                className="w-full accent-[#87E64B]"
              />
            </div>

            {/* Vacancy */}
            <div className="flex flex-col justify-center min-w-0">
              <label className="text-white text-sm font-medium mb-2">
                Vacancy
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.vacancy}
                  onChange={(e) =>
                    setFilters({ ...filters, vacancy: e.target.checked })
                  }
                  className="w-4 h-4 accent-green-500"
                />
                <span className="text-gray-300 text-sm">
                  Show only vacant/few
                </span>
              </label>
            </div>

            {/* Sort By */}
            <div className="min-w-0">
              <label className="block text-white text-sm font-medium mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 bg-[#383838] rounded-lg text-white focus:border-green-500 focus:outline-none"
              >
                <option>Rent (Low→High)</option>
                <option>Rent (High→Low)</option>
                <option>Distance</option>
                <option>Newest</option>
              </select>
            </div>
          </div>
        </div>

        {/* PG Listings */}
        {filteredPGs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredPGs.map((pg) => (
              <div
                key={pg.id}
                className="bg-[#191919] rounded-xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-transform duration-200 border border-gray-800"
              >
                <img
                  src={`/pg-room-${pg.id}.jpg`}
                  alt={pg.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {pg.name}
                      </h3>
                      <p className="text-sm text-gray-400">{pg.address}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        pg.status
                      )}`}
                    >
                      {getStatusText(pg.status)}
                    </span>
                  </div>

                  <p className="text-xl font-bold text-[#87E64B] mb-3">
                    ₹{pg.rent}/month
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {pg.amenities.map((amenity) => (
                      <div
                        key={amenity}
                        className="p-1 bg-gray-800 rounded text-gray-300"
                      >
                        {amenityIcons[amenity]}
                      </div>
                    ))}
                  </div>

                  <p className="text-sm text-gray-400 mb-4">
                    {pg.distance} km from {pg.college}
                  </p>

                  <Link to={`/pg/${pg.id}`} className="w-full px-4 py-2 bg-[#87E64B] text-black rounded-lg hover:transition font-semibold cursor-pointer">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-16">
            <img
              src="/empty-state-no-results.jpg"
              alt="No results"
              className="w-48 h-48 mx-auto mb-4 opacity-50"
            />
            <p className="text-gray-400 text-lg">
              Oops! No PGs found in this budget. Try adjusting filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
