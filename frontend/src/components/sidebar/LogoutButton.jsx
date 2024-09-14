import { useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../../context/AuthContext";

const LogoutButton = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {user, setUser} = useAuth();
  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/signout", {
        withCredentials: true,
      });
      setUser(null);
      navigate("/sign-in", {replace: true})
  } catch (error) {
      toast.error(error.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-auto">
      {!loading ? (
        <BiLogOutCircle
          className="w-6 h-6 text-black cursor-pointer"
          onClick={handleLogout}
        />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};

export default LogoutButton;
