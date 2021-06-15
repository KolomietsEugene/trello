import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

const Container = styled.div`
    border: 1px solid black;
    border-radius: 8px;
    width: 100%;
    margin: auto;
    margin-bottom: 8px;
`

const Text = styled.p`
    text-align: center;
`

const Task = ({ task, columnIndex, index }) => {
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <Text>{task.name}</Text>
                </Container>
            )}
        </Draggable>
    )
}

export default Task