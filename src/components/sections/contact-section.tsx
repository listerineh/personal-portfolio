"use client";

import { useState, useRef } from "react";
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

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
        <p ref={descriptionRef} className="text-center text-muted-foreground mb-10">
          Have a project in mind, a question, or just want to say hi? Feel free to reach out!
        </p>
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div ref={(el) => { fieldsRef.current[0] = el; }}>
            <Label htmlFor="name" className="flex items-center mb-1">
              <User className="mr-2 h-4 w-4 text-muted-foreground" /> Your Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="e.g. Jane Doe"
              {...register("name")}
              className={errors.name ? "border-destructive" : ""}
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
          </div>

          <div ref={(el) => { fieldsRef.current[1] = el; }}>
            <Label htmlFor="email" className="flex items-center mb-1">
              <Mail className="mr-2 h-4 w-4 text-muted-foreground" /> Your Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="e.g. jane.doe@example.com"
              {...register("email")}
              className={errors.email ? "border-destructive" : ""}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
          </div>

          <div ref={(el) => { fieldsRef.current[2] = el; }}>
            <Label htmlFor="message" className="flex items-center mb-1">
              <MessageSquare className="mr-2 h-4 w-4 text-muted-foreground" /> Your Message
            </Label>
            <Textarea
              id="message"
              placeholder="Tell me about your project or inquiry..."
              rows={5}
              {...register("message")}
              className={errors.message ? "border-destructive" : ""}
              aria-invalid={errors.message ? "true" : "false"}
            />
            {errors.message && <p className="text-sm text-destructive mt-1">{errors.message.message}</p>}
          </div>

          <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-primary-foreground" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
              </>
            ) : (
              "Send Message"
            )}
          </Button>
        </form>
      </div>
    </SectionWrapper>
  );
}
