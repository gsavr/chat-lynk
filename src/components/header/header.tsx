import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Typography } from "@material-tailwind/react";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_GROUP_QUERY } from "@/gql/queries/getCurrentRoom";
import { isMobile } from "react-device-detect";
import { HamburgerButton } from "./hamburgerButton";
import { DropdownAccount } from "./dropdown-account";
import { IconUser6Fill } from "../svg-icons/svg-icons";
import logo from "../../images/logo-c.svg";
import { motion } from "framer-motion";

interface HeaderProps {
  open?: string;
  setOpen?: Dispatch<SetStateAction<string>>;
  opening?: string;
  setOpening?: Dispatch<SetStateAction<string>>;
  menuOpen?: string;
  setMenuOpen?: Dispatch<SetStateAction<string>>;
  groupId?: string;
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
    groupId,
  } = props;
  //get user info from auth0
  const { data: session } = useSession();
  //console.log(session);
  const { data: groupData } = useQuery(GET_CURRENT_GROUP_QUERY, {
    variables: { groupId },
  });
  const [groupName, setGroupName] = useState("");

  // Get room name on screen
  useEffect(() => {
    if (!groupId) setGroupName("");
    if (groupData) setGroupName(groupData?.group?.name);
  }, [groupData, groupId]);

  return (
    <header className="fixed top-0 z-50 w-screen rounded-b border-b border-[#363739] bg-slate-200 p-1 ">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          {session ? (
            <>
              <div className=" inline-flex items-center space-x-3 px-6 md:px-0">
                <Link href="/" className="flex items-center">
                  <Image
                    height={`${!isMobile ? 45 : 25}`}
                    src={logo}
                    alt="logo"
                    priority
                  />

                  <Typography>
                    <span className="hidden pl-2 text-lg text-black md:block">
                      LynkChat
                    </span>
                  </Typography>
                </Link>
              </div>
              <motion.span
                initial={{ x: 200, opacity: 0.4 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                key={groupName} //key will tell motion to check for changes and reanimate
                className="text-black"
              >
                <Typography>{groupName}</Typography>
              </motion.span>
              <div className="flex items-center space-x-0">
                {session?.user ? (
                  <DropdownAccount session={session} isMobile={isMobile} />
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
                  className="inline-flex h-12 w-12 items-center rounded-full border border-transparent bg-black/5 px-2 text-3xl text-[#4d5153]"
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
