import { useState, useEffect } from 'react';
import { fetchIssues } from '../api/fetchIssues';
import css from './searchbar.module.css';
import Button from 'react-bootstrap/Button';
import { IssuesToDo } from '../issues/IssuesToDo/IssuesToDo';

const CLIENT_ID = '5b578c8c0d177a310fe7';

export const SearchBar = () => {
  const [searchName, setSearchName] = useState(
    'https://github.com/facebook/react'
  );
  const [allIssues, setAllIssues] = useState();
  const [isLoading, setLoading] = useState(false);
  const [rerender, setRerender] = useState(false);
  // const [userData, setUserData] = useState({});
  // console.log('userData', userData);
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

  // async function getUserData() {
  //   await fetch('http://localhost:4000/getUserData', {
  //     method: 'GET',
  //     headers: {
  //       Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
  //     },
  //   })
  //     .then(response => {
  //       return response.json();
  //     })
  //     .then(data => {
  //       console.log('GET Search USER', data);
  //       setUserData(data);
  //     })
  //     .catch(error => console.log(error));
  // }

  // console.log('userData', userData);

  function loginWithGitHub() {
    window.location.assign(
      'http://github.com/login/oauth/authorize?client_id=' + CLIENT_ID
    );
  }

  const handleNameChange = event => {
    setSearchName(event.currentTarget.value);
  };

  function simulateNetworkRequest() {
    return new Promise(resolve => setTimeout(resolve, 1000));
  }

  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const regex = /https:\/\/github.com\/(.+)\/(.+)/;
  const match = searchName.match(regex);

  const loadUrl = async () => {
    if (match) {
      const data = await fetchIssues(match[1], match[2]);

      await setAllIssues(data);
      await setSearchName('');
      await setLoading(true);
      return;
    }
    alert('enter url');
  };

  return (
    <>
      {localStorage.getItem('accessToken') ? (
        <>
          <button
            onClick={() => {
              localStorage.removeItem('accessToken');
              setRerender(!rerender);
            }}
          >
            LogOut
          </button>

          <div className={css.searchContainer}>
            <input
              className={css.searchBar}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={searchName}
              onChange={handleNameChange}
            />
            <Button
              className={css.searchBtn}
              variant="primary"
              disabled={isLoading}
              onClick={loadUrl}
            >
              {isLoading ? 'Loading…' : 'Click to load'}
            </Button>
          </div>
          <IssuesToDo data={allIssues} />
        </>
      ) : (
        <div>
          <button onClick={loginWithGitHub}>LogIn</button>
          <h1>You have to Log In</h1>
        </div>
      )}
    </>
  );
};
