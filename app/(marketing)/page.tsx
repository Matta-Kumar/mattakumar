import Hero from "@/components/home/Hero";
import Clients from "@/components/home/Clients";
import Intro from "@/components/home/Intro";
import ServicesList from "@/components/home/ServicesList";
import EngagementModels from "@/components/home/EngagementModels";
import BeforeAfter from "@/components/home/BeforeAfter";
import CaseStack from "@/components/home/CaseStack";
import Industries from "@/components/home/Industries";
import Process from "@/components/home/Process";
import AboutTeaser from "@/components/home/AboutTeaser";
import CTA from "@/components/home/CTA";
import {
  getServices,
  getCaseStudies,
  getIndustries,
  getEngagementModels,
  getInHouseCapabilities,
} from "@/sanity/lib/queries";

export default async function Home() {
  const [services, cases, industries, engagementModels, teamBuilding] = await Promise.all([
    getServices(),
    getCaseStudies(),
    getIndustries(),
    getEngagementModels(),
    getInHouseCapabilities(),
  ]);

  return (
    <>
      <Hero />
      <Clients />
      <Intro />
      <ServicesList services={services} />
      <BeforeAfter />
      <CaseStack cases={cases} />
      <Industries industries={industries} />
      <EngagementModels models={engagementModels} teamBuilding={teamBuilding} />
      <Process />
      <AboutTeaser />
      <CTA />
    </>
  );
}
