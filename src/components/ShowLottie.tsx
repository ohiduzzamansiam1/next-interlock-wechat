"use client";

import Lottie from "react-lottie";

function ShowLottie({
  lottieFile,
  width = "100%",
  height = "100%",
}: {
  width?: string;
  height?: string;
  lottieFile: any;
}) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lottieFile,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return <Lottie options={defaultOptions} width={width} height={height} />;
}

export default ShowLottie;
