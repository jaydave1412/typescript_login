"use client";
import { useFormik } from "formik";
import React from "react";
import FormikInput from "../formik/FormikInput";

export default function LoginForm() {
  const formik = useFormik({
    initialValues: {
      username: 0,
      password: "",
    },
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="grid gap-2">
        <FormikInput
          formik={formik as any}
          name="username"
          type="number"
          label="username"
        />
      </div>
      <div className="grid gap-2">
        <FormikInput
          formik={formik as any}
          value={formik.values.username * 10}
          name="password"
          label="password"
        />
      </div>
    </form>
  );
}
