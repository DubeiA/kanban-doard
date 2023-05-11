// import { useState } from 'react';
import CardIssues from '../CardIssues/CardIssues';
import css from './IssuesToDo.module.css';

export const IssuesToDo = ({ data }) => {
  // console.log(data.filter(d => d.assignee));

  return (
    <div className={css.containerToDo}>
      <ul className={css.list}>
        {data &&
          data.map(issue => (
            <li className={css.item} key={issue.id}>
              <CardIssues data={issue} />
            </li>
          ))}
      </ul>
    </div>
  );
};
