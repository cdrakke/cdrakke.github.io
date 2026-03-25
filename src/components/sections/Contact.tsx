import { useState, useRef } from "react";
import { Mail, MapPin, Phone, Send, CheckCircle } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { GithubIcon, TwitterIcon } from "@/components/shared/Icons";
import { contactInfo } from "@/data/social-links";

export function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: "7e8d5943-a358-4e09-9373-250488759333",
        ...formState,
      }),
    });

    if (response.ok) {
      // Animate form out, success in
      if (formRef.current) {
        gsap.to(formRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            setSubmitted(true);
            setSending(false);
            setFormState({ name: "", email: "", message: "" });

            // Animate success message in
            requestAnimationFrame(() => {
              if (successRef.current) {
                gsap.fromTo(
                  successRef.current,
                  { opacity: 0, y: 20, scale: 0.95 },
                  { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }
                );
              }
            });
          },
        });
      }
    } else {
      setSending(false);
    }
  };

  const handleReset = () => {
    if (successRef.current) {
      gsap.to(successRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setSubmitted(false);
          requestAnimationFrame(() => {
            if (formRef.current) {
              gsap.fromTo(
                formRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
              );
            }
          });
        },
      });
    }
  };

  const inputClass =
    "w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary/50 focus-visible:shadow-[0_0_12px_-3px] focus-visible:shadow-primary/20";

  return (
    <section id="contact" className="py-20 px-4 bg-muted/30">
      <div className="mx-auto max-w-3xl">
        <AnimatedSection>
          <SectionHeading
            title="Get In Touch"
            subtitle="Feel free to reach out for collaborations or opportunities"
          />
        </AnimatedSection>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact Info */}
          <AnimatedSection direction="left" delay={0.1}>
            <Card>
              <CardContent className="space-y-5 p-6">
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="group flex items-center gap-3 text-sm text-foreground/80 transition-colors hover:text-primary"
                >
                  <Mail className="h-5 w-5 text-primary transition-transform duration-200 group-hover:scale-110" />
                  {contactInfo.email}
                </a>
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                  className="group flex items-center gap-3 text-sm text-foreground/80 transition-colors hover:text-primary"
                >
                  <Phone className="h-5 w-5 text-primary transition-transform duration-200 group-hover:scale-110" />
                  {contactInfo.phone}
                </a>
                <div className="group flex items-center gap-3 text-sm text-foreground/80">
                  <MapPin className="h-5 w-5 text-primary" />
                  {contactInfo.location}
                </div>

                <Separator />

                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/cdrakke"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md p-2 text-muted-foreground transition-all duration-200 hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_12px_-3px] hover:shadow-primary/20"
                    aria-label="GitHub"
                  >
                    <GithubIcon className="h-5 w-5" />
                  </a>
                  <a
                    href="https://x.com/CDrakke"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md p-2 text-muted-foreground transition-all duration-200 hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_12px_-3px] hover:shadow-primary/20"
                    aria-label="Twitter"
                  >
                    <TwitterIcon className="h-5 w-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection direction="right" delay={0.2}>
            <Card>
              <CardContent className="p-6">
                {submitted ? (
                  <div
                    ref={successRef}
                    className="flex h-full items-center justify-center py-8 text-center"
                  >
                    <div>
                      <CheckCircle className="mx-auto mb-3 h-10 w-10 text-primary" />
                      <p className="text-lg font-medium">Message sent!</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Thanks for reaching out. I'll get back to you soon.
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-4"
                        onClick={handleReset}
                      >
                        Send another
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-1.5 block text-sm font-medium"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) =>
                          setFormState((s) => ({ ...s, name: e.target.value }))
                        }
                        className={inputClass}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1.5 block text-sm font-medium"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) =>
                          setFormState((s) => ({ ...s, email: e.target.value }))
                        }
                        className={inputClass}
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="mb-1.5 block text-sm font-medium"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        value={formState.message}
                        onChange={(e) =>
                          setFormState((s) => ({
                            ...s,
                            message: e.target.value,
                          }))
                        }
                        className={`${inputClass} resize-none`}
                        placeholder="Your message..."
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={sending}
                      className="w-full transition-all duration-200 active:scale-[0.98]"
                    >
                      {sending ? (
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Sending...
                        </span>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
