"use client";

import { Fragment, useRef, useState } from "react";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { classNames } from "@/config/constant";
import { Autocomplete, Modal, TextField } from "@mui/material";

export default function ChangeServersModal({
  open,
  setOpen,
  changeEmail,
  uInfo,
}) {
  const [userInfo, setUserInfo] = useState(uInfo ?? {});
  const [deploymentType, setDeploymentType] = useState(uInfo?.server_details);

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <>
        <div
          className="w-full h-screen flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white w-6/12 p-8 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <Autocomplete
                  options={deploymentTypes}
                  value={deploymentTypeMap[deploymentType]}
                  onChange={(e, newVal) => {
                    setDeploymentType(newVal.value);
                  }}
                  freeSolo
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Deployment Type"
                      variant="outlined"
                    />
                  )}
                />
              </div>
              <div className="sm:col-span-4"></div>
              <>
                <div className="sm:col-span-6 font-bold">Training</div>
                <div className="sm:col-span-3">
                  <TextField
                    value={
                      userInfo?.server_details?.find((x) => x.type === 1)?.ip
                    }
                    fullWidth
                    onChange={(e) =>
                      setUserInfo({
                        ...userInfo,
                        server_details: userInfo.server_details.map((item) => {
                          if (item.type === 1) {
                            return {
                              ...item,
                              type: 2,
                              ip: e.target.value,
                            };
                          } else {
                            return item;
                          }
                        }),
                      })
                    }
                    id="standard-basic"
                    placeholder="IP"
                    variant="outlined"
                  />
                </div>
                <div className="sm:col-span-3">
                  <TextField
                    value={
                      userInfo?.server_details?.find((x) => x.type === 1)?.port
                    }
                    fullWidth
                    onChange={(e) =>
                      setUserInfo({
                        ...userInfo,
                        server_details: userInfo.server_details.map((item) => {
                          if (item.type === 1) {
                            return {
                              ...item,
                              type: 1,
                              port: e.target.value,
                            };
                          } else {
                            return item;
                          }
                        }),
                      })
                    }
                    id="standard-basic"
                    placeholder="PORT"
                    variant="outlined"
                  />
                </div>
              </>
              <>
                <div className="sm:col-span-6 font-bold">DB / BE</div>
                <div className="sm:col-span-3">
                  <TextField
                    value={
                      userInfo?.server_details?.find((x) => x.type === 2)?.ip
                    }
                    fullWidth
                    onChange={(e) =>
                      setUserInfo({
                        ...userInfo,
                        server_details: userInfo.server_details.map((item) => {
                          if (item.type === 1) {
                            return {
                              ...item,
                              type: 2,
                              ip: e.target.value,
                            };
                          } else {
                            return item;
                          }
                        }),
                      })
                    }
                    id="standard-basic"
                    placeholder="IP"
                    variant="outlined"
                  />
                </div>
                <div className="sm:col-span-3">
                  <TextField
                    value={
                      userInfo?.server_details?.find((x) => x.type === 3)?.port
                    }
                    fullWidth
                    onChange={(e) =>
                      setUserInfo({
                        ...userInfo,
                        server_details: userInfo.server_details.map((item) => {
                          if (item.type === 1) {
                            return {
                              ...item,
                              type: 1,
                              port: e.target.value,
                            };
                          } else {
                            return item;
                          }
                        }),
                      })
                    }
                    id="standard-basic"
                    placeholder="PORT"
                    variant="outlined"
                  />
                </div>
              </>
              <>
                <div className="sm:col-span-6 font-bold">BRS</div>
                <div className="sm:col-span-3">
                  <TextField
                    value={
                      userInfo?.server_details?.find((x) => x.type === 1)?.ip
                    }
                    fullWidth
                    onChange={(e) =>
                      setUserInfo({
                        ...userInfo,
                        server_details: userInfo.server_details.map((item) => {
                          if (item.type === 1) {
                            return {
                              ...item,
                              type: 2,
                              ip: e.target.value,
                            };
                          } else {
                            return item;
                          }
                        }),
                      })
                    }
                    id="standard-basic"
                    placeholder="IP"
                    variant="outlined"
                  />
                </div>
                <div className="sm:col-span-3">
                  <TextField
                    value={
                      userInfo?.server_details?.find((x) => x.type === 1)?.port
                    }
                    fullWidth
                    onChange={(e) =>
                      setUserInfo({
                        ...userInfo,
                        server_details: userInfo.server_details.map((item) => {
                          if (item.type === 1) {
                            return {
                              ...item,
                              type: 1,
                              port: e.target.value,
                            };
                          } else {
                            return item;
                          }
                        }),
                      })
                    }
                    id="standard-basic"
                    placeholder="PORT"
                    variant="outlined"
                  />
                </div>
              </>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
            onClick={() => {
              // setOpen(false);
            }}
          >
            Save
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={() => {
              // setValue(null);
              // setOpen(false);
            }}
            //   ref={cancelButtonRef}
          >
            Cancel
          </button>
        </div>
      </>
    </Modal>
  );
}

const deploymentTypes = [
  { label: "Single", value: 1 },
  { label: "Cluster", value: 2 },
];

const deploymentTypeMap = {
  1: "Single",
  2: "Cluster",
};
