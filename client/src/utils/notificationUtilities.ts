import { toast } from "react-toastify";

export function triggerWarningNotification(
  message: string,
  time: number = 3000
) {
  toast(message, {
    position: "top-right",
    autoClose: time,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    type: "error",
    theme: "dark",
  });
}

export function triggerSuccessNotification(
  message: string,
  time: number = 3000
) {
  toast(message, {
    position: "top-right",
    autoClose: time,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    type: "success",
    theme: "dark",
  });
}
