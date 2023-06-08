import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import { GroupsLanding } from "@/components/groups-landing";
import { MessageWindow } from "@/components/message-window";
import { Header } from "@/components/header";
import { GroupsSidebar } from "@/components/groups-sidebar";
import { HamburgerButton } from "@/components/hamburgerButton";

interface GroupsProps {
  groupId: string;
}

const Groups: NextPage<GroupsProps> = (props) => {
  const { groupId } = props;
  //for mobile menu
  const [open, setOpen] = useState("hidden");
  const [opening, setOpening] = useState("closing");
  const [menuOpen, setMenuOpen] = useState("closed");
  //console.log(groupId);

  //for mobile menu
  const closeMobileMenu = () => {
    setOpening("closing");
    setMenuOpen("closed");
    setTimeout(() => {
      setOpen("hidden");
    }, 500);
  };

  return (
    <>
      <Head>
        <title>LynkChat</title>
      </Head>
      <div
        id="main"
        className="flex h-[100vh] w-screen flex-col overflow-hidden bg-gradient-to-tr from-slate-300 to-slate-500 lg:max-h-fit"
      >
        <div className="backdrop-blur">
          <Header />
          <HamburgerButton
            open={open}
            setOpen={setOpen}
            opening={opening}
            setOpening={setOpening}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
          />
          <div className="flex h-[93vh]">
            <GroupsSidebar
              groupId={groupId}
              open={open}
              opening={opening}
              closeMobileMenu={closeMobileMenu}
            />
            <div className="flex w-full flex-1 flex-col">
              {!groupId ? (
                <GroupsLanding />
              ) : (
                <MessageWindow groupId={groupId} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Groups;

export const getServerSideProps = async (ctx: any) => {
  //get groupdId from params
  const params = ctx.params.groupId?.[0];
  //confirm user logged in
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  //console.log(session);
  if (!session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  return {
    props: {
      groupId: params || null,
    },
  };
};
