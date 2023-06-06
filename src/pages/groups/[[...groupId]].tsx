import type { NextPage } from "next";
import Head from "next/head";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import { GroupsLanding } from "@/components/groups-landing";
import { MessageWindow } from "@/components/message-window";
import { Header } from "@/components/header";
import { GroupsSidebar } from "@/components/groups-sidebar";

interface GroupsProps {
  groupId: string;
}

const Groups: NextPage<GroupsProps> = (props) => {
  const { groupId } = props;
  //console.log(groupId);
  return (
    <>
      <Head>
        <title>LynkChat</title>
      </Head>
      <div
        id="main"
        className=" flex flex-col w-screen max-h-fit bg-[#2d3241] overflow-hidden"
      >
        <Header />
        <div className="flex h-[93vh]">
          <GroupsSidebar groupId={groupId} />
          <div className="flex flex-1 flex-col w-full">
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
