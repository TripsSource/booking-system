import React from "react";
import { Modal } from "reactstrap";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
interface LogOutModalInterFace {
  modal: boolean;
  toggle: () => void;
}
const LogOutModal = ({ modal, toggle }: LogOutModalInterFace) => {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("token");
    router.push("/auth/login");
    toast.success("logout successful");
  };
  return (
    <Modal isOpen={modal} toggle={toggle} centered>
      <div className="modal-body">
        <h5 className="modal-title">Logging Out</h5>
        <p>Are you sure you want to log out?</p>
        <button type="button" className="btn-close" onClick={toggle} />
        <div className="button-box">
          <button type="button" onClick={toggle} className="btn btn--no ">
            No
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="btn  btn--yes btn-primary"
          >
            Yes
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LogOutModal;
