import { useState } from 'react';

import CardIssues from '../CardIssues/CardIssues';
import css from './IssuesToDo.module.css';
import { fetchIssues } from '../../../api/fetchIssues';

export const IssuesToDo = ({ data, load, searchLogin, searchRepo }) => {
  // console.log(data.filter(d => d.assignee));
  const [page, setPage] = useState(2);

  const fetchNextPage = async () => {
    const usersNext = await fetchIssues(searchLogin, searchRepo, page);

    await load(usersNext);
    await setPage(prevPage => prevPage + 1);
    console.log(usersNext);
    return usersNext;
  };

  return (
    <div className={css.containerToDo}>
      <h2 className={css.title}>To Do</h2>
      <ul className={css.list}>
        {data &&
          data.map(issue => (
            <li className={css.item} key={issue.id}>
              <CardIssues data={issue} />
            </li>
          ))}
      </ul>
      <button className={css.btnLoad} onClick={fetchNextPage}>
        load next
      </button>
    </div>
  );
};
