import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { isMobile, isDesktop, isIPad13 } from "react-device-detect";
import Image from "next/image";
import logo from "../../images/logo-c.svg";

export const CarouselSlide1: React.FC = () => {
  return (
    <>
      <motion.div
        initial={{ scale: 0.1 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 0.4,
        }}
      >
        <motion.div
          initial={{ scale: 1.5, y: 100 }}
          animate={{ scale: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1,
          }}
        >
          <Image
            height={`${isDesktop || isIPad13 ? 300 : 150}`}
            src={logo}
            alt="logo"
            priority
          />
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.6,
          delay: 1.2,
        }}
        className="text-lg font-medium text-black/50 md:text-2xl lg:text-3xl"
      >
        Welcome to LynkChat
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 400 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 1,
        }}
        className="flex flex-col items-center gap-2"
      >
        <div>
          <button
            onClick={() => signIn("Auht0")}
            className="text-base text-black/50 transition hover:text-[#D7A761]/100"
          >
            Join us
          </button>
        </div>
        <div>
          <button
            onClick={() => signIn("Auht0")}
            className="inline-flex h-12 cursor-pointer items-center rounded border border-transparent bg-white/50 px-6 text-lg font-medium text-black/60"
          >
            Sign in
          </button>
        </div>
      </motion.div>
    </>
  );
};
