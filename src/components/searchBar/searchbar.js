import { useState, useEffect } from 'react';
import { Auth } from '../auth/auth';
import css from './searchbar.module.css';
import Button from 'react-bootstrap/Button';
import { fetchIssues } from '../../api/fetchIssues';
import { ListIssues } from '../ListIssues/ListIssues';

export const SearchBar = () => {
  const [searchName, setSearchName] = useState('');
  const [allIssues, setAllIssues] = useState();
  const [isLoading, setLoading] = useState(false);
  const [rerender, setRerender] = useState(false);

  const [userLogin, setUserLogin] = useState('');
  const [userRepo, setUserRepo] = useState('');

  const regex = /https:\/\/github.com\/(.+)\/(.+)/;
  const match = searchName.match(regex);

  function simulateNetworkRequest() {
    return new Promise(resolve => setTimeout(resolve, 750));
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
            <ListIssues
              allIssues={allIssues}
              setAllIssues={setAllIssues}
              userLogin={userLogin}
              userRepo={userRepo}
            />
          )}
        </>
      ) : (
        <Auth />
      )}
    </>
  );
};
