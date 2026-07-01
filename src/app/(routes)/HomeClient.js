// app/HomeClient.jsx  (client component)
'use client';

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import HeaderCarousel from "@/components/HomePage/HeaderCarousel";

const Marquee = dynamic(() => import("@/components/HomePage/Marquee2"), {
  ssr: false,
  loading: () => <div style={{ height: "60px" }} />,
});

const Chevron = dynamic(() => import("@/components/HomePage/Chevron"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "100px" }} />,
});

const Keypoints = dynamic(() => import("@/components/HomePage/Keypoints"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "300px" }} />,
});

const OurClients = dynamic(() => import("@/components/HomePage/OurClients"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "200px" }} />,
});

const PlacementSection = dynamic(
  () => import("@/components/HomePage/PlacementSection"),
  {
    ssr: false,
    loading: () => <div style={{ minHeight: "520px" }} />,
  }
);

// ── NEW: compact placed-students ticker ──────────────────────────────────────
const PlacedTicker = dynamic(
  () => import("@/components/HomePage/PlacedTicker"),
  {
    ssr: false,
    loading: () => <div style={{ height: "190px", background: "#f8f9fb" }} />,
  }
);

const OurStats = dynamic(() => import("@/components/HomePage/OurStats"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "250px" }} />,
});

const FeedbackAndReviews = dynamic(
  () => import("@/components/HomePage/FeedbackandReviews"),
  {
    ssr: false,
    loading: () => <div style={{ minHeight: "400px" }} />,
  }
);

const DemoCertificate = dynamic(
  () => import("@/components/HomePage/DemoCertificate"),
  {
    ssr: false,
    loading: () => <div style={{ minHeight: "300px" }} />,
  }
);

const Branches = dynamic(() => import("@/components/HomePage/Branches"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "350px" }} />,
});

const Courses = dynamic(() => import("@/components/HomePage/PopCourses"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "520px" }} />,
});

const LatestBlogs = dynamic(() => import("@/components/HomePage/Blogs"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "400px" }} />,
});

const Achievements = dynamic(() => import("@/components/HomePage/Achievements"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "760px" }} />,
});

const LazySection = ({ children, fallback, rootMargin = "350px", intrinsicSize }) => {
  const ref = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (shouldRender) return;

    if (!("IntersectionObserver" in window)) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  return (
    <div
      ref={ref}
      style={
        intrinsicSize
          ? {
              contentVisibility: "auto",
              containIntrinsicSize: intrinsicSize,
            }
          : undefined
      }
    >
      {shouldRender ? children : fallback}
    </div>
  );
};

export default function HomeClient() {
  return (
    <>
      <main className="flex-col justify-center">
        <h1 className="visually-hidden">
          Job-Oriented Training That Gets You Hired
        </h1>

        {/* Above the fold */}
        <HeaderCarousel />

        {/* Below the fold — lazy loaded */}
        <LazySection fallback={<div style={{ height: "60px" }} />}>
          <Marquee />
        </LazySection>
        <LazySection fallback={<div style={{ minHeight: "100px" }} />}>
          <Chevron />
        </LazySection>
        <LazySection fallback={<div style={{ minHeight: "200px" }} />}>
          <OurClients />
        </LazySection>
        <LazySection fallback={<div style={{ minHeight: "300px" }} />}>
          <Keypoints />
        </LazySection>
        <LazySection fallback={<div style={{ minHeight: "520px" }} />} intrinsicSize="520px">
          <Courses />
        </LazySection>
        <LazySection fallback={<div style={{ minHeight: "520px" }} />} intrinsicSize="520px">
          <PlacementSection />
        </LazySection>

        {/* ── Placed students ticker (new) — sits right after PlacementSection ── */}
        <LazySection fallback={<div style={{ minHeight: "250px" }} />}>
          <OurStats />
        </LazySection>

        <LazySection fallback={<div style={{ height: "190px", background: "#f8f9fb" }} />}>
          <PlacedTicker />
        </LazySection>
        <LazySection fallback={<div style={{ minHeight: "760px" }} />} intrinsicSize="760px">
          <Achievements />
        </LazySection>
        <LazySection fallback={<div style={{ minHeight: "400px" }} />}>
          <FeedbackAndReviews />
        </LazySection>
        <LazySection fallback={<div style={{ minHeight: "300px" }} />}>
          <DemoCertificate />
        </LazySection>
        <LazySection fallback={<div style={{ minHeight: "400px" }} />}>
          <LatestBlogs />
        </LazySection>
        <LazySection fallback={<div style={{ minHeight: "350px" }} />}>
          <Branches />
        </LazySection>
      </main>
    </>
  );
}
