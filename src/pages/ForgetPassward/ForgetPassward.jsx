import { Button, Input } from "@heroui/react";
import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
  });

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema,
    onSubmit: async (values) => {
      setMessage("");
      setError("");
      setIsLoading(true);
      try {
        const response = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
          values
        );
        setMessage(response.data.message || "Verification code sent to your email.");
        setTimeout(() => {
          navigate("/verify-code", { state: { email: values.email } }); 
        }, 2000);
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="sm:w-2/3 mx-auto">
      <h1 className="text-3xl font-bold">Forgot Password</h1>
      <p className="text-sm text-gray-500 mb-4">Enter your email to receive a verification code.</p>
      <form onSubmit={formik.handleSubmit}>
        <div className="py-5 grid gap-4">
          <Input
            isInvalid={formik.touched.email && formik.errors.email}
            errorMessage={formik.errors.email}
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Email"
            type="email"
            variant="borderd"
          />
          <Button type="submit" color="primary" isLoading={isLoading}>
            Send Verification Code
          </Button>
          {message && <p className="text-green-500 text-sm">{message}</p>}
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </form>
    </div>
  );
}
