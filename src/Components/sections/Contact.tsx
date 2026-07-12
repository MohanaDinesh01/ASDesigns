import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import "./Contact.css";
import { submitContactForm } from "../../api/contact";

const contactSchema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email"),
  projectType: z.string().min(1, "Select a project type"),
  message: z.string().min(10, "Tell us a bit more about the project"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await submitContactForm(data);
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="contact">
      <div className="contact__header">
        <span className="contact__eyebrow">CONTACT</span>
        <h2 className="contact__title">Start a project</h2>
        <p className="contact__subtext">
          Tell us what you're working on. We'll get back to you within 24 hours.
        </p>
      </div>

      <form
        className="contact__form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="contact__field">
          <label htmlFor="name">Name</label>
          <input id="name" type="text" {...register("name")} />
          {errors.name && (
            <span className="contact__error">{errors.name.message}</span>
          )}
        </div>

        <div className="contact__field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register("email")} />
          {errors.email && (
            <span className="contact__error">{errors.email.message}</span>
          )}
        </div>

        <div className="contact__field">
          <label htmlFor="projectType">Project type</label>
          <select id="projectType" {...register("projectType")}>
            <option value="">Select one</option>
            <option value="brand-identity">Brand identity</option>
            <option value="video-editing">Video editing</option>
            <option value="motion-graphics">Motion graphics</option>
            <option value="social-content">Social content</option>
            <option value="other">Other</option>
          </select>
          {errors.projectType && (
            <span className="contact__error">{errors.projectType.message}</span>
          )}
        </div>

        <div className="contact__field">
          <label htmlFor="message">Project details</label>
          <textarea id="message" rows={5} {...register("message")} />
          {errors.message && (
            <span className="contact__error">{errors.message.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="contact__submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send message"}
        </button>

        {status === "success" && (
          <p className="contact__status contact__status--success">
            Message sent. We'll be in touch soon.
          </p>
        )}
        {status === "error" && (
          <p className="contact__status contact__status--error">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </section>
  );
}
