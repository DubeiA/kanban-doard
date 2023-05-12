import { useState, useRef } from 'react';

import CardIssues from '../CardIssues/CardIssues';
import css from './IssuesToDo.module.css';
import { fetchIssues } from '../../../api/fetchIssues';
import { Draggable } from 'react-beautiful-dnd';

export const IssuesToDo = ({ data, load, searchLogin, searchRepo }) => {
  // console.log(data.filter(d => d.assignee));
  const [page, setPage] = useState(2);
  const listRef = useRef(null);

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

      <ul className={css.list} ref={listRef}>
        {data &&
          data.map((issue, index) => (
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

      <button className={css.btnLoad} onClick={fetchNextPage}>
        load next
      </button>
    </div>
  );
};
