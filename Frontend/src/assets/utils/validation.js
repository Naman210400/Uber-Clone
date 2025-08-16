import toast from "react-hot-toast";

export const checkValidName = (name, allowSpace = true) => {
  const pattern = allowSpace ? /^[a-zA-Z ]*$/ : /^[a-zA-Z]*$/;
  return pattern.test(name);
};

export const checkValidEmail = (email) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
};

export const checkValidPassword = (password) => {
  const pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return pattern.test(password);
};

export const displayErrorToast = (data) => {
  toast.dismiss();
  return toast.error(data, {
    style: { background: "#333", color: "#fff" },
  });
};

export const displaySuccessToast = (data) => {
  return toast.success(data, {
    style: { background: "#333", color: "#fff" },
  });
};
