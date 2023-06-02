import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import logo from "../images/logo-c.png";

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="p-6 bg-white/5 border-b border-[#363739]">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center">
          <p className="inline-flex items-center space-x-3">
            <a
              href="https://grafbase.com?ref=chatbase"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image height={60} src={logo} alt="logo" />
            </a>
            <span className="text-white font-bold text-xl">LynkChat</span>
          </p>
          {session ? (
            <div className="flex items-center space-x-1">
              {session?.user?.image && (
                <div className="w-12 h-12 rounded-full shadow-md shadow-white overflow-hidden">
                  <Image
                    width={50}
                    height={50}
                    src={session?.user?.image}
                    alt={session?.user?.name || "User profile picture"}
                    title={session?.user?.name || "User profile picture"}
                    className=" rounded-full "
                  />
                </div>
              )}
              <div className="text-white">{session?.user?.name}</div>
              <button
                onClick={() => signOut()}
                className="bg-white/5 rounded h-12 px-6 font-medium text-white border border-transparent"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <button
                onClick={() => signIn("Auht0")}
                className="bg-white/5 rounded h-12 px-6 font-medium text-white text-lg border border-transparent inline-flex items-center"
              >
                Sign in
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
