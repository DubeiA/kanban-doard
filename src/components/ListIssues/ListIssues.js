import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { IssuesToDo } from '../issues/IssuesToDo/IssuesItem';

import css from './ListIssues.module.css';

import { useSelector, useDispatch } from 'react-redux';

import { getColumns, getIsLoading } from '../../redux/selectors';
import { updateColumns } from '../../redux/issuesReducer';

import { Audio } from 'react-loader-spinner';

export const ListIssues = () => {
  const column = useSelector(getColumns);
  const isLoading = useSelector(getIsLoading);

  const dispatch = useDispatch();

  const onDragEnd = (result, column) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = column[source.droppableId];
      const destColumn = column[destination.droppableId];

      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];

      const [removed] = sourceItems.splice(source.index, 1);

      destItems.splice(destination.index, 0, removed);
      if (!destItems.some(item => item.id === removed.id)) {
        destItems.splice(destination.index, 0, removed);
      }
      dispatch(
        updateColumns({
          ...column,
          [source.droppableId]: {
            ...sourceColumn,
            items: sourceItems,
          },
          [destination.droppableId]: {
            ...destColumn,
            items: destItems,
          },
        })
      );
    } else {
      const columne = column[source.droppableId];
      const copiedItems = [...columne.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      dispatch(
        updateColumns({
          ...column,
          [source.droppableId]: {
            ...column,
            items: copiedItems,
          },
        })
      );
    }
  };

  const title = ['To Do', 'In Progress', 'Done'];

  return isLoading ? (
    <Audio
      height="80"
      width="80"
      radius="9"
      color="blue"
      ariaLabel="three-dots-loading"
      wrapperStyle
      wrapperClass={css.loader}
    />
  ) : (
    <div className={css.containerIssues}>
      <DragDropContext onDragEnd={result => onDragEnd(result, column)}>
        {Object.entries(column).map(([columnId, colum], index) => {
          return (
            <div className={css.containerFlex} key={columnId}>
              <h2>{title[index]}</h2>
              <div>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? '#81BE83'
                            : '#96AED0',
                          padding: 10,
                          width: 328,
                          minHeight: 500,
                        }}
                      >
                        <IssuesToDo column={colum} />

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
