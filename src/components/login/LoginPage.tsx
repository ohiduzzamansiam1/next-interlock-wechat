"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import loginLottie from "../../../public/animations/login_image.json";
import ShowLottie from "../ShowLottie";
import { Button } from "../ui/button";

function LoginPage() {
  return (
    <>
      <div className="h-dvh flex flex-col items-center justify-center bg-white">
        <div className="w-[100%] h-[100%] rounded-2xl flex flex-col lg:flex-row lg:w-[80%] lg:h-[80%] shadow-2xl">
          <div className="h-[50%] lg:h-[100%] lg:w-[50%] relative grid place-content-center lg:p-32 bg-white">
            <div className="w-full absolute h-full z-10"></div>
            <ShowLottie lottieFile={loginLottie} />
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="rounded-xl bg-white shadow-2xl shadow-neutral-200 px-9 min-w-[80%] md:min-w-[55%] py-12 flex flex-col justify-center">
              <h1 className="text-xl font-semibold text-neutral-700">
                Sign in
              </h1>
              <p className="text-sm text-neutral-600">Sign to continue</p>
              <Button
                className="flex items-center gap-2 my-5"
                onClick={async () => {
                  await signIn("google");
                }}
              >
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/2875/2875404.png"
                  alt="Sign in google button"
                  width={20}
                  height={20}
                />
                Continue with google
              </Button>
              <p className="text-sm text-neutral-500">
                Don&apos;t worry, your data is safe to us!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
