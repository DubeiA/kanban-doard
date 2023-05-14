import { IssuesToDo } from '../issues/IssuesToDo/IssuesToDo';
import { IssuesProgres } from '../issues/IssuesProgress/IssuesProgress';
import { IssuesDone } from '../issues/IssuesDone/IssuesDone';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { forwardRef } from 'react';

import css from './ListIssues.module.css';
import { useSelector } from 'react-redux';
import { getAllIssues } from '../../redux/selectors';
import { DragIssues } from '../../redux/issuesReducer';
import { useDispatch } from 'react-redux';

export const ListIssues = () => {
  const allIssues = useSelector(getAllIssues);
  const dispatch = useDispatch();
  // console.log(setAllIssues(allIssues));

  // const [dragDrop, setDragDrop] = useState(allIssues);
  // const issueID = allIssues.map(iId => iId.id);
  // const dragId = dragDrop.map(iId => iId.id);

  // useEffect(() => {
  //   const sortedArr1 = issueID.slice().sort();
  //   const sortedArr2 = dragId.slice().sort();

  //   if (!sortedArr1.every((value, index) => value === sortedArr2[index])) {
  //     return setDragDrop(allIssues);
  //   }

  //   setDragDrop(dragDrop);
  // }, [allIssues, dragDrop, dragId, issueID]);

  const DroppableIssuesToDo = forwardRef((props, ref) => (
    <IssuesToDo {...props} forwardedRef={ref} />
  ));

  const DroppableIssuesProgress = forwardRef((props, ref) => (
    <IssuesProgres {...props} forwardedRef={ref} />
  ));

  const DroppableIssuesDone = forwardRef((props, ref) => (
    <IssuesDone {...props} forwardedRef={ref} />
  ));
  const handleDragEnd = result => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const items = Array.from(allIssues);
    const [reorderItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderItem);

    dispatch(DragIssues(items));
    // setDragDrop(items);
  };
  return (
    <div className={css.containerIssues}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="column-1" key={'column1'}>
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <DroppableIssuesToDo isDraggingOver={snapshot.isDraggingOver} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="column-2" key={'column2'}>
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <DroppableIssuesProgress
                isDraggingOver={snapshot.isDraggingOver}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="column-3" key={'column3'}>
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <DroppableIssuesDone isDraggingOver={snapshot.isDraggingOver} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
