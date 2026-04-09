import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BeforeAfterSlider from "./components/BeforeAfterSlider";
import AIStudio from "./components/AIStudio";
import ReviewSection from "./components/ReviewSection";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-midnight text-white">
      <Navbar />
      <main>
        <Hero />
        <BeforeAfterSlider />
        <AIStudio />
        <ReviewSection />
      </main>
      <Footer />
    </div>
  );
}
