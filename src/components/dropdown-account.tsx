import React, { useState, useEffect } from "react";
import { type Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { IconUser6Fill } from "./svg-icons";
import Link from "next/link";

interface DropdownProps {
  session: Session;
}

export const DropdownAccount: React.FC<DropdownProps> = (props) => {
  const {
    session: {
      user: { name, image },
    },
  } = props;
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const [show, setShow] = useState("hidden");

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

  const openDropdownPopover = () => {
    setDropdownPopoverShow(true);
    setShow("flex");
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
    setShow("hidden");
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full sm:w-6/12 md:w-4/12 px-4">
          <div className="relative inline-flex align-middle w-full">
            <button
              className={"shadow-sm shadow-black rounded-full"}
              type="button"
              onClick={() => {
                dropdownPopoverShow
                  ? closeDropdownPopover()
                  : openDropdownPopover();
              }}
            >
              <div className="w-[50px] h-[50px] rounded-full">
                {image ? (
                  <Image
                    width={50}
                    height={50}
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
              className={`${show} flex-col absolute top-11 -right-10 bg-[#363739]/90 text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-2`}
              style={{ minWidth: "12rem" }}
            >
              <div
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-white"
                }
              >
                {name}
              </div>
              <Link
                href="#pablo"
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent  text-white"
                }
                onClick={(e) => e.preventDefault()}
              >
                Account
              </Link>
              <div className="h-0 my-2 border border-solid border-t-0 border-slate-800 opacity-85" />
              <button
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent  text-white text-left"
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
