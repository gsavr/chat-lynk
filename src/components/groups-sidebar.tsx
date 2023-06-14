import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_GROUPS_QUERY } from "@/gql/queries/getGroups";
import Link from "next/link";
import { IconBxMessageSquareAdd } from "./svg-icons";

interface GroupsSidebarProps {
  groupId: string;
  open: string;
  opening: string;
  closeMobileMenu: () => void;
}

export const GroupsSidebar: React.FC<GroupsSidebarProps> = ({
  groupId,
  open,
  closeMobileMenu,
  opening,
}) => {
  //gets list of rooms to display
  const { loading, error, data, refetch } = useQuery(GET_ALL_GROUPS_QUERY);
  // console.log("Groups", data);

  useEffect(() => {
    const refetchQuery = () => refetch();
    window.addEventListener("focus", refetchQuery);
    return () => window.removeEventListener("focus", refetchQuery);
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div
      className={`${open} ${opening} mobile-menu flex w-full flex-col gap-3 overflow-auto  rounded border border-black bg-slate-200 px-2 pt-5 text-black md:flex md:w-1/4 lg:w-[15%]`}
    >
      <div className="flex items-start justify-between">
        <h2 className="w-full border-0 border-b border-black pb-3 pl-3 text-lg">
          Groups
        </h2>
        <Link href={"/"} className="" onClick={() => closeMobileMenu()}>
          <IconBxMessageSquareAdd />{" "}
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        {data?.groupCollection?.edges.map(({ node }: any) => (
          <Link
            key={node.groupId}
            href={`/groups/${node.groupId}`}
            className={`pl-3 text-left ${
              node.groupId === groupId && "rounded bg-slate-600 text-white"
            }`}
            onClick={() => closeMobileMenu()}
          >
            <button>{node.name}</button>
          </Link>
        ))}
      </div>
    </div>
  );
};
