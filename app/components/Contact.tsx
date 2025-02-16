"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      setSubmitSuccess(true);
      reset();
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error: any) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 transition-colors duration-300 overflow-hidden relative"
    >
      {submitSuccess && (
  <motion.div
    className="fixed inset-0 flex items-center justify-center z-[60]"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0, opacity: 0 }}
  >
    <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg mx-4 max-w-[90vw] w-full md:max-w-md">
      <h3 className="text-xl md:text-2xl font-bold text-green-600 mb-2 text-center">
        Success!
      </h3>
      <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 text-center">
        Your message has been sent successfully!
      </p>
    </div>
  </motion.div>
)}

      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Get in Touch
        </motion.h2>
        <div className="flex flex-col lg:flex-row gap-12">
          <motion.div
            className="lg:w-1/3"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold mb-6 dark:text-white">
                Contact Information
              </h3>
              <div className="space-y-6">
                <a
                  href="mailto:anuragofficial.wrk@gmail.com"
                  className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                >
                  <Mail className="w-6 h-6 mr-3 text-blue-600" />
                  anuragofficial.wrk@gmail.com
                </a>
                <a
                  href="tel:+916395103322"
                  className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                >
                  <Phone className="w-6 h-6 mr-3 text-blue-600" />
                  +91-639-5103322
                </a>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <MapPin className="w-6 h-6 mr-3 text-blue-600" />
                  Uttar Pradesh, India
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="lg:w-2/3"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    className={`w-full px-4 py-2 rounded-md border ${
                      errors.name ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    className={`w-full px-4 py-2 rounded-md border ${
                      errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Subject
                </label>
                <input
                  {...register("subject")}
                  type="text"
                  className={`w-full px-4 py-2 rounded-md border ${
                    errors.subject ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
                />
                {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>}
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  {...register("message")}
                  rows={4}
                  className={`w-full px-4 py-2 rounded-md border ${
                    errors.message ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
                ></textarea>
                {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Send className="w-5 h-5 mr-2" />}
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
              {submitError && <p className="mt-4 text-red-500">{submitError}</p>}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}