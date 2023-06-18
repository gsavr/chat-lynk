import { useEffect, useRef, useLayoutEffect } from "react";
import { useQuery } from "@apollo/client";
import { useInView } from "react-intersection-observer";
import { isMobile } from "react-device-detect";
import { GET_RECENT_MESSAGES_QUERY } from "@/gql/queries/getMessages";
import { Message } from "@/components/message-window/message";

interface MessageListProps {
  groupId: string;
  groupDBId: string;
}

export const MessageList: React.FC<MessageListProps> = ({
  groupId,
  //groupDBId,
}) => {
  //console.log("m-list", groupId);
  //console.log(isMobile);

  //tracks location of page for scrollRef
  const [scrollRef, inView, entry] = useInView({
    trackVisibility: true,
    delay: 1000,
  });

  //query all messages for this group
  const { loading, error, data, refetch } = useQuery(
    GET_RECENT_MESSAGES_QUERY,
    {
      variables: {
        //id: groupDBId,
        last: 100,
      },
    }
  );
  //console.log("m-list", loading); //console.log("m-list", data);//console.log("m-list", error);

  // refetch when not in view and shows error
  useEffect(() => {
    const refetchQuery = () => refetch();
    window.addEventListener("focus", refetchQuery);
    return () => window.removeEventListener("focus", refetchQuery);
  });

  //scrolls to bottom at load -- does not work well on mobile
  useEffect(() => {
    if (!inView && !isMobile) {
      entry?.target?.scrollIntoView({ behavior: "smooth" });
    }
  }, [entry, inView]);

  //scrolls to new message
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  // renders messages from data
  const renderMessages = () => {
    return data?.messageCollection?.edges?.map(({ node }: any) => {
      //console.log(node.group.id);
      if (node?.groupId === groupId)
        return <Message key={node?.id} message={node} />;
    });
  };

  if (loading)
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-white">Getting most recent chat messages.</p>
      </div>
    );

  if (error) return <p className="text-white">Please Refresh.</p>;

  return (
    <div className="no-scrollbar flex h-full w-full flex-1 flex-col space-y-3 overflow-y-hidden">
      {!inView && data && (
        <div className="absolute inset-x-0 bottom-0 z-10 mb-[120px] flex w-full justify-center py-1.5 px-3 text-xs">
          <button
            className="rounded-full border border-none bg-slate-200/50 py-1.5 px-3 text-xs font-medium text-black"
            onClick={() => {
              bottomRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Scroll to see latest messages
          </button>
        </div>
      )}
      {renderMessages()}
      <div ref={scrollRef} />
      <div ref={bottomRef} />
    </div>
  );
};
