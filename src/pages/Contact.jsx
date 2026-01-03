export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <div className="space-y-4 text-gray-700">
        <p>
          <strong>Email:</strong> support@cridaa.com
        </p>
        <p>
          <strong>Phone:</strong> +91 98765 43210
        </p>
        <p>
          <strong>Address:</strong> Bangalore, India
        </p>
      </div>

      <form className="mt-8 space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="Your Message"
          rows="4"
          className="w-full border p-2 rounded"
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Send Message
        </button>
      </form>
    </div>
  );
}
