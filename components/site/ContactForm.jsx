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
    for (const field of ["name", "email", "subject", "message"]) {
      if (!String(data.get(field) || "").trim()) {
        form.elements.namedItem(field).setCustomValidity("Please complete this field.");
        form.reportValidity();
        return;
      }
    }
    const subject = encodeURIComponent(String(data.get("subject")).trim());
    const body = encodeURIComponent(`Hi Berke,\n\n${String(data.get("message")).trim()}\n\nFrom: ${String(data.get("name")).trim()}\nReply to: ${String(data.get("email")).trim()}`);
    setDraftUrl(`mailto:${email}?subject=${subject}&body=${body}`);
    setCopyStatus("");
  }

  async function copyEmail() {
    try { await navigator.clipboard.writeText(email); setCopyStatus("Email address copied to clipboard."); }
    catch { setCopyStatus(`Could not copy automatically. Email: ${email}`); }
  }

  return (
    <form className="contact-form" onSubmit={prepareEmail} onChange={(event) => { event.target.setCustomValidity?.(""); setDraftUrl(""); }}>
      <span className="contact-form-heading"><span>START A CONVERSATION</span><span>↗</span></span>
      <div className="form-row">
        <label htmlFor="contact-name">YOUR NAME<input id="contact-name" name="name" autoComplete="name" required maxLength={100} placeholder="What should I call you?" /></label>
        <label htmlFor="contact-email">EMAIL ADDRESS<input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={180} placeholder="you@example.com" /></label>
      </div>
      <label htmlFor="contact-subject">WHAT ARE YOU WORKING ON?<input id="contact-subject" name="subject" required maxLength={160} placeholder="A project, a collaboration, an idea..." /></label>
      <label htmlFor="contact-message">YOUR MESSAGE<textarea id="contact-message" name="message" rows={3} required maxLength={3000} placeholder="Tell me a little about it." /></label>
      <p className="form-note" id="contact-note">This prepares a draft in your email app. Nothing is sent or stored by this site.</p>
      <div className="form-actions"><button type="submit" className="button button-primary magnetic" aria-describedby="contact-note">PREPARE EMAIL <span aria-hidden="true">↗</span></button><button type="button" className="copy-button" onClick={copyEmail}>COPY ADDRESS ⧉</button></div>
      <div className="form-status" role="status" aria-live="polite">
        {draftUrl && <p>Your draft is ready. <a className="text-link" href={draftUrl}>Open in your email app ↗</a>. Review it and send from there. If no app opens, copy the email address instead.</p>}
        {copyStatus && <p>{copyStatus}</p>}
      </div>
    </form>
  );
}