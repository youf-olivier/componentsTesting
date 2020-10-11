import { useCallback, useState, useEffect, useContext } from 'react';
import { MessageContext } from 'shared/components/messages';
import { computeErrors } from './form.pure';

const getInitialState = (validatorInternal, isAllEmpty) => ({
  githubAccount: {
    id: 'githubAccount',
    label: 'Compte Github',
    value: '',
    message: validatorInternal.githubAccount('', isAllEmpty),
  },
  userName: {
    id: 'userName',
    label: "Nom d'utilisateur",
    value: '',
    message: validatorInternal.userName('', isAllEmpty),
  },
});

export const onSubmitCB = ({
  inputs: { githubAccount, userName },
  errors,
  displayMessage,
  setHasSubmitOnce,
  setQuery,
}) => e => {
  e.preventDefault();
  setHasSubmitOnce(true);
  if (errors.length > 0) {
    displayMessage('Le formulaire contient des erreurs');
  } else {
    displayMessage('');
    setQuery({ githubAccount: githubAccount.value, userName: userName.value });
  }
};

export const useInputs = validator => {
  const [inputs, setInputs] = useState(() => getInitialState(validator, true));
  const [errors, setErrors] = useState([]);
  useEffect(() => {
    setErrors(computeErrors(inputs));
  }, [inputs]);
  const onChange = useCallback(
    ({ name, value }) => {
      setInputs(prevInputs => {
        const inputsChanged = {
          ...getInitialState(validator, false),
          [name]: {
            ...prevInputs[name],
            value,
          },
        };
        const allEmpty = Object.keys(inputsChanged).reduce(
          (acc, curr) => acc && inputsChanged[curr].value === '',
          true,
        );

        const inputsWithMessages = Object.keys(inputsChanged).reduce(
          (result, key) => ({
            ...result,
            [key]: {
              ...inputsChanged[key],
              message: validator[key](value, allEmpty),
            },
          }),
          {},
        );

        return inputsWithMessages;
      });
    },
    [validator],
  );

  return { inputs, onChange, errors };
};

export const useFetchUser = (fetchUser, fetchUserByName) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState({ githubAccount: '', userName: '' });
  const saveUsers = useCallback(usersList => {
    setUsers(usersList);
    setIsLoading(false);
  }, []);
  useEffect(() => {
    setIsLoading(true);
    if (query.userName) {
      fetchUserByName(query.userName).then(response => saveUsers(response.items));
    } else {
      fetchUser(query.githubAccount).then(response => saveUsers(response.items));
    }
  }, [query, fetchUser, fetchUserByName, saveUsers]);
  return { setQuery, users, isLoading };
};

export const useForm = ({ validator, fetchUser, fetchUserByName }) => {
  const [hasSubmitOnce, setHasSubmitOnce] = useState(false);
  const { displayMessage } = useContext(MessageContext);
  const { inputs, onChange: onChangeCb, errors } = useInputs(validator);
  const { setQuery, users, isLoading } = useFetchUser(fetchUser, fetchUserByName);
  const onSubmit = useCallback(
    e => {
      onSubmitCB({ inputs, errors, displayMessage, setHasSubmitOnce, setQuery })(e);
    },
    [inputs, errors, displayMessage, setQuery],
  );

  const onChange = ({ target }) => {
    onChangeCb(target);
  };

  return { onChange, inputs, onSubmit, hasSubmitOnce, users, isLoading };
};
