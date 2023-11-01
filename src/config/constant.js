export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const userServiceEndPoint = "testuser.bangdb.com:18080";

export const defaultColDef = {
  editable: false,
  sortable: true,
  filter: true,
  resizable: true
};
