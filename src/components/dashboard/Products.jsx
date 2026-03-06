import axios from "axios";
import React, { useEffect, useState } from "react";

const Products = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [venueData, setVenueData] = useState({
    name: "",
    location: "",
    capacity: "",
    price: "",
    description: "",
    available: true,
    images: null,
    existingImages: [],
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [editVenueId, setEditVenueId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteVenueId, setDeleteVenueId] = useState(null);

  const token = localStorage.getItem("token");
  const API = "http://localhost:3000";

  const fetchVenues = async () => {
    try {
      const response = await axios.get(`${API}/api/venues`);
      setVenues(response.data);
      setError("");
    } catch (err) {
      console.log("FETCH VENUES ERROR:", err?.response?.data || err.message);
      setError("Failed to fetch venues. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  const openModal = (venue = null) => {
    setValidationErrors({});
    setError("");

    if (venue) {
      setVenueData({
        name: venue.name || "",
        location: venue.location || "",
        capacity: venue.capacity || "",
        price: venue.price || "",
        description: venue.description || "",
        available: venue.available ?? true,
        images: null,
        existingImages: venue.images || [],
      });
      setEditVenueId(venue._id);
    } else {
      setVenueData({
        name: "",
        location: "",
        capacity: "",
        price: "",
        description: "",
        available: true,
        images: null,
        existingImages: [],
      });
      setEditVenueId(null);
    }

    setIsModalOpen(true);
  };

  const validateForm = () => {
    const errors = {};
    if (!venueData.name?.trim()) errors.name = "Name is required";
    if (!venueData.location?.trim()) errors.location = "Location is required";
    if (!venueData.capacity || Number(venueData.capacity) <= 0)
      errors.capacity = "Capacity must be greater than 0";
    if (!venueData.price || Number(venueData.price) <= 0)
      errors.price = "Price must be greater than 0";
    if (!venueData.description?.trim())
      errors.description = "Description is required";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    setError("");
    if (!validateForm()) return;

    if (!token) {
      setError("You are not logged in. Please login first.");
      return;
    }

    const formData = new FormData();

    Object.entries(venueData).forEach(([key, value]) => {
      if (key === "images") {
        if (value && value.length) {
          Array.from(value).forEach((file) => formData.append("images", file));
        }
        return;
      }

      if (key === "existingImages") return;

      if (key === "available") {
        formData.append("available", String(value));
        return;
      }

      formData.append(key, value);
    });

    if (editVenueId && (!venueData.images || venueData.images.length === 0)) {
      formData.append(
        "existingImages",
        JSON.stringify(venueData.existingImages || []),
      );
    }

    try {
      if (editVenueId) {
        const response = await axios.put(
          `${API}/api/venues/${editVenueId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              // ✅ DO NOT set Content-Type manually
            },
          },
        );

        const updated = response.data.updatedVenue || response.data.venue;

        if (updated?._id) {
          setVenues((prev) =>
            prev.map((v) => (v._id === editVenueId ? updated : v)),
          );
        } else {
          await fetchVenues();
        }
      } else {
        const response = await axios.post(`${API}/api/venues`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            // ✅ DO NOT set Content-Type manually
          },
        });

        const created = response.data.venue || response.data;

        if (created?._id) {
          setVenues((prev) => [created, ...prev]);
        } else {
          await fetchVenues();
        }
      }

      setIsModalOpen(false);
      setEditVenueId(null);
      setVenueData({
        name: "",
        location: "",
        capacity: "",
        price: "",
        description: "",
        available: true,
        images: null,
        existingImages: [],
      });
    } catch (err) {
      console.log("ADD/EDIT VENUE ERROR:", err);
      console.log("STATUS:", err?.response?.status);
      console.log("DATA:", err?.response?.data);

      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.details ||
        "Failed to process the request. Please try again.";

      setError(msg);
    }
  };

  const handleDeleteVenue = async () => {
    setError("");

    if (!token) {
      setError("You are not logged in. Please login first.");
      return;
    }

    try {
      await axios.delete(`${API}/api/venues/${deleteVenueId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setVenues((prev) => prev.filter((v) => v._id !== deleteVenueId));
      setDeleteVenueId(null);
    } catch (err) {
      console.log("DELETE VENUE ERROR:", err?.response?.data || err.message);
      setError(
        err?.response?.data?.error ||
          "Failed to delete venue. Please try again.",
      );
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4">Hotel</h2>

      {error && (
        <div className="mb-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        onClick={() => openModal()}
        className="bg-green-500 text-white px-4 py-1 rounded mb-4"
      >
        Add 
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">
              {editVenueId ? "Edit Venue" : "Add Venue"}
            </h3>

            {["name", "location", "capacity", "price", "description"].map(
              (field) => (
                <div key={field} className="mb-2">
                  <input
                    type={
                      field === "capacity" || field === "price"
                        ? "number"
                        : "text"
                    }
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={venueData[field]}
                    onChange={(e) =>
                      setVenueData({ ...venueData, [field]: e.target.value })
                    }
                    className={`border px-2 py-1 rounded w-full ${
                      validationErrors[field]
                        ? "border-red-500"
                        : "border-green-500"
                    }`}
                  />
                  {validationErrors[field] && (
                    <p className="text-red-500 text-sm">
                      {validationErrors[field]}
                    </p>
                  )}
                </div>
              ),
            )}

            <div className="mb-2">
              <label className="text-sm font-medium block mb-1">
                Availability
              </label>
              <select
                value={String(venueData.available)}
                onChange={(e) =>
                  setVenueData({
                    ...venueData,
                    available: e.target.value === "true",
                  })
                }
                className="border px-2 py-1 rounded w-full border-green-500"
              >
                <option value="true">Available</option>
                <option value="false">Booked</option>
              </select>
            </div>

            <input
              type="file"
              multiple
              onChange={(e) =>
                setVenueData({ ...venueData, images: e.target.files })
              }
              className="border px-2 py-1 rounded mb-2 w-full"
            />

            {editVenueId && venueData.existingImages?.length > 0 && (
              <p className="text-xs text-gray-500 mb-2">
                Existing images will be kept if you don’t upload new ones.
              </p>
            )}

            <div className="flex justify-between">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-1 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white px-4 py-1 rounded"
              >
                {editVenueId ? "Save Changes" : "Add Venue"}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteVenueId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to delete?
            </h3>
            <div className="flex justify-between">
              <button
                onClick={() => setDeleteVenueId(null)}
                className="bg-gray-500 text-white px-4 py-1 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteVenue}
                className="bg-red-500 text-white px-4 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <p>Loading venues...</p>
      ) : (
        <div className="w-full overflow-scroll sm:overflow-visible">
          <table className="w-full min-w-max border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Image</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Location</th>
                <th className="border px-4 py-2">Capacity</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Availability</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {venues.map((venue) => (
                <tr key={venue._id} className="border">
                  <td className="border px-4 py-2">
                    {venue.images?.[0] && (
                      <img
                        src={`${API}${venue.images[0]}`}
                        alt="venue"
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="border px-4 py-2">{venue.name}</td>
                  <td className="border px-4 py-2">{venue.location}</td>
                  <td className="border px-4 py-2">{venue.capacity}</td>
                  <td className="border px-4 py-2">Rs {venue.price}</td>
                  <td className="border px-4 py-2">
                    {venue.available ? "Available" : "Booked"}
                  </td>
                  <td className="border px-4 py-2">
                    {venue.description?.split(" ").length > 4
                      ? venue.description.split(" ").slice(0, 4).join(" ") +
                        "..."
                      : venue.description}
                  </td>
                  <td className="border px-4 py-2 whitespace-nowrap text-center">
                    <button
                      onClick={() => openModal(venue)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteVenueId(venue._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {venues.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="border px-4 py-6 text-center text-gray-500"
                  >
                    No venues found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Products;
