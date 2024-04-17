import React from 'react'
import { ListItem, List } from '@mui/material'
import ActionWrapper from './ActionWrapper'
export default function AndExpressionAction({ action, tempData, changeTempData, addTestData }) {
    return (
        <>
            <span>Combine Action</span>
            <List>
                {
                    action.actions.map((action, index) => {
                        return <ListItem key={index}>
                            {
                                index !== 0 
                                && <span style={{margin: '10px'}}>{` & `}</span>
                            }
                            <ActionWrapper
                                key={index}
                                index={index}
                                action={action}
                                tempData={tempData}
                                changeTempData={changeTempData}
                                addTestData={addTestData}
                            />
                        </ListItem>
                    })
                }
            </List>
        </>
    )
}
