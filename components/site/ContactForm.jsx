"use client";

import { useState } from "react";

const email = "berkejaisyurrohman95@gmail.com";

export default function ContactForm() {
  const [draftUrl, setDraftUrl] = useState("");
  const [copyStatus, setCopyStatus] = useState("");

  function prepareEmail(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const fields = ["name", "email", "subject", "message"];
    for (const field of fields) {
      if (!String(data.get(field)).trim()) {
        form.elements
          .namedItem(field)
          .setCustomValidity("Please complete this field.");
        form.reportValidity();
        return;
      }
    }
    const subject = encodeURIComponent(String(data.get("subject")).trim());
    const body = encodeURIComponent(
      `Hi Berke,\n\n${String(data.get("message")).trim()}\n\nFrom: ${String(data.get("name")).trim()}\nReply to: ${String(data.get("email")).trim()}`,
    );
    setDraftUrl(`mailto:${email}?subject=${subject}&body=${body}`);
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopyStatus("Email address copied.");
    } catch {
      setCopyStatus(`Could not copy. You can select the address: ${email}`);
    }
  }

  return (
    <form
      className="contact-form"
      onSubmit={prepareEmail}
      onChange={(event) => {
        event.target.setCustomValidity?.("");
        setDraftUrl("");
      }}
    >
      <div className="form-row">
        <label htmlFor="contact-name">
          Your name
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            required
            maxLength={100}
            placeholder="Name"
          />
        </label>
        <label htmlFor="contact-email">
          Your email
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={180}
            placeholder="you@example.com"
          />
        </label>
      </div>
      <label htmlFor="contact-subject">
        What are you working on?
        <input
          id="contact-subject"
          name="subject"
          required
          maxLength={160}
          placeholder="A project, an opportunity, a question…"
        />
      </label>
      <label htmlFor="contact-message">
        Your message
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          maxLength={3000}
          placeholder="A little context goes a long way."
        />
      </label>
      <p className="form-note" id="contact-note">
        Prepare a draft, then send it from your own email app. This website does
        not send or store your message.
      </p>
      <div className="form-actions">
        <button
          type="submit"
          className="button button-primary"
          aria-describedby="contact-note"
        >
          Prepare email
        </button>
        <button type="button" className="copy-button" onClick={copyEmail}>
          Copy email address
        </button>
      </div>
      <div role="status" className="form-status">
        {draftUrl && (
          <p>
            Your draft is ready.{" "}
            <a href={draftUrl} className="text-link">
              Open in your email app
            </a>
            . Review it there and press send. If no app opens, copy the email
            address and send manually.
          </p>
        )}
        {copyStatus && <p>{copyStatus}</p>}
      </div>
    </form>
  );
}
