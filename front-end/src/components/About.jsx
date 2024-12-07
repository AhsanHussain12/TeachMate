import React from 'react'

export default function About() {
    return (
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 text-gray-600 md:px-12 xl:px-6">
          {/* Section 1 */}
          <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
            <div className="md:w-5/12 lg:w-6/12">
              <img
                className="rounded-lg shadow-lg"
                src="https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Developers working together"
              />
            </div>
            <div className="md:w-7/12 lg:w-6/12">
              <h2 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
                Meet the Visionaries Behind TeachMate
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-700">
                At TeachMate, our team of passionate developers strives to create
                meaningful connections between students and tutors. With cutting-edge
                technology and a user-centric approach, we ensure seamless interaction and
                excellent user experience.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-gray-700">
                We believe in bridging the gap between knowledge seekers and educators
                through innovation, dedication, and a relentless commitment to excellence.
              </p>
            </div>
          </div>
  
          {/* Section 2 */}
          <div className="mt-20 space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
            <div className="md:w-5/12 lg:w-6/12">
              <img
                className="rounded-lg shadow-lg"
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Developers brainstorming"
              />
            </div>
            <div className="md:w-7/12 lg:w-6/12">
              <h2 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
                A Platform Built for Success
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-700">
                From intuitive dashboards to robust ad management systems, TeachMate is
                built to empower students and tutors alike. Our team uses best-in-class
                practices to ensure scalability, reliability, and efficiency in every
                feature we develop.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-gray-700">
                Join a platform that's transforming the way education is delivered,
                one connection at a time. TeachMate is not just a product; it's a
                promise to redefine learning experiences worldwide.
              </p>
            </div>
          </div>
  
          {/* Developer Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-extrabold text-center text-gray-900 md:text-4xl">
              Meet the Developers
            </h2>
            <p className="mt-4 text-lg text-center text-gray-700">
              TeachMate was brought to life by two talented developers who are passionate about
              crafting exceptional user experiences.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-12">
              {/* Ahsan */}
              <div className="w-full sm:w-1/2 lg:w-1/3 text-center">
                <img
                  className="mx-auto rounded-full w-32 h-32 object-cover shadow-md"
                  src="/assets/Ahsan.jpg"
                  alt="Ahsan"
                />
                <h3 className="mt-4 text-xl font-bold text-gray-900">Ahsan</h3>
                <p className="mt-2 text-gray-700">
                  Ahsan specializes in crafting robust backend solutions and ensuring that
                  TeachMate operates seamlessly for users across the globe.
                </p>
              </div>
  
              {/* Asshad */}
              <div className="w-full sm:w-1/2 lg:w-1/3 text-center">
                <img
                  className="mx-auto rounded-full w-32 h-32 object-cover shadow-md"
                  src="/assets/Asshad.JPG"
                  alt="Asshad"
                />
                <h3 className="mt-4 text-xl font-bold text-gray-900">Asshad</h3>
                <p className="mt-2 text-gray-700">
                  Asshad brings an eye for design and a knack for solving complex problems,
                  delivering a user-friendly and visually appealing platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  