"use client";

import { type ReactNode, useCallback, useEffect, useRef } from "react";
import "./HoloTiltCard.css";
import "./HoloTiltCard.vmax.css";
import "./HoloTiltCard.rainbow.css";
import { cn } from "@/lib/utils";

export type CardRarity = "rare holo vmax" | "rare rainbow";

function setCssVars(el: HTMLElement, vars: Record<string, string>) {
  for (const [key, value] of Object.entries(vars)) {
    el.style.setProperty(key, value);
  }
}

/**
 * Props for the HoloTiltCard component.
 */
interface HoloTiltCardProps {
  children: ReactNode;
  rarity?: CardRarity;
  masked?: boolean;
  shine?: boolean;
  glare?: boolean;
  grain?: boolean;
  foil?: string; // CSS variable value for --foil (e.g., 'url("/img/foil.webp")')
  mask?: string; // CSS variable value for --mask (e.g., 'url("/img/mask.webp")')
}

export default function HoloTiltCard({
  children,
  rarity,
  masked,
  shine,
  glare,
  grain,
  foil,
  mask,
}: HoloTiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const trackingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelPendingFramesAndTimers = useCallback(() => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    if (trackingTimeoutRef.current !== null) {
      clearTimeout(trackingTimeoutRef.current);
      trackingTimeoutRef.current = null;
    }
  }, []);

  // Initialize CSS variables on mount
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    setCssVars(el, {
      "--pointer-x": "50%",
      "--pointer-y": "50%",
      "--pointer-from-center": "0",
      "--background-x": "50",
      "--background-y": "50",
      "--card-opacity": "0",
    });

    // Set custom foil variable if provided
    if (foil) {
      el.style.setProperty("--foil", foil);
    }

    // Set custom mask variable if provided
    if (mask) {
      el.style.setProperty("--mask", mask);
    }
  }, [foil, mask]);

  // Cancel pending RAF/timeouts on unmount
  useEffect(() => {
    return cancelPendingFramesAndTimers;
  }, [cancelPendingFramesAndTimers]);

  const handleMouseEnter = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    // Remove tracking class to allow smooth initial transition
    el.classList.remove("tracking");

    // Clear any existing timeout
    if (trackingTimeoutRef.current !== null) {
      clearTimeout(trackingTimeoutRef.current);
    }

    // After initial transition completes, enable tracking for smooth mouse following
    trackingTimeoutRef.current = setTimeout(() => {
      if (el) {
        el.classList.add("tracking");
      }
    }, 500); // Match the hover transition duration
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    // Cancel any pending animation frame
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
    }

    // Use requestAnimationFrame for smooth updates
    rafId.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // 0 -> 1 normalized
      const px = x / rect.width;
      const py = y / rect.height;

      // Calculate pointer position as percentage
      const pointerX = px * 100;
      const pointerY = py * 100;

      // Calculate distance from center (0-1)
      const centerX = px - 0.5;
      const centerY = py - 0.5;
      const pointerFromCenter = Math.min(
        Math.sqrt(centerX * centerX + centerY * centerY) * 2,
        1,
      );

      // Background position adjustments
      const backgroundX = px * 26 + 37;
      const backgroundY = py * 34 + 33;

      // card tilt - forward/back tilt increased to 60deg max
      const rotateX = (py - 0.5) * 60; // tilt forward/back
      const rotateY = (0.5 - px) * 45; // tilt left/right

      // --px/--py: normalized pointer position (0–1), consumed by
      // HoloTiltCard.rainbow.css (pointer-from-left/top) and TiltCard.css (shine gradient).
      setCssVars(el, {
        "--px": px.toString(),
        "--py": py.toString(),
        "--pointer-x": `${pointerX}%`,
        "--pointer-y": `${pointerY}%`,
        "--pointer-from-center": pointerFromCenter.toString(),
        "--background-x": `${backgroundX}%`,
        "--background-y": `${backgroundY}%`,
        "--card-opacity": "1",
        "--rotateX": `${rotateX}deg`,
        "--rotateY": `${rotateY}deg`,
        "--translateX": "0px",
        "--translateY": "0px",
        "--card-scale": "1",
      });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    cancelPendingFramesAndTimers();

    // Remove tracking class to restore transition for smooth reset
    el.classList.remove("tracking");

    // Reset all transform properties
    setCssVars(el, {
      "--rotateX": "0deg",
      "--rotateY": "0deg",
      "--translateX": "0px",
      "--translateY": "0px",
      "--card-scale": "1",
      "--card-opacity": "0",
    });
  }, [cancelPendingFramesAndTimers]);

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("card", masked && "masked")}
      data-rarity={rarity}
      role="image"
    >
      {children}
      {shine && <div className="card__shine"></div>}
      {glare && <div className="card__glare"></div>}
      {grain && <div className="card__grain"></div>}
    </div>
  );
}
