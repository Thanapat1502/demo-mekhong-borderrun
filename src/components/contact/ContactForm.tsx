"use client";

import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
  Textarea,
} from "@heroui/react";
import { useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { supabase, TABLES } from "@/lib/supabase";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Save to contact_requests table
      const { error: dbError } = await supabase
        .from(TABLES.CONTACT_REQUESTS)
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          status: "new",
        });

      if (dbError) {
        console.error("Database error:", dbError);
        throw new Error("Failed to save contact request");
      }

      // Also send email notification
      try {
        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          console.warn("Email sending failed, but contact request was saved");
        }
      } catch (emailError) {
        console.warn("Email sending failed:", emailError);
        // Don't throw error here as the main goal (saving to DB) was successful
      }

      setIsSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Failed to send message. Please try again or contact us directly.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Card className="shadow-2xl bg-white">
      <CardHeader>
        <h2 className="text-2xl font-light text-black">Send us a Message</h2>
      </CardHeader>
      <CardBody className="p-8">
        {isSuccess ? (
          <div className="text-center py-8">
            <div className="text-accent-500 mb-4 flex justify-center">
              <FiCheckCircle size={64} />
            </div>
            <h3 className="text-2xl font-medium text-black mb-4">
              Message Sent!
            </h3>
            <p className="text-black mb-6">
              Thank you for contacting us. We&apos;ll get back to you within 24
              hours.
            </p>
            <Button
              onClick={() => setIsSuccess(false)}
              className="bg-accent-500 text-white hover:bg-accent-600 rounded-full">
              Send Another Message
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              variant="bordered"
              className="w-full"
              classNames={{
                inputWrapper:
                  "bg-white hover:bg-white focus:bg-white data-[hover=true]:bg-white",
                input: "bg-white text-black placeholder:text-gray-500",
                label: "text-gray-700",
              }}
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              variant="bordered"
              className="w-full"
              classNames={{
                inputWrapper:
                  "bg-white hover:bg-white focus:bg-white data-[hover=true]:bg-white",
                input: "bg-white text-black placeholder:text-gray-500",
                label: "text-gray-700",
              }}
            />

            <Input
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              variant="bordered"
              className="w-full"
              classNames={{
                inputWrapper:
                  "bg-white hover:bg-white focus:bg-white data-[hover=true]:bg-white",
                input: "bg-white text-black placeholder:text-gray-500",
                label: "text-gray-700",
              }}
            />

            <Textarea
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              variant="bordered"
              rows={5}
              placeholder="Tell us about your travel dates, pickup location, or any questions you have..."
              className="w-full"
              classNames={{
                inputWrapper:
                  "bg-white hover:bg-white focus:bg-white data-[hover=true]:bg-white",
                input: "bg-white text-black placeholder:text-gray-500",
                label: "text-gray-700",
              }}
            />

            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full bg-accent-500 text-white hover:bg-accent-600 rounded-full"
              size="lg">
              {isLoading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        )}
      </CardBody>
    </Card>
  );
}
