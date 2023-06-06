import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { GET_RECENT_MESSAGES_QUERY } from "@/gql/queries/getMessages";
import type { Message as IMessage } from "@/components/message";
import { Message } from "@/components/message";

interface MessageListProps {
  groupId: string;
  groupDBId: string;
}

export const MessageList: React.FC<MessageListProps> = ({
  groupId,
  groupDBId,
}) => {
  //console.log("m-list", groupId);
  const [scrollRef, inView, entry] = useInView({
    trackVisibility: true,
    delay: 1000,
  });

  const { loading, error, data } = useQuery<{
    group: { messages: { edges: { node: IMessage }[] } };
  }>(GET_RECENT_MESSAGES_QUERY, {
    variables: {
      groupDBId,
      last: 100,
    },
  });
  //console.log("m-list", loading);
  console.log("m-list", error);
  console.log("m-list", data);

  useEffect(() => {
    if (!inView) {
      entry?.target?.scrollIntoView({ behavior: "smooth" });
    }
  }, [data, entry, inView]);

  if (loading)
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-white">Getting most recent chat messages.</p>
      </div>
    );

  if (error) return <p className="text-white">Please Refresh.</p>;

  return (
    <div className="flex flex-col space-y-3 overflow-y-scroll no-scrollbar w-full">
      {!inView && data && (
        <div className="py-1.5 w-full px-3 z-10 text-xs absolute flex justify-center bottom-0 mb-[120px] inset-x-0">
          <button
            className="py-1.5 px-3 text-xs bg-[#77777b] border border-none rounded-full text-white font-medium"
            onClick={() =>
              entry?.target?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Scroll to see latest messages
          </button>
        </div>
      )}
      {data?.group?.messages?.edges?.map(({ node }) => (
        <Message key={node?.id} message={node} />
      ))}
      <div ref={scrollRef} />
    </div>
  );
};
