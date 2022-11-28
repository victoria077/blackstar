import React, { useEffect, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function User({ socket }) {
  const createToast = useCallback(async () => {
    socket.on("messageSent", function (message) {
      toast(`${message.title}\n\n ${message.text}\n\n ${message.date}`, {
        autoClose: 5000,
        position: toast.POSITION.BOTTOM_RIGHT,
        className: "foo-bar",
      });
    });
  }, []);

  useEffect(() => {
    createToast()
  }, [createToast]);

  return (
    <>
      <ToastContainer limit={1} />
    </>
  );
}

export default User;
