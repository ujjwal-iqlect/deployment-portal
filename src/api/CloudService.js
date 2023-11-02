import axios from "axios";
import { cloudServiceEndPoint } from "@/config/constant";

const headers = {
  "Content-Type": "application/json; charset=UTF-8",
  "x-bang-api-key": "5562808906891435869",
  "x-bang-api-src": "ampere",
};

export const cloudService = axios.create({
  headers,
  baseURL: `https://${cloudServiceEndPoint}`,
});

export const fetchSubscription = async (payload) => {
  const res = await cloudService.post("/razorPay/get-subscription", payload);

  return res.data;
};

export const fetchAllInvoices = async (payload) => {
  const res = await cloudService.post("/razorPay/get-all-invoices", payload);

  return res.data;
};
