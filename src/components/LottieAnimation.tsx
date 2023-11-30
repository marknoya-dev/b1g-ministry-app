"use client";
import Lottie from "lottie-react";
import LoadingDots from "@/components/lottie/loadingdots.json";
import Confetti from "@/components/lottie/confetti.json";
import Fireworks from "@/components/lottie/fireworks.json";

export default function LottieAnimation({ lottie }: { lottie: string }) {
  const DotsStyle = {
    width: 200,
  };

  switch (lottie) {
    case "loading":
      return (
        <Lottie animationData={LoadingDots} loop={true} style={DotsStyle} />
      );
    case "confetti":
      return <Lottie animationData={Confetti} loop={false} />;
    case "fireworks":
      return <Lottie animationData={Fireworks} loop={false} />;
  }
  // return <Lottie animationData={lottie} loop={false} />;
}
