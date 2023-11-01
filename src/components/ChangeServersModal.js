"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { classNames } from "@/config/constant";
import { Autocomplete, Button, Modal, TextField } from "@mui/material";

export default function ChangeServersModal({
  open,
  setOpen,
  changeServers,
  uInfo,
}) {
  const [userInfo, setUserInfo] = useState({});
  const [deploymentType, setDeploymentType] = useState();

  useEffect(() => {
    setDeploymentType(uInfo?.server_details?.length === 1 ? 1 : 2);
    setUserInfo(uInfo);
  }, [uInfo, uInfo?.server_details]);

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
              {deploymentType === 2 && (
                <>
                  <>
                    <div className="sm:col-span-6 font-bold">Training</div>
                    <div className="sm:col-span-3">
                      <TextField
                        value={
                          userInfo?.server_details?.find((x) => x.type === 1)
                            ?.ip
                        }
                        fullWidth
                        onChange={(e) =>
                          setUserInfo({
                            ...userInfo,
                            server_details: userInfo.server_details.map(
                              (item) => {
                                if (item.type === 1) {
                                  return {
                                    ...item,
                                    type: 2,
                                    ip: e.target.value,
                                  };
                                } else {
                                  return item;
                                }
                              }
                            ),
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
                          userInfo?.server_details?.find((x) => x.type === 1)
                            ?.port
                        }
                        fullWidth
                        onChange={(e) =>
                          setUserInfo({
                            ...userInfo,
                            server_details: userInfo.server_details.map(
                              (item) => {
                                if (item.type === 1) {
                                  return {
                                    ...item,
                                    type: 1,
                                    port: e.target.value,
                                  };
                                } else {
                                  return item;
                                }
                              }
                            ),
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
                          userInfo?.server_details?.find((x) => x.type === 2)
                            ?.ip
                        }
                        fullWidth
                        onChange={(e) =>
                          setUserInfo({
                            ...userInfo,
                            server_details: userInfo.server_details.map(
                              (item) => {
                                if (item.type === 1) {
                                  return {
                                    ...item,
                                    type: 2,
                                    ip: e.target.value,
                                  };
                                } else {
                                  return item;
                                }
                              }
                            ),
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
                          userInfo?.server_details?.find((x) => x.type === 3)
                            ?.port
                        }
                        fullWidth
                        onChange={(e) =>
                          setUserInfo({
                            ...userInfo,
                            server_details: userInfo.server_details.map(
                              (item) => {
                                if (item.type === 1) {
                                  return {
                                    ...item,
                                    type: 1,
                                    port: e.target.value,
                                  };
                                } else {
                                  return item;
                                }
                              }
                            ),
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
                          userInfo?.server_details?.find((x) => x.type === 1)
                            ?.ip
                        }
                        fullWidth
                        onChange={(e) =>
                          setUserInfo({
                            ...userInfo,
                            server_details: userInfo.server_details.map(
                              (item) => {
                                if (item.type === 1) {
                                  return {
                                    ...item,
                                    type: 2,
                                    ip: e.target.value,
                                  };
                                } else {
                                  return item;
                                }
                              }
                            ),
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
                          userInfo?.server_details?.find((x) => x.type === 1)
                            ?.port
                        }
                        fullWidth
                        onChange={(e) =>
                          setUserInfo({
                            ...userInfo,
                            server_details: userInfo.server_details.map(
                              (item) => {
                                if (item.type === 1) {
                                  return {
                                    ...item,
                                    type: 1,
                                    port: e.target.value,
                                  };
                                } else {
                                  return item;
                                }
                              }
                            ),
                          })
                        }
                        id="standard-basic"
                        placeholder="PORT"
                        variant="outlined"
                      />
                    </div>
                  </>
                </>
              )}

              {deploymentType === 1 && (
                <>
                  <div className="sm:col-span-6 font-bold">DB / BE</div>
                  <div className="sm:col-span-3">
                    <TextField
                      value={
                        userInfo?.server_details?.find((x) => x.type === 4)?.ip
                      }
                      fullWidth
                      onChange={(e) =>
                        setUserInfo({
                          ...userInfo,
                          server_details: userInfo.server_details.map(
                            (item) => {
                              if (item.type === 4) {
                                return {
                                  ...item,
                                  type: 4,
                                  ip: e.target.value,
                                };
                              } else {
                                return item;
                              }
                            }
                          ),
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
                        userInfo?.server_details?.find((x) => x.type === 4)
                          ?.port
                      }
                      fullWidth
                      onChange={(e) =>
                        setUserInfo({
                          ...userInfo,
                          server_details: userInfo.server_details.map(
                            (item) => {
                              if (item.type === 4) {
                                return {
                                  ...item,
                                  type: 4,
                                  port: e.target.value,
                                };
                              } else {
                                return item;
                              }
                            }
                          ),
                        })
                      }
                      id="standard-basic"
                      placeholder="PORT"
                      variant="outlined"
                    />
                  </div>
                </>
              )}
            </div>
            <div className="w-full flex items-center justify-end pt-10 normal-case">
              <Button
                variant="outlined"
                sx={{ textTransform: "none" }}
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{ textTransform: "none", ml: 2 }}
                onClick={() => {
                  changeServers(deploymentType, userInfo?.server_details);
                  setOpen(false);
                }}
              >
                Save
              </Button>
            </div>
          </div>
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
