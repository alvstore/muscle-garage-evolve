
import { useState, useEffect, useRef } from "react";
import { Waves, Lock, Cloud, Car, Heart, Dumbbell } from "lucide-react";

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const facilities = [
    {
      icon: <Waves className="h-8 w-8" />,
      title: "Swimming Pool & Ice Bath",
      description: "Olympic-sized swimming pool and therapeutic ice bath for recovery."
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Locker Facility",
      description: "Secure, modern lockers with digital locks for all members."
    },
    {
      icon: <Cloud className="h-8 w-8" />,
      title: "Steam Room",
      description: "Luxury steam rooms to relax and recover after intense workouts."
    },
    {
      icon: <Car className="h-8 w-8" />,
      title: "Huge Parking Space",
      description: "Convenient parking for all members with security surveillance."
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Dedicated Cardio Section",
      description: "State-of-the-art cardio equipment with personal entertainment screens."
    },
    {
      icon: <Dumbbell className="h-8 w-8" />,
      title: "Zumba & Yoga Studio",
      description: "Spacious studio for various fitness classes led by certified instructors."
    }
  ];

  return (
    <section id="about" ref={sectionRef} className="section-padding bg-gym-black">
      <div className="gym-container">
        <div className={`text-center max-w-3xl mx-auto mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-5xl font-impact mb-4">
            ABOUT <span className="text-gym-yellow">MUSCLE GARAGE</span>
          </h2>
          <p className="text-gray-300">
            Established in 2017, Muscle Garage has grown to become one of the largest and most
            premium fitness facilities in Ahmedabad. Our 15,000 sq ft facility offers cutting-edge
            equipment, expert personal training, and luxury amenities to help you achieve your
            fitness goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => (
            <div
              key={facility.title}
              className={`bg-gym-gray-800 rounded-lg p-6 shadow-lg transition-all duration-500 hover:shadow-xl hover:bg-gym-gray-700 transform hover:-translate-y-1 ${
                isVisible ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ 
                animationDelay: `${index * 0.1}s` 
              }}
            >
              <div className="p-3 bg-gym-yellow rounded-full inline-block text-gym-black mb-4">
                {facility.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{facility.title}</h3>
              <p className="text-gray-400">{facility.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
