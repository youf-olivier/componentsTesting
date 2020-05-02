import { useCallback, useState, useEffect, useContext } from "react";
import { MessageContext } from "commons/messages";

const getInitialState = validatorInternal => ({
  githubAccount: {
    id: "githubAccount",
    label: "Compte Github",
    value: "",
    message: validatorInternal.githubAccount("")
  }
});

export const computeErrors = state =>
  Object.keys(state).reduce((acc, key) => {
    const input = state[key];
    if (input.message && input.message !== "") {
      return [...acc, { label: input.label, id: input.id }];
    }
    return acc;
  }, []);

export const onChangeCB = (validatorInternal, setInputs) => e => {
  const { name, value } = e.target;
  const message = validatorInternal[name](value);
  setInputs(prevInput => ({
    ...prevInput,
    [name]: {
      ...prevInput[name],
      value,
      message
    }
  }));
};

export const onSubmitCB = (
  accountValue,
  errors,
  displayMessage,
  setHasSubmitOnce,
  setQuery
) => e => {
  e.preventDefault();
  setHasSubmitOnce(true);
  if (errors.length > 0) {
    displayMessage("Le formulaire contient des erreurs");
  } else {
    displayMessage("");
    setQuery(accountValue);
  }
};

export const useForm = ({ validator, fetchUser }) => {
  const [inputs, setInputs] = useState(() => getInitialState(validator));
  const [hasSubmitOnce, setHasSubmitOnce] = useState(false);
  const [errors, setErrors] = useState("");
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const { displayMessage } = useContext(MessageContext);
  useEffect(() => {
    setErrors(computeErrors(inputs));
  }, [inputs]);

  useEffect(() => {
    fetchUser(query).then(users => setUsers(users.items));
  }, [query, fetchUser]);

  const onChange = useCallback(onChangeCB(validator, setInputs), [
    inputs,
    setInputs
  ]);
  const onSubmit = useCallback(
    onSubmitCB(
      inputs.githubAccount.value,
      errors,
      displayMessage,
      setHasSubmitOnce,
      setQuery
    ),
    [inputs.githubAccount.value, errors, displayMessage, setHasSubmitOnce]
  );

  return { onChange, inputs, onSubmit, hasSubmitOnce, users };
};
