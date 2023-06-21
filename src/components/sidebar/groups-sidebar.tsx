import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_GROUPS_QUERY } from "@/gql/queries/getGroups";
import Link from "next/link";
import { IconBxMessageSquareAdd } from "../svg-icons/svg-icons";
import { GroupMenuModal } from "./group-menu-modal";
import { motion, AnimatePresence } from "framer-motion";

interface GroupsSidebarProps {
  groupId: string;
  open: string;
  closeMobileMenu: () => void;
}

export const GroupsSidebar: React.FC<GroupsSidebarProps> = ({
  groupId,
  open,
  closeMobileMenu,
}) => {
  //gets list of rooms to display
  const { loading, error, data, refetch } = useQuery(GET_ALL_GROUPS_QUERY);
  // console.log("Groups", data);

  //refetch when error shows
  useEffect(() => {
    const refetchQuery = () => refetch();
    window.addEventListener("focus", refetchQuery);
    return () => window.removeEventListener("focus", refetchQuery);
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <p
        className={`${open} mobile-menu mt-[43px] flex w-full flex-col gap-3 overflow-hidden rounded border  border-black bg-slate-200 px-2 pt-5 text-black  md:mt-0 md:flex md:w-1/4 lg:w-[15%]`}
      >
        {/*  Error: {error.message} */}Please Reload
      </p>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        key={open}
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        className={`${open}  mobile-menu mt-[44px] flex w-full flex-col gap-3 overflow-hidden rounded border border-black bg-slate-200 px-2 pt-5 font-light text-black md:mt-0 md:flex md:w-1/4 md:bg-slate-200/90 lg:w-[15%]`}
      >
        <div className="flex items-start justify-between">
          <h2 className="w-full border-0 border-b border-black pb-3 pl-3 text-lg">
            Groups
          </h2>
          <Link href={"/"} className="" onClick={() => closeMobileMenu()}>
            <IconBxMessageSquareAdd />{" "}
          </Link>
        </div>
        <div className="flex flex-col gap-2 overflow-scroll overscroll-contain">
          {data?.groupCollection?.edges.map(({ node }: any) => (
            <div
              key={node.groupId}
              className={`inline-flex flex-1 items-center justify-between rounded py-1 px-3 text-left hover:bg-slate-100 hover:font-light hover:text-slate-800 ${
                node.groupId === groupId && " bg-slate-600 font-thin text-white"
              }`}
            >
              <Link
                href={`/groups/${node.groupId}`}
                className={` flex-1 truncate text-left`}
                onClick={() => closeMobileMenu()}
              >
                {node.name}
              </Link>
              {node.groupId === groupId && (
                <GroupMenuModal groupId={groupId} refetchGroups={refetch} />
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
