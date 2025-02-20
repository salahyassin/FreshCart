import { Button, Input } from "@heroui/react";
import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifyCode() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; 

  const validationSchema = Yup.object({
    resetCode: Yup.string().required("Verification code is required"),
  });

  const formik = useFormik({
    initialValues: { resetCode: "" },
    validationSchema,
    onSubmit: async (values) => {
      setMessage("");
      setError("");
      setIsLoading(true);
      try {
        const response = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
          values
        );
        setMessage("Code verified successfully! Redirecting...");
        setTimeout(() => {
          navigate("/reset-password", { state: { email } }); 
        }, 1000);
      } catch (err) {
        setError(err.response?.data?.message || "Invalid verification code.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="sm:w-2/3 mx-auto">
      <h1 className="text-3xl font-bold">Verify Code</h1>
      <p className="text-sm text-gray-500 mb-4">Enter the verification code sent to your email.</p>
      <form onSubmit={formik.handleSubmit}>
        <div className="py-5 grid gap-4">
          <Input
            isInvalid={formik.touched.resetCode && formik.errors.resetCode}
            errorMessage={formik.errors.resetCode}
            name="resetCode"
            value={formik.values.resetCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Verification Code"
            type="text"
            variant="borderd"
          />
          <Button type="submit" color="primary" isLoading={isLoading}>
            Verify Code
          </Button>
          {message && <p className="text-green-500 text-sm">{message}</p>}
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </form>
    </div>
  );
}
