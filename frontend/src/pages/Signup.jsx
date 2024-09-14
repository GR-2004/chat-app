import React, { useState } from "react";
import GenderCheckbox from "../components/GenderCheckbox";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !inputs.fullName ||
      !inputs.username ||
      !inputs.password ||
      !inputs.confirmPassword ||
      !inputs.gender
    ) {
      toast.error("Please fill in all the fields.");
      return;
    }

    if (inputs.password !== inputs.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        "/api/auth/signup",
        { inputs },
        { withCredentials: true }
      );
      toast.success(res.message);
      navigate("/sign-in");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-center text-gray-700">
          Sign Up for <span className="text-blue-500">ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-2 mt-1 text-sm text-gray-700 bg-gray-100 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600">Username</label>
            <input
              type="text"
              placeholder="johndoe"
              className="w-full px-4 py-2 mt-1 text-sm text-gray-700 bg-gray-100 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full px-4 py-2 mt-1 text-sm text-gray-700 bg-gray-100 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 mt-1 text-sm text-gray-700 bg-gray-100 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          </div>

          <GenderCheckbox
            onCheckboxChange={handleCheckboxChange}
            selectedGender={inputs.gender}
          />

          <div className="flex justify-between items-center mt-4">
            <a
              href="/sign-in"
              className="text-sm text-blue-500 hover:underline"
            >
              Already have an account?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
