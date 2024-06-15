import { useState } from "react"
import { InputComponent } from "../components/InputComponent"
import { changeUserClickActionTarget } from "../redux/actions"
import { useDispatch } from "react-redux"
import { changeDescribedLocator, changeValue } from "../redux/testActionSlice";

export function CheckboxAction( {actionIndexes, testcaseIndex, describedLocator, value}) {
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
            <span>Check </span>
            <InputComponent initialValue={value || ""}  onChange={handleChangeValue}/>
            <span> for question </span>
            <InputComponent initialValue={value || ""}  onChange={handleChangeLocator}/>
        </div>
        
    )
}