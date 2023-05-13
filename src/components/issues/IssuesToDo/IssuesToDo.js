import { useRef } from 'react';

import CardIssues from '../CardIssues/CardIssues';
import css from './IssuesToDo.module.css';
import { fetchIssues } from '../../../redux/issuesOperation';
import { Draggable } from 'react-beautiful-dnd';

import { useSelector, useDispatch } from 'react-redux';
import { getAllIssues, getUserRepo } from '../../../redux/selectors';
import { increment } from '../../../redux/issuesReducer';

export const IssuesToDo = () => {
  const allIssues = useSelector(getAllIssues);
  const userURL = useSelector(getUserRepo);
  const next = useSelector(state => state.issues.page);

  const dispatch = useDispatch();
  const owner = userURL[0];
  const repo = userURL[1];

  const listRef = useRef(null);

  const fetchNextPage = () => {
    dispatch(increment());
    dispatch(fetchIssues({ owner, repo, next }));
  };

  return (
    <div className={css.containerToDo}>
      <h2 className={css.title}>To Do</h2>

      <ul className={css.list} ref={listRef}>
        {allIssues &&
          allIssues.map((issue, index) => (
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
