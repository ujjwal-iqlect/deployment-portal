import { classNames } from "@/config/constant";
import React from "react";

export default function UserRenderer(props) {
  return (
    <div className="flex items-center gap-x-4 w-full h-full">
      <img
        src={"/icons/user-icon.png"}
        alt="user"
        className="h-8 w-8 rounded-full bg-gray-800 shadow-lg"
      />
      <div
        className={classNames(
          "truncate text-sm leading-6",
          props?.black ? null : "text-white"
        )}
      >
        {props?.value || ""}
      </div>
    </div>
  );
}
