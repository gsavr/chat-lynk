import { signIn, useSession } from "next-auth/react";
import { Header } from "@/components/header";
import { MessageList } from "@/components/message-list";
import { NewMessageForm } from "@/components/new-message-form";
import logo from "../images/logo-c.png";
import Image from "next/image";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div id="main" className="flex flex-col bg-cover">
      <Header />
      {session ? (
        <>
          <div className="flex-1 overflow-y-scroll no-scrollbar p-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center">
                <MessageList />
              </div>
            </div>
          </div>
          <div className="p-6 bg-white/5 border-t border-[#363739]">
            <div className="max-w-4xl mx-auto">
              <NewMessageForm />
            </div>
          </div>
        </>
      ) : (
        <div className="h-full flex items-center justify-center flex-col space-y-2.5">
          {status === "loading" ? null : (
            <>
              <Image height={100} src={logo} alt="logo" />
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
  );
}
