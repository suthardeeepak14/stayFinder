import { useState, useEffect } from "react";
import SearchForm from "../components/SearchForm";
import PropertyCard from "../components/PropertyCard";
import { getListings } from "../api/listings";
import { useListings } from "../context/ListingContext";

const Homepage = () => {
  const { savedListings, toggleSavedListing } = useListings();
  const [allProperties, setAllProperties] = useState([]); // API data
  const [searchResults, setSearchResults] = useState([]); // Search filtered data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getListings(); // should return array
        setAllProperties(res);
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (searchData) => {
    const filtered = allProperties.filter((property) =>
      property.location
        .toLowerCase()
        .includes(searchData.location.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const propertiesToShow =
    searchResults.length > 0 ? searchResults : allProperties;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Find Your Perfect{" "}
              <span className="text-blue-600 block">Stay</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover unique places to stay around the world, from cozy
              apartments to luxury villas.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <SearchForm onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Featured or Search Results */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {searchResults.length > 0 ? "Search Results" : "Featured Stays"}
            </h2>
            <p className="text-lg text-gray-600">
              {searchResults.length > 0
                ? `Found ${searchResults.length} properties`
                : "Handpicked properties for your next adventure"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.isArray(propertiesToShow) &&
              propertiesToShow.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isSaved={savedListings.includes(property.id)}
                  onToggleSave={toggleSavedListing}
                />
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Hosting?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of hosts earning extra income by sharing their space.
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors shadow-lg">
            Become a Host
          </button>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
