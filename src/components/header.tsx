import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import logo from "../images/logo-c.png";
import { DropdownAccount } from "./dropdown-account";
import { IconUser6Fill } from "./svg-icons";
import Link from "next/link";

export const Header: React.FC = () => {
  //get user info from auth0
  const { data: session } = useSession();
  //console.log(session);

  return (
    <header className="p-4 bg-white/5 border-b border-[#363739]">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center">
          {session ? (
            <>
              <p className="inline-flex items-center space-x-3">
                <Link href="/">
                  <Image height={45} src={logo} alt="logo" priority />
                </Link>
                <span className="text-white font-bold text-xl">LynkChat</span>
              </p>
              <div className="flex items-center space-x-1">
                {session?.user ? (
                  <DropdownAccount session={session} />
                ) : (
                  <button
                    onClick={() => signOut()}
                    className="bg-white/5 rounded-lg h-12 px-6 font-medium text-white border border-transparent"
                  >
                    Sign out
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="text-transparent"></div>
              <div className="flex items-center">
                <button
                  onClick={() => signIn("Auht0")}
                  className="bg-white/5 h-12 w-12 px-2 rounded-full text-white text-3xl border border-transparent inline-flex items-center"
                >
                  <IconUser6Fill />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
