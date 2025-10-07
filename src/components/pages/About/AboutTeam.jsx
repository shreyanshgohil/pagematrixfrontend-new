import { getTeamMemberImage } from "@/utils/teamImages";
import Image from "next/image";

const AboutTeam = () => {
  const teamMembers = [
    {
      name: "Jayveer Chavda",
      role: "Founder & CEO",
      initials: "JC",
      bio: "Real estate veteran with 3+ years of experience in property development and investment.",
    },
    {
      name: "Shreyansh Gohil",
      role: "Chief Technology Officer",
      initials: "PS",
      bio: "Tech innovator passionate about using technology to solve real-world problems in real estate.",
    },
    {
      name: "Harshad Tahiliani",
      role: "Head of Operations",
      initials: "Full Stack Developer",
      bio: "Operations expert ensuring smooth customer experience and platform efficiency.",
    },
    {
      name: "Jayprakash Khatri",
      role: "Head of Marketing",
      initials: "SR",
      bio: "Marketing strategist focused on building brand awareness and customer engagement.",
    },
    {
      name: "Shruti Patel",
      role: "Senior Frontend Developer",
      initials: "NS",
      bio: "Customer advocate ensuring every client has an exceptional experience with our platform.",
    },
    {
      name: "Mahak Mujawdiya",
      role: "Junior Backend Developer",
      initials: "MM",
      bio: "Passionate backend developer with a focus on building scalable APIs and optimizing server-side performance.",
    },
  ].map((member) => ({
    ...member,
    image: getTeamMemberImage(member.name),
  }));

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-brand-gray-300 to-white">
      <div className="container--boxed--lg px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-theme to-brand-theme-600 mx-auto mb-4 sm:mb-6"></div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-blue-800 mb-4 sm:mb-6">
            Meet Our Team
          </h2>
          <p className="text-base sm:text-lg text-brand-gray-500 max-w-3xl mx-auto leading-relaxed">
            Our diverse team of experts is united by a common goal: making real
            estate accessible, transparent and trustworthy for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-brand-gray-300/50 text-center"
            >
              {/* Avatar */}
              <div className="relative mb-4 sm:mb-6">
                <div className="w-20 h-20 sm:w-36 sm:h-36 rounded-full mx-auto group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={`${member.name} - ${member.role}`}
                      width={500}
                      height={500}
                      className="w-full h-full object-cover"
                      priority={index < 3} // Prioritize first 3 images
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
                <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-brand-theme rounded-full"></div>
                </div>
              </div>

              {/* Name & Role */}
              <h3 className="text-lg sm:text-xl font-bold text-brand-blue-800 mb-2 group-hover:text-brand-theme transition-colors duration-300">
                {member.name}
              </h3>
              <p className="text-sm sm:text-base text-brand-theme font-semibold mb-3 sm:mb-4">
                {member.role}
              </p>
              <p className="text-sm sm:text-base text-brand-gray-500 leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;
