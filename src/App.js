import { useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const flower = [
  {
    id: "1",
    name: "Orchid",
  },
  {
    id: "2",
    name: "Carnation",
  },
  {
    id: "3",
    name: "Lily",
  },
  {
    id: "4",
    name: "Tulip",
  },
];
function App() {
  const [flowers, setFlowers] = useState(flower);

 function handleOnDragEnd(result){
  if(!result.destination) return;
  const items=Array.from(flowers);
  const[reorderedItem]=items.splice(result.source.index,1);
  items.splice(result.destination.index,0,reorderedItem);
  setFlowers(items)
 }
  return (
    <div className="app">
      <h2>Flower's name list</h2>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="flowers">
          {(provided) => (
            <div
              className="list-container"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {flowers.map(({ id, name }, index) => {
                return (
                  <Draggable
                    key={id}
                    draggableId={id}
                    index={index}
                    type="TASK"
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="list-item">
                          <FontAwesomeIcon
                            icon={faBars}
                            className="icon"
                          ></FontAwesomeIcon>
                          <h3>{name}</h3>
                        </div>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
