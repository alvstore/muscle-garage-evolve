
import { useState, useEffect, useRef } from "react";
import { Check } from "lucide-react";

const MembershipSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');

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

  const plans = [
    {
      name: "Basic",
      description: "Perfect for beginners",
      monthlyPrice: 1999,
      quarterlyPrice: 5499,
      yearlyPrice: 19999,
      features: [
        "Full gym access",
        "Locker access",
        "Fitness assessment",
        "Free parking"
      ],
      popular: false
    },
    {
      name: "Premium",
      description: "Our most popular plan",
      monthlyPrice: 2999,
      quarterlyPrice: 8499,
      yearlyPrice: 29999,
      features: [
        "Full gym access",
        "Locker access",
        "Swimming pool access",
        "Fitness assessment",
        "1 PT session/month",
        "Free parking",
        "Steam room access"
      ],
      popular: true
    },
    {
      name: "Elite",
      description: "For dedicated fitness enthusiasts",
      monthlyPrice: 3999,
      quarterlyPrice: 11499,
      yearlyPrice: 39999,
      features: [
        "Full gym access",
        "Locker access",
        "Swimming pool access",
        "Fitness assessment",
        "3 PT sessions/month",
        "Free parking",
        "Steam room access",
        "Ice bath access",
        "Nutrition consultation"
      ],
      popular: false
    }
  ];

  const getPrice = (plan: typeof plans[0]) => {
    switch(billingCycle) {
      case 'monthly':
        return plan.monthlyPrice;
      case 'quarterly':
        return plan.quarterlyPrice;
      case 'yearly':
        return plan.yearlyPrice;
      default:
        return plan.monthlyPrice;
    }
  };

  const getSavings = (plan: typeof plans[0]) => {
    if (billingCycle === 'quarterly') {
      return Math.round(((plan.monthlyPrice * 3) - plan.quarterlyPrice) / (plan.monthlyPrice * 3) * 100);
    } else if (billingCycle === 'yearly') {
      return Math.round(((plan.monthlyPrice * 12) - plan.yearlyPrice) / (plan.monthlyPrice * 12) * 100);
    }
    return 0;
  };

  return (
    <section id="membership" ref={sectionRef} className="section-padding bg-gym-black">
      <div className="gym-container">
        <div className={`text-center max-w-3xl mx-auto mb-12 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-5xl font-impact mb-4">
            MEMBERSHIP <span className="text-gym-yellow">PLANS</span>
          </h2>
          <p className="text-gray-300 mb-8">
            Choose the plan that fits your fitness journey and budget. All plans include access to our premium facilities.
          </p>

          {/* Billing cycle toggle */}
          <div className="flex justify-center items-center space-x-4 mb-8">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-md transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-gym-yellow text-gym-black font-bold'
                  : 'bg-gym-gray-800 text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('quarterly')}
              className={`px-4 py-2 rounded-md transition-all ${
                billingCycle === 'quarterly'
                  ? 'bg-gym-yellow text-gym-black font-bold'
                  : 'bg-gym-gray-800 text-white'
              }`}
            >
              Quarterly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-md transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-gym-yellow text-gym-black font-bold'
                  : 'bg-gym-gray-800 text-white'
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative rounded-lg overflow-hidden transition-all duration-500 ${
                isVisible ? 'animate-fade-in' : 'opacity-0'
              } ${
                plan.popular
                  ? 'border-2 border-gym-yellow'
                  : 'border border-gym-gray-700'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gym-yellow text-gym-black py-1 px-4 font-bold">
                  Popular
                </div>
              )}
              
              <div className="p-6 bg-gym-gray-800">
                <h3 className="text-2xl font-impact mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-4">{plan.description}</p>
                
                <div className="flex items-end mb-4">
                  <span className="text-4xl font-bold">₹{getPrice(plan).toLocaleString()}</span>
                  <span className="text-gray-400 ml-2">
                    /{billingCycle === 'monthly' ? 'month' : billingCycle === 'quarterly' ? 'quarter' : 'year'}
                  </span>
                </div>
                
                {getSavings(plan) > 0 && (
                  <div className="bg-gym-yellow/10 text-gym-yellow rounded-md p-2 text-sm font-bold mb-4">
                    Save {getSavings(plan)}% with {billingCycle} billing
                  </div>
                )}

                <a href="#contact" className="btn btn-primary w-full mb-6">
                  Get Your Pass
                </a>

                <ul className="space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <Check className="text-gym-yellow mr-2 h-5 w-5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MembershipSection;
