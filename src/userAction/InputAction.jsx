import { useState } from "react"
import { InputComponent } from "../components/InputComponent"
import { Input } from "@mui/material"
import { changeUserClickActionTarget } from "../redux/actions"
import { useDispatch, useSelector } from "react-redux"
import { changeDescribedLocator, changeValue } from "../redux/testActionSlice";

export function InputAction({ actionIndexes, testcaseIndex, currentData, handleSetCurrentData }) {
    const dispatch = useDispatch();
    const value = useSelector(state => {
        let action = state.testAction.testcases[testcaseIndex];
        actionIndexes.forEach((actionIndex) => {
            action = action.actions[actionIndex];
        })
        return action.value;
    })

    const describedLocator = useSelector(state => {
        let action = state.testAction.testcases[testcaseIndex];
        actionIndexes.forEach((actionIndex) => {
            action = action.actions[actionIndex];
        })
        return action.describedLocator;
    })

    const handleChangeValueData = (e) => {
        const newValueData= e.target.value;
        // dispatch(changeValue({ testcaseIndex, actionIndexes, newValue }))
        console.log(value, newValueData);
        handleSetCurrentData({
            ...currentData,
            [value]: newValueData
        });
    }

    const handleChangeLocator = (e) => {
        const newLocator = e.target.value;
        dispatch(changeDescribedLocator({ testcaseIndex, actionIndexes, newLocator }));
    }
    return (
        <div>
            <span>Fill </span>
            <Input
                value={currentData[value]}
                onChange={handleChangeValueData}
                inputProps={{ style: { textAlign: "center", fontStyle: "italic" } }}
                placeholder={value}
                required
            />
            <span> into </span>
            <Input
                defaultValue={describedLocator || ""}
                onChange={handleChangeLocator}
                inputProps={{ style: { textAlign: "center", fontStyle: "italic" } }}
                disabled
            />
        </div>

    )
}