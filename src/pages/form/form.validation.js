import Validate from 'mw.validation';

const validate = (value, rules) => {
  const validationResult = Validate.validation.firstError(Validate.validation.validateView(value, rules));

  const errorMessage = validationResult != null ? validationResult.message : null;
  return errorMessage;
};

const validateGithubAccount = (value, allEmpty) => {
  const ruleMaxLength = {
    maxLength: {
      maxLength: 30,
      message: 'Veuillez saisir un compte Github valide',
    },
  };
  const rulePattern = {
    pattern: {
      regex: /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/,
      message: 'Veuillez saisir un nom de compte valide',
    },
  };
  const rulesRequired = { required: { message: 'Au moins un champs est obligatoire' }, onlyIf: !allEmpty };

  const rules = [rulesRequired, ruleMaxLength, rulePattern];
  return validate(value, rules);
};

const validateUserName = (value, allEmpty) => {
  const ruleMaxLength = {
    maxLength: { maxLength: 30, message: 'Veuillez saisir un nom valide' },
  };
  const firstnamevalidation = {
    firstname: {
      message: 'Veuillez saisir un nom valide',
    },
  };
  const rulesRequired = { required: { message: 'Au moins un champs est obligatoire' }, onlyIf: !allEmpty };

  const rules = [rulesRequired, ruleMaxLength, firstnamevalidation];
  return validate(value, rules);
};

export default {
  githubAccount: validateGithubAccount,
  userName: validateUserName,
};
