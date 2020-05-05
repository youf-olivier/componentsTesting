import Validator from '../form.validation';

describe('Validators tests suite', () => {
  it('should validate github account', () => {
    expect(Validator.githubAccount('oyouf', false)).toEqual(null);
    expect(Validator.githubAccount('jean-jacques', false)).toEqual(null);
    expect(Validator.githubAccount('jean-big-name', false)).toEqual(null);
    expect(Validator.githubAccount('oyouf-du-59', false)).toEqual(null);
    expect(Validator.githubAccount('1-2-3-4', false)).toEqual(null);
    expect(Validator.githubAccount('', false)).toEqual(null);
  });

  it('should not validate github account', () => {
    expect(Validator.githubAccount('@youf', false)).toEqual('Veuillez saisir un nom de compte valide');
    expect(Validator.githubAccount('-jean-jacques', false)).toEqual('Veuillez saisir un nom de compte valide');
    expect(Validator.githubAccount('jean-big-name-', false)).toEqual('Veuillez saisir un nom de compte valide');
    expect(Validator.githubAccount('oyouf--du-59', false)).toEqual('Veuillez saisir un nom de compte valide');
    expect(Validator.githubAccount('', true)).toEqual('Au moins un champs est obligatoire');
    expect(Validator.githubAccount('azerazera-zerazer-azerazera-zerazerazer-aze-razeraze-r', false)).toEqual(
      'Veuillez saisir un compte Github valide',
    );
  });

  it('should not validate userName', () => {
    expect(Validator.userName('', true)).toEqual('Au moins un champs est obligatoire');
    expect(Validator.userName('azerazera-zerazer-azerazera-zerazerazer-aze-razeraze-r', false)).toEqual(
      'Veuillez saisir un nom valide',
    );
    expect(Validator.userName('3ze@-($ré', false)).toEqual('Veuillez saisir un nom valide');
  });

  it('should validate github account', () => {
    expect(Validator.userName('oyouf', false)).toEqual(null);
    expect(Validator.userName('jean-jacques', false)).toEqual(null);
    expect(Validator.userName('jean-big-name', false)).toEqual(null);
    expect(Validator.userName('', false)).toEqual(null);
  });
});
