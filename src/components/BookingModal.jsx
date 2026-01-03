import { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";

export default function BookingModal({ court, onClose }) {
  const [date, setDate] = useState(new Date());
  const [slotId, setSlotId] = useState(null);
  const [time, setTime] = useState("");
  const [success, setSuccess] = useState(false);

  // Optional user details
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const confirmBooking = async () => {
    if (!slotId || !time) {
      toast.error("Please select date and time");
      return;
    }

    try {
      await axios.post("https://sports-backend-8t4w.onrender.com/book", {
        slotId,
        date: date.toISOString().split("T")[0],
        time,
        customerName: name || null,
        customerEmail: email || null,
        customerPhone: phone || null,
      });

      toast.success("Booking Confirmed 🎉");
      setSuccess(true);
    } catch (err) {
      toast.error("Booking failed. Try again.");
    }
  };

  /* ---------- SUCCESS SCREEN ---------- */
  if (success) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded text-center w-96">
          <h2 className="text-xl font-bold text-green-600">
            Booking Confirmed!
          </h2>
          <p className="text-gray-600 mt-2">
            See you on {date.toDateString()} at {time}
          </p>
          <button
            onClick={() => {
              onClose();
              window.location.reload(); // refresh slots
            }}
            className="mt-6 px-4 py-2 border rounded"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  /* ---------- BOOKING FORM ---------- */
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-96">
        <h3 className="font-bold mb-4">Select Date & Time</h3>

        {/* DATE PICKER */}
        <DatePicker
          selected={date}
          onChange={(d) => setDate(d)}
          minDate={new Date()}
          className="w-full border p-2 rounded mb-4"
        />

        {/* TIME SLOTS */}
        {court.slots.map((slot) => (
          <button
            key={slot.id}
            disabled={!slot.available}
            onClick={() => {
              setSlotId(slot.id);
              setTime(slot.time);
            }}
            className={`block w-full mb-2 p-2 rounded text-sm
              ${
                !slot.available
                  ? "bg-gray-300 cursor-not-allowed"
                  : slotId === slot.id
                  ? "bg-green-500 text-white"
                  : "bg-gray-100"
              }`}
          >
            {slot.time} {!slot.available && "(Booked)"}
          </button>
        ))}

        {/* OPTIONAL USER DETAILS */}
        <div className="mt-4 space-y-2">
          <input
            type="text"
            placeholder="Full Name (optional)"
            className="w-full border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email (optional)"
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone (optional)"
            className="w-full border p-2 rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <button
          onClick={confirmBooking}
          disabled={!slotId}
          className="mt-4 bg-green-500 text-white w-full py-2 rounded disabled:bg-gray-400"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
