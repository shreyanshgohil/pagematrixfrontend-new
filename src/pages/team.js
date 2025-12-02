import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { getTeamMemberImage } from "../utils/teamImages";
import {
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBuilding,
  FaUsers,
  FaAward,
  FaGraduationCap,
  FaBriefcase,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

const Team = () => {
  const teamMembers = [
    {
      name: "Jayveer Chavda",
      position: "Founder & CEO",
      initials: "JC",
      bio: "Performance optimization veteran with 3+ years of experience in web development and PageSpeed analysis.",
      experience: "3+ Years",
      education: "Web Performance Expert",
    },
    {
      name: "Shreyansh Gohil",
      position: "Chief Technology Officer",
      initials: "SG",
      bio: "Tech innovator passionate about using PageSpeed API to solve real-world performance problems.",
      experience: "5+ Years",
      education: "Computer Science",
    },
    {
      name: "Harshad Tahiliani",
      position: "Full Stack Developer",
      initials: "HT",
      bio: "Performance expert ensuring smooth developer experience and platform efficiency for PageSpeed analysis.",
      experience: "4+ Years",
      education: "Software Engineering",
    },
    {
      name: "Jayprakash Khatri",
      position: "Head of Marketing",
      initials: "JK",
      bio: "Marketing strategist focused on building brand awareness and developer community engagement.",
      experience: "3+ Years",
      education: "Marketing & Business",
    },
    {
      name: "Shruti Patel",
      position: "Senior Frontend Developer",
      initials: "SP",
      bio: "Developer advocate ensuring every user has an exceptional experience with our PageSpeed analysis platform.",
      experience: "3+ Years",
      education: "Frontend Development",
    },
    {
      name: "Mahak Mujawdiya",
      position: "Junior Backend Developer",
      initials: "MM",
      bio: "Passionate backend developer with a focus on building scalable APIs and optimizing PageSpeed analysis performance.",
      experience: "2+ Years",
      education: "Backend Development",
    },
  ].map((member) => ({
    ...member,
    image: getTeamMemberImage(member.name),
  }));

  const stats = [
    {
      number: "6",
      label: "Team Members",
      icon: <FaUsers />,
      color: "from-brand-theme to-brand-theme-600",
    },
    {
      number: "2+",
      label: "Years Experience",
      icon: <FaBriefcase />,
      color: "from-brand-blue-700 to-brand-blue-800",
    },
    {
      number: "1000+",
      label: "Websites Tested",
      icon: <FaAward />,
      color: "from-brand-theme-600 to-brand-theme-800",
    },
    {
      number: "100%",
      label: "Developer Satisfaction",
      icon: <FaCheckCircle />,
      color: "from-brand-blue-800 to-brand-theme",
    },
  ];

  const values = [
    {
      title: "Innovation",
      description:
        "We constantly innovate to provide the best PageSpeed analysis solutions using cutting-edge technology.",
      icon: <FaBuilding />,
      color: "from-brand-theme to-brand-theme-600",
    },
    {
      title: "Integrity",
      description:
        "We maintain the highest standards of accuracy and transparency in all our PageSpeed analysis and API responses.",
      icon: <FaCheckCircle />,
      color: "from-brand-blue-700 to-brand-blue-800",
    },
    {
      title: "Excellence",
      description:
        "We strive for excellence in everything we do, from developer support to platform performance optimization.",
      icon: <FaAward />,
      color: "from-brand-theme-600 to-brand-theme-800",
    },
    {
      title: "Growth",
      description:
        "We believe in continuous learning and growth, both personally and professionally, to serve our developer community better.",
      icon: <FaGraduationCap />,
      color: "from-brand-blue-800 to-brand-theme",
    },
  ];

  return (
    <>
      <Head>
        <title>Our Team - PageSpeed Performance Tool | Meet the Experts</title>
        <meta
          name="description"
          content="Meet the talented team behind our PageSpeed performance tool. Our experts are dedicated to helping developers optimize website performance with years of experience and PageSpeed API expertise."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-br from-brand-blue-700 via-brand-blue-800 to-brand-theme-600 py-20 sm:py-24 lg:py-32 overflow-hidden">
            {/* Enhanced Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Main Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-700/90 via-brand-blue-800/80 to-brand-theme-600/70"></div>

              {/* Animated Background Shapes */}
              {/* <div className="absolute top-20 left-4 sm:left-10 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-r from-brand-theme/30 to-brand-theme-600/30 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-20 right-4 sm:right-10 w-56 sm:w-80 h-56 sm:h-80 bg-gradient-to-l from-brand-blue-700/30 to-brand-theme/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 sm:w-72 h-48 sm:h-72 bg-gradient-to-r from-brand-theme/20 to-brand-blue-700/20 rounded-full blur-2xl animate-pulse delay-500"></div> */}

              {/* Additional Floating Elements */}
              <div className="absolute top-1/4 right-1/4 w-32 sm:w-48 h-32 sm:h-48 bg-gradient-to-r from-brand-theme/15 to-brand-blue-700/15 rounded-full blur-2xl animate-pulse delay-700"></div>
              <div className="absolute bottom-1/4 left-1/4 w-40 sm:w-56 h-40 sm:h-56 bg-gradient-to-r from-brand-blue-700/15 to-brand-theme/15 rounded-full blur-2xl animate-pulse delay-300"></div>

              {/* Enhanced Grid Pattern */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              ></div>

              {/* Subtle Wave Pattern */}
              <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-32 bg-gradient-to-t from-white/10 to-transparent"></div>
            </div>

            <div className="container--boxed relative z-10 px-4 sm:px-6 lg:px-8 w-full py-12 lg:pt-8 lg:py-16">
              <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-white/20 mb-6 sm:mb-8">
                  <FaUsers className="h-4 w-4 sm:h-5 sm:w-5 text-brand-theme" />
                  <span className="text-xs sm:text-sm font-semibold text-brand-blue-800">
                    Meet Our Team
                  </span>
                </div>

                {/* Teal Line */}
                <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-6 sm:mb-8"></div>

                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight">
                  <span className="block">Meet Our</span>
                  <span className="bg-gradient-to-r from-brand-theme to-yellow-400 bg-clip-text text-transparent">
                    Expert Team
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-white/90 max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed">
                  Our diverse team of performance optimization experts,
                  technologists and industry professionals work together to
                  provide you with the best PageSpeed analysis solutions and
                  exceptional developer experience.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="py-16 sm:py-20 bg-gradient-to-br from-brand-gray-300 to-white">
            <div className="container--boxed px-4 sm:px-6 lg:px-8">
              {/* Teal Line */}
              <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-6 sm:mb-8"></div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-blue-800 text-center mb-8 sm:mb-12 lg:mb-16">
                Team Statistics
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-12 sm:gap-x-6 sm:gap-y-6 lg:gap-x-8 lg:gap-y-8 sm:mb-16">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${stat.color} rounded-xl sm:rounded-2xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <div className="text-white text-lg sm:text-xl">
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-blue-800 mb-1 sm:mb-2">
                      {stat.number}
                    </div>
                    <div className="text-xs sm:text-sm text-brand-gray-500 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Team Members Section */}
          <div className="py-16 sm:py-20 bg-white">
            <div className="container--boxed px-4 sm:px-6 lg:px-8">
              {/* Teal Line */}
              <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-6 sm:mb-8"></div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-blue-800 text-center mb-8 sm:mb-12 lg:mb-16">
                Leadership Team
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="group bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/30"
                  >
                    <div className="text-center">
                      <div className="relative mb-4 sm:mb-6">
                        <div className="w-20 h-20 sm:w-36 sm:h-36 rounded-full mx-auto group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                          {member.image ? (
                            <Image
                              src={member.image}
                              alt={`${member.name} - ${member.position}`}
                              width={500}
                              height={500}
                              className="w-full h-full object-cover"
                              priority={index < 3}
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-brand-gray-200 to-brand-gray-300 flex items-center justify-center group-hover:from-brand-gray-300 group-hover:to-brand-gray-400 transition-all duration-300">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-brand-gray-400 rounded-full flex items-center justify-center group-hover:bg-brand-gray-500 transition-colors duration-300">
                                <svg
                                  className="w-4 h-4 sm:w-5 sm:h-5 text-brand-gray-500 group-hover:text-brand-gray-600 transition-colors duration-300"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-brand-blue-800 mb-2 group-hover:text-brand-theme transition-colors duration-300">
                        {member.name}
                      </h3>
                      <p className="text-sm sm:text-base font-semibold text-brand-theme mb-3">
                        {member.position}
                      </p>
                      <p className="text-xs sm:text-sm text-brand-gray-500 mb-4 leading-relaxed">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="py-16 sm:py-20 bg-gradient-to-br from-brand-gray-300 to-white">
            <div className="container--boxed px-4 sm:px-6 lg:px-8">
              {/* Teal Line */}
              <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-6 sm:mb-8"></div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-blue-800 text-center mb-8 sm:mb-12 lg:mb-16">
                Our Values
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {values.map((value, index) => (
                  <div key={index} className="text-center group">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${value.color} rounded-xl sm:rounded-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <div className="text-white text-lg sm:text-xl">
                        {value.icon}
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-brand-blue-800 mb-3 sm:mb-4 group-hover:text-brand-theme transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-sm sm:text-base text-brand-gray-500 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="py-16 sm:py-20 bg-white">
            <div className="container--boxed px-4 sm:px-6 lg:px-8 text-center">
              <div className="max-w-4xl mx-auto">
                {/* Teal Line */}
                <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-6 sm:mb-8"></div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-blue-800 mb-4 sm:mb-6">
                  Ready to Work With Us?
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-brand-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
                  Join our team of passionate professionals and help us
                  revolutionize website performance optimization.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Link
                    href="/careers"
                    className="group relative bg-gradient-to-r from-brand-theme to-brand-theme-600 hover:from-brand-theme-600 hover:to-brand-theme-800 text-white font-bold py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-brand-theme/25 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                  >
                    <span>View Open Positions</span>
                    <FaArrowRight className="text-sm sm:text-base group-hover:translate-x-1 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                  <Link
                    href="/contact"
                    className="group border-2 border-brand-theme text-brand-theme font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl hover:bg-brand-theme hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                  >
                    <span>Get in Touch</span>
                    <FaArrowRight className="text-sm sm:text-base group-hover:scale-110 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Team;
