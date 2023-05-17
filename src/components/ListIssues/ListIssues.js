// import { IssuesToDo } from '../issues/IssuesToDo/IssuesToDo';
// import { IssuesProgres } from '../issues/IssuesProgress/IssuesProgress';
// import { IssuesDone } from '../issues/IssuesDone/IssuesDone';
// import { DragDropContext, Droppable } from 'react-beautiful-dnd';

// import { forwardRef, useEffect } from 'react';

// import css from './ListIssues.module.css';
// import { useSelector } from 'react-redux';
// import { getAllIssues } from '../../redux/selectors';
// import { DragIssues } from '../../redux/issuesReducer';
// import { useDispatch } from 'react-redux';

// export const ListIssues = () => {
// const allIssues = useSelector(getAllIssues);
//   const dispatch = useDispatch();

//   const DroppableIssuesToDo = forwardRef((props, ref) => (
//     <IssuesToDo {...props} forwardedRef={ref} />
//   ));

//   const DroppableIssuesProgress = forwardRef((props, ref) => (
//     <IssuesProgres {...props} forwardedRef={ref} />
//   ));

//   const DroppableIssuesDone = forwardRef((props, ref) => (
//     <IssuesDone {...props} forwardedRef={ref} />
//   ));
//   const handleDragEnd = result => {
//     const { source, destination } = result;

//     if (!destination) {
//       return;
//     }

//     const items = Array.from(allIssues);
//     const [reorderItem] = items.splice(source.index, 1);
//     items.splice(destination.index, 0, reorderItem);

//     dispatch(DragIssues(items));
//     // setDragDrop(items);
//   };
//   return (
//     <div className={css.containerIssues}>
//       <DragDropContext onDragEnd={handleDragEnd}>
//         <Droppable droppableId="column-1" key={'column1'}>
//           {(provided, snapshot) => (
//             <div ref={provided.innerRef} {...provided.droppableProps}>
//               <DroppableIssuesToDo isDraggingOver={snapshot.isDraggingOver} />
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//         <Droppable droppableId="column-2" key={'column2'}>
//           {(provided, snapshot) => (
//             <div ref={provided.innerRef} {...provided.droppableProps}>
//               <DroppableIssuesProgress
//                 isDraggingOver={snapshot.isDraggingOver}
//               />
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//         <Droppable droppableId="column-3" key={'column3'}>
//           {(provided, snapshot) => (
//             <div ref={provided.innerRef} {...provided.droppableProps}>
//               <DroppableIssuesDone isDraggingOver={snapshot.isDraggingOver} />
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>
//     </div>
//   );
// };

import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { nanoid } from 'nanoid';
import { IssuesToDo } from '../issues/IssuesToDo/IssuesToDo';

import css from './ListIssues.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { fetchIssues } from '../../redux/issuesOperation';
import { getAllIssues, getUserRepo, getColumns } from '../../redux/selectors';
import { increment, updateColumns } from '../../redux/issuesReducer';

export const ListIssues = () => {
  const allIssues = useSelector(getAllIssues);
  const userURL = useSelector(getUserRepo);
  const column = useSelector(getColumns);

  const next = useSelector(state => state.issues.page);

  console.log('allIssues', allIssues);

  const dispatch = useDispatch();
  const owner = userURL[0];
  const repo = userURL[1];

  const [columns, setColumns] = useState(() => {
    return {
      [nanoid()]: {
        name: 'To do',
        items: allIssues,
      },
      [nanoid()]: {
        name: 'In Progress',
        items: [],
      },
      [nanoid()]: {
        name: 'Done',
        items: [],
      },
    };
  });

  //

  useEffect(() => {
    setColumns(prevColumns => ({
      ...prevColumns,
      [Object.keys(prevColumns)[0]]: {
        ...prevColumns[Object.keys(prevColumns)[0]],
        items: allIssues,
      },
    }));
  }, [allIssues]);

  console.log('sdsd', allIssues);
  const fetchNextPage = () => {
    dispatch(increment());
    dispatch(fetchIssues({ owner, repo, next }));
  };

  const onDragEnd = (result, column, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = column[source.droppableId];
      const destColumn = column[destination.droppableId];

      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];

      const [removed] = sourceItems.splice(source.index, 1);

      destItems.splice(destination.index, 0, removed);

      setColumns({
        ...column,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const columne = column[source.droppableId];
      const copiedItems = [...columne.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      setColumns({
        ...column,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  useEffect(() => {
    dispatch(updateColumns(columns));
  }, [columns, dispatch]);

  return (
    <div className={css.containerIssues}>
      <DragDropContext
        onDragEnd={result => onDragEnd(result, column, setColumns)}
      >
        {Object.entries(column).map(([columnId, colum], index) => {
          return (
            <div className={css.containerFlex} key={columnId}>
              <h2>{colum.name}</h2>
              <div>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? 'lightblue'
                            : 'lightgrey',
                          padding: 10,
                          width: 328,
                          minHeight: 500,
                        }}
                      >
                        <IssuesToDo column={colum} />
                        {index === 0 && (
                          <button
                            className={css.btnLoad}
                            onClick={fetchNextPage}
                          >
                            load next
                          </button>
                        )}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
};
