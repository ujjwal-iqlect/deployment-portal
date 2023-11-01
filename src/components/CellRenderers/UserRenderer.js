import React from "react";

export default function UserRenderer(props) {
  return (
    <div className="flex items-center gap-x-4 w-full h-full">
      <img
        src={
          "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        }
        alt=""
        className="h-8 w-8 rounded-full bg-gray-800"
      />
      <div className="truncate text-sm leading-6 text-white">
        {props?.value || ''}
      </div>
    </div>
  );
}
