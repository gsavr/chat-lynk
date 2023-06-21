import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { CREATE_GROUP_MUTATION } from "@/gql/mutations/createGroup";
import { v4 as uuid } from "uuid";
import { GroupForm } from "../form/group-form";
import { Typography } from "@material-tailwind/react";

export const GroupsLanding: React.FC = () => {
  const router = useRouter();
  const [groupName, setGroupName] = useState("");
  const [createGroup] = useMutation(CREATE_GROUP_MUTATION);

  //create group when there is a name -- groupId is used for quering db and link
  const createRoom = (e: { preventDefault: () => void }) => {
    e.preventDefault();
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
      .then((/* result */) => {
        // Handle the result of the mutation
        //console.log("Group created:", result.data.groupCreate.group);
        router.push(`/groups/${groupId}`);
      })
      .catch((error) => {
        // Handle any errors that occurred during the mutation
        console.error("Error creating group:", error);
      });
  };
  return (
    <>
      <div className="mx-auto flex flex-1 flex-col items-center justify-center gap-6 p-4 text-black">
        <Typography>
          <p>Create a new Group or join on menu</p>
        </Typography>
        <GroupForm
          handleSubmit={createRoom}
          id="groupName"
          name="groupName"
          placeholder="Group Name"
          value={groupName}
          setValue={setGroupName}
          disabled={!groupName}
          buttonName="Create Group"
        />
      </div>
    </>
  );
};
