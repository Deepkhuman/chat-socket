import { toast } from "react-toastify";

const handleSuccess = (msg) => {
  toast.success(msg, {
    position: "top-right",
    autoClose: 1000,
  });
};

const handleError = (msg) => {
  toast.error(msg, {
    position: "top-right",
    autoClose: 1000,
  });
};

export { handleSuccess, handleError };
