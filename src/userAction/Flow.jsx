import React from 'react'
import { Button, TextField } from '@mui/material'
import { useDispatch, useSelector } from "react-redux";
import { addMultipleActions, changeFlow } from "../redux/testActionSlice"
export default function Flow({ testcaseIndex, actionIndexes }) {
    const flow = useSelector(state => {
        let tempAction = state.testAction.testcases[testcaseIndex];
        actionIndexes.forEach(index => {
            tempAction = tempAction.actions[index];
        })
        return tempAction.flow;
    })
    const dispatch = useDispatch();

    const handleChangeFlow = (e) => {
        const newFlow = e.target.value;
        const actionIndex = actionIndexes[actionIndexes.length - 1];
        dispatch(changeFlow({ testcaseIndex, actionIndex, newFlow }));
    }

    const turnFlowToAction = () => {
        const lines = flow.split("\n");
        fetch("http://localhost:8081/parse-flow", {
            
            body: JSON.stringify(lines),
            headers: {
                'content-type': 'application/json',
                // 'charser': 'utf-8',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS'
            },
            method: "POST",
        }).then((response) => {
            return response.json();
        }).then((newActions) => {
            console.log(newActions);
            const currentActionIndex = actionIndexes[actionIndexes.length - 1];
            dispatch(addMultipleActions({testcaseIndex, actionIndexes,currentActionIndex, newActions }));
        })
    }
    return (
        <>
            <TextField value={flow} sx={{ input: { display: 'inline' } }} size='small' onChange={handleChangeFlow} variant='outlined' multiline rows={5} fullWidth placeholder='Describe your test procedure' />
            <Button onClick={turnFlowToAction} size='small' variant='outlined'>Turn to element</Button>
        </>
    )
}
