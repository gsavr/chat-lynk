import { Dispatch, SetStateAction } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import logo from "../../images/logo-c.png";
import { DropdownAccount } from "./dropdown-account";
import { IconUser6Fill } from "../svg-icons/svg-icons";
import Link from "next/link";
import { HamburgerButton } from "./hamburgerButton";

interface HeaderProps {
  open?: string;
  setOpen?: Dispatch<SetStateAction<string>>;
  opening?: string;
  setOpening?: Dispatch<SetStateAction<string>>;
  menuOpen?: string;
  setMenuOpen?: Dispatch<SetStateAction<string>>;
}

export const Header: React.FC<HeaderProps> = (props) => {
  const {
    // defaults set for when header is called without props from index.ts
    open = "hidden",
    setOpen = () => {},
    opening = "closing",
    setOpening = () => {},
    menuOpen = "closed",
    setMenuOpen = () => {},
  } = props;
  //get user info from auth0
  const { data: session } = useSession();
  //console.log(session);

  return (
    <header className="fixed top-0 z-50 w-screen rounded-b border-b border-[#363739] bg-slate-200 p-1 ">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          {session ? (
            <>
              <p className="inline-flex items-center space-x-3">
                <Link href="/" className="flex items-center">
                  <Image height={45} src={logo} alt="logo" priority />

                  <span className="hidden pl-2 text-xl text-black md:block">
                    LynkChat
                  </span>
                </Link>
              </p>
              <div className="flex items-center space-x-1">
                {session?.user ? (
                  <DropdownAccount session={session} />
                ) : (
                  <button
                    onClick={() => signOut()}
                    className="h-12 rounded-lg border border-transparent bg-white/5 px-6 font-medium text-black"
                  >
                    Sign out
                  </button>
                )}
                <HamburgerButton
                  open={open}
                  setOpen={setOpen}
                  opening={opening}
                  setOpening={setOpening}
                  menuOpen={menuOpen}
                  setMenuOpen={setMenuOpen}
                />
              </div>
            </>
          ) : (
            <>
              <div className="text-transparent"></div>
              <div className="flex items-center">
                <button
                  onClick={() => signIn("Auht0")}
                  className="inline-flex h-12 w-12 items-center rounded-full border border-transparent bg-black/5 px-2 text-3xl text-black"
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
