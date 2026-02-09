"use client";

import { useState, useRef, useEffect } from "react";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail, MessageSquare, User } from "lucide-react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { submitContactForm } from "@/lib/actions";
import { SectionWrapper } from '@/components/common/section-wrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";
import { useGSAP } from '@/hooks/use-gsap';
import type { ContactFormData } from "@/types";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters long." }),
});

export function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const fieldsRef = useRef<(HTMLDivElement | null)[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useGSAP(() => {
    if (descriptionRef.current) {
      gsap.from(descriptionRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: descriptionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    }

    fieldsRef.current.forEach((field, index) => {
      if (field) {
        gsap.from(field, {
          x: index % 2 === 0 ? -50 : 50,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: field,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      }
    });
  }, []);

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    setIsSubmitting(true);
    try {
      const result = await submitContactForm(data);
      if (result.success) {
        toast({
          title: "Message Sent!",
          description: result.message,
        });
        reset();
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionWrapper id="contact" title="Get In Touch" className="bg-background">
      <div className="max-w-2xl mx-auto">
        {/* Description */}
        <div className="text-center mb-12">
          <p ref={descriptionRef} className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Have a project in mind, a question, or just want to say hi? Feel free to reach out!
          </p>
        </div>

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name field */}
                <div ref={(el) => { fieldsRef.current[0] = el; }}>
                  <Label htmlFor="name" className="flex items-center gap-2 mb-3 text-sm font-semibold text-foreground">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="e.g. Jane Doe"
                    {...register("name")}
                    className={`h-12 text-base bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all ${errors.name ? "border-destructive focus:border-destructive" : ""}`}
                    aria-invalid={errors.name ? "true" : "false"}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive mt-2 flex items-center gap-1.5">
                      <span className="inline-block w-1 h-1 rounded-full bg-destructive" />
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email field */}
                <div ref={(el) => { fieldsRef.current[1] = el; }}>
                  <Label htmlFor="email" className="flex items-center gap-2 mb-3 text-sm font-semibold text-foreground">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Mail className="h-4 w-4 text-primary" />
                    </div>
                    Your Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="e.g. jane.doe@example.com"
                    {...register("email")}
                    className={`h-12 text-base bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all ${errors.email ? "border-destructive focus:border-destructive" : ""}`}
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-2 flex items-center gap-1.5">
                      <span className="inline-block w-1 h-1 rounded-full bg-destructive" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Message field */}
                <div ref={(el) => { fieldsRef.current[2] = el; }}>
                  <Label htmlFor="message" className="flex items-center gap-2 mb-3 text-sm font-semibold text-foreground">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MessageSquare className="h-4 w-4 text-primary" />
                    </div>
                    Your Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project or inquiry..."
                    rows={6}
                    {...register("message")}
                    className={`text-base bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all resize-none ${errors.message ? "border-destructive focus:border-destructive" : ""}`}
                    aria-invalid={errors.message ? "true" : "false"}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive mt-2 flex items-center gap-1.5">
                      <span className="inline-block w-1 h-1 rounded-full bg-destructive" />
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <Button 
                  type="submit" 
                  size="lg"
                  className="w-full h-14 text-base font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-5 w-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
      </div>
    </SectionWrapper>
  );
}
