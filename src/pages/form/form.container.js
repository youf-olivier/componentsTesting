import React from 'react';
import Form from './form';
import { useForm } from './form.hooks';
import validator from './form.validation';
import { fetchUser, fetchUserByName } from './form.services';

const FormContainer = () => {
  const { onChange, inputs, onSubmit, hasSubmitOnce, users, isLoading } = useForm({
    validator,
    fetchUser,
    fetchUserByName,
  });

  return (
    <Form
      onChange={onChange}
      inputs={inputs}
      onClick={onSubmit}
      hasSubmitOnce={hasSubmitOnce}
      users={users}
      isLoading={isLoading}
    />
  );
};

export default FormContainer;
