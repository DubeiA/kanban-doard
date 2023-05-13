import { useState, useEffect } from 'react';
import { Auth } from '../auth/auth';
import css from './searchbar.module.css';
import Button from 'react-bootstrap/Button';
import { fetchIssues } from '../../redux/issuesOperation';
import { ListIssues } from '../ListIssues/ListIssues';
import { getAllIssues, getUserRepo } from '../../redux/selectors';
import { SearchRepo } from '../../redux/issuesReducer';

import { useDispatch, useSelector } from 'react-redux';

export const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [rerender, setRerender] = useState(false);

  const allIssues = useSelector(getAllIssues);
  const userURL = useSelector(getUserRepo);

  const dispatch = useDispatch();

  function simulateNetworkRequest() {
    return new Promise(resolve => setTimeout(resolve, 500));
  }

  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const handleNameChange = event => {
    const regex = /https:\/\/github.com\/(.+)\/(.+)/;
    const match = event.currentTarget.value.match(regex);
    try {
      const owner = match ? match[1] : null;
      const repo = match ? match[2] : null;
      const combintMatch = [owner, repo];

      dispatch(SearchRepo(combintMatch));
      setInputValue(event.currentTarget.value);
    } catch (error) {
      console.log(error);
    }
  };

  const loadUrl = () => {
    if (userURL) {
      const owner = userURL[0];
      const repo = userURL[1];
      const page = 1;
      dispatch(fetchIssues({ owner, repo, page }));

      setLoading(true);

      setInputValue('');

      return;
    }
    alert('incorect url');
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
              name="repo"
              value={inputValue}
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
          {allIssues.length >= 1 && <ListIssues />}
        </>
      ) : (
        <Auth />
      )}
    </>
  );
};
