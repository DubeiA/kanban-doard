import { useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import CardIssues from '../CardIssues/CardIssues';
import css from './IssuesProgres.module.css';

export const IssuesProgres = ({ data }) => {
  const [progress, setProgress] = useState([]);
  //   const filterIssues = data.filter(d => d.assignee);
  // console.log(progress.length);

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
          progress.map((issue, index) => (
            <Draggable
              key={String(issue.id)}
              draggableId={String(issue.id)}
              index={index}
            >
              {provided => (
                <li
                  className={css.item}
                  key={String(issue.id)}
                  index={index}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <CardIssues data={issue} />
                </li>
              )}
            </Draggable>
          ))}
      </ul>
    </div>
  );
};
