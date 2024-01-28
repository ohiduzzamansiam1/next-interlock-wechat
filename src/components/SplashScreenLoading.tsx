"use client";

import Lottie from "react-lottie";
import loadingAnimationData from "../../public/animations/loading.json";

function SplashScreenLoading() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="grid place-content-center h-dvh">
      <Lottie options={defaultOptions} />
    </div>
  );
}

export default SplashScreenLoading;
