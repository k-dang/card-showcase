"use client";

import { useRef, useCallback, ReactNode } from "react";
import "./TiltCard.css";

/**
 * Props for the TiltCard component.
 */
interface TiltCardProps {
  children: ReactNode;
}

/**
 * TiltCard - A 3D tilt effect card component that responds to mouse movement.
 *
 * This component creates an interactive card that:
 * - Tilts in 3D space based on mouse position (up to 35 degrees)
 * - Shows a radial gradient shine effect that follows the cursor
 * - Smoothly transitions when entering/leaving hover state
 * - Uses CSS custom properties for dynamic styling
 *
 * @example
 * ```tsx
 * <TiltCard>
 *   <Image src="/card.png" alt="Card" width={300} height={600} />
 * </TiltCard>
 * ```
 *
 * @remarks
 * The component uses CSS custom properties that are dynamically updated:
 * - `--px`: Normalized X position (0-1) for shine effect
 * - `--py`: Normalized Y position (0-1) for shine effect
 * - `--rotateX`: Rotation angle in degrees for forward/backward tilt
 * - `--rotateY`: Rotation angle in degrees for left/right tilt
 *
 * The component uses `requestAnimationFrame` for smooth performance and
 * implements a tracking class system to disable transitions during active mouse tracking.
 */
export default function TiltCard({ children }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const trackingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Handles mouse enter event.
   * Removes the tracking class to allow smooth initial transition,
   * then adds it back after 300ms for responsive mouse tracking.
   */
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
    }, 300); // Match the hover transition duration
  }, []);

  /**
   * Handles mouse move event.
   * Calculates normalized mouse position and updates CSS custom properties
   * for tilt rotation and shine effect positioning.
   * Uses requestAnimationFrame for smooth 60fps updates.
   *
   * @param e - Mouse event containing client coordinates
   */
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

      el.style.setProperty("--px", px.toString());
      el.style.setProperty("--py", py.toString());

      // card tilt
      const rotateX = (py - 0.5) * 35; // tilt forward/back
      const rotateY = (0.5 - px) * 35; // tilt left/right

      el.style.setProperty("--rotateX", `${rotateX}deg`);
      el.style.setProperty("--rotateY", `${rotateY}deg`);
    });
  }, []);

  /**
   * Handles mouse leave event.
   * Cleans up animation frames and timeouts, removes tracking class,
   * and resets the card rotation to its default state.
   */
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

    el.style.setProperty("--rotateX", "0deg");
    el.style.setProperty("--rotateY", "0deg");
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="tilt-card"
    >
      {children}
    </div>
  );
}
