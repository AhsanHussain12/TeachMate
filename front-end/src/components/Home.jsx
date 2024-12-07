import React from "react";
import { FaUserAlt } from 'react-icons/fa';
export default function Home() {
  return (
    <div className="mx-auto w-full max-w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-500 to-orange-700 text-white py-20 px-6 sm:px-16">
        <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between">
          <div className="text-center sm:text-left sm:w-1/2">
            <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight ">
              Empower Your Learning With Us  <br />
             
            </h1>
            <p className="mt-6 text-lg sm:text-xl font-light text-black">
              Revolutionizing the way students and tutors connect. Join
              thousands of users worldwide to unlock better learning
              opportunities.
            </p>
          </div>
          <div className="mt-10 sm:mt-0 sm:w-1/2 flex justify-center">
            <img
              className="rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300"
              src="/assets/LOGO.jpg"
              alt="Hero section"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-100">
        <div className="text-center max-w-5xl mx-auto mb-12">
          <h2 className="text-4xl font-bold text-gray-800">
            Why Choose TeachMate?
          </h2>
          <p className="mt-4 text-gray-600">
            Our platform offers the perfect blend of innovation, convenience,
            and results for students, tutors, and parents alike.
          </p>
        </div>
        <div className="grid sm:grid-cols-3 gap-8 px-6 sm:px-16">
          {[
            {
              title: "Personalized Learning",
              description:
                "Students post detailed ads ensuring tailored matches with expert tutors.",
              icon: "📚",
            },
            {
              title: "Global Reach",
              description:
                "We operate in 50+ regions, connecting diverse communities to education.",
              icon: "🌍",
            },
            {
                title: "Free of Cost",
                description:
                  "TeachMate is a free platform for both students and tutors, making education accessible to everyone.",
                icon: "💸",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-orange-700 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Swipeable Cards */}
      <section className="py-20 bg-white">
        <div className="text-center max-w-5xl mx-auto mb-12">
          <h2 className="text-4xl font-bold text-gray-800">
            How TeachMate Works
          </h2>
        </div>
        <div className="flex overflow-x-auto space-x-6 px-6 sm:px-16 snap-x snap-mandatory">
          {[
            {
              title: "Ad Submission",
              description:
                "Students post ads specifying their requirements. Tutors apply to ads that match their expertise.",
              img: "https://via.placeholder.com/300x200",
            },
            {
              title: "Secure Matches",
              description:
                "Our system matches tutors and students based on skills and subject needs.",
              img: "https://via.placeholder.com/300x200",
            },
            {
              title: "Seamless Sessions",
              description:
                "Automated scheduling ensures every session is set up for success.",
              img: "https://via.placeholder.com/300x200",
            },
          ].map((step, idx) => (
            <div
              key={idx}
              className="snap-center bg-gray-100 text-black w-80 p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <img
                src={step.img}
                alt={step.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

    {/* Testimonials */}
    <section className="py-20 bg-gray-100">
    <div className="text-center max-w-5xl mx-auto mb-12">
        <h2 className="text-4xl font-bold text-gray-800">
        What People Say About Us
        </h2>
    </div>
    <div className="grid sm:grid-cols-3 gap-8 px-6 sm:px-16">
        {[
        {
            name: "Sophia, Parent",
            feedback:
            "TeachMate helped my child find the perfect tutor for advanced math. Highly recommended!",
            icon: <FaUserAlt />, // Use the icon here
        },
        {
            name: "Jake, Student",
            feedback:
            "This platform made finding an English tutor so easy. My grades improved significantly!",
            icon: <FaUserAlt />, // Use the icon here
        },
        {
            name: "Emma, Tutor",
            feedback:
            "I've connected with amazing students. The platform is intuitive and highly professional.",
            icon: <FaUserAlt />, // Use the icon here
        },
        ].map((testimonial, idx) => (
        <div
            key={idx}
            className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
        >
            {/* Icon display instead of an image */}
            <div className="text-4xl text-orange-700 mb-4">{testimonial.icon}</div>
            <h3 className="text-lg font-semibold text-orange-700 mb-3">
            {testimonial.name}
            </h3>
            <p className="text-gray-600">{testimonial.feedback}</p>
        </div>
        ))}
    </div>
    </section>
    </div>
  );
}
