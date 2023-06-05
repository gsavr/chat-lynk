import { useRouter } from "next/router";
import { v4 as uuid } from "uuid";

export const GroupsLanding: React.FC = () => {
  const router = useRouter();

  function createRoom() {
    const groupId = uuid();

    router.push(`/groups/${groupId}`);
  }
  return (
    <>
      <div className="container mx-auto flex flex-col items-center justify-center h-screen p-4">
        <button onClick={createRoom}>create chat room</button>
      </div>
    </>
  );
};
