import { AnimateOnScroll } from "../animateViewOnScroll/animateViewOnScroll";
import { getImages } from "@/utils/getImagesOnFolder";

export function OurTeam() {
  const img = getImages("who_we_are");
  console.log("images", img);
  const teamMembers = [
    {
      name: "name here",
      role: "role or contribution here",
      image: img[0],
    },
    {
      name: "name",
      role: "role or contribution here",
      image: img[1],
    },
    {
      name: "name",
      role: "role or contribution here",
      image: img[2],
    },
    {
      name: "name",
      role: "role or contribution here",
      image: img[3],
    },
  ];
  return (
    <AnimateOnScroll index={2} className="py-16 bg-slate-950">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-200">
          Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-slate-950 rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-200">
                  {member.name}
                </h3>
                <p className="text-gray-200">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimateOnScroll>
  );
}
