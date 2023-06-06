import { useQuery } from "@apollo/client";
import { GET_ALL_GROUPS_QUERY } from "@/gql/queries/getGroups";

export const GroupsSidebar: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ALL_GROUPS_QUERY);
  console.log("Groups", data);

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
            <a href={`/groups/${node.groupId}`}>{node.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
