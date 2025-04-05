
import { useState, useEffect } from "react";
import { Menu, X, User } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Gallery", href: "#gallery" },
    { name: "Membership", href: "#membership" },
    { name: "Trainers", href: "#trainers" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-gym-black shadow-lg py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="gym-container flex justify-between items-center">
        <a href="#home" className="flex items-center">
          <span className="text-2xl md:text-3xl font-impact text-gym-yellow">MUSCLE GARAGE</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-white hover:text-gym-yellow transition-colors duration-300 font-medium"
            >
              {link.name}
            </a>
          ))}
          <a href="#membership" className="btn btn-primary ml-2">
            Join Now
          </a>
          <a href="/login" className="flex items-center gap-2 px-4 py-2 bg-gym-gray-800 hover:bg-gym-gray-700 text-white rounded-md transition-colors duration-300">
            <User size={18} />
            <span>Login</span>
          </a>
        </nav>

        {/* Mobile Navigation Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-gym-black shadow-lg md:hidden">
            <div className="flex flex-col p-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white hover:text-gym-yellow transition-colors duration-300 py-2 px-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#membership" 
                className="btn btn-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Join Now
              </a>
              <a 
                href="/login" 
                className="flex items-center gap-2 px-4 py-2 bg-gym-gray-800 hover:bg-gym-gray-700 text-white rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={18} />
                <span>Login</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
