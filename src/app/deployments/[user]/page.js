"use client";

import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import { Menu, Popover, RadioGroup, Transition } from "@headlessui/react";
import {
  ArrowLongLeftIcon,
  CheckIcon,
  HandThumbUpIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PaperClipIcon,
  QuestionMarkCircleIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import {
  BanknotesIcon,
  ChartBarSquareIcon,
  Cog6ToothIcon,
  EllipsisVerticalIcon,
  FolderIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Bars3Icon, BellIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { deploymentReducer } from "@/redux/reducers/deploymentReducer";
import { classNames, defaultColDef, timeAgo } from "@/config/constant";
import {
  addServerInfo,
  changeUserPassword,
  getAccountInfo,
  getAccountUsers,
  getAllAccounts,
  getUserInfo,
  updateAccount,
  updateUser,
} from "@/api/UserService";
import { SET_USER_LIST } from "@/redux/types";
import ChangePasswordModal from "@/components/ChangePasswordModal";
import ChangePhoneModal from "@/components/ChangePhoneModal";
import ChangeEmailModal from "@/components/ChangeEmailModal";
import LoadingBar from "react-top-loading-bar";
import ChangeServersModal from "@/components/ChangeServersModal";
import { fetchInvoice, fetchSubscription } from "@/api/CloudService";
import dayjs from "dayjs";
import { AgGridReact } from "ag-grid-react";
import UserRenderer from "@/components/CellRenderers/UserRenderer";
import ChangeLicenseModal from "@/components/ChangeLicenseModal";
import LicenseCard from "@/components/LicenseCard";
// import UserEditRenderer from "@/components/CellRenderers/UserEditRenderer";

const user = {
  name: "Whitney Francis",
  email: "whitney@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
};

const breadcrumbs = [
  { name: "Jobs", href: "#", current: false },
  { name: "Front End Developer", href: "#", current: false },
  { name: "Applicants", href: "#", current: true },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];
const attachments = [
  { name: "bangdb_pro_saas_subscription_october.pdf", href: "#" },
  { name: "bangdb_pro_saas_subscription_november.pdf", href: "#" },
];
const eventTypes = {
  applied: { icon: UserIcon, bgColorClass: "bg-gray-400" },
  advanced: { icon: HandThumbUpIcon, bgColorClass: "bg-blue-500" },
  completed: { icon: CheckIcon, bgColorClass: "bg-green-500" },
};
const timeline = [
  {
    id: 1,
    type: eventTypes.applied,
    content: "Applied to",
    target: "Front End Developer",
    date: "Sep 20",
    datetime: "2020-09-20",
  },
  {
    id: 2,
    type: eventTypes.advanced,
    content: "Advanced to phone screening by",
    target: "Bethany Blake",
    date: "Sep 22",
    datetime: "2020-09-22",
  },
  {
    id: 3,
    type: eventTypes.completed,
    content: "Completed phone screening with",
    target: "Martha Gardner",
    date: "Sep 28",
    datetime: "2020-09-28",
  },
  {
    id: 4,
    type: eventTypes.advanced,
    content: "Advanced to interview by",
    target: "Bethany Blake",
    date: "Sep 30",
    datetime: "2020-09-30",
  },
  {
    id: 5,
    type: eventTypes.completed,
    content: "Completed interview with",
    target: "Katherine Snyder",
    date: "Oct 4",
    datetime: "2020-10-04",
  },
];

const comments = [
  {
    id: 1,
    name: "Leslie Alexander",
    date: "4d ago",
    imageId: "1494790108377-be9c29b29330",
    body: "Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.",
  },
  {
    id: 2,
    name: "Michael Foster",
    date: "4d ago",
    imageId: "1519244703995-f4e0f30006d5",
    body: "Et ut autem. Voluptatem eum dolores sint necessitatibus quos. Quis eum qui dolorem accusantium voluptas voluptatem ipsum. Quo facere iusto quia accusamus veniam id explicabo et aut.",
  },
  {
    id: 3,
    name: "Dries Vincent",
    date: "4d ago",
    imageId: "1506794778202-cad84cf45f1d",
    body: "Expedita consequatur sit ea voluptas quo ipsam recusandae. Ab sint et voluptatem repudiandae voluptatem et eveniet. Nihil quas consequatur autem. Perferendis rerum et.",
  },
];

export default function User({ params }) {
  const userid = decodeURI(params.user);
  const dispatch = useDispatch();
  const gridRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  const { userList } = useSelector((state) => state.deploymentReducer);
  const [accountInfo, setAccountInfo] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [openPasswordChange, setOpenPasswordChange] = useState(false);
  const [openEmailChange, setOpenEmailChange] = useState(false);
  const [openPhoneChange, setOpenPhoneChange] = useState(false);
  const [openChangeServers, setOpenChangeServers] = useState(false);
  const [openChangeLicense, setOpenChangeLicense] = useState(false);

  const router = useRouter();

  const getRowId = useMemo(() => {
    return (params) => params.data.userid;
  }, []);

  useEffect(() => {
    const getUserAndAccountInfo = async () => {
      setProgress(30);
      setLoading(true);

      const uinfo = await getUserInfo({ userid });
      setUserInfo(uinfo);

      const ainfo = await getAccountUsers({
        user_account: uinfo?.user_account,
      });

      if (ainfo?.subscription_details?.length > 0) {
        for (const subscription of ainfo?.subscription_details) {
          const res = await fetchSubscription({ id: subscription?.account_id });
          if (res) {
            subscription.razorpay_subscription = res;
          }
        }
      }

      setAccountInfo(ainfo);

      setLoading(false);
      setProgress(100);
    };

    getUserAndAccountInfo();
  }, []);

  const activateUser = async (userid, apikey) => {
    const activate = await updateAccount({
      userid,
      apikey,
      user_info: { status: 3 },
    });

    if (activate?.errcode === 0) {
      alert("User activated successfully");
    }
  };

  const suspendUser = async (userid, apikey) => {
    const suspend = await updateAccount({
      userid,
      apikey,
      user_info: { status: 1 },
    });

    if (suspend?.errcode === 0) {
      alert("User suspended successfully");
    }
  };

  const changePassword = async (userid, newpwd, change_at_login) => {
    const payload = {
      userid,
      newpwd,
      change_at_login,
    };

    const change = await changeUserPassword(payload);

    if (change?.errcode === 0) {
      alert("Password changed successfully");
    }
  };

  const changePhone = async (userid, phone) => {
    const payload = {
      userid,
      apikey: userInfo?.apikey,
      user_info: { phone },
    };

    const change = await updateUser(payload);

    if (change?.errcode === 0) {
      alert("Phone changed successfully");
    }
  };

  const changeEmail = async (userid, email) => {
    const payload = {
      userid,
      apikey: userInfo?.apikey,
      user_info: { email },
    };

    const change = await updateUser(payload);

    if (change?.errcode === 0) {
      alert("Email changed successfully");
    }
  };

  const changeLicense = async (license) => {
    const payload = {
      userid,
      apikey: userInfo?.apikey,
      user_info: { license },
    };

    const change = await updateAccount(payload);

    if (change?.errcode === 0) {
      alert("License type changed successfully");
    }
  };

  const changeServers = async (deployment_type, servers) => {
    const change = await addServerInfo({
      userid,
      server_info: { deployment_type, servers },
    });

    if (change?.errcode === 0) {
      alert("Successfully updated the servers");
    }
  };

  const openInvoice = async (id) => {
    const invoice = await fetchInvoice({
      id,
    });

    console.log({
      invoice,
    });

    window.open(invoice?.short_url, "BangDB Invoice", "height=1080,width=800");
  };

  return (
    <>
      <LoadingBar
        color={"#8800ff"}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      {/* {loading && (
        <div
          className="fixed top-0 left-0 w-screen h-screen z-50"
          style={{
            background: "rgb(111,111,111,0.5)",
          }}
        ></div>
      )} */}

      <div className="w-full h-full">
        <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 ring-1 ring-white/5">
            <div className="flex h-16 shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-800 text-white"
                              : "text-gray-400 hover:text-white hover:bg-gray-800",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <item.icon
                            className="h-6 w-6 shrink-0"
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className="text-xs font-semibold leading-6 text-gray-400">
                    Your teams
                  </div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {teams.map((team) => (
                      <li key={team.name}>
                        <a
                          href={team.href}
                          className={classNames(
                            team.current
                              ? "bg-gray-800 text-white"
                              : "text-gray-400 hover:text-white hover:bg-gray-800",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                            {team.initial}
                          </span>
                          <span className="truncate">{team.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="-mx-6 mt-auto">
                  <a
                    href="#"
                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
                  >
                    <img
                      className="h-8 w-8 rounded-full bg-gray-800"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">Ujjwal Upadhyay</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="min-h-full ml-52">
          {/* Static sidebar for desktop */}
          <main className="py-10">
            {/* Page header */}
            <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
              <div className="flex items-center space-x-5">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      className="h-16 w-16 rounded-full shadow-md"
                      src="/icons/user-icon.png"
                      alt=""
                    />
                    <span
                      className="absolute inset-0 rounded-full shadow-inner"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">{userid}</h1>
                  {/* <p className="text-sm font-medium text-gray-400">
                    Applied for{" "}
                    <a href="#" className="text-white font-medium">
                      Front End Developer to
                    </a>{" "}
                    on <time dateTime="2020-08-25">August 25, 2020</time>
                  </p> */}
                </div>
              </div>
              <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-3 sm:space-y-0 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  onClick={() => suspendUser(userid, userInfo?.apikey)}
                >
                  Suspend User
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  onClick={() => activateUser(userid, userInfo?.apikey)}
                >
                  Activate User
                </button>
                <Menu as="div" className="relative text-left flex items-center">
                  <div>
                    <Menu.Button className="flex items-center rounded-full bg-transparent text-blue-600 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                      <span className="sr-only">Open options</span>
                      <EllipsisVerticalIcon
                        className="h-8 w-8"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 top-10 z-10 mt-2 w-56 origin-bottom-right rounded-md bg-gray-50 border shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              onClick={() => setOpenPhoneChange(true)}
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm cursor-pointer"
                              )}
                            >
                              Change Phone
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              onClick={() => setOpenEmailChange(true)}
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm cursor-pointer"
                              )}
                            >
                              Change E-mail
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              onClick={() => setOpenPasswordChange(true)}
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm cursor-pointer"
                              )}
                            >
                              Change Password
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => setOpenChangeServers(true)}
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block w-full px-4 py-2 text-left text-sm cursor-pointer"
                              )}
                            >
                              Assign new servers
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>

            <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
              <div className="space-y-6 lg:col-span-3 lg:col-start-1">
                {/* Description list*/}
                <section aria-labelledby="applicant-information-title">
                  <div className="bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                      <h2
                        id="applicant-information-title"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        User Information
                      </h2>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Personal details and application.
                      </p>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">
                            Full Name
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {`${userInfo?.first_name ?? ""} ${
                              userInfo?.middle_name ?? ""
                            } ${userInfo?.last_name ?? ""}` ?? "N/A"}
                          </dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">
                            Email address
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {userInfo?.email ?? "N/A"}
                          </dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">
                            License Type
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {userInfo?.license ?? "N/A"}
                          </dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">
                            Phone
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {userInfo?.phone ?? "N/A"}
                          </dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">
                            API Key
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {userInfo?.apikey ?? "N/A"}
                          </dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">
                            BangDB Account ID
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {userInfo?.user_account ?? "N/A"}
                          </dd>
                        </div>
                        {/* <div className="sm:col-span-2">
                          <dt className="text-sm font-medium text-gray-500">
                            About
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            Fugiat ipsum ipsum deserunt culpa aute sint do
                            nostrud anim incididunt cillum culpa consequat.
                            Excepteur qui ipsum aliquip consequat sint. Sit id
                            mollit nulla mollit nostrud in ea officia proident.
                            Irure nostrud pariatur mollit ad adipisicing
                            reprehenderit deserunt qui eu.
                          </dd>
                        </div> */}
                        {/* <div className="sm:col-span-2">
                          <dt className="text-sm font-medium text-gray-500">
                            Last 5 Invoices
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            <ul
                              role="list"
                              className="divide-y divide-gray-200 rounded-md border border-gray-200"
                            >
                              {attachments.map((attachment) => (
                                <li
                                  key={attachment.name}
                                  className="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
                                >
                                  <div className="flex w-0 flex-1 items-center">
                                    <PaperClipIcon
                                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                                      aria-hidden="true"
                                    />
                                    <span className="ml-2 w-0 flex-1 truncate">
                                      {attachment.name}
                                    </span>
                                  </div>
                                  <div className="ml-4 flex-shrink-0">
                                    <a
                                      href={attachment.href}
                                      className="font-medium text-blue-600 hover:text-blue-500"
                                    >
                                      Download
                                    </a>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </dd>
                        </div> */}
                      </dl>
                    </div>
                    <div>
                      <a
                        href="#"
                        className="block bg-white px-4 pt-3.5 pb-7 text-center text-sm font-medium text-gray-500 hover:text-gray-700 sm:rounded-b-lg"
                      >
                        {/* See all invoices */}
                      </a>
                    </div>
                  </div>
                </section>
              </div>

              <div className="space-y-6 lg:col-span-3 lg:col-start-1">
                <LicenseCard
                  changeLicense={changeLicense}
                  currentLicense={userInfo?.license}
                />
              </div>

              <div className="space-y-6 lg:col-span-3 lg:col-start-1">
                {/* Comments*/}
                <section aria-labelledby="notes-title" className="w-full">
                  <div className="bg-white shadow sm:overflow-hidden sm:rounded-lg">
                    <div className="divide-y divide-gray-200">
                      <div className="px-4 py-5 sm:px-6">
                        <div className="hidden sm:block">
                          <nav className="flex space-x-4" aria-label="Tabs">
                            {tabs.map((tab) => (
                              <a
                                key={tab.name}
                                onClick={() => {
                                  setActiveTab(tab.val);
                                }}
                                className={classNames(
                                  tab.val === activeTab
                                    ? "bg-indigo-100 text-indigo-700"
                                    : "text-gray-500 hover:text-gray-700",
                                  "rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
                                )}
                                aria-current={
                                  tab.val === activeTab ? "page" : undefined
                                }
                              >
                                {tab.name}
                              </a>
                            ))}
                          </nav>
                        </div>
                      </div>

                      {activeTab === 0 && (
                        <ul role="list" className="space-y-8 px-4 py-2">
                          <table>
                            <tbody>
                              {accountInfo?.subscription_details?.map(
                                (transaction, index) => (
                                  <tr key={index} className="bg-white border-b">
                                    <td className="w-full max-w-0 whitespace-nowrap py-2 px-4 text-sm text-gray-900">
                                      <div className="flex">
                                        <a className="group inline-flex space-x-2 truncate text-sm">
                                          <BanknotesIcon
                                            className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                          />
                                          <p className="truncate text-gray-500 group-hover:text-gray-900">
                                            {
                                              planIdMap[
                                                transaction
                                                  ?.razorpay_subscription
                                                  ?.plan_id
                                              ]
                                            }
                                          </p>
                                        </a>
                                      </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                                      <span
                                        className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
                                        onClick={() => {
                                          if (transaction?.invoice_id) {
                                            openInvoice(
                                              transaction?.invoice_id
                                            );
                                          }
                                        }}
                                      >
                                        {transaction?.invoice_id
                                          ? "View Invoice"
                                          : null}
                                      </span>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                                      <span className="font-medium text-gray-900">
                                        {/* {transaction.amount} */}
                                        999
                                      </span>{" "}
                                      {/* {transaction.currency} */}
                                      INR
                                    </td>
                                    <td className="hidden whitespace-nowrap px-6 py-4 text-sm text-gray-500 md:block">
                                      <span
                                        className={classNames(
                                          statusStyles[
                                            transaction?.razorpay_subscription?.status?.toLowerCase()
                                          ],
                                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize"
                                        )}
                                      >
                                        {transaction?.razorpay_subscription?.status?.toLowerCase()}
                                      </span>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-900">
                                      <p className="truncate text-gray-500 group-hover:text-gray-950">
                                        {dayjs(
                                          transaction?.razorpay_subscription
                                            ?.created_at * 1000
                                        ).format("MMMM DD, YYYY")}
                                      </p>
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </ul>
                      )}

                      {activeTab === 1 && (
                        <div className="py-2 border-b">
                          <div className="w-full">
                            <div className="ag-theme-alpine h-[600px] mt-6 w-full pt-0 pb-5 px-8">
                              <AgGridReact
                                ref={gridRef} // Ref for accessing Grid's API
                                rowData={accountInfo?.users} // Row Data for Rows
                                columnDefs={columnDefs} // Column Defs for Columns
                                defaultColDef={defaultColDef} // Default Column Properties
                                animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                                pagination={true}
                                paginationPageSize={25}
                                getRowId={getRowId}
                                onRowClicked={(params) => {
                                  router.push(
                                    `/deployments/${userid}/${params?.data?.userid}`
                                  );
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="bg-gray-50 px-4 py-6 sm:px-6">
                      <div className="flex space-x-3">
                        <div className="flex-shrink-0">
                          {/* <img
                            className="h-10 w-10 rounded-full"
                            src={user.imageUrl}
                            alt=""
                          /> */}
                        </div>
                        <div className="min-w-0 flex-1">
                          <form action="#">
                            <div className="mt-3 flex items-center justify-between">
                              <a
                                href="#"
                                className="group inline-flex items-start space-x-2 text-sm text-gray-500 hover:text-gray-900"
                              >
                                <QuestionMarkCircleIcon
                                  className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                                <span>Need help</span>
                              </a>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </main>
        </div>
      </div>

      <ChangePasswordModal
        open={openPasswordChange}
        setOpen={setOpenPasswordChange}
        changePassword={(newpwd) => changePassword(userid, newpwd, 1)}
      />

      <ChangePhoneModal
        open={openPhoneChange}
        setOpen={setOpenPhoneChange}
        changePhone={(phone) => changePhone(userid, phone)}
      />

      <ChangeEmailModal
        open={openEmailChange}
        setOpen={setOpenEmailChange}
        changeEmail={(email) => changeEmail(userid, email)}
      />

      <ChangeServersModal
        open={openChangeServers}
        setOpen={setOpenChangeServers}
        uInfo={userInfo}
        changeServers={changeServers}
      />

      <ChangeLicenseModal
        open={openChangeLicense}
        setOpen={setOpenChangeLicense}
        currentLicense={userInfo?.license}
        changeLicense={changeLicense}
      />
    </>
  );
}

export const navigation = [
  // { name: "Projects", href: "#", icon: FolderIcon, current: false },
  {
    name: "Deployments",
    href: "/deployments",
    icon: ServerIcon,
    current: true,
  },
  // { name: "Activity", href: "#", icon: SignalIcon, current: false },
  // { name: "Domains", href: "#", icon: GlobeAltIcon, current: false },
  // { name: "Usage", href: "#", icon: ChartBarSquareIcon, current: false },
  // { name: "Settings", href: "#", icon: Cog6ToothIcon, current: false },
];

export const teams = [
  { id: 1, name: "Planetaria", href: "#", initial: "P", current: false },
  { id: 2, name: "Protocol", href: "#", initial: "P", current: false },
  { id: 3, name: "Tailwind Labs", href: "#", initial: "T", current: false },
];

export const secondaryNavigation = [
  { name: "Overview", href: "#", current: true },
  { name: "Activity", href: "#", current: false },
  { name: "Settings", href: "#", current: false },
  { name: "Collaborators", href: "#", current: false },
  { name: "Notifications", href: "#", current: false },
];

const tabs = [
  { name: "Billing Transactions", val: 0 },
  { name: "Users", val: 1 },
  // { name: "Invoices", val: 2 },
  // { name: "Billing", val: 3 },
];

const statusStyles = {
  success: "bg-green-100 text-green-800",
  processing: "bg-yellow-100 text-yellow-800",
  failed: "bg-gray-100 text-gray-800",
  cancelled: "bg-red-100 text-red-800",
};

const planIdMap = {
  plan_MuNkfumsmjEqss: "BangDB Pro - SAAS",
  plan_Ms0kWmfziviZUn: "Bug Tracker - Premium",
  plan_Ms0jVNzfOeK9Gy: "Bug Tracker - Basic",
};

const columnDefs = [
  // {
  //   field: "",
  //   cellRenderer: UserEditRenderer,
  //   width: 80,
  //   cellClass: "crm-table-cell",
  // },
  {
    field: "userid",
    headerName: "User ID",
    tooltip: "userid",
    cellRenderer: UserRenderer,
    cellRendererParams: { black: true },
    cellClass: "crm-table-cell",
  },
  {
    field: "first_name",
    headerName: "Name",
    tooltip: "userid",
    valueFormatter: (params) => {
      const value = `${params?.data?.first_name || ""} ${
        params?.data?.middle_name || ""
      } ${params?.data?.last_name || ""}`;
      return value;
    },
    cellClass: "crm-table-cell",
  },
  {
    field: "email",
    headerName: "Email",
    tooltip: "email",
    cellClass: "crm-table-cell",
  },
  {
    field: "phone",
    headerName: "Phone",
    tooltip: "phone",
    cellClass: "crm-table-cell",
  },
  {
    field: "status",
    headerName: "Status",
    tooltip: "status",
    cellClass: "crm-table-cell",
  },
  {
    field: "user_type",
    headerName: "User Type",
    tooltip: "user_type",
    cellClass: "crm-table-cell",
  },
  {
    field: "license",
    headerName: "License Type",
    tooltip: "license",
    cellClass: "crm-table-cell",
  },
  {
    field: "license_amount",
    headerName: "License Amount",
    tooltip: "license_amount",
    valueFormatter: () => {
      return "N/A";
    },
    cellClass: "crm-table-cell",
  },
  {
    field: "signup_date",
    headerName: "Signup Date",
    tooltip: "signup_date",
    valueFormatter: () => {
      return "26/10/2023" ?? "N/A";
    },
    cellClass: "crm-table-cell",
  },
  {
    field: "server_id",
    headerName: "Server id and Health of server",
    tooltip: "server_id",
    valueFormatter: () => {
      return "N/A";
    },
    cellClass: "crm-table-cell",
  },
];
