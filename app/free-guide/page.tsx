"use client";

import { useState } from "react";

export default function FreeGuidePage() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, email, phone }),
      });

      if (!res.ok) throw new Error("Subscribe failed");

      setStatus("success");

      // Trigger PDF download via blob to bypass browser async-gesture restrictions
      fetch("/peak-performance-guide.pdf")
        .then((r) => r.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "peak-performance-guide.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        });
    } catch {
      setStatus("error");
    }
  }

  return (
    <main
      style={{ backgroundColor: "#000000", minHeight: "100vh" }}
      className="flex flex-col items-center justify-center px-4 py-16"
    >
      {/* Logo / Brand */}
      <p
        className="text-xs font-bold tracking-[0.25em] uppercase mb-10"
        style={{ color: "#1FA9FE" }}
      >
        Rock Mountain Performance
      </p>

      {/* Headline */}
      <h1
        className="text-3xl sm:text-4xl md:text-5xl font-black text-white text-center leading-tight max-w-3xl"
        style={{ letterSpacing: "-0.01em" }}
      >
        7 Ingredients{" "}
        <span style={{ color: "#1FA9FE" }}>Proven to Boost Testosterone</span>{" "}
        — See Exactly What&apos;s In Our Formula.
      </h1>

      {/* Subhead */}
      <p className="mt-5 text-base sm:text-lg text-gray-300 text-center max-w-xl">
        Get the free breakdown — every ingredient, every clinical dose, and the
        research that proves{" "}
        <span className="text-white font-semibold">why it actually works.</span>
      </p>

      {/* Divider */}
      <div
        className="mt-10 mb-10 w-16 h-px"
        style={{ backgroundColor: "#1FA9FE" }}
      />

      {/* Form or Success state */}
      {status === "success" ? (
        <SuccessState />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md flex flex-col gap-3"
          noValidate
        >
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="w-full rounded px-4 py-3 text-white text-base outline-none border transition-colors focus:border-[#1FA9FE] placeholder-gray-500"
            style={{
              backgroundColor: "#111111",
              border: "1px solid #2a2a2a",
            }}
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded px-4 py-3 text-white text-base outline-none border transition-colors focus:border-[#1FA9FE] placeholder-gray-500"
            style={{
              backgroundColor: "#111111",
              border: "1px solid #2a2a2a",
            }}
          />
          <input
            type="tel"
            placeholder="Phone Number (Optional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded px-4 py-3 text-white text-base outline-none border transition-colors focus:border-[#1FA9FE] placeholder-gray-500"
            style={{
              backgroundColor: "#111111",
              border: "1px solid #2a2a2a",
            }}
          />

          {status === "error" && (
            <p className="text-red-400 text-sm text-center">
              Something went wrong, please try again.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded py-4 font-black text-base tracking-wide uppercase transition-opacity disabled:opacity-60 cursor-pointer"
            style={{
              backgroundColor: "#1FA9FE",
              color: "#000000",
              letterSpacing: "0.08em",
            }}
          >
            {status === "loading" ? "Sending…" : "Send Me The Free Guide"}
          </button>

          <p className="text-gray-600 text-xs text-center mt-1">
            No spam. Unsubscribe anytime.
          </p>
        </form>
      )}

      {/* Trust bullets */}
      <ul className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-8 items-center">
        {[
          "7 clinically-dosed ingredients",
          "Transparent label — nothing hidden",
          "The science behind every compound",
        ].map((bullet) => (
          <li key={bullet} className="flex items-center gap-2">
            <span
              className="text-lg leading-none"
              style={{ color: "#1FA9FE" }}
              aria-hidden="true"
            >
              ✓
            </span>
            <span className="text-gray-300 text-sm font-medium">{bullet}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}

function SuccessState() {
  return (
    <div className="w-full max-w-md text-center flex flex-col items-center gap-4">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
        style={{ backgroundColor: "#1FA9FE", color: "#000000" }}
      >
        ✓
      </div>
      <h2 className="text-2xl font-black text-white">Thank You!</h2>
      <p className="text-gray-300 text-base">
        Thank you for your interest in our &ldquo;7 Ingredients Proven to Boost Testosterone Guide&rdquo;. We are pleased to
        provide you with comprehensive information to support your health journey.
      </p>
      <a
        href="/peak-performance-guide.pdf"
        download
        className="w-full rounded py-4 font-black text-base tracking-wide uppercase text-center"
        style={{ backgroundColor: "#1FA9FE", color: "#000000", letterSpacing: "0.08em" }}
      >
        Download Your Training Guide
      </a>
      <p className="text-gray-500 text-sm">
        We have also sent the guide to your email. If you have any questions or
        need further assistance, please do not hesitate to reach out.
      </p>
      <p className="text-gray-500 text-sm">
        — Rock Mountain Performance
      </p>
      <p className="text-gray-600 text-xs">
        Having trouble?{" "}
        <a
          href="/peak-performance-guide.pdf"
          download
          style={{ color: "#1FA9FE" }}
          className="underline"
        >
          Click here to download directly
        </a>
        .
      </p>
    </div>
  );
}
