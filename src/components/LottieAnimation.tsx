"use client";
import Lottie from "lottie-react";
import Confetti from "@/components/lottie/confetti.json";

export default function LottieAnimation() {
  return <Lottie animationData={Confetti} loop={false} />;
}
