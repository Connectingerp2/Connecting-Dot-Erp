import Image from "next/image";
import dynamic from "next/dynamic";

const ConsultationButton = dynamic(
  () => import("./ConsultationButton"),
  {
    ssr: false,
  }
);

/* ---------- Inline SVG icons (no extra deps needed) ---------- */

const StarIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.3l6.5-.9L12 2.5z" />
  </svg>
);

/* ---------- Lavender orbital-ring background ---------- */

const OrbitBackground = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 600 600"
    fill="none"
    aria-hidden="true"
    preserveAspectRatio="xMidYMid slice"
  >
    {/* concentric dotted orbital ellipses */}
    <g stroke="#a78bfa" strokeOpacity="0.9" strokeWidth="1.4" strokeDasharray="2 8" strokeLinecap="round">
      <ellipse cx="300" cy="300" rx="150" ry="120" transform="rotate(-25 300 300)" />
      <ellipse cx="300" cy="300" rx="220" ry="180" transform="rotate(-25 300 300)" />
      <ellipse cx="300" cy="300" rx="290" ry="235" transform="rotate(-25 300 300)" />
    </g>
    {/* faint solid arcs */}
    <g stroke="#c4b5fd" strokeOpacity="0.85" strokeWidth="1.2" fill="none">
      <ellipse cx="300" cy="300" rx="255" ry="205" transform="rotate(-25 300 300)" />
      <ellipse cx="300" cy="300" rx="185" ry="150" transform="rotate(-25 300 300)" />
    </g>
    {/* big soft circle */}
    <circle cx="150" cy="120" r="28" fill="#c4b5fd" fillOpacity="0.7" />
    {/* small dots on the orbits */}
    <g fill="#8b5cf6">
      <circle cx="92" cy="300" r="4.5" />
      <circle cx="470" cy="150" r="3.5" fillOpacity="0.9" />
      <circle cx="520" cy="360" r="4" fillOpacity="0.85" />
      <circle cx="210" cy="500" r="3.5" fillOpacity="0.9" />
      <circle cx="120" cy="430" r="3" fillOpacity="0.8" />
    </g>
    {/* diamond sparkles */}
    <g fill="#a78bfa" fillOpacity="0.95">
      <path d="M540 90l5 10 10 5-10 5-5 10-5-10-10-5 10-5z" />
      <path d="M70 200l4 8 8 4-8 4-4 8-4-8-8-4 8-4z" />
    </g>
  </svg>
);

/* ---------- Data ---------- */

// Was a raw, untransformed Cloudinary URL (full-resolution WhatsApp upload —
// likely several MB). That's the LCP culprit: this image renders above the
// fold with `fill` + `sizes="100vw"`, so the browser was requesting a huge
// width *of an already-huge source*. Added f_auto/q_auto/c_fill/w_ to compress
// and cap the source Cloudinary serves before Next's image optimizer even
// touches it.
const heroBackgroundImage =
  "https://res.cloudinary.com/djdhtkjhn/image/upload/v1782994449/WhatsApp_Image_2026-06-18_at_3.51.37_PM_cvycpj.webp";

/* ---------- Component (Server Component — no "use client") ---------- */

