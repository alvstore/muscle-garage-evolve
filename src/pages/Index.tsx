
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import GallerySection from "@/components/GallerySection";
import MembershipSection from "@/components/MembershipSection";
import TrainersSection from "@/components/TrainersSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import HighlightsSection from "@/components/HighlightsSection";
import { useScrollAnimation } from "@/utils/useScrollAnimation";

const Index = () => {
  useScrollAnimation();

  useEffect(() => {
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href')?.substring(1);
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <HighlightsSection />
      <SectionDivider equipmentType="barbell" className="bg-gym-black" />
      <AboutSection />
      <SectionDivider equipmentType="dumbbell" className="bg-gym-gray-900" />
      <GallerySection />
      <SectionDivider equipmentType="kettlebell" className="bg-gym-gray-900" />
      <MembershipSection />
      <SectionDivider equipmentType="proteinShake" className="bg-gym-black" />
      <TrainersSection />
      <SectionDivider equipmentType="barbell" className="bg-gym-gray-900" />
      <TestimonialsSection />
      <SectionDivider equipmentType="dumbbell" className="bg-gym-black" />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
