import Hero from "@/components/home/Hero";
import Clients from "@/components/home/Clients";
import Intro from "@/components/home/Intro";
import ServicesList from "@/components/home/ServicesList";
import BeforeAfter from "@/components/home/BeforeAfter";
import CaseStack from "@/components/home/CaseStack";
import Industries from "@/components/home/Industries";
import Process from "@/components/home/Process";
import AboutTeaser from "@/components/home/AboutTeaser";
import CTA from "@/components/home/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Clients />
      <Intro />
      <ServicesList />
      <BeforeAfter />
      <CaseStack />
      <Industries />
      <Process />
      <AboutTeaser />
      <CTA />
    </>
  );
}
