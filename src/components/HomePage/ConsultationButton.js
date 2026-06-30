"use client";

const ArrowRight = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

export default function ConsultationButton({ onOpenForm }) {
  return (
    <button
      onClick={onOpenForm}
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-purple-300/50 transition hover:bg-purple-700 sm:w-auto sm:px-7 sm:py-4"
    >
      Free Consultation
      <ArrowRight className="h-4 w-4" />
    </button>
  );
}