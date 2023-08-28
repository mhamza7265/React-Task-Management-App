import styled from "styled-components";
import TodoStructure from "./TodoStructure";
import { Droppable } from "react-beautiful-dnd";
import TodoStructureIP from "./TodoStructureIP";
import TodoStructureComp from "./TodoStructureComp";

const Container = styled.div`
  background-color: #ebf2f5;
  border-radius: 9px;
  width: 315px;
  height: 475px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding: 0 10px;
  border-top: 3px solid #ed9d0b;
  margin: 0 0 30px 0;
`;

const Title = styled.h3`
  background-color: #ebf2f5;
  padding: 8px;
  text-align: left;
  position: sticky !important;
  top: 0;
  z-index: 2;
  font-size: 15px;
`;

const TaskList = styled.div`
  transistion: background-color 0.2s ease;
  background-color: transparent;
  min-height: 100px;
  flex-grow: 1;
`;

export default function Column({ title, tasks, id }) {
  console.log(id);
  return (
    <Container className="column">
      <Title>{title}</Title>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {id == "1111"
              ? tasks.map((task, index) => (
                  <TodoStructure key={index} index={index} task={task} />
                ))
              : id == "2222"
              ? tasks.map((task, index) => (
                  <TodoStructureIP key={index} index={index} task={task} />
                ))
              : tasks.map((task, index) => (
                  <TodoStructureComp key={index} index={index} task={task} />
                ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
}
