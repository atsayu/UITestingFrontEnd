import { useState } from "react"
import { InputComponent } from "../components/InputComponent"
import { Input } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { changeURL } from "../redux/testActionSlice";

export function OpenURLAction({actionIndexes, testcaseIndex}) {
    const dispatch = useDispatch();
    const url = useSelector(state => {
        let action =  state.testAction.testcases[testcaseIndex];
        actionIndexes.forEach((actionIndex) => {
            action = action.actions[actionIndex];
        })
        return action.url;
    })
    const handleChange = (e) => {
        // setTargetField(e.target.value)
        let newURL = e.target.value;
        dispatch(changeURL({testcaseIndex, actionIndexes, newURL}));
    }
    
    return (
        <div>
            <span>Open: </span>
            <InputComponent initialValue={url || ""} onChange={handleChange}/>
        </div>
        
    )
}