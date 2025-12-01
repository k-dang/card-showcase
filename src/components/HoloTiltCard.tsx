"use client";

import { useRef, useCallback, ReactNode, useEffect } from "react";
import "./HoloTiltCard.css";
import { cn } from "@/lib/utils";

/**
 * Props for the HoloTiltCard component.
 */
interface HoloTiltCardProps {
  children: ReactNode;
  rarity?: string;
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
  const trackingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize CSS variables on mount
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.setProperty("--pointer-x", "50%");
    el.style.setProperty("--pointer-y", "50%");
    el.style.setProperty("--pointer-from-center", "0");
    el.style.setProperty("--background-x", "50");
    el.style.setProperty("--background-y", "50");
    el.style.setProperty("--card-opacity", "0");
    
    // Set custom foil variable if provided
    if (foil) {
      el.style.setProperty("--foil", foil);
    }
    
    // Set custom mask variable if provided
    if (mask) {
      el.style.setProperty("--mask", mask);
    }
  }, [foil, mask]);

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
        1
      );

      // Background position adjustments
      const backgroundX = px * 26 + 37;
      const backgroundY = py * 34 + 33;

      // TODO: double check if necessary
      el.style.setProperty("--px", px.toString());
      el.style.setProperty("--py", py.toString());
      el.style.setProperty("--pointer-x", `${pointerX}%`);
      el.style.setProperty("--pointer-y", `${pointerY}%`);
      el.style.setProperty(
        "--pointer-from-center",
        pointerFromCenter.toString()
      );
      el.style.setProperty("--background-x", `${backgroundX}%`);
      el.style.setProperty("--background-y", `${backgroundY}%`);
      el.style.setProperty("--card-opacity", "1");

      // card tilt - increased for more dramatic effect
      const rotateX = (py - 0.5) * 45; // tilt forward/back
      const rotateY = (0.5 - px) * 45; // tilt left/right

      el.style.setProperty("--rotateX", `${rotateX}deg`);
      el.style.setProperty("--rotateY", `${rotateY}deg`);
      el.style.setProperty("--translateX", "0px");
      el.style.setProperty("--translateY", "0px");
      el.style.setProperty("--card-scale", "1");
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    // Cancel any pending animation frame
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }

    // Clear tracking timeout
    if (trackingTimeoutRef.current !== null) {
      clearTimeout(trackingTimeoutRef.current);
      trackingTimeoutRef.current = null;
    }

    // Remove tracking class to restore transition for smooth reset
    el.classList.remove("tracking");

    // Reset all transform properties
    el.style.setProperty("--rotateX", "0deg");
    el.style.setProperty("--rotateY", "0deg");
    el.style.setProperty("--translateX", "0px");
    el.style.setProperty("--translateY", "0px");
    el.style.setProperty("--card-scale", "1");
    el.style.setProperty("--card-opacity", "0");
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("card", masked && "masked")}
      data-rarity={rarity}
    >
      {children}
      {shine && <div className="card__shine"></div>}
      {glare && <div className="card__glare"></div>}
      {grain && <div className="card__grain"></div>}
    </div>
  );
}
