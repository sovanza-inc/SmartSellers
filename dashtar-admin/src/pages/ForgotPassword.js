import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@windmill/react-ui";

import Error from "components/form/Error";
import useLoginSubmit from "hooks/useLoginSubmit";
import LabelArea from "components/form/LabelArea";
import InputArea from "components/form/InputArea";
import ImageLight from "assets/img/forgot-password-office.jpeg";
import ImageDark from "assets/img/forgot-password-office-dark.jpeg";

const ForgotPassword = () => {
  const { onSubmit, register, handleSubmit, errors, loading } =
    useLoginSubmit();

  return (
    <div
      className="flex items-center min-h-screen p-6 bg-blue-400 dark:bg-blue-500"
      style={{ backgroundImage: `url('/a.png')` }}
    >
      <div
        className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-teal-400 rounded-lg shadow-xl dark:bg-blue-200"
        style={{ backgroundColor: "#fff" }}
      >
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1
                className="mb-4 text-xl font-semibold text-blue-700 dark:text-blue-700"
                style={{ color: "#3f3eed" }}
              >
                Forgot password
              </h1>

              <form onSubmit={handleSubmit(onSubmit)}>
                <LabelArea label="Email" />
                <InputArea
                  register={register}
                  label="Email"
                  name="verifyEmail"
                  type="email"
                  placeholder="john@doe.com"
                  isLogin
                />
                <Error errorName={errors.verifyEmail} />

                <Button
                  disabled={loading}
                  type="submit"
                  block
                  className="mt-4 h-12 bg-blue-600 hover:bg-blue-700"
                  style={{ backgroundColor: "#3f3eed" }}
                >
                  Recover password
                </Button>
              </form>
              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-blue-700 dark:text-blue-700 hover:underline"
                  to="/login"
                  style={{ color: "#3f3eed" }}
                >
                  Already have an account? Login
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
