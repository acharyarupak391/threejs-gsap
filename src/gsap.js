import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { sphere } from "./canvas";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// create timeline
const timeline = gsap.timeline();

const initialPositionX = sphere.position.x;
const initialPositionY = sphere.position.y;

// THE "BACKGROUND" ROTATION
// This animation will span the ENTIRE duration of the timeline.
timeline.to(sphere.rotation, {
  y: Math.PI * 2, // 360 degrees on Y
  x: Math.PI * 2, // 360 degrees on X
  duration: 2, // Set its duration to the total length of the sequence
  ease: "none", // A linear ease is best for continuous rotation
});

// 1. THE MOVEMENT ANIMATION (To midpoint)
timeline.to(
  sphere.position,
  {
    x: -1 * initialPositionX,
    y: 0,

    duration: 1, // Duration to reach the midpoint
    ease: "power2.in", // A smooth ease
  },
  0
);

// 2. THE SCALING ANIMATION (To midpoint)
timeline.to(
  sphere.scale,
  {
    x: 0.5,
    y: 0.5,

    duration: 1, // Must have the same duration to stay in sync
    ease: "power2.in",
    // yoyo: true,
    // repeat: 1,
  },
  "<"
); // This "<" is the magic key to make it simultaneous

// 3. THE MOVEMENT ANIMATION (return)
timeline.to(
  sphere.position,
  {
    x: initialPositionX,
    y: -1 * initialPositionY,

    duration: 1,
    ease: "power2.out",
  },
  1
);
// 4. THE SCALING ANIMATION (return)
timeline.to(
  sphere.scale,
  {
    x: 1,
    y: 1,

    duration: 1,
    ease: "power2.out",
  },
  "<"
);

// add scroll trigger
ScrollTrigger.create({
  animation: timeline,
  trigger: "body",
  start: "top top",
  end: "bottom bottom",
  scrub: true,
  markers: true, // Enable markers for debugging
});
