"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail, MessageSquare, User } from "lucide-react";
import { submitContactForm } from "@/lib/actions";
import { SectionWrapper } from '@/components/common/section-wrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";
import type { ContactFormData } from "@/types";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters long." }),
});

export function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

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
        <p className="text-center text-muted-foreground mb-10">
          Have a project in mind, a question, or just want to say hi? Feel free to reach out!
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
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

          <div>
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

          <div>
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

          <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-white" disabled={isSubmitting}>
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
