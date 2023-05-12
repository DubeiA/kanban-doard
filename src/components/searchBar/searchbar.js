import { useState, useEffect } from 'react';
import { fetchIssues } from '../../api/fetchIssues';
import css from './searchbar.module.css';
import Button from 'react-bootstrap/Button';
import { IssuesToDo } from '../issues/IssuesToDo/IssuesToDo';
import { IssuesProgres } from '../issues/IssuesProgress/IssuesProgress';
import { IssuesDone } from '../issues/IssuesDone/IssuesDone';

import { Auth } from '../auth/auth';

export const SearchBar = () => {
  const [searchName, setSearchName] = useState('');
  const [allIssues, setAllIssues] = useState();
  const [isLoading, setLoading] = useState(false);
  const [rerender, setRerender] = useState(false);

  const [userLogin, setUserLogin] = useState('');
  const [userRepo, setUserRepo] = useState('');

  const regex = /https:\/\/github.com\/(.+)\/(.+)/;
  const match = searchName.match(regex);

  // useEffect(() => {
  //   const queryString = window.location.search;
  //   const urlParams = new URLSearchParams(queryString);
  //   const codeParams = urlParams.get('code');

  //   if (codeParams && localStorage.getItem('accessToken') === null) {
  //     async function getAccessToken() {
  //       await fetch('http://localhost:4000/getAccessToken?code=' + codeParams, {
  //         method: 'GET',
  //       })
  //         .then(response => {
  //           return response.json();
  //         })
  //         .then(data => {
  //           if (data.access_token) {
  //             localStorage.setItem('accessToken', data.access_token);
  //             setRerender(!rerender);
  //           }
  //         });
  //     }
  //     getAccessToken();
  //   }
  // }, [rerender]);

  // function loginWithGitHub() {
  //   window.location.assign(
  //     'http://github.com/login/oauth/authorize?client_id=' + CLIENT_ID
  //   );
  // }

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

  const handleNameChange = event => {
    setSearchName(event.currentTarget.value);
  };

  const loadUrl = async () => {
    if (match) {
      const data = await fetchIssues(match[1], match[2]);

      await setAllIssues(data);
      await setSearchName('');
      await setLoading(true);
      await setUserLogin(match[1]);
      await setUserRepo(match[2]);
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
          <p>https://github.com/facebook/react</p>

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
          {allIssues && (
            <div className={css.containerIssues}>
              <IssuesToDo
                data={allIssues}
                load={setAllIssues}
                searchLogin={userLogin}
                searchRepo={userRepo}
              />
              <IssuesProgres data={allIssues} />
              <IssuesDone data={allIssues} />
            </div>
          )}
        </>
      ) : (
        <Auth />
      )}
    </>
  );
};
