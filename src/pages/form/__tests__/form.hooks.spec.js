import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';

import { MessageContext } from 'shared/components/messages';
import { useInputs, useFetchUser, useForm } from '../form.hooks';

describe('Form Hooks tests suite', () => {
  const fetchUser = jest.fn(() => Promise.resolve({ items: ['user 1', 'user 2'] }));
  const fetchUserByName = jest.fn(() => Promise.resolve({ items: ['user a', 'user b'] }));
  const validatorMock = {
    githubAccount: jest.fn(() => ''),
    userName: jest.fn(() => ''),
  };
  const validatorMockWithError = { githubAccount: () => 'Error githubAccount', userName: () => '' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useInputs tests suite', () => {
    it('should userInputs return correct initial state', () => {
      const { result } = renderHook(() => useInputs(validatorMock));
      expect(result.current.inputs).toEqual({
        githubAccount: { id: 'githubAccount', label: 'Compte Github', message: '', value: '' },
        userName: { id: 'userName', label: "Nom d'utilisateur", message: '', value: '' },
      });
      expect(result.current.errors).toEqual([]);
    });

    it('should onChange set the current values and validate it', () => {
      const { result } = renderHook(() => useInputs(validatorMock));

      act(() => {
        result.current.onChange({ name: 'githubAccount', value: 'oyouf' });
      });

      expect(result.current.inputs).toEqual({
        githubAccount: { id: 'githubAccount', label: 'Compte Github', message: '', value: 'oyouf' },
        userName: { id: 'userName', label: "Nom d'utilisateur", message: '', value: '' },
      });
      expect(result.current.errors).toEqual([]);
      expect(validatorMock.githubAccount).toHaveBeenCalledWith('oyouf', false);
    });

    it('should onChange set the current values and reset the other one it', () => {
      const { result } = renderHook(() => useInputs(validatorMock));

      act(() => {
        result.current.onChange({ name: 'githubAccount', value: 'oyouf' });
      });

      expect(result.current.inputs).toEqual({
        githubAccount: { id: 'githubAccount', label: 'Compte Github', message: '', value: 'oyouf' },
        userName: { id: 'userName', label: "Nom d'utilisateur", message: '', value: '' },
      });
      expect(result.current.errors).toEqual([]);

      act(() => {
        result.current.onChange({ name: 'userName', value: 'YOUF' });
      });

      expect(result.current.inputs).toEqual({
        githubAccount: { id: 'githubAccount', label: 'Compte Github', message: '', value: '' },
        userName: { id: 'userName', label: "Nom d'utilisateur", message: '', value: 'YOUF' },
      });
      expect(result.current.errors).toEqual([]);
    });

    it('should fill errors when a field is incorrect', () => {
      const { result } = renderHook(() => useInputs(validatorMockWithError));

      act(() => {
        result.current.onChange({ name: 'githubAccount', value: 'oyouf' });
      });

      expect(result.current.inputs).toEqual({
        githubAccount: { id: 'githubAccount', label: 'Compte Github', message: 'Error githubAccount', value: 'oyouf' },
        userName: { id: 'userName', label: "Nom d'utilisateur", message: '', value: '' },
      });
      expect(result.current.errors).toEqual([
        {
          id: 'githubAccount',
          label: 'Compte Github',
        },
      ]);
    });
  });

  describe('useFetchUser tests suite', () => {
    it('should fetch all user when there is no query ', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useFetchUser(fetchUser, fetchUserByName));

      // State before useEffect
      expect(result.current.users).toEqual([]);

      // Awaiting the first useEffect
      await waitForNextUpdate();

      // State after the useEffect
      expect(result.current.users).toEqual(['user 1', 'user 2']);
      expect(fetchUser).toBeCalledWith('');
    });

    it('should fetch user by account when account is set', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useFetchUser(fetchUser, fetchUserByName));

      // State before useEffect
      expect(result.current.users).toEqual([]);

      act(() => {
        result.current.setQuery({ githubAccount: 'aearon', userName: '' });
      });

      await waitForNextUpdate();
      // State after the useEffect
      expect(result.current.users).toEqual(['user 1', 'user 2']);
      expect(fetchUser).toBeCalledWith('aearon');
    });

    it('should fetch user by unserName when user name is set', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useFetchUser(fetchUser, fetchUserByName));

      // State before useEffect
      expect(result.current.users).toEqual([]);

      act(() => {
        result.current.setQuery({ githubAccount: '', userName: 'abramov' });
      });

      await waitForNextUpdate();
      // State after the useEffect
      expect(result.current.users).toEqual(['user a', 'user b']);
      expect(fetchUserByName).toBeCalledWith('abramov');
    });
  });

  describe('useForm tests suite', () => {
    const displayMessage = jest.fn();
    const preventDefault = jest.fn();
    const messageValue = {
      displayMessage,
    };
    const wrapper = ({ children }) => (
      <MessageContext.Provider value={messageValue}>{children}</MessageContext.Provider>
    );

    it('should initialize state with correct values', async () => {
      const { result, waitForNextUpdate } = renderHook(
        () => useForm({ validator: validatorMock, fetchUser, fetchUserByName }),
        {
          wrapper,
        },
      );
      const { inputs, users } = result.current;
      expect(inputs).toEqual({
        githubAccount: { id: 'githubAccount', label: 'Compte Github', message: '', value: '' },
        userName: { id: 'userName', label: "Nom d'utilisateur", message: '', value: '' },
      });
      expect(users).toEqual([]);

      await waitForNextUpdate();

      expect(result.current.users).toEqual(['user 1', 'user 2']);
    });

    it('should set inputs when call onChange', async () => {
      const { result, waitForNextUpdate } = renderHook(
        () => useForm({ validator: validatorMock, fetchUser, fetchUserByName }),
        {
          wrapper,
        },
      );

      act(() => {
        result.current.onChange({
          target: {
            name: 'userName',
            value: 'YOUF',
          },
        });
      });

      await waitForNextUpdate();
      expect(result.current.inputs).toEqual({
        githubAccount: { id: 'githubAccount', label: 'Compte Github', message: '', value: '' },
        userName: { id: 'userName', label: "Nom d'utilisateur", message: '', value: 'YOUF' },
      });

      expect(result.current.users).toEqual(['user 1', 'user 2']);
    });

    it('should set querry chen call submit', async () => {
      const { result, waitForNextUpdate } = renderHook(
        () => useForm({ validator: validatorMock, fetchUser, fetchUserByName }),
        {
          wrapper,
        },
      );

      act(() => {
        result.current.onChange({
          target: {
            name: 'userName',
            value: 'YOUF',
          },
        });
      });

      act(() => {
        result.current.onSubmit({ preventDefault });
      });

      await waitForNextUpdate();
      expect(result.current.inputs).toEqual({
        githubAccount: { id: 'githubAccount', label: 'Compte Github', message: '', value: '' },
        userName: { id: 'userName', label: "Nom d'utilisateur", message: '', value: 'YOUF' },
      });

      expect(result.current.users).toEqual(['user a', 'user b']);
      expect(preventDefault).toHaveBeenCalled();
      expect(displayMessage).toHaveBeenCalledWith('');
    });

    it('should set error when input has on error when call submit', async () => {
      const { result, waitForNextUpdate } = renderHook(
        () => useForm({ validator: validatorMockWithError, fetchUser, fetchUserByName }),
        {
          wrapper,
        },
      );

      act(() => {
        result.current.onChange({
          target: {
            name: 'userName',
            value: 'YOUF',
          },
        });
      });

      act(() => {
        result.current.onSubmit({ preventDefault });
      });

      await waitForNextUpdate();
      expect(result.current.inputs).toEqual({
        githubAccount: { id: 'githubAccount', label: 'Compte Github', message: 'Error githubAccount', value: '' },
        userName: { id: 'userName', label: "Nom d'utilisateur", message: '', value: 'YOUF' },
      });

      expect(displayMessage).toHaveBeenCalledWith('Le formulaire contient des erreurs');
    });
  });
});
