import React, { useState, useEffect } from "react";
import { type Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { IconUser6Fill } from "../svg-icons/svg-icons";
import Link from "next/link";

interface DropdownProps {
  session: Session;
  isMobile: boolean;
}

export const DropdownAccount: React.FC<DropdownProps> = (props) => {
  const {
    session: {
      user: { name, image },
    },
    isMobile,
  } = props;
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const [show, setShow] = useState("hidden");

  //event listener to close dropdown when clicking outside it
  useEffect(() => {
    const el = document.getElementById("main");
    /* id 'main' is set in index.tsx  */
    if (el) {
      el.addEventListener("click", () => {
        closeDropdownPopover();
      });
      return () => el.removeEventListener("click", () => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropdownPopoverShow]);

  //open dropdown
  const openDropdownPopover = () => {
    setDropdownPopoverShow(true);
    setShow("flex");
  };

  //close dropdown
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
    setShow("hidden");
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4 sm:w-6/12 md:w-4/12">
          <div className="relative inline-flex w-full align-middle">
            <button
              className={"rounded-full shadow-sm shadow-slate-600"}
              type="button"
              onClick={() => {
                dropdownPopoverShow
                  ? closeDropdownPopover()
                  : openDropdownPopover();
              }}
            >
              {/* image needed to be inside div to show  */}
              <div className="h-[35px] w-[35px] rounded-full md:h-[50px] md:w-[50px]">
                {image ? (
                  <Image
                    width={`${!isMobile ? 50 : 35}`}
                    height={`${!isMobile ? 50 : 35}`}
                    src={image}
                    alt={name || "User profile picture"}
                    title={name || "User profile picture"}
                    className=" rounded-full"
                  />
                ) : (
                  <IconUser6Fill />
                )}
              </div>
            </button>
            <div
              className={`${show} absolute top-11 -right-10 z-50 float-left mt-2 list-none flex-col rounded bg-slate-200/90 py-2 text-left text-base shadow-sm shadow-slate-500`}
              style={{ minWidth: "12rem" }}
            >
              <div
                className={
                  "block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-black"
                }
              >
                {name}
              </div>
              <Link
                href="/"
                className={
                  "block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal  text-black"
                }
                //onClick={(e) => e.preventDefault()}
              >
                Create / Join a room
              </Link>
              <div className="opacity-85 my-2 h-0 border border-t-0 border-solid border-slate-800" />
              <button
                className={
                  "block w-full whitespace-nowrap bg-transparent py-2 px-4 text-left text-sm  font-normal text-black"
                }
                onClick={() => signOut()}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
