"use client";
import Lottie from "lottie-react";
import LoadingDots from "@/components/lottie/loadingdots.json";
import Confetti from "@/components/lottie/confetti.json";

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
  }
  // return <Lottie animationData={lottie} loop={false} />;
}
