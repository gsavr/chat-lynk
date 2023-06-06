import { useQuery } from "@apollo/client";
import { GET_ALL_GROUPS_QUERY } from "@/gql/queries/getGroups";
import Link from "next/link";

export const GroupsSidebar: React.FC = () => {
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
    <div className="groups-sidebar">
      <h2>Groups</h2>
      <ul>
        {data?.groupCollection?.edges.map(({ node }: any) => (
          <li key={node.groupId}>
            <Link href={`/groups/${node.groupId}`}>{node.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
