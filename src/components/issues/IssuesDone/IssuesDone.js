import { useEffect, useState } from 'react';
import CardIssues from '../CardIssues/CardIssues';
import css from './IssuesDone.module.css';

export const IssuesDone = ({ data }) => {
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    if (!data) {
      return;
    }
    const filterIssues = data.filter(d => d.closed_at);
    setProgress(filterIssues);
  }, [data]);

  return (
    <div className={css.containerToDo}>
      <h2 className={css.title}>Done</h2>
      <ul className={css.list}>
        {data &&
          progress.map(issue => (
            <li className={css.item} key={issue.id}>
              <CardIssues data={issue} />
            </li>
          ))}
      </ul>
    </div>
  );
};
