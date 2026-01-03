import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BookingModal from "../components/BookingModal";

export default function CourtDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [court, setCourt] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/courts").then((res) => {
      const found = res.data.find((c) => c.id === Number(id));
      setCourt(found);
    });
  }, [id]);

  if (!court) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 min-h-screen">
      {/* LEFT IMAGE */}
      <div
        className="bg-cover bg-center relative"
        style={{ backgroundImage: `url(${court.image_url})` }}
      >
        <button
          onClick={() => navigate("/")}
          className="absolute top-6 left-6 bg-white/90 px-4 py-2 rounded text-sm shadow"
        >
          ← Back to Courts
        </button>
      </div>

      {/* RIGHT CONTENT */}
      <div className="p-10 flex flex-col justify-center">
        <h1 className="text-3xl font-bold mb-2">{court.name}</h1>
        <p className="text-gray-600 mb-6">{court.location}</p>

        {/* INFO CARDS */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="border p-4 rounded">
            <p className="text-xs text-gray-500">RATE</p>
            <p className="font-bold">₹{court.price_per_hour || 500}/hr</p>
          </div>
          <div className="border p-4 rounded">
            <p className="text-xs text-gray-500">OPEN</p>
            <p className="font-bold">9:00 AM – 9:00 PM</p>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">About this venue</h3>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>Professional grade court</li>
            <li>Lighting available for night games</li>
            <li>Equipment rental available</li>
          </ul>
        </div>

        {/* CTA */}
        <button
          onClick={() => setOpen(true)}
          className="bg-green-500 text-white py-3 rounded font-medium"
        >
          Book This Court
        </button>
      </div>

      {/* MODAL */}
      {open && (
        <BookingModal
          court={court}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
