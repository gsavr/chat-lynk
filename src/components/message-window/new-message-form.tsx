import { FormEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import { useSession } from "next-auth/react";
import { Button } from "@material-tailwind/react";
import useSound from "use-sound";
import { ADD_NEW_MESSAGE_MUTATION } from "@/gql/mutations/addNewMessage";

interface NewMessageFormProps {
  groupId: string;
  groupDBId: string;
  loadingCurrentRoom: boolean;
}

export const NewMessageForm: React.FC<NewMessageFormProps> = ({
  groupId,
  groupDBId,
  loadingCurrentRoom,
}) => {
  const { data: session } = useSession();
  const [play] = useSound("sent.wav");
  const [body, setBody] = useState("");

  //mutation to add message to room
  const [addNewMessage] = useMutation(ADD_NEW_MESSAGE_MUTATION, {
    onCompleted: () => play(),
  });

  //console.log("NEW_MESSAGE_CURRENT_ROOM", groupData?.group);
  //console.log("session in new message", session);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //only add new message if there is content
    if (body) {
      addNewMessage({
        variables: {
          username: session?.user?.username ?? "",
          name: session?.user?.name ?? "",
          avatar: session?.user?.image,
          body,
          groupId,
          group: groupDBId,
        },
      })
        .then((result) => {
          // Handle the result of the mutation
          //console.log("Message created:", result?.data?.messageCreate?.message);
          setBody("");
        })
        .catch((error) => {
          // Handle any errors that occurred during the mutation
          console.error("Error creating message:", error);
        });
    }
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex items-center space-x-3"
    >
      <input
        autoFocus
        disabled={loadingCurrentRoom}
        id="message"
        name="message"
        placeholder="Write a message..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="form-1"
      />
      <Button
        type="submit"
        className="btn rounded-full text-black"
        disabled={!body || !session}
      >
        Send
      </Button>
    </form>
  );
};
