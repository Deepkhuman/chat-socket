import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../Axios/axiosClient";
import { handleError, handleSuccess } from "../../utils";
import { signupschema } from "../utils/yupValidation";
import { yupResolver } from "@hookform/resolvers/yup";

const Signup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupschema),
  });

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await axiosClient.post("/signup", data);
      localStorage.setItem("token", response.token);

      console.log(response);
      if (response.success) {
        handleSuccess("Signup Successfull!!");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      console.error(error.response.status);
      handleError(error?.response?.data.message);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto mt-32 bg-white p-8 rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-6">Signup </h2>
        <span className="mb-4 text-sm/[15px] text-blue-500">
          <Link to={"/login"}>Already have an account?</Link>
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="text-gray-700">First Name*</label>
              <br />
              <input
                type="text"
                placeholder="john"
                {...register("firstname")}
                className="w-full px-3 py-2 border rounded-lg"
              />
              {errors.firstname && (
                <span className="text-red-500">
                  {errors?.firstname?.message}
                </span>
              )}
            </div>

            <div className="w-1/2">
              <label className="text-gray-700">Last Name*</label>
              <br />
              <input
                type="text"
                placeholder="Doe"
                {...register("lastname")}
                className="w-full px-3 py-2 border rounded-lg"
              />
              {errors.lastname && (
                <span className="text-red-500">
                  {errors?.lastname?.message}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Company</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Demo inc"
              {...register("company")}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          {errors.company && (
            <span className="text-red-500">{errors?.company?.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email Address*</label>
          <div className="relative">
            <input
              type="email"
              {...register("email")}
              placeholder="Demo@company.com"
              className="w-full px-3 py-2 border rounded-lg"
            />
            {errors.email && (
              <span className="text-red-500">{errors?.email?.message}</span>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <div className="relative">
            <input
              type="password"
              placeholder="*****"
              {...register("password")}
              className="w-full px-3 py-2 border rounded-lg"
            />
            {errors.password && (
              <span className="text-red-500">{errors?.password?.message}</span>
            )}
          </div>
        </div>

        <div className="text-center mt-6">
          <span className="no-underline text-sm font-semibold">
            By Signing up, you agree to our
            <Link className="no-underline text-sm font-semibold">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link className="no-underline text-sm font-semibold">
              Privacy Policy{" "}
            </Link>
          </span>
        </div>

        <input
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-sm mt-4"
        />
      </form>
    </div>
  );
};

export default Signup;
