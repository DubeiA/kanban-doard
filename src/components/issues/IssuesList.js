// import { useState } from 'react';

export const IssuesList = ({ data }) => {
  // console.log(data.filter(d => d.assignee));

  return (
    <div>
      <ul>
        {data &&
          data.map(issue => (
            <li key={issue.id}>
              <p>{issue.title}</p>
              <p>#{issue.number}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};
