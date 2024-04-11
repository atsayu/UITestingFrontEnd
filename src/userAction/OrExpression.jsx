import React, { useState } from 'react'
import { NestedDropdown } from 'mui-nested-menu'
import { ListItem, List } from '@mui/material'  
import Action from './Action'
import { useDispatch, useSelector } from 'react-redux'
import { addAndAction, addClickAction, addInputAction, addSelectAction, addCheckboxAction } from '../redux/testActionSlice'

export function OrExpression({testcaseIndex, actionIndexes}) {
    const dispatch = useDispatch();
    const actions = useSelector(state => {
        let action = state.testAction.testcases[testcaseIndex];
        actionIndexes.forEach((actionIndex) => {
            action = action.actions[actionIndex];
        });
        return action.actions|| [];
    })
    const handleAddClickAction = () => {
        // dispatch({type: 'ADD_USER_ACTION_CLICK', index})
        // dispatch(addUserClickActionEvent(testcaseIndex));
        dispatch(addClickAction({testcaseIndex, actionIndexes}));
    }

    const handleAddAndExpression = () => {
        // dispatch(addUserAndExpressionEvent(testcaseIndex));
        dispatch(addAndAction({testcaseIndex, actionIndexes}))
    }

    const handleAddInputAction = () => {
        dispatch(addInputAction({testcaseIndex, actionIndexes}));
    }
    const handleAddSelect = () => {
        dispatch(addSelectAction({testcaseIndex, actionIndexes}));
    }

    const handleAddCheckbox = () => {
        dispatch(addCheckboxAction({testcaseIndex, actionIndexes}));
    }

    const menuItemsData = {
        label:'Combined Action',
        items:[
            {
                label: 'Actions flow'
            },
    
            {
                label: 'Normal actions',
                items:[
                    {
                        label: 'Click Element',
                        callback: handleAddClickAction 
                    },
                    {
                        label: "Input text",
                        callback: handleAddInputAction
                    },
                    {
                        label: 'Checkbox',
                        callback: handleAddCheckbox
                    },
                    {
                        label: 'Select',
                        callback: handleAddSelect
                    },
                    {
                        label: 'And Expression',
                        callback: handleAddAndExpression
                    }
                ],
            }
        ],
            
    }

  return (
    <div>
        <NestedDropdown menuItemsData={menuItemsData}/>
        <List sx={{ listStyle: "decimal", pl: 2 }}>
        {
            actions.map((action, index) => {
                return (
                    <ListItem key={index} sx={{display: "list-item"}}>
                             <Action {...action} actionIndexes={[...actionIndexes, index]} testcaseIndex={testcaseIndex}/>
                    </ListItem>
                )
            })
        }
        </List>
        
    </div>
  )
}
