import { IssuesToDo } from '../issues/IssuesToDo/IssuesToDo';
import { IssuesProgres } from '../issues/IssuesProgress/IssuesProgress';
import { IssuesDone } from '../issues/IssuesDone/IssuesDone';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { forwardRef } from 'react';

import css from './ListIssues.module.css';

export const ListIssues = ({
  allIssues,
  setAllIssues,
  userLogin,
  userRepo,
}) => {
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
    console.log('hi');
    const { source, destination } = result;

    // Перевірка, чи є призначення для перетягуваного елемента
    if (!destination) {
      return;
    }

    // Отримання даних з елементів джерела і призначення
    const sourceDroppableId = source.droppableId;
    const sourceIndex = source.index;
    const destinationDroppableId = destination.droppableId;
    const destinationIndex = destination.index;

    if (!allIssues[sourceDroppableId] || !allIssues[destinationDroppableId]) {
      return;
    }

    // Отримання даних зі стану компонентів
    const sourceColumnData = [...allIssues[sourceDroppableId]];
    const destinationColumnData = [...allIssues[destinationDroppableId]];

    // Копіювання елемента з елементів джерела
    const [draggedItem] = sourceColumnData.splice(sourceIndex, 1);

    // Вставка елемента у призначення
    destinationColumnData.splice(destinationIndex, 0, draggedItem);

    // Оновлення стану компонентів
    setAllIssues({
      ...allIssues,
      [sourceDroppableId]: sourceColumnData,
      [destinationDroppableId]: destinationColumnData,
    });
  };
  return (
    <div className={css.containerIssues}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="column-1" key={'column1'}>
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <DroppableIssuesToDo
                // {...provided.droppableProps}
                // ref={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
                data={allIssues}
                load={setAllIssues}
                searchLogin={userLogin}
                searchRepo={userRepo}
              />
            </div>
          )}
        </Droppable>
        <Droppable droppableId="column-2" key={'column2'}>
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <DroppableIssuesProgress
                // {...provided.droppableProps}
                // ref={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
                data={allIssues}
              />
            </div>
          )}
        </Droppable>
        <Droppable droppableId="column-3" key={'column3'}>
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <DroppableIssuesDone
                // {...provided.droppableProps}
                // ref={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
                data={allIssues}
              />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
