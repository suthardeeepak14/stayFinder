import { Heart, Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const PropertyCard = ({ property, isSaved, onToggleSave }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative">
        <img
          src={property.image || "/placeholder.svg?height=240&width=320"}
          alt={property.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={() => onToggleSave(property.id)}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isSaved
                ? "text-red-500 fill-red-500"
                : "text-gray-600 hover:text-red-500"
            }`}
          />
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-lg leading-tight">
            {property.title}
          </h3>
          <div className="flex items-center space-x-1 ml-2">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium text-gray-700">
              {property.rating}
            </span>
          </div>
        </div>

        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-gray-900">
              ${property.pricePerNight}
            </span>
            <span className="text-gray-600 text-sm ml-1">/ night</span>
          </div>

          <Link
            to={`/property/${property.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
