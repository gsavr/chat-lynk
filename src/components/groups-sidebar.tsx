import { useQuery } from "@apollo/client";
import { GET_ALL_GROUPS_QUERY } from "@/gql/queries/getGroups";
import Link from "next/link";
import { IconBxMessageSquareAdd } from "./svg-icons";

interface GroupsSidebarProps {
  groupId: string;
}

export const GroupsSidebar: React.FC<GroupsSidebarProps> = ({ groupId }) => {
  //gets list of rooms to display
  const { loading, error, data } = useQuery(GET_ALL_GROUPS_QUERY);
  // console.log("Groups", data);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="rounded bg-slate-200 px-2 pt-5  border flex flex-col gap-3 text-black border-black md:w-[15%]">
      <div className="flex justify-between items-start">
        <h2 className="text-lg w-full pb-3 pl-3 border-0 border-b border-black">
          Groups
        </h2>
        <Link href={"/"} className="">
          <IconBxMessageSquareAdd />{" "}
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        {data?.groupCollection?.edges.map(({ node }: any) => (
          <Link
            key={node.groupId}
            href={`/groups/${node.groupId}`}
            className={`text-left pl-3 ${
              node.groupId === groupId && "bg-slate-600 rounded text-white"
            }`}
          >
            <button>{node.name}</button>
          </Link>
        ))}
      </div>
    </div>
  );
};
