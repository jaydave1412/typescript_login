"use client";

import { useFormik } from "formik";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import _ from "lodash";

type InputProps = {
  label?: string;
  value?: any;
  name: string;
  formik: ReturnType<typeof useFormik>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const FormikInput: React.FC<InputProps> = ({
  name,
  formik,
  label,
  value,
  onChange,
  ...rest
}) => {
  const [val, setVal] = useState(value ? value : _.at(formik.values, name)[0]);
  const onChangeFunction = onChange ? onChange : formik.handleChange;

  useEffect(() => {
    if (!_.isNil(value) || !_.isNil(_.at(formik.values, name)[0])) {
      //when props value is 0 this is not getting triggered
      formik.setFieldValue(
        name,
        !_.isNil(value) ? value : _.at(formik.values, name)[0]
      );
      setVal(!_.isNil(value) ? value : _.at(formik.values, name)[0]);
    }
  }, [_.at(formik.values, name)[0], value]);
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input value={val} name={name} onChange={onChangeFunction} {...rest} />
    </div>
  );
};

export default FormikInput;
