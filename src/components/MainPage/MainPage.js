import { useState, useEffect } from 'react';

import css from './mainPage.module.css';
import Button from 'react-bootstrap/Button';
import { fetchIssues } from '../../redux/issuesOperation';

import { getUserRepo, getAllIssues } from '../../redux/selectors';
import { SearchRepo, setData } from '../../redux/issuesReducer';
import { ListIssues } from '../ListIssues/ListIssues';

import { useDispatch, useSelector } from 'react-redux';

export const MainPage = () => {
  // const [inputValue, setInputValue] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [urlInput, setUrlInput] = useState('');

  const store = useSelector(store => store.issues);

  const userURL = useSelector(getUserRepo);
  const allIssues = useSelector(getAllIssues);

  useEffect(() => {
    localStorage.setItem(`${userURL[0]} ${userURL[1]} `, JSON.stringify(store));
  }, [store, userURL]);

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
    setUrlInput(event.currentTarget.value);
  };

  const loadUrl = () => {
    if (urlInput) {
      const regex = /https:\/\/github.com\/(.+)\/(.+)/;
      const match = urlInput.match(regex);
      try {
        const owner = match ? match[1] : null;
        const repo = match ? match[2] : null;
        const combintMatch = [owner, repo];

        const localStorageData = localStorage.getItem(`${owner} ${repo} `);

        dispatch(SearchRepo(combintMatch));

        setUrlInput(''); // Скидання значення інпуту

        if (localStorageData !== null) {
          const data = JSON.parse(localStorageData);

          dispatch(setData(data));
          setLoading(true);
          return;
        }
        const page = 1;
        dispatch(fetchIssues({ owner, repo, page }));

        setLoading(true);

        return;
      } catch (error) {
        console.log(error);
      }
    }
    alert('Incorrect URL');
  };

  return (
    <>
      <div className={css.searchContainer}>
        <input
          className={css.searchBar}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Paste url address repositories"
          name="repo"
          value={urlInput}
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
