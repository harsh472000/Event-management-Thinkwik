import React, { useCallback } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import CommonInput from "@/components/common/CommonInput";
import CommonButton from "@/components/common/CommonButton";

const validationSchema = Yup.object({
  name: Yup.string().min(2).max(50).required(),
  email: Yup.string().email().required(),
  password: Yup.string()
    .min(8)
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required(),
});

interface SignupFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialValues: SignupFormValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (
      values: SignupFormValues,
      { setSubmitting, setStatus }: FormikHelpers<SignupFormValues>
    ) => {
      try {
        setStatus(null);
        await signup(values.name, values.email, values.password);
        navigate("/");
      } catch (error: any) {
        setStatus(error.message || "Signup failed");
      } finally {
        setSubmitting(false);
      }
    },
    [signup, navigate]
  );

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <div className="container narrow">
        <h2>Sign Up</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form className="form card">
              <CommonInput
                name="name"
                label="Name"
                placeholder="Enter your full name"
              />
              <CommonInput
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
              />
              <CommonInput
                name="password"
                label="Password"
                placeholder="Create a strong password"
                isPassword
              />
              <CommonInput
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm your password"
                isPassword
              />

              {status && <p className="err">{status}</p>}

              <CommonButton
                type="submit"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </CommonButton>

              <p className="muted">
                Have an account? <Link to="/login">Login</Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
