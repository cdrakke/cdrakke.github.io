import type { Education } from "@/types";

export const education: Education[] = [
  {
    id: "sti-college",
    level: "Bachelor of Science in Information Technology",
    years: "2021 - 2025",
    institution: "STI College, General Santos City",
    description:
      "Focused on programming and software development. Graduated with honors.",
    achievements: [
      "Cum Laude Graduate",
      "Best Capstone Project Awardee",
      "Programmer of the Year Awardee",
    ],
    images: ["/images/education/medals.png"],
    logo: "/images/logos/sti.png",
  },
  {
    id: "shs",
    level: "Senior High School - STEM Track",
    years: "2019 - 2021",
    institution: "General Santos City National High School",
    description: "Science, Technology, Engineering, and Mathematics strand.",
    logo: "/images/logos/gscnhs.png",
  },
];

export const certifications = [
  {
    title: "Civil Service Career Professional",
    detail: "Rating: 82.4",
    date: "March 2, 2025",
    image: "/images/education/cse-result.png",
  },
  {
    title: "Outstanding Capstone Project Awardee",
    date: "June 20, 2025",
    image: "/images/education/outstanding-capstone-project.jpg",
  },
];
