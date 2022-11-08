import { create } from 'apisauce';

async function apiMethod(method, url, data, getAccessToken, cancelToken) {
  const api = create({
    baseURL: 'https://reqres.in',
    headers: { Accept: 'application/json' },
  });
  return new Promise((resolve, reject) => {
    api[method.toLowerCase()](url, data)
      .then(async (res) => {
        // console.log('[RESPONSEAPI 17 e\]', e\);
        if (!res.ok) {
          if (res.problem === 'CANCEL_ERROR') {
            console.log('[RESPONSEAPI CANCEL_ERROR]');
            // eslint-disable-next-line
            return reject('CANCEL_ERROR');
          }
          if (
            res.data &&
            res.data.data &&
            res.data.code &&
            res.data.code === 'AUTH_TOKEN_EXPIRED'
          ) {
            // Auth token expired. Attempt to refresh auth token
            return apiMethod(method, url, data, true)
              .then((response) => resolve(response))
              .catch((err) => reject(err));
          }
          if (res.data && res.data.data && res.data.code && res.data.code === 'INVALID_TOKEN') {
            // getStore().dispatch(logoutUser());
            // logout user here
            return reject(res.data);
          }
          return reject(res.data);
        }
        return resolve(res.data);
      })
      .catch(reject);
  });
}

export default {
  get: (url) => apiMethod('get', url, null, false),
  post: (url, data, cancelToken) => apiMethod('post', url, data, false, cancelToken),
  put: (url, data) => apiMethod('put', url, data, false),
  delete: (url) => apiMethod('delete', url, null, false),
};
