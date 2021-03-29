import React from "react";
import AppButton from "../AppButton";
import { useFormikContext } from "formik";

export default function SubmitBtn({ title, width, color, style }) {
  const { handleSubmit } = useFormikContext();
  return (
    <AppButton
      title={title}
      onPress={handleSubmit}
      width={width}
      color={color}
      style={style}
    />
  );
}
