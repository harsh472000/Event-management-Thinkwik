import React, { useCallback } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import CommonInput from "@/components/common/CommonInput";
import CommonButton from "@/components/common/CommonButton";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

interface LoginFormValues {
  email: string;
  password: string;
}

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (
      values: LoginFormValues,
      { setSubmitting, setStatus }: FormikHelpers<LoginFormValues>
    ) => {
      try {
        setStatus(null);
        await login(values.email, values.password);
        navigate("/");
      } catch (error: any) {
        setStatus(error?.message || "Login failed");
      } finally {
        setSubmitting(false);
      }
    },
    [login, navigate]
  );

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <div className="container narrow">
        <h2>Login</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form className="form card">
              <CommonInput
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
              />
              <CommonInput
                name="password"
                label="Password"
                placeholder="Enter your password"
                isPassword
              />

              {status && <p className="err">{status}</p>}

              <CommonButton
                type="submit"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? "Signing In..." : "Login"}
              </CommonButton>

              <p className="muted">
                No account? <Link to="/signup">Sign up</Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
