import type { NextPage } from "next";
import Head from "next/head";
import { signIn, useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { Header } from "@/components/header/header";
import logo from "../images/logo-c.svg";
import Image from "next/image";
import { motion } from "framer-motion";
import { Footer } from "@/components/footer/footer";
import { isMobile } from "react-device-detect";

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <title>LynkChat</title>
        <meta name="description" content="" />
      </Head>

      <div id="main" className="flex h-[90vh] flex-col bg-main lg:h-screen">
        <Header />
        {session ? (
          <></>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-2.5 bg-white/40 backdrop-blur-lg backdrop-brightness-75">
            {status === "loading" ? null : (
              <>
                <motion.div
                  initial={{ scale: 0.1 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.4,
                  }}
                >
                  <motion.div
                    initial={{ scale: `${isMobile ? 2.3 : 5}`, y: 100 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 1,
                    }}
                  >
                    <Image height={100} src={logo} alt="logo" priority />
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
                      className="inline-flex h-12 items-center rounded border border-transparent bg-white/50 px-6 text-lg font-medium text-black/60"
                    >
                      Sign in
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </div>
        )}
        <Footer />
      </div>
    </>
  );
};
export default Home;

export const getServerSideProps = async (ctx: any) => {
  //see if user is logged in - navigate to '/groups' if so
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  if (!!session) {
    return {
      redirect: {
        destination: "/groups",
      },
    };
  }
  return {
    props: {},
  };
};
