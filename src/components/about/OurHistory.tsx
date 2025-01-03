import { AnimateOnScroll } from "../animateViewOnScroll/animateViewOnScroll";

//TODO add real data
const milestones = [
  { year: 2010, event: "A start" },
  { year: 2013, event: "A milestone reached here" },
  { year: 2016, event: "Another accomplishment here" },
  { year: 2019, event: "Accomplishment here" },
  { year: 2022, event: "Nowadays" },
];

export function OurHistory() {
  return (
    <AnimateOnScroll index={4} className="py-16  bg-gray-950">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">
          Our History
        </h2>
        <div className="relative">
          <div className="absolute left-1/2  transform -translate-x-1/2 h-full w-1 bg-slate-200"></div>
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className={`flex items-center mb-8 ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`w-5/12 ${
                  index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"
                }`}
              >
                <h3 className="font-bold text-xl text-gray-200">
                  {milestone.year}
                </h3>
                <p className="text-gray-400">{milestone.event}</p>
              </div>
              <div className="w-2/12 flex justify-center">
                <div className="w-4 h-4 bg-slate-200 rounded-full"></div>
              </div>
              <div className=" bg-slate-20 w-5/12"></div>
            </div>
          ))}
        </div>
      </div>
    </AnimateOnScroll>
  );
}
