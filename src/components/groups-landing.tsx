import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { CREATE_GROUP_MUTATION } from "@/gql/mutations/createGroup";
import { v4 as uuid } from "uuid";

export const GroupsLanding: React.FC = () => {
  const router = useRouter();
  const [groupName, setGroupName] = useState("");
  const [createGroup] = useMutation(CREATE_GROUP_MUTATION);

  const createRoom = () => {
    if (!groupName) {
      return;
    }
    const groupId = uuid();

    createGroup({
      variables: {
        groupId: groupId,
        name: groupName,
      },
    })
      .then((result) => {
        // Handle the result of the mutation
        console.log("Group created:", result.data.groupCreate.group);
        router.push(`/groups/${groupId}`);
      })
      .catch((error) => {
        // Handle any errors that occurred during the mutation
        console.error("Error creating group:", error);
      });
  };
  return (
    <>
      <div className="container mx-auto flex flex-col items-center justify-center h-screen p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createRoom();
          }}
          className="flex items-center space-x-3"
        >
          <input
            autoFocus
            id="groupName"
            name="groupName"
            placeholder="Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="flex-1 h-12 px-3 rounded bg-[#222226] border border-[#222226] focus:border-[#222226] focus:outline-none text-white placeholder-white"
          />
          <button
            type="submit"
            className="bg-[#222226] rounded h-12 font-medium text-white w-24 text-lg border border-transparent hover:bg-[#363739] transition"
            disabled={!groupName}
          >
            Create Chat Room
          </button>
        </form>
      </div>
    </>
  );
};
