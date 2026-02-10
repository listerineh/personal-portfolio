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
import { contactSection } from '@/lib/data';
import type { ContactFormData } from "@/types";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: contactSection.form.nameError }),
  email: z.string().email({ message: contactSection.form.emailError }),
  message: z.string().min(10, { message: contactSection.form.messageError }),
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
          title: contactSection.toast.successTitle,
          description: result.message,
        });
        reset();
      } else {
        toast({
          title: contactSection.toast.errorTitle,
          description: result.message || contactSection.toast.errorMessage,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: contactSection.toast.errorTitle,
        description: contactSection.toast.unexpectedError,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionWrapper id="contact" title={contactSection.title} badge={contactSection.badge} className="bg-background">
      <div className="max-w-2xl mx-auto">
        {/* Description */}
        <div className="text-center mb-12">
          <p ref={descriptionRef} className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {contactSection.description}
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
                    {contactSection.form.nameLabel}
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder={contactSection.form.namePlaceholder}
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
                    {contactSection.form.emailLabel}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={contactSection.form.emailPlaceholder}
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
                    {contactSection.form.messageLabel}
                  </Label>
                  <Textarea
                    id="message"
                    placeholder={contactSection.form.messagePlaceholder}
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
                  className="w-full h-12 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      {contactSection.form.submittingButton}
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-5 w-5" />
                      {contactSection.form.submitButton}
                    </>
                  )}
                </Button>
              </form>
      </div>
    </SectionWrapper>
  );
}
