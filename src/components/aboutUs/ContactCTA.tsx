import { AnimateOnScroll } from "../animateViewOnScroll/animateViewOnScroll";
import { Button } from "@/components/ui/button";

//TODO add real data
export function ContactCTA() {
  return (
    <AnimateOnScroll
      index={6}
      className="py-16 bg-primary text-primary-foreground"
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join us on our mission to revolutionize the industry. Let's create
          something amazing together.
        </p>
        <Button size="lg" variant="secondary">
          Contact Us
        </Button>
      </div>
    </AnimateOnScroll>
  );
}
