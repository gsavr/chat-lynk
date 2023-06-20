import { Dispatch, SetStateAction, useState } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { DELETE_GROUP_MUTATION } from "@/gql/mutations/deleteGroup";
import { Button } from "@material-tailwind/react";
import { GroupDeleteToggle } from "./group-delete-check";
import { IconUsergroupDelete } from "../svg-icons/svg-icons";

interface GroupDeleteProps {
  groupId: string;
  refetchGroups: () => void;
  setOpenGroupMenu: Dispatch<SetStateAction<boolean>>;
}

export const GroupDelete: React.FC<GroupDeleteProps> = (props) => {
  const { groupId, refetchGroups, setOpenGroupMenu } = props;
  const [loading, setLoading] = useState(false);
  const [enabledDelete, setEnabledDelete] = useState(false);
  const router = useRouter();

  const [deleteGroup] = useMutation(DELETE_GROUP_MUTATION);

  // delete group
  const handleDeleteGroup = () => {
    setLoading(true);
    //mutation
    deleteGroup({
      variables: { groupId },
    }) // on success
      .then(() => {
        refetchGroups();
        setLoading(false);
        setOpenGroupMenu(false);
        router.push(`/groups`);
      })
      .catch((err) => {
        // Handle error
        console.log(err);
      });
  };

  return (
    <div className="mt-4 flex w-full items-center border-0 border-t border-slate-400 pt-4">
      <Button
        onClick={handleDeleteGroup}
        className="btn -py-2 -ml-4 inline-flex w-fit scale-75 items-center justify-center bg-red-500 px-2  text-white hover:bg-red-700 disabled:bg-red-300"
        disabled={!enabledDelete}
      >
        <IconUsergroupDelete height="48px" />
        <span className="pl-4 text-sm">Delete Group</span>
      </Button>
      <GroupDeleteToggle
        enabled={enabledDelete}
        setEnabled={setEnabledDelete}
      />
      <span className="pl-4 text-xs">
        {enabledDelete ? (
          <span className="animate-pulse text-red-500">Are you sure?</span>
        ) : (
          "Danger Zone!"
        )}
      </span>
    </div>
  );
};
