import LottieAnimation from "@/components/LottieAnimation";

export default function LoadingOverlay() {
  return (
    <div className="fixed z-10 w-full h-screen top-0 left-0 pointer-events-none bg-black flex items-center justify-center">
      <LottieAnimation lottie="loading" />
    </div>
  );
}
