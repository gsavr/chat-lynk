import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Collapse, Button } from "@material-tailwind/react";
import { useMutation } from "@apollo/client";
import { UPDATE_GROUP_MUTATION } from "@/gql/mutations/updateGroup";
import { GroupForm } from "../form/group-form";

interface GroupEditProps {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  groupId: string;
  refetch: () => void;
  setOpenGroupMenu: Dispatch<SetStateAction<boolean>>;
}

export const GroupEdit: React.FC<GroupEditProps> = (props) => {
  const { name, setName, groupId, refetch, setOpenGroupMenu } = props;
  const [open, setOpen] = useState(false);
  const [originalName, setOriginalName] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const toggleOpen = () => setOpen((cur) => !cur);

  const [updateGroup] = useMutation(UPDATE_GROUP_MUTATION);

  // set orignal name in order to compare to new name
  useEffect(() => {
    if (name) {
      setOriginalName(name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateGroupName = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    //variables needed for Mutation

    setLoading(true);
    //Mutation
    updateGroup({
      variables: { groupId, name },
    }) // on success
      .then(() => {
        // Handle successful update
        setLoading(false);
        refetch();
        setOpenGroupMenu(false);
      })
      .catch((err) => {
        // Handle error
        setLoading(false);
        console.log(err);
        setError(true);
      });
  };

  return (
    <>
      <Button
        className="btn mt-4 h-6 w-full rounded bg-slate-100 py-0 text-black hover:bg-slate-300"
        onClick={toggleOpen}
      >
        Edit Group
      </Button>
      <Collapse open={open} className="ml-5">
        <GroupForm
          handleSubmit={updateGroupName}
          id="groupNameEdit"
          name="groupNameEdit"
          placeholder="Edit Name"
          value={name}
          setValue={setName}
          disabled={!name || originalName === name}
          buttonName="Update Name"
          variant="groupEdit"
        />
        {loading && <div>Loading...</div>}
        {error && <div>Error...</div>}
      </Collapse>
    </>
  );
};
