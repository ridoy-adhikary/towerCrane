import React from "react";
import Navbar from "../components/Navbar.jsx";

export default function Home() {
  return (
    <div className="bg-gray-50 text-slate-900 min-h-screen flex flex-col">
      {/* Navbar at the top */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <Navbar />
      </header>

      {/* Hero Section */}
<section className="relative flex min-h-[90vh] items-center justify-center text-white overflow-hidden">
  {/* Background Video */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="/assets/tower.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  {/* Overlay to darken video (like your linear-gradient) */}
  <div className="absolute inset-0 bg-black/60"></div>

  {/* Content (same as before) */}
  <div className="container mx-auto px-6 text-center relative z-10">
    <h1 className="mb-4 text-5xl font-extrabold">
      Find Your Heavy Equipment
    </h1>
    <p className="mb-8 text-lg text-gray-200">
      Search cranes, trucks, and construction machinery.
    </p>
    <div className="relative mx-auto max-w-xl">
      <input
        type="text"
        placeholder="Search cranes, equipment..."
        className="w-full rounded-lg p-4 pr-32 text-gray-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
      <button className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-lg bg-amber-500 px-6 py-2 text-white font-semibold hover:scale-105 transition">
        Search
      </button>
    </div>
  </div>
</section>


      {/* Featured Products */}
      <section className="py-16 flex-1">
        <div className="container mx-auto px-6">
          <h2 className="mb-10 text-center text-4xl font-bold">
            Top Products
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Heavy Duty Crane",
                price: "$150,000",
                location: "New York, NY",
                img: "https://picsum.photos/600/400?1",
              },
              {
                title: "Mobile Crane",
                price: "$85,000",
                location: "Los Angeles, CA",
                img: "https://picsum.photos/600/400?2",
              },
              {
                title: "Construction Truck",
                price: "$60,000",
                location: "Chicago, IL",
                img: "https://picsum.photos/600/400?3",
              },
            ].map((p, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-lg bg-white shadow-lg hover:scale-105 transform transition"
              >
                <img
                  src={p.img}
                  alt={p.title}
                  className="h-64 w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold">{p.title}</h3>
                  <p className="mt-2 text-lg font-semibold text-amber-500">
                    {p.price}
                  </p>
                  <p className="text-slate-600">{p.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-amber-500 py-20 text-center text-white">
        <h2 className="text-4xl font-extrabold">Sell Your Equipment Today</h2>
        <p className="mt-3 text-lg">Easy and Fast</p>
        <button className="mt-8 rounded-lg bg-white text-amber-600 px-10 py-3 text-lg font-semibold shadow hover:scale-105 transition">
          Get Started
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-4 px-6">
          <div>
            <h3 className="text-lg font-bold text-white">EquipTrade</h3>
            <p className="mt-4 text-sm">
              The best marketplace for heavy equipment.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {["About Us", "Contact", "Privacy Policy", "Terms of Service"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="hover:text-amber-400 transition text-sm"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Contact Us</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>123 Equipment Lane, Construction City, USA</li>
              <li>Email: contact@equiptrade.com</li>
              <li>Phone: (123) 456-7890</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Follow Us</h3>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="hover:text-amber-400">
                🌐
              </a>
              <a href="#" className="hover:text-amber-400">
                🐦
              </a>
              <a href="#" className="hover:text-amber-400">
                📸
              </a>
            </div>
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-slate-500">
          © 2024 EquipTrade. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
