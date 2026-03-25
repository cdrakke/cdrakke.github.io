import { Hero } from "@/components/sections/Hero";
import { BriefIntro } from "@/components/sections/BriefIntro";
import { GitHubActivity } from "@/components/sections/GitHubActivity";
import { FeaturedProject } from "@/components/sections/FeaturedProject";
import { SubFeaturedProjects } from "@/components/sections/SubFeaturedProjects";
import { OtherProjects } from "@/components/sections/OtherProjects";
import { Contact } from "@/components/sections/Contact";

export function HomePage() {
  return (
    <>
      <Hero />
      <BriefIntro />
      <GitHubActivity />
      <FeaturedProject />
      <SubFeaturedProjects />
      <OtherProjects />
      <Contact />
    </>
  );
}
