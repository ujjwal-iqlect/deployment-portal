import dayjs from "dayjs";

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const userServiceEndPoint = "testuser.bangdb.com:18080";
export const cloudServiceEndPoint = "cloud.bangdb.com/api";

export const defaultColDef = {
  editable: false,
  sortable: true,
  filter: true,
  resizable: true,
};

export const timeAgo = (timestamp) => {
  const current = dayjs(); // Current time
  const past = dayjs.unix(timestamp); // Convert the provided timestamp (in seconds) to Day.js object

  const diffInYears = current.diff(past, "year");
  const diffInMonths = current.diff(past, "month");
  const diffInWeeks = current.diff(past, "week");
  const diffInDays = current.diff(past, "day");
  const diffInHours = current.diff(past, "hour");
  const diffInMinutes = current.diff(past, "minute");

  if (diffInYears > 1) {
    return diffInYears + " years ago";
  } else if (diffInMonths > 1) {
    return diffInMonths + " months ago";
  } else if (diffInWeeks > 1) {
    return diffInWeeks + " weeks ago";
  } else if (diffInDays > 1) {
    return diffInDays + " days ago";
  } else if (diffInHours > 1) {
    return diffInHours + " hours ago";
  } else {
    return diffInMinutes + " minutes ago";
  }
};
