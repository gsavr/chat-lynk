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

// Messages show different styling whther they were sent by current user or another user

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
        <small className="text-xs text-black/90">
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
          <div className="w-12 h-12 overflow-hidden flex-shrink-0 shadow-sm shadow-black rounded-full">
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
          className={`inline-flex whitespace-normal rounded-t-3xl shadow-sm shadow-[#000] space-x-2 items-start py-1 px-2 text-black ${
            message.username === session?.user?.username
              ? "bg-[#32bbc0] rounded-l-3xl"
              : "bg-slate-200 rounded-r-3xl"
          } `}
        >
          <span className="p-2 max-w-2xl break-normal whitespace-normal">
            {message.body}
          </span>
        </span>
      </div>

      <p className="text-xs text-black">
        {differenceInHours(new Date(), new Date(message.createdAt)) >= 1
          ? formatRelative(new Date(message.createdAt), new Date())
          : formatDistance(new Date(message.createdAt), new Date(), {
              addSuffix: true,
            })}
      </p>
    </div>
  );
};
