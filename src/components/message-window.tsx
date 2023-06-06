import { MessageList } from "./message-list";
import { NewMessageForm } from "./new-message-form";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_GROUP_QUERY } from "@/gql/queries/getCurrentRoom";

interface MessageWindowProps {
  groupId: string;
}

export const MessageWindow: React.FC<MessageWindowProps> = (props) => {
  const { groupId } = props;

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
      <div className="flex-1 overflow-y-scroll no-scrollbar p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center">
            <MessageList groupId={groupId} groupDBId={groupDBId} />
          </div>
        </div>
      </div>
      <div className="p-6 bg-white/5 border-t border-[#363739]">
        <div className="max-w-4xl mx-auto">
          <NewMessageForm
            // groupId={groupId}
            groupDBId={groupDBId}
            loadingCurrentRoom={loadingCurrentRoom}
          />
        </div>
      </div>
    </>
  );
};
