import { MessageList } from "./message-list";
import { NewMessageForm } from "./new-message-form";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_GROUP_QUERY } from "@/gql/queries/getCurrentRoom";

interface MessageWindowProps {
  groupId: string;
}

export const MessageWindow: React.FC<MessageWindowProps> = (props) => {
  const { groupId } = props;

  //gets information for current group db ID needed to link messages to group
  const {
    loading: loadingCurrentRoom,
    error,
    data: groupData,
  } = useQuery(GET_CURRENT_GROUP_QUERY, {
    variables: { groupId },
  });
  const groupDBId = groupData?.group?.id;
  //console.log("MESSAGE_WINDOW_ CURRENT ROOM", groupData);
  //console.log(groupDBId);

  return (
    <>
      {error && <div>Please try again</div>}
      <div className="no-scrollbar h-[90vh] grow overflow-y-auto overscroll-contain p-6 pb-20 backdrop-blur">
        <div className="mx-auto flex max-w-4xl flex-1 items-end justify-between ">
          <MessageList groupId={groupId} groupDBId={groupDBId} />
        </div>
      </div>
      <div className="fixed bottom-0 right-0 w-[100%] rounded border-t border-[#363739] bg-white/5 p-6 backdrop-blur-sm md:w-3/4 lg:w-[85%]">
        <div className="mx-auto max-w-4xl bg-none">
          <NewMessageForm
            groupId={groupId}
            groupDBId={groupDBId}
            loadingCurrentRoom={loadingCurrentRoom}
          />
        </div>
      </div>
    </>
  );
};
