import { useState, useEffect } from 'react';

import css from './mainPage.module.css';
import Button from 'react-bootstrap/Button';
import { fetchIssues } from '../../redux/issuesOperation';

import { getUserRepo, getAllIssues } from '../../redux/selectors';
import { SearchRepo } from '../../redux/issuesReducer';
import { ListIssues } from '../ListIssues/ListIssues';

import { useDispatch, useSelector } from 'react-redux';

export const MainPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setLoading] = useState(false);

  const userURL = useSelector(getUserRepo);
  const allIssues = useSelector(getAllIssues);

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
      {userURL[0] && userURL[1] && (
        <div className={css.linksContainer}>
          {' '}
          <a className={css.link} href={`https://github.com/${userURL[0]}`}>
            {userURL[0]} {'>'}
          </a>
          <a
            className={css.link}
            href={`https://github.com/${userURL[0]}/${userURL[1]}`}
          >
            {' '}
            {userURL[1]}
          </a>
        </div>
      )}
      {allIssues.length >= 1 && <ListIssues />}
    </>
  );
};
