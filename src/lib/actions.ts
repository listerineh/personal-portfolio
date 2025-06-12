"use server";

import { z } from "zod";
import type { ContactFormData } from "@/types";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export async function submitContactForm(formData: ContactFormData) {
  const validatedFields = contactFormSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check your input.",
      success: false,
    };
  }

  const { name, email, message } = validatedFields.data;

  // In a real application, you would send an email or save to a database here.
  // For this portfolio, we'll simulate success.
  console.log("Contact form submitted:");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Message:", message);

  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    message: "Thank you for your message! I'll get back to you soon.",
    success: true,
  };
}
