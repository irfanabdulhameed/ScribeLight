import HeroSection from "../Component/Hero";
import BG from "../Component/BG";
import Footer from "../Component/Footer";
import Horbar from "../Misc/horbar";
import Aboutpart from "../Component/Aboutsection";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-900">
      <BG />
      <HeroSection />
      <Horbar />
      <Aboutpart />
      <Footer />
    </div>
  );
}
