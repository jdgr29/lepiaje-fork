import { AnimateOnScroll } from "../animateViewOnScroll/animateViewOnScroll";
import { Card, CardContent } from "@/components/ui/card";

//TODO add real data
const testimonials = [
  {
    name: "Some name here",
    role: "The role if necessary, if not will removed",
    quote: "An opinion the client has said about the business",
  },
  {
    name: "Some name here",
    role: "The role if necessary, if not will removed",
    quote: "An opinion the client has said about the business",
  },
  {
    name: "Some name here",
    role: "The role if necessary, if not will removed",
    quote: "An opinion the client has said about the business",
  },
];

export function Testimonials() {
  return (
    <AnimateOnScroll index={5} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
                <div className="font-bold">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.role}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AnimateOnScroll>
  );
}
