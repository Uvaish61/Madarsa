"use client";

import Lottie from "lottie-react";

interface Props {
  animationData: Record<string, unknown>;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
}

export default function LottieWidget({
  animationData,
  className,
  loop = true,
  autoplay = true,
}: Props) {
  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      className={className}
      rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
    />
  );
}
