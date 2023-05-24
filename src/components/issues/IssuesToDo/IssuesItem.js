import { Draggable } from 'react-beautiful-dnd';

import CardIssues from '../CardIssues/CardIssues';
import css from './IssuesToDo.module.css';

export const IssuesToDo = ({ column }) => {
  return (
    <ul className={css.list}>
      {column &&
        column.items.map((item, index) => {
          return (
            <Draggable
              key={String(item.id)}
              draggableId={String(item.id)}
              index={index}
            >
              {(provided, snapshot) => {
                return (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      userSelect: 'none',
                      padding: 16,
                      margin: '0 0 8px 0',
                      minHeight: '50px',
                      backgroundColor: snapshot.isDragging
                        ? '#263B4A'
                        : '#456C86',

                      ...provided.draggableProps.style,
                    }}
                  >
                    <CardIssues data={item} />
                  </div>
                );
              }}
            </Draggable>
          );
        })}
    </ul>
  );
};
