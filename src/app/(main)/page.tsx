import { Hero } from "@/components/sections/Hero";
import { RemateDelMesPreview } from "@/components/sections/RemateDelMesPreview";
import { Categories } from "@/components/sections/Categories";
import { CampaignBanner } from "@/components/sections/CampaignBanner";
import { SorteoPreview } from "@/components/sections/SorteoPreview";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { NosotrosPreview } from "@/components/sections/NosotrosPreview";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <RemateDelMesPreview />
      <Categories />
      <CampaignBanner />
      <SorteoPreview />
      <Testimonials />
      <FAQ />
      <NosotrosPreview />
      <FinalCTA />
    </main>
  );
}
