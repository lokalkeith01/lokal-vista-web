import { useState, useEffect, useCallback } from "react";
import { onCLS, onINP, onLCP, onFCP, onTTFB, type Metric } from "web-vitals";

export interface WebVitalsData {
  lcp: number | null; // Largest Contentful Paint
  fcp: number | null; // First Contentful Paint
  cls: number | null; // Cumulative Layout Shift
  inp: number | null; // Interaction to Next Paint
  ttfb: number | null; // Time to First Byte
  timestamp: Date;
}

export interface WebVitalsRating {
  value: number | null;
  rating: "good" | "needs-improvement" | "poor" | "unknown";
  name: string;
  unit: string;
  thresholds: { good: number; poor: number };
}

// Web Vitals thresholds based on Google's recommendations
const THRESHOLDS = {
  lcp: { good: 2500, poor: 4000 }, // milliseconds
  fcp: { good: 1800, poor: 3000 }, // milliseconds
  cls: { good: 0.1, poor: 0.25 }, // score (no unit)
  inp: { good: 200, poor: 500 }, // milliseconds
  ttfb: { good: 800, poor: 1800 }, // milliseconds
};

export function useWebVitals() {
  const [vitals, setVitals] = useState<WebVitalsData>({
    lcp: null,
    fcp: null,
    cls: null,
    inp: null,
    ttfb: null,
    timestamp: new Date(),
  });

  const handleMetric = useCallback((metric: Metric) => {
    setVitals((prev) => ({
      ...prev,
      [metric.name.toLowerCase()]: metric.value,
      timestamp: new Date(),
    }));
  }, []);

  useEffect(() => {
    // Register Web Vitals observers
    onLCP(handleMetric);
    onFCP(handleMetric);
    onCLS(handleMetric);
    onINP(handleMetric);
    onTTFB(handleMetric);
  }, [handleMetric]);

  const getRating = (
    name: keyof typeof THRESHOLDS,
    value: number | null
  ): "good" | "needs-improvement" | "poor" | "unknown" => {
    if (value === null) return "unknown";
    const threshold = THRESHOLDS[name];
    if (value <= threshold.good) return "good";
    if (value <= threshold.poor) return "needs-improvement";
    return "poor";
  };

  const getVitalsWithRatings = (): WebVitalsRating[] => [
    {
      name: "LCP",
      value: vitals.lcp,
      rating: getRating("lcp", vitals.lcp),
      unit: "ms",
      thresholds: THRESHOLDS.lcp,
    },
    {
      name: "FCP",
      value: vitals.fcp,
      rating: getRating("fcp", vitals.fcp),
      unit: "ms",
      thresholds: THRESHOLDS.fcp,
    },
    {
      name: "CLS",
      value: vitals.cls,
      rating: getRating("cls", vitals.cls),
      unit: "",
      thresholds: THRESHOLDS.cls,
    },
    {
      name: "INP",
      value: vitals.inp,
      rating: getRating("inp", vitals.inp),
      unit: "ms",
      thresholds: THRESHOLDS.inp,
    },
    {
      name: "TTFB",
      value: vitals.ttfb,
      rating: getRating("ttfb", vitals.ttfb),
      unit: "ms",
      thresholds: THRESHOLDS.ttfb,
    },
  ];

  const getOverallRating = (): "good" | "needs-improvement" | "poor" | "unknown" => {
    const ratings = getVitalsWithRatings();
    const measuredRatings = ratings.filter((r) => r.rating !== "unknown");
    
    if (measuredRatings.length === 0) return "unknown";
    if (measuredRatings.some((r) => r.rating === "poor")) return "poor";
    if (measuredRatings.some((r) => r.rating === "needs-improvement")) return "needs-improvement";
    return "good";
  };

  return {
    vitals,
    getVitalsWithRatings,
    getOverallRating,
  };
}
