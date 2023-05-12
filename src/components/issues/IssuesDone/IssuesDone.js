import { useEffect, useState } from 'react';
import CardIssues from '../CardIssues/CardIssues';
import css from './IssuesDone.module.css';
import { Draggable } from 'react-beautiful-dnd';

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
