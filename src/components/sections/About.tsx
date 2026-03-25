import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function About() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <SectionHeading title="About Me" />
        </AnimatedSection>

        <div className="grid gap-10 md:grid-cols-[280px_1fr] md:items-start">
          <AnimatedSection direction="left" delay={0.1}>
            <img
              src="/images/avatar.png"
              alt="Calvin Drakke I. Rulete"
              className="mx-auto h-48 w-48 sm:h-64 sm:w-64 rounded-2xl border border-border object-cover shadow-md md:mx-0"
            />
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.2}>
            <div className="space-y-4 text-foreground/85 leading-relaxed">
              <p>
                I'm{" "}
                <strong className="text-foreground">
                  Calvin Drakke I. Rulete
                </strong>
                , a backend-focused developer from General Santos City,
                Philippines. I graduated Cum Laude with a BS in Information
                Technology from STI College GenSan, where I also earned Best
                Capstone Project and Programmer of the Year. I've been
                writing scripts, bots, and apps since grade 7 — long before
                I had a degree to show for it.
              </p>

              <h3 className="text-lg font-semibold text-foreground pt-2">
                What I Do
              </h3>
              <p>
                <strong className="text-foreground">Python & Django</strong>{" "}
                — My foundation. I started with Django and PostgreSQL during
                college, designing database schemas, REST APIs, and payment
                integrations for a web management system as my capstone. That
                experience cemented my focus on backend architecture.
              </p>
              <p>
                <strong className="text-foreground">
                  NestJS, Next.js & Node.js
                </strong>{" "}
                — My current stack. As a Software Developer at Simply
                Expanding, I own the backend for multiple applications:
                designing APIs, managing databases, building real-time systems
                with Socket.IO, and handling deployment infrastructure. I
                collaborate with a frontend developer on the UI side.
              </p>
              <p>
                <strong className="text-foreground">DevOps</strong> — I
                deploy and maintain my own infrastructure. Docker containers
                via Coolify, bare-metal NestJS/Node.js deployments with NGINX
                reverse proxy, domain provisioning, and Certbot for SSL. I
                harden my VPS boxes with SSH key-only auth on non-default
                ports.
              </p>
              <p>
                <strong className="text-foreground">Gaming Tools</strong> —
                Outside of work, I build backend systems for gaming
                communities. My most ambitious project is Raidium — 71+ API
                endpoints, multi-tenant data isolation, KAIA blockchain
                payment verification, and OCR-based attendance. I also built
                GLiberator, a Discord bot I've maintained for 5+ years.
              </p>

              <h3 className="text-lg font-semibold text-foreground pt-2">
                Mindset & Motivation
              </h3>
              <p>
                I believe the best way to grow is to ship things and solve
                real problems. Every project I work on — whether it's a
                capstone, a work assignment, or a personal tool — is built
                with real users in mind. I focus on automation, workflow
                improvement, and creating software that makes others' lives
                easier.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
