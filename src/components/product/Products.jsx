import React, { useEffect, useMemo, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const backendURL = "http://localhost:3000";

const PlaceCard = ({ id, img, title, location, description, price, type }) => {
  const navigate = useNavigate();

  const go = (e) => {
    e?.stopPropagation?.();
    navigate(`/product/${id}`);
  };

  return (
    <div
      className="shadow-lg transition-all duration-500 hover:shadow-xl bg-white text-black cursor-pointer"
      onClick={go}
    >
      <div className="overflow-hidden">
        <img
          src={img}
          alt={title || "Venue"}
          className="mx-auto h-[220px] w-full object-cover transition duration-700 hover:skew-x-2 hover:scale-110"
        />
      </div>

      <div className="space-y-2 p-3">
        <h1 className="line-clamp-1 font-bold text-xl">{title}</h1>

        <div className="flex items-center gap-2 opacity-70">
          <IoLocationSharp />
          <span>{location}</span>
        </div>

        <p className="line-clamp-2">{description}</p>

        <div className="flex items-center justify-between border-t-2 py-3 !mt-3">
          <div className="opacity-70">
            <p>{type}</p>
          </div>
          <div>
            <p className="text-xl font-bold">Rs {price}</p>
          </div>
        </div>

        <button
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 w-full"
          onClick={go}
        >
          View More
        </button>
      </div>
    </div>
  );
};

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-20 py-12">
      {products.map((product) => {
        const firstImg = product?.images?.[0];
        const imageUrl = firstImg
          ? firstImg.startsWith("/")
            ? `${backendURL}${firstImg}`
            : firstImg
          : "https://via.placeholder.com/600x400?text=No+Image";

        return (
          <PlaceCard
            key={product._id}
            id={product._id}
            img={imageUrl}
            title={product.name}
            location={product.location}
            description={product.description}
            price={`${Number(product.price) || 0}/night`}
            type="veg/non-veg"
          />
        );
      })}
    </div>
  );
};

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [locations, setLocations] = useState([]);
  const [capacities, setCapacities] = useState([]);

  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCapacity, setSelectedCapacity] = useState(0);

  const [priceRange, setPriceRange] = useState([0, 100000]); // ✅ bigger default

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch(`${backendURL}/api/venues`);
        if (!response.ok) throw new Error("Failed to fetch venues");

        const data = await response.json();

        // ✅ Normalize types (price/capacity sometimes saved as string)
        const normalized = (Array.isArray(data) ? data : []).map((v) => ({
          ...v,
          price: Number(v.price),
          capacity: Number(v.capacity),
          available:
            v.available === true || String(v.available).toLowerCase() === "true",
        }));

        setProducts(normalized);

        setLocations([
          ...new Set(normalized.map((v) => v.location).filter(Boolean)),
        ]);

        setCapacities([
          ...new Set(
            normalized
              .map((v) => v.capacity)
              .filter((n) => Number.isFinite(n))
          ),
        ]);
      } catch (error) {
        console.error("Error fetching venues:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const nameOk = (p.name || "")
        .toLowerCase()
        .includes(search.toLowerCase());

      const locationOk =
        selectedLocation === "" || p.location === selectedLocation;

      const priceVal = Number(p.price) || 0;
      const priceOk = priceVal >= priceRange[0] && priceVal <= priceRange[1];

      const capOk =
        selectedCapacity === 0 ||
        Number(p.capacity) === Number(selectedCapacity);

      return nameOk && locationOk && priceOk && capOk;
    });
  }, [products, search, selectedLocation, selectedCapacity, priceRange]);

  return (
    <>
      <div className="p-6 md:px-20">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Search hotel..."
            className="border p-3 rounded w-full md:w-1/3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border p-3 rounded w-full md:w-1/4"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">Select Location</option>
            {locations.map((loc, index) => (
              <option key={index} value={loc}>
                {loc}
              </option>
            ))}
          </select>

          <select
            className="border p-3 rounded w-full md:w-1/6"
            value={selectedCapacity}
            onChange={(e) => setSelectedCapacity(Number(e.target.value))}
          >
            <option value="0">Select Capacity</option>
            {capacities.map((cap, index) => (
              <option key={index} value={cap}>
                {cap}
              </option>
            ))}
          </select>

          <div className="flex gap-2 items-center w-full md:w-1/4">
            <label>Rs:</label>
            <input
              type="number"
              className="border p-2 rounded w-1/2"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([Number(e.target.value || 0), priceRange[1]])
              }
            />
            <span>-</span>
            <input
              type="number"
              className="border p-2 rounded w-1/2"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value || 0)])
              }
            />
          </div>
        </div>

        <p className="mt-4 text-sm text-gray-600">
          Showing <span className="font-semibold">{filteredProducts.length}</span>{" "}
          hotel
        </p>
      </div>

      {loading ? (
        <div className="text-center text-xl font-bold py-12">
          Loading Venues...
        </div>
      ) : (
        <ProductGrid products={filteredProducts} />
      )}
    </>
  );
};

export default Product;