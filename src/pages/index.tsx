import type { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import { CarouselLanding } from "@/components/carousel/carousel";

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <title>LynkChat</title>
        <meta name="description" content="" />
      </Head>

      <div
        id="main"
        className="flex h-[90vh] flex-col overflow-x-hidden bg-main md:h-[95vh] lg:h-screen"
      >
        <Header />
        {session ? (
          <></>
        ) : (
          <>{status === "loading" ? null : <CarouselLanding />}</>
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
