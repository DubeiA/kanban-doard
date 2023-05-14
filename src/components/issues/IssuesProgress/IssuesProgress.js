import { useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import CardIssues from '../CardIssues/CardIssues';
import css from './IssuesProgres.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getAllIssues, getProgressIssues } from '../../../redux/selectors';
import { ProgressIssues } from '../../../redux/issuesReducer';

export const IssuesProgres = () => {
  const allIssues = useSelector(getAllIssues);
  const progressIssues = useSelector(getProgressIssues);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!allIssues) {
      return;
    }
    const filterIssues = allIssues.filter(d => d.assignee);
    dispatch(ProgressIssues(filterIssues));
  }, [allIssues, dispatch]);

  return (
    <div className={css.containerToDo}>
      <h2 className={css.title}>In Progress</h2>
      <ul className={css.list}>
        {allIssues &&
          progressIssues.map((issue, index) => (
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
