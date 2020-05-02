import React from "react";
import FormComponent from "./form";
import { useForm } from "./form.hooks";
import validator from "./form.validation";
import { fetchUser } from "./form.services";

const FormContainer = () => {
  const { onChange, inputs, onSubmit, hasSubmitOnce, users } = useForm({
    validator,
    fetchUser
  });

  return (
    <FormComponent
      onChange={onChange}
      inputs={inputs}
      onClick={onSubmit}
      hasSubmitOnce={hasSubmitOnce}
      users={users}
    />
  );
};

export default FormContainer;
