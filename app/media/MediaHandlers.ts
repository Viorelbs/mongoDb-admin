import { StorageObjectInterface } from "@/typings";
import toast from "react-hot-toast";

export function handleChecked(
  name: string,
  checked: string[],
  setChecked: Function
) {
  if (checked.includes(name)) {
    setChecked(checked.filter((file) => file !== name));
  } else {
    setChecked((prev: string[]) => [...prev, name]);
  }
}

export function deleteObjects(
  checked: string[],
  deleteMedia: Function,
  setChecked: Function,
  setDeleted: Function
) {
  return async () => {
    if (window.confirm("Are you sure you want to delete these assets?")) {
      await deleteMedia(checked);
      setChecked([]);
      setDeleted(checked);
      toast.error("Your files have been deleted", {
        duration: 2500,
      });
    }
  };
}

export function handleCheckedAll(
  data: StorageObjectInterface[],
  checkAll: boolean,
  setChecked: Function,
  setCheckAll: Function
) {
  return () => {
    if (checkAll) {
      setChecked([]);
    } else {
      const allNames = data.map(
        (object: StorageObjectInterface) => object.name
      );
      setChecked(allNames);
    }
    setCheckAll(!checkAll);
  };
}
