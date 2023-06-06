import { formatRelative, formatDistance, differenceInHours } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";

export type Message = {
  id: string;
  groupId: string;
  username: string;
  name: string;
  avatar?: string;
  body: string;
  createdAt: string;
};

interface Props {
  message: Message;
}

export const Message: React.FC<Props> = ({ message }: Props) => {
  const { data: session } = useSession();
  //console.log("message", message);
  // console.log("session", session);

  return (
    <div
      className={`flex flex-col relative space-x-1 space-y-1 ${
        message.username === session?.user?.username
          ? "text-right self-end"
          : "text-left"
      }`}
    >
      {message.username !== session?.user?.username && (
        <small className="text-xs text-white/50">
          {message.name || message.username}&nbsp;
        </small>
      )}
      <div
        className={`flex relative space-x-1 ${
          message.username === session?.user?.username
            ? "flex-row-reverse space-x-reverse"
            : "flex-row"
        }`}
      >
        {message?.avatar && (
          <div className="w-12 h-12 overflow-hidden flex-shrink-0 rounded-full">
            <Image
              width={50}
              height={50}
              src={message.avatar}
              alt={message.username}
              title={message.username}
            />
          </div>
        )}
        <span
          className={`inline-flex rounded-t-3xl shadow-sm shadow-[#000] space-x-2 items-start p-3 text-white ${
            message.username === session?.user?.username
              ? "bg-[#279599] rounded-l-3xl"
              : "bg-[#363739] rounded-r-3xl"
          } `}
        >
          <span className="max-w-sm">{message.body}</span>
        </span>
      </div>

      <p className="text-xs text-white/50">
        {differenceInHours(new Date(), new Date(message.createdAt)) >= 1
          ? formatRelative(new Date(message.createdAt), new Date())
          : formatDistance(new Date(message.createdAt), new Date(), {
              addSuffix: true,
            })}
      </p>
    </div>
  );
};
