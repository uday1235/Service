"use client";

import { FaLocationArrow } from "react-icons/fa6";
import type { FormEvent } from "react";
import { useState } from "react";

import { socialMedia } from "@/data";
import MagicButton from "./MagicButton";

const Footer = () => {
  const [submissionStatus, setSubmissionStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus("");

    try {
      const form = event.currentTarget;
      const formData = new FormData(form);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });
      const result = (await response.json()) as {
        message?: string;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(result.error ?? "Unable to send your message.");
      }

      setSubmissionStatus(result.message ?? "Your message was sent successfully.");
      form.reset();
    } catch (error) {
      setSubmissionStatus(
        error instanceof Error
          ? error.message
          : "Unable to send your message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="w-full pt-20 pb-10" id="contact">
      {/* background grid */}
      <div className="w-full absolute left-0 -bottom-72 min-h-96">
        <img
          src="/footer-grid.svg"
          alt="grid"
          className="w-full h-full opacity-50 "
        />
      </div>

      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
          Ready to take <span className="text-purple">your</span> digital
          presence to the next level?
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          Reach out to me today and let&apos;s discuss how I can help you
          achieve your goals.
        </p>
        <div className="flex flex-col items-center gap-2 text-white-200">
          <a
            href="mailto:udayinfo26@gmail.com"
            className="hover:text-purple"
          >
            udayinfo26@gmail.com
          </a>
          <a href="tel:+917989559775" className="hover:text-purple">
            +91 7989559775
          </a>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl flex flex-col gap-4 mt-6"
        >
          <label className="sr-only" htmlFor="contact-name">
            Your name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            placeholder="Your name"
            autoComplete="name"
            maxLength={100}
            required
            className="rounded-lg border border-white/10 bg-black-200 px-4 py-3 text-white outline-none focus:border-purple"
          />
          <label className="sr-only" htmlFor="contact-email">
            Your email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            placeholder="Your email"
            autoComplete="email"
            maxLength={254}
            required
            className="rounded-lg border border-white/10 bg-black-200 px-4 py-3 text-white outline-none focus:border-purple"
          />
          <label className="sr-only" htmlFor="contact-message">
            Your message
          </label>
          <textarea
            id="contact-message"
            name="message"
            placeholder="Your message"
            rows={5}
            maxLength={5000}
            required
            className="resize-y rounded-lg border border-white/10 bg-black-200 px-4 py-3 text-white outline-none focus:border-purple"
          />
          <p aria-live="polite" className="text-sm text-white-200">
            {submissionStatus}
          </p>
          <MagicButton
            title={isSubmitting ? "Sending..." : "Send a message"}
            icon={<FaLocationArrow />}
            position="right"
            disabled={isSubmitting}
            type="submit"
          />
        </form>
      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((info) => (
            <div
              key={info.id}
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
            >
              <img src={info.img} alt="icons" width={20} height={20} />
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
