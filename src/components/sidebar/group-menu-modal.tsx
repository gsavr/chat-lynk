import { Fragment, useEffect, useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_GROUP_QUERY } from "@/gql/queries/getCurrentRoom";
import { Dialog, Transition } from "@headlessui/react";
import { useDateFormat } from "@/utilities/useDateFormat";
import {
  IconCloseOutline,
  IconIconGroup,
  IconCircle_menu,
} from "../svg-icons/svg-icons";

import { GroupEdit } from "./group-edit";
import { GroupDelete } from "./group-delete";

interface GroupMenuModalProps {
  groupId: string;
  refetchGroups: () => void;
}

export const GroupMenuModal: React.FC<GroupMenuModalProps> = (props) => {
  const { groupId, refetchGroups } = props;
  const [openGroupMenu, setOpenGroupMenu] = useState(false);
  const [name, setName] = useState("");

  const { data, refetch } = useQuery(GET_CURRENT_GROUP_QUERY, {
    variables: { groupId },
  });
  //   console.log(data);
  //   console.log(typeof data?.group?.createdAt);
  const cancelButtonRef = useRef(null);
  const date = useDateFormat(data?.group?.createdAt);

  useEffect(() => {
    if (data) {
      setName(data?.group?.name);
    }
  }, [data]);

  return (
    <>
      <button
        onClick={() => setOpenGroupMenu(true)}
        className=" cursor-pointer text-xl"
      >
        <IconCircle_menu />
      </button>

      {/* //Transition elements are form modal transition in and out of the screen */}
      <Transition.Root show={openGroupMenu} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={() => setOpenGroupMenu(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-400/40 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto text-black">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-md  bg-slate-200 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-primary px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="flex-col sm:flex sm:items-start">
                      <div className="flex w-full items-center justify-between">
                        <div className="bg-primary  flex h-20  flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10">
                          <IconIconGroup
                            width="48px"
                            height="48px"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="pr-10 text-lg uppercase leading-6 md:mr-[48px] md:pr-0"
                          >
                            {name}
                          </Dialog.Title>
                        </div>
                        <button
                          onClick={() => setOpenGroupMenu(false)}
                          className="rounded-full hover:bg-slate-100"
                        >
                          <IconCloseOutline height="25px" width="25px" />
                        </button>
                      </div>
                      <div className="mt-8 flex w-full flex-col items-start gap-3">
                        {date && <p className="text-sm">Created on: {date}</p>}
                        {/* EDIT GROUP ZONE */}
                        <div className="flex w-full flex-col gap-5">
                          <GroupEdit
                            name={name}
                            setName={setName}
                            groupId={groupId}
                            refetch={refetch}
                            setOpenGroupMenu={setOpenGroupMenu}
                          />
                        </div>
                        {/* DELETE GROUP ZONE */}
                        <GroupDelete
                          groupId={groupId}
                          refetchGroups={refetchGroups}
                          setOpenGroupMenu={setOpenGroupMenu}
                        />
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
