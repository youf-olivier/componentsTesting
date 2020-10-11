import React from 'react';
import PropTypes, { shape } from 'prop-types';
import './form.scss';
import Userlist, { UserListType } from './userlist';

export const inputFormType = PropTypes.shape({
  message: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
});

const propTypes = {
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  hasSubmitOnce: PropTypes.bool.isRequired,
  users: UserListType.isRequired,
  inputs: shape({
    githubAccount: inputFormType,
    userName: inputFormType,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const Form = ({ onChange, inputs, onClick, hasSubmitOnce, users, isLoading }) => (
  <>
    <form className="form" role="search">
      <div className="form__line">
        <label className="form__label" htmlFor={inputs.githubAccount.id}>
          {inputs.githubAccount.label}
        </label>
        <div className="form__input-container">
          <input
            onChange={onChange}
            value={inputs.githubAccount.value}
            name={inputs.githubAccount.id}
            id={inputs.githubAccount.id}
            aria-errormessage="githubAccountAlert"
            type="text"
          />
          {hasSubmitOnce && (
            <span className="form__error-message" role="alert" id="githubAccountAlert" aria-label="githubAccountAlert">
              {inputs.githubAccount.message}
            </span>
          )}
        </div>
      </div>
      <div className="form__line form__separator">
        <span>Ou</span>
      </div>
      <div className="form__line">
        <label className="form__label" htmlFor={inputs.userName.id}>
          {inputs.userName.label}
        </label>
        <div className="form__input-container">
          <input
            aria-errormessage="errorUsername"
            onChange={onChange}
            value={inputs.userName.value}
            name={inputs.userName.id}
            id={inputs.userName.id}
            type="text"
          />
          {hasSubmitOnce && (
            <span id="errorUsername" className="form__error-message" role="alert" aria-label="errorUsername">
              {inputs.userName.message}
            </span>
          )}
        </div>
      </div>

      <div className="form__line form__line--alone">
        <button className="btn btn--search" onClick={onClick} type="button">
          Rechercher
        </button>
      </div>
    </form>
    {isLoading ? (
      <div role="alert" aria-busy="true" aria-label="loader">
        Loading...
      </div>
    ) : (
      <Userlist users={users} />
    )}
  </>
);

Form.propTypes = propTypes;

export default Form;
