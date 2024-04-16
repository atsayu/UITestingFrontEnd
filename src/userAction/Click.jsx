import { useState } from "react"
import { InputComponent } from "../components/InputComponent"
import { Input } from "@mui/material"
import { changeUserClickActionTarget } from "../redux/actions"
import { useDispatch, useSelector } from "react-redux"
import { changeDescribedLocator } from "../redux/testActionSlice";

export function ClickAction({actionIndexes, testcaseIndex, setCurrentData}) {
    const dispatch = useDispatch();
    const describedLocator = useSelector(state => {
        let action =  state.testAction.testcases[testcaseIndex];
        actionIndexes.forEach((actionIndex) => {
            action = action.actions[actionIndex];
        })
        return action.describedLocator;
    })
    const handleChange = (e) => {
        // setTargetField(e.target.value)
        let newLocator = e.target.value;
        dispatch(changeDescribedLocator({testcaseIndex, actionIndexes, newLocator}));
    }
    
    return (
        <div>
            <span>Click: </span>
            <Input defaultValue ={describedLocator || ""} onChange={handleChange} disabled/>
        </div>
        
    )
}