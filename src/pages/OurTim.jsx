import React from "react";
import teamMembers from "../DataTeam.json";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
export default function OurTim() {
  return (
    <section className="font-podkova bg-gradient-to-r from-green-100 via-green-50 to-green-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-extrabold text-green-900 mb-12 text-center tracking-wide">
          Meet Our Team
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {teamMembers.map(({ id, name, position, photo }) => (
            <div
              key={id}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105"
            >
              <div className="w-36 h-36 rounded-full overflow-hidden mb-5 border-4 border-green-400 shadow-md">
                <img
                  src={photo}
                  alt={name}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                />
              </div>

              <h3 className="text-2xl font-semibold text-green-800">{name}</h3>
              <p className="text-green-600 mb-3 italic">{position}</p>

              <p className="text-gray-600 px-4 mb-6">
                Passionate about delivering the best branded shoes with excellent service and quality.
              </p>

              <div className="flex space-x-6 text-green-600 text-xl">
                <a href="#" aria-label={`${name} LinkedIn`} className="hover:text-green-800 transition">
                  <FaLinkedin />
                </a>
                <a href="#" aria-label={`${name} Twitter`} className="hover:text-green-800 transition">
                  <FaTwitter />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
