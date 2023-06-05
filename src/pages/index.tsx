import type { NextPage } from "next";
import Head from "next/head";
import { signIn, useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { Header } from "@/components/header";
import { MessageList } from "@/components/message-list";
import { NewMessageForm } from "@/components/new-message-form";
import logo from "../images/logo-c.png";
import Image from "next/image";

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <title>LynkChat</title>
        <meta name="description" content="" />
      </Head>

      <div id="main" className="flex flex-col bg-cover">
        <Header />
        {session ? (
          <></>
        ) : (
          <div className="h-full flex items-center justify-center flex-col space-y-2.5">
            {status === "loading" ? null : (
              <>
                <Image height={100} src={logo} alt="logo" priority />
                <p className="text-lg md:text-2xl lg:text-3xl font-medium text-white/50">
                  Welcome to LynkChat
                </p>
                <p>
                  <button
                    onClick={() => signIn("Auht0")}
                    className="text-base text-white/50 transition hover:text-[#D7A761]/100"
                  >
                    Join us
                  </button>
                </p>
                <p>
                  <button
                    onClick={() => signIn("Auht0")}
                    className="bg-white/5 rounded h-12 px-6 font-medium text-white/60 text-lg border border-transparent inline-flex items-center"
                  >
                    Sign in
                  </button>
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};
export default Home;

export const getServerSideProps = async (ctx: any) => {
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
