import { useEffect, useState } from 'react';
import CardIssues from '../CardIssues/CardIssues';
import css from './IssuesProgres.module.css';

export const IssuesProgres = ({ data }) => {
  const [progress, setProgress] = useState([]);
  //   const filterIssues = data.filter(d => d.assignee);
  console.log(progress.length);

  useEffect(() => {
    if (!data) {
      return;
    }
    const filterIssues = data.filter(d => d.assignee);
    setProgress(filterIssues);
  }, [data]);

  return (
    <div className={css.containerToDo}>
      <h2 className={css.title}>In Progress</h2>
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
