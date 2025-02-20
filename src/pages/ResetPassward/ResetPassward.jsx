import { Button, Input } from "@heroui/react";
import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // Get email from VerifyCode step

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .required("New password is required")
      .min(8, "Password must be at least 8 characters"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Please confirm your new password"),
  });

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setMessage("");
      setError("");
      setIsLoading(true);
      try {
        const response = await axios.put(
          "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
          { email, newPassword: values.newPassword } 
        );
        setMessage("Password reset successfully! Redirecting to login...");
        setTimeout(() => {
          navigate("/login"); 
        }, 1000);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to reset password.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="sm:w-2/3 mx-auto">
      <h1 className="text-3xl font-bold">Reset Password</h1>
      <p className="text-sm text-gray-500 mb-4">Enter a new password for your account.</p>
      <form onSubmit={formik.handleSubmit}>
        <div className="py-5 grid gap-4">
          <Input
            isInvalid={formik.touched.newPassword && formik.errors.newPassword}
            errorMessage={formik.errors.newPassword}
            name="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="New Password"
            type="password"
            variant="borderd"
          />
          <Input
            isInvalid={formik.touched.rePassword && formik.errors.rePassword}
            errorMessage={formik.errors.rePassword}
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Confirm New Password"
            type="password"
            variant="borderd"
          />
          <Button type="submit" color="primary" isLoading={isLoading}>
            Reset Password
          </Button>
          {message && <p className="text-green-500 text-sm">{message}</p>}
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </form>
    </div>
  );
}
