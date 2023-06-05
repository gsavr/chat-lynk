import { MessageList } from "./message-list";
import { NewMessageForm } from "./new-message-form";

export const MessageWindow: React.FC = () => {
  return (
    <>
      <div className="flex-1 overflow-y-scroll no-scrollbar p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center">
            <MessageList />
          </div>
        </div>
      </div>
      <div className="p-6 bg-white/5 border-t border-[#363739]">
        <div className="max-w-4xl mx-auto">
          <NewMessageForm />
        </div>
      </div>
    </>
  );
};
