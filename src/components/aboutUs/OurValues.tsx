import { AnimateOnScroll } from "../animateViewOnScroll/animateViewOnScroll";
import { Shield, Users, Lightbulb, Heart } from "lucide-react";

//TODO add real data
const values = [
  {
    icon: Shield,
    title: "Value here",
    description: "A short description of the value here",
  },
  {
    icon: Users,
    title: "Value here",
    description: "A short description of the value here",
  },
  {
    icon: Lightbulb,
    title: "Value here",
    description: "A short description of the value here",
  },
  {
    icon: Heart,
    title: "Value here",
    description: "A short description of the value here",
  },
];

export function OurValues() {
  return (
    <AnimateOnScroll index={3} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center">
              <value.icon className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h3 className="font-bold text-xl mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </AnimateOnScroll>
  );
}
