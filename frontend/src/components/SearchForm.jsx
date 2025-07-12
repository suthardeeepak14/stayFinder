import { useState } from "react";
import { Search, MapPin, Calendar, Users } from "lucide-react";

const SearchForm = ({ onSearch }) => {
  const [searchData, setSearchData] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchData);
  };

  const handleChange = (field, value) => {
    setSearchData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        {/* Location */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Where
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search destinations"
              value={searchData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Check-in */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Check-in
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              value={searchData.checkIn}
              onChange={(e) => handleChange("checkIn", e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Check-out */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Check-out
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              value={searchData.checkOut}
              onChange={(e) => handleChange("checkOut", e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Guests */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Guests
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={searchData.guests}
              onChange={(e) =>
                handleChange("guests", Number.parseInt(e.target.value))
              }
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "Guest" : "Guests"}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className="md:col-span-4 flex justify-center mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2 shadow-lg"
          >
            <Search className="w-5 h-5" />
            <span>Search</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
