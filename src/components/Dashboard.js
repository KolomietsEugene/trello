import React, { useContext } from 'react'
import { Context } from '../index'
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore'
import Loading from './Loading'
import Column from './Column'
import styled from 'styled-components'
import { DragDropContext } from 'react-beautiful-dnd'

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
`

const Dashboard = () => {
    const firestore = useContext(Context)
    const [tasksDocs, loading] = useCollectionDataOnce(
        firestore.collection('tasks'),
        {
            idField: 'uId'
        }
    )

    const handleDragEnd = (result) => {
        const fromColumn = tasksDocs.find((item) => item.id === result.source.droppableId);
        const toColumn = tasksDocs.find((item) => item.id === result.destination.droppableId);

        const itemToMove = fromColumn.items[result.source.index];

        fromColumn.items.splice(result.source.index, 1);
        toColumn.items.splice(result.destination.index, 0, itemToMove);

        updateDB(fromColumn, toColumn)
    }

    const updateDB = async (fromColumn, toColumn) => {
        const fromDoc = firestore.collection('tasks').doc(fromColumn.uId);
        await fromDoc.update({ items: fromColumn.items })

        const toDoc = firestore.collection('tasks').doc(toColumn.uId);
        await toDoc.update({ items: toColumn.items })
    }

    if (loading) {
        return <Loading />
    }

    return (
        <DragDropContext
            onDragEnd={handleDragEnd}
        >
            <Container>
                {tasksDocs.map((doc, index) => {
                    return <Column key={doc.id} documentTask={doc} />
                })}
            </Container>
        </DragDropContext>
    )
}

export default Dashboard