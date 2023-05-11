import { useState, useEffect } from 'react';
import { fetchIssues } from '../api/fetchIssues';
import css from './searchbar.module.css';
import Button from 'react-bootstrap/Button';
import { IssuesToDo } from '../issues/IssuesToDo/IssuesToDo';

export const SearchBar = () => {
  const [searchName, setSearchName] = useState(
    'https://github.com/facebook/react'
  );
  const [allIssues, setAllIssues] = useState();
  const [isLoading, setLoading] = useState(false);

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
  );
};
