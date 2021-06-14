import React from 'react'
import Task from './Task'
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd'

const Container = styled.div`
    margin: 20px;
    padding: 12px;
    border: 1px solid grey;
    border-radius: 8px;
    min-width: 300px;
    background-color: lightgray;
`

const Title = styled.h3`
    padding: 8px;
`

const TaskList = styled.div`
    padding: 6px;
    background-color: darkgrey;
    border-radius: 8px;
`

const Column = ({ documentTask }) => {
    return (
        <Container>
            <Title>{documentTask.name}</Title>
            <Droppable droppableId={documentTask.id}>
                {(provided) => (
                    <TaskList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {documentTask.items.map((task, taskIndex) => (<Task
                            key={task.id}
                            index={taskIndex}
                            task={task} />))}
                        {provided.placeholder}
                    </TaskList>
                )}
            </Droppable>
        </Container>
    )
}

export default Column