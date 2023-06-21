import { formatRelative, formatDistance, differenceInHours } from "date-fns";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
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
    /* motion creates animation for each chat bubble */
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.4,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <div
        className={`relative flex flex-col space-x-1 space-y-1 ${
          message.username === session?.user?.username
            ? "self-end text-right"
            : "text-left"
        }`}
      >
        {message.username !== session?.user?.username && (
          <small className="pl-1 text-xs text-black/90">
            {message.name.split(" ")[0] || message.username}&nbsp;
          </small>
        )}
        <div
          className={`relative flex space-x-1 ${
            message.username === session?.user?.username
              ? "flex-row-reverse space-x-reverse"
              : "flex-row"
          }`}
        >
          {message?.avatar && (
            <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full  shadow-none">
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
            className={`inline-flex items-center space-x-2 whitespace-normal rounded-t-3xl py-0 px-2 text-black shadow-sm shadow-slate-500 ${
              message.username === session?.user?.username
                ? "rounded-l-3xl bg-[#c1ecfa]" //[#c1ddfa]
                : "rounded-r-3xl bg-slate-200"
            } `}
          >
            <span className="max-w-2xl whitespace-normal break-normal px-2">
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
    </motion.div>
  );
};
