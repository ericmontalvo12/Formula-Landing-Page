"use client";

import { useState } from "react";

export default function FreeGuidePage() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, email }),
      });

      if (!res.ok) throw new Error("Subscribe failed");

      setStatus("success");

      // Trigger PDF download
      const link = document.createElement("a");
      link.href = "/peak-performance-guide.pdf";
      link.download = "peak-performance-guide.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
        The Testosterone Guide That Shows You Exactly{" "}
        <span style={{ color: "#1FA9FE" }}>What&apos;s In Our Formula</span>{" "}
        — And Why.
      </h1>

      {/* Subhead */}
      <p className="mt-5 text-base sm:text-lg text-gray-300 text-center max-w-xl">
        Free PDF breakdown of every ingredient, every dose, and the science
        behind{" "}
        <span className="text-white font-semibold">Peak Performance.</span>
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
          "7 research-backed ingredients",
          "Every dose fully disclosed",
          "No proprietary blends",
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
      <h2 className="text-2xl font-black text-white">You&apos;re in!</h2>
      <p className="text-gray-300 text-base">
        Your free guide is downloading now. Check your inbox — we&apos;re also
        sending it to your email.
      </p>
      <p className="text-gray-500 text-sm">
        If your download doesn&apos;t start automatically,{" "}
        <a
          href="/peak-performance-guide.pdf"
          download
          style={{ color: "#1FA9FE" }}
          className="underline"
        >
          click here
        </a>
        .
      </p>
    </div>
  );
}
