import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import { GroupsLanding } from "@/components/message-window/groups-landing";
import { MessageWindow } from "@/components/message-window/message-window";
import { Header } from "@/components/header/header";
import { GroupsSidebar } from "@/components/sidebar/groups-sidebar";

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
      <Header
        open={open}
        setOpen={setOpen}
        opening={opening}
        setOpening={setOpening}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        groupId={groupId}
      />
      <div
        id="main"
        className="from-slate-300to-slate-500 mt-[40px] flex h-[80vh] w-screen flex-col overflow-hidden bg-main backdrop-blur-lg md:mt-[59px] md:h-[90vh] lg:h-[93vh] lg:max-h-fit"
      >
        <div className="flex h-[80vh] overflow-hidden bg-white/40 backdrop-blur-lg backdrop-brightness-75 backdrop-hue-rotate-30 md:h-[90vh] lg:h-[93vh]">
          <GroupsSidebar
            groupId={groupId}
            open={open}
            opening={opening}
            closeMobileMenu={closeMobileMenu}
          />
          <div className="flex h-full w-full flex-1 flex-col overflow-hidden">
            {!groupId ? <GroupsLanding /> : <MessageWindow groupId={groupId} />}
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
