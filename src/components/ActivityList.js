"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { classNames, defaultColDef } from "@/config/constant";
import { getAccountUsers, getAllAccounts } from "@/api/UserService";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import UserRenderer from "./CellRenderers/UserRenderer";
import { useDispatch, useSelector } from "react-redux";
import { SET_USER_LIST } from "@/redux/types";
import { useRouter } from "next/navigation";

export default function ActivityList() {
  const { userList } = useSelector((state) => state.deploymentReducer);
  const gridRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const getRowId = useMemo(() => {
    return (params) => params.data.user;
  }, []);

  const getUserList = async () => {
    const list = [];

    const users = await getAllAccounts({
      admin: "super_admin1",
      admin_pwd: "sudo_admin_9",
    });

    users?.accounts?.map((u) => {
      list.push(u);
    });

    dispatch({
      type: SET_USER_LIST,
      payload: list,
    });
  };

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <div className="border-t border-white/10 pt-11">
      <h2 className="px-4 text-base font-semibold leading-7 text-white sm:px-6 lg:px-8">
        Latest activity
      </h2>
      <div className="w-full">
        <div className="ag-theme-alpine-dark h-[600px] mt-6 w-full pt-0 pb-5 px-8">
          <AgGridReact
            ref={gridRef} // Ref for accessing Grid's API
            rowData={userList} // Row Data for Rows
            columnDefs={columnDefs} // Column Defs for Columns
            defaultColDef={defaultColDef} // Default Column Properties
            animateRows={true} // Optional - set to 'true' to have rows animate when sorted
            pagination={true}
            paginationPageSize={25}
            getRowId={getRowId}
            onRowClicked={(params) => {
              router.push(`/deployments/${params?.data?.user}`);
            }}
          />
        </div>
      </div>
    </div>
  );
}

const activityItems = [
  {
    user: {
      name: "Michael Foster",
    },
    commit: "2d89f0c8",
    branch: "main",
    status: "Completed",
    duration: "25s",
    date: "45 minutes ago",
    dateTime: "2023-01-23T11:00",
  },
  // More items...
];

const statuses = {
  Completed: "text-green-400 bg-green-400/10",
  Error: "text-rose-400 bg-rose-400/10",
};

const columnDefs = [
  {
    field: "user",
    headerName: "User ID",
    tooltip: "user",
    cellRenderer: UserRenderer,
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
  {
    field: "total_amount_paid",
    headerName: "Total Amount Paid",
    tooltip: "total_amount_paid",
    valueFormatter: () => {
      return "999";
    },
    cellClass: "crm-table-cell",
  },
  {
    field: "last_paid_date",
    headerName: "Total Amount Paid",
    tooltip: "last_paid_date",
    valueFormatter: () => {
      return "23/10/2023";
    },
    cellClass: "crm-table-cell",
  },
  {
    field: "overdue_amount",
    headerName: "Overdue Amount",
    tooltip: "overdue_amount",
    valueFormatter: () => {
      return "3920";
    },
    cellClass: "crm-table-cell",
  },
  {
    field: "overdue_days",
    headerName: "Overdue ( No. of Days )",
    tooltip: "overdue_days",
    valueFormatter: () => {
      return "23/10/2023";
    },
    cellClass: "crm-table-cell",
  },
  {
    field: "last_paid_date",
    headerName: "Total Amount Paid",
    tooltip: "last_paid_date",
    valueFormatter: () => {
      return "23/10/2023";
    },
    cellClass: "crm-table-cell",
  },
];
