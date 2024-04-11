import { useState } from "react"
import { InputComponent } from "../components/InputComponent"
import { changeUserClickActionTarget } from "../redux/actions"
import { useDispatch } from "react-redux"
import { changeDescribedLocator, changeValue } from "../redux/testActionSlice";

export function SelectAction( {actionIndexes, testcaseIndex, describedLocator, value}) {
    const dispatch = useDispatch();
    const handleChangeValue = (e) => {
        const newValue = e.target.value;
        dispatch(changeValue({testcaseIndex, actionIndexes, newValue}))
    }
    
    const handleChangeLocator = (e) => {
        const newLocator = e.target.locator;
        dispatch(changeDescribedLocator({testcaseIndex, actionIndexes, newLocator}));
    }
    return (
        <div>
            <span>Select </span>
            <InputComponent initialValue={value || ""}  onChange={handleChangeValue}/>
            <span> for list </span>
            <InputComponent initialValue={value || ""}  onChange={handleChangeLocator}/>
        </div>
        
    )
}