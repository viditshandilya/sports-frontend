import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const [courts, setCourts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  /* ---------- FETCH COURTS ---------- */
  useEffect(() => {
    axios
      .get("https://sports-backend-8t4w.onrender.com/courts")
      .then((res) => {
        setCourts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API ERROR:", err);
        setLoading(false);
      });
  }, []);

  /* ---------- FILTER LOGIC (SAFE) ---------- */
  const filteredCourts = courts.filter((court) => {
    if (!search || search.trim() === "") return true;

    const q = search.toLowerCase();

    return (
      court.name.toLowerCase().includes(q) ||
      court.location.toLowerCase().includes(q) ||
      (court.sport && court.sport.toLowerCase().includes(q))
    );
  });

  return (
    <div>
      {/* ---------- HERO ---------- */}
      <div
        className="h-96 bg-cover bg-center text-white flex flex-col items-center justify-center gap-4"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438')",
        }}
      >
        <h1 className="text-4xl font-bold">Game On. Book Your Spot.</h1>

        {/* SEARCH BAR */}
        <input
          type="text"
          placeholder="Search by sport or venue..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-80 px-4 py-2 rounded-full text-black outline-none"
        />
      </div>

      {/* ---------- COURTS ---------- */}
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-xl font-bold mb-4">Available Venues</h2>

        {/* LOADING STATE */}
        {loading && <p className="text-gray-500">Loading venues...</p>}

        {/* EMPTY STATE */}
        {!loading && filteredCourts.length === 0 && (
          <p className="text-gray-500">No venues found</p>
        )}

        {/* COURT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredCourts.map((court) => (
            <div key={court.id} className="bg-white shadow rounded">
              <img
                src={court.image_url}
                alt={court.name}
                className="h-40 w-full object-cover"
              />

              <div className="p-4">
                {court.sport && (
                  <span className="text-xs uppercase text-green-600 font-semibold">
                    {court.sport}
                  </span>
                )}

                <h3 className="font-bold mt-1">{court.name}</h3>
                <p className="text-sm text-gray-600">{court.location}</p>

                <button
                  onClick={() => navigate(`/court/${court.id}`)}
                  className="mt-3 text-green-600 font-medium"
                >
                  Book Now →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
