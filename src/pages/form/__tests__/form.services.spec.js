import { fetchUserWithFetch, searchUserByNameWithFetch } from '../form.services';

describe('Form services tests suite', () => {
  const axiosMock = jest.fn(() => ({
    status: 200,
    data: 'Response',
  }));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetchUser call fetch with correct data', async () => {
    const user = 'Jordan';
    const result = await fetchUserWithFetch(axiosMock)(user);
    expect(axiosMock).toBeCalledWith('https://api.github.com/search/users?q=user:Jordan', {
      method: 'GET',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github.v3+json',
      },
    });
    expect(result).toEqual('Response');
  });

  it('should fetchUser call fetch with correct data when name is empty', async () => {
    const user = '';
    const result = await fetchUserWithFetch(axiosMock)(user);
    expect(axiosMock).toBeCalledWith(
      'https://api.github.com/search/users?q=followers:%3E40000&order=desc&sort=followers',
      {
        method: 'GET',
        crossDomain: true,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/vnd.github.v3+json',
        },
      },
    );
    expect(result).toEqual('Response');
  });

  it('should return error message whan call fails', async () => {
    const axiosMockFail = jest.fn(() => ({
      status: 500,
      statusText: 'Woops error',
      json: () => 'Response',
    }));
    const user = 'Jordan';
    try {
      await fetchUserWithFetch(axiosMockFail)(user);
    } catch (e) {
      expect(e).toEqual('Woops error');
    }
  });

  it('should searchUserByNameWF call fetch with correct username', async () => {
    const userName = 'Jordan';
    const result = await searchUserByNameWithFetch(axiosMock)(userName);
    expect(axiosMock).toBeCalledWith('https://api.github.com/search/users?q=Jordanin%3Afullname', {
      method: 'GET',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github.v3+json',
      },
    });
    expect(result).toEqual('Response');
  });

  it('should return error message whan call fails', async () => {
    const axiosMockFail = jest.fn(() => ({
      status: 500,
      statusText: 'Woops error',
      json: () => 'Response',
    }));
    const user = 'Jordan';
    try {
      await searchUserByNameWithFetch(axiosMockFail)(user);
    } catch (e) {
      expect(e).toEqual('Woops error');
    }
  });
});