export default function CareerHeroSlide({ onOpenForm }) {
  return (
    <section className="relative w-full overflow-hidden bg-white sm:min-h-[560px] md:min-h-[700px] lg:min-h-[800px] sm:bg-purple-50">
      {/* ================================================================
          IMAGE BLOCK
          Mobile: fixed h-[300px] (UNCHANGED HEIGHT — do not modify)
          Desktop (sm+): absolute inset-0, exactly as before
      ================================================================ */}
      <div className="relative h-[300px] w-full overflow-hidden sm:absolute sm:inset-0 sm:h-full">
        <Image
          src={heroBackgroundImage}
          alt="Connecting Dots ERP building"
          fill
          priority
          fetchPriority="high"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1920px"
          className="-z-0 object-cover object-[70%_center] sm:object-center"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-purple-950/15 via-transparent to-transparent" />
        {/* decorative sparkles */}
        <span className="pointer-events-none absolute right-5 top-10 z-10 select-none text-xl text-purple-200 sm:right-10 sm:top-12 sm:text-2xl">✦</span>
        <span className="pointer-events-none absolute right-1/3 top-24 z-10 hidden select-none text-lg text-purple-200 sm:block">✦</span>
        <span className="pointer-events-none absolute bottom-40 left-1/2 z-10 hidden select-none text-base text-purple-200 md:block">✦</span>

        {/* ---------- MOBILE-ONLY: smooth white fade at bottom of image, so it
             blends into the floating card / content below ---------- */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent via-white/70 to-white sm:hidden" />

        {/* ---------- MOBILE-ONLY: badge + heading overlaid on the image ---------- */}
        <div className="relative z-10 px-5 pt-10 sm:hidden">
          {/* premium glass pill badge */}
          <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-white/90 px-3.5 py-2 shadow-[0_8px_24px_rgba(124,58,237,0.18)] ring-1 ring-purple-100 backdrop-blur-md">
            <StarIcon className="h-4 w-4 shrink-0 text-purple-600" />
            <span className="min-w-0 text-xs font-semibold text-gray-800">
              India&apos;s Leading SAP &amp; IT Training with AI Institute
            </span>
          </div>

          {/* heading, with a subtle radial glow behind it */}
          <div className="relative mt-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-4 left-4 -z-10 h-40 w-40 rounded-full bg-purple-500/30 blur-3xl"
            />
            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.35)]">
              Secure your
              <br />
              <span
                className="bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#D946EF] bg-clip-text text-transparent"
                style={{ WebkitBackgroundClip: "text", backgroundClip: "text" }}
              >
                Dream Career
              </span>{" "}
              with
              <br />
              Live Classes
            </h1>
          </div>
        </div>
      </div>

      {/* ================================================================
          MOBILE-ONLY: floating glass card
          Sits below the hero image (no overlap) with breathing room.
          Contains the strengthened copy + CTA button (moved inside card).
      ================================================================ */}
      <div className="relative z-20 mt-2 px-5 sm:hidden">
        <div className="rounded-[28px] border border-purple-200/60 bg-white/80 p-6 shadow-[0_20px_55px_-12px_rgba(124,58,237,0.28)] backdrop-blur-xl">
          <p className="text-[15px] leading-relaxed text-gray-700">
            For over{" "}
            <span className="font-bold text-purple-600">10+ Years</span> we&apos;ve
            helped professionals build successful careers through engaging
            instructor-led SAP &amp; AI training.
          </p>

          <div className="mt-6">
            <ConsultationButton onOpenForm={onOpenForm} />
          </div>
        </div>
      </div>

      {/* ---------------- spacer below the floating card on mobile ---------------- */}
      <div className="h-8 sm:hidden" aria-hidden="true" />

      {/* ================================================================
          DESKTOP CONTENT BLOCK — UNCHANGED
      ================================================================ */}
      <div className="relative z-10 mx-auto hidden max-w-[1400px] px-5 pb-8 pt-5 sm:block sm:px-8 sm:pb-0 sm:pt-12 lg:px-10 lg:pt-14">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-8">
          {/* ---------------- Left column ---------------- */}
          <div className="relative z-10 max-w-2xl lg:col-span-5">
            {/* badge */}
            <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-white px-3 py-2 shadow-sm ring-1 ring-purple-100 sm:px-4">
              <StarIcon className="h-4 w-4 shrink-0 text-purple-600" />
              <span className="min-w-0 text-xs font-semibold text-gray-800 sm:text-sm">
                India&apos;s Leading SAP &amp; IT Training with AI Institute
              </span>
            </div>

            {/* heading */}
            <h1 className="mt-6 text-3xl font-extrabold leading-[1.05] tracking-tight text-white sm:mt-7 lg:!text-gray-900 lg:text-6xl xl:text-7xl">
              Secure your
              <br />
              <span className="text-purple-600">Dream Career</span> with
              <br />
              Live Classes
            </h1>

            {/* sub copy */}
            <p className="mt-5 max-w-md rounded-3xl bg-white/85 px-4 py-3 text-base font-medium leading-relaxed text-gray-700 shadow-sm shadow-slate-900/5 sm:mt-6 sm:text-lg">
              From more than 10 years,we&apos;ve been passionate about providing engaging, instructor-led training that helps professionals around the world grow and succeed
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:gap-4">
              <ConsultationButton onOpenForm={onOpenForm} />
            </div>
          </div>

          {/* ---------------- Right column (building) ---------------- */}
          <div className="relative hidden lg:col-span-7 lg:block">
            {/* lavender orbital-ring background */}
            <OrbitBackground className="absolute left-1/2 top-1/2 -z-10 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2" />

            {/* soft radial glow behind building */}
            <div className="absolute inset-0 -z-10 scale-110 rounded-full bg-purple-300/30 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
