import axios from "axios";
import { userServiceEndPoint } from "@/config/constant";

const headers = {
  "Content-Type": "application/json; charset=UTF-8",
  "x-bang-api-key": "5562808906891435869",
  "x-bang-api-src": "ampere",
};

export const userService = axios.create({
  headers,
  baseURL: `https://${userServiceEndPoint}`,
});

export const getAccountUsers = async (payload) => {
  const res = await userService.post("/user/get_users", {
    ...payload,
    admin: "super_admin1",
    admin_pwd: "sudo_admin_9",
    op: 1,
  });

  return res.data;
};

export const getAllAccounts = async (payload) => {
  const res = await userService.post("/user/account_list", {
    ...payload,
    option: "all",
  });

  return res.data;
};

export const getUserInfo = async (payload) => {
  const res = await userService.post("/user/info", {
    admin: "super_admin1",
    admin_pwd: "sudo_admin_9",
    ...payload,
  });

  return res.data;
};

export const getAccountInfo = async (payload) => {
  const res = await userService.post("user/get_account_info", {
    admin: "super_admin1",
    admin_pwd: "sudo_admin_9",
    ...payload,
  });

  return res.data;
};

export const updateUser = async (payload) => {
  const res = await userService.post("/user/update", {
    admin: "super_admin1",
    admin_pwd: "sudo_admin_9",
    ...payload,
  });

  return res.data;
};

export const updateAccount = async (payload) => {
  const res = await userService.post("/user/update_account", {
    admin: "super_admin1",
    admin_pwd: "sudo_admin_9",
    ...payload,
  });

  return res.data;
};

export const changeUserPassword = async (payload) => {
  const res = await userService.post("/user/change_pwd", {
    admin: "super_admin1",
    admin_pwd: "sudo_admin_9",
    ...payload,
  });

  return res.data;
};

export const addServerInfo = async (payload) => {
  const res = await userService.post("/user/add_server_info", {
    admin: "super_admin1",
    admin_pwd: "sudo_admin_9",
    ...payload,
  });

  return res.data;
};
