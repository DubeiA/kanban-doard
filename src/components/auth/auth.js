import { useState, useEffect } from 'react';

export const Auth = () => {
  const [rerender, setRerender] = useState(false);

  const CLIENT_ID = '5b578c8c0d177a310fe7';
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParams = urlParams.get('code');

    if (codeParams && localStorage.getItem('accessToken') === null) {
      async function getAccessToken() {
        await fetch('http://localhost:4000/getAccessToken?code=' + codeParams, {
          method: 'GET',
        })
          .then(response => {
            return response.json();
          })
          .then(data => {
            if (data.access_token) {
              localStorage.setItem('accessToken', data.access_token);
              setRerender(!rerender);
            }
          });
      }
      getAccessToken();
    }
  }, [rerender]);

  function loginWithGitHub() {
    window.location.assign(
      'http://github.com/login/oauth/authorize?client_id=' + CLIENT_ID
    );
  }

  return (
    <div>
      <div>
        <button onClick={loginWithGitHub}>LogIn</button>
        <h1>You have to Log In</h1>
      </div>
    </div>
  );
};
