import { Hero } from "@/components/sections/Hero";
import { CampaignBanner } from "@/components/sections/CampaignBanner";
import { Categories } from "@/components/sections/Categories";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <CampaignBanner />
      <Categories />
      <FeaturedProducts />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <FinalCTA />
    </main>
  );
}
