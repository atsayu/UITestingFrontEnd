import { useState } from "react"
import { InputComponent } from "../components/InputComponent"
import { changeUserClickActionTarget } from "../redux/actions"
import { useDispatch, useSelector } from "react-redux"
import { changeDescribedLocator, changeExpectedURL } from "../redux/testActionSlice";
import { Input } from "@mui/material";

export function VerifyURlAction({actionIndexes, testcaseIndex, currentData, handleSetCurrentData}) {
    const dispatch = useDispatch();
    const expectedURL = useSelector(state => {
        let tempAction = state.testAction.testcases[testcaseIndex];
        actionIndexes.forEach(actionIndex => {
            tempAction = tempAction.actions[actionIndex];
        })
        return tempAction.url;
    })
    const handleChange = (e) => {
        // setTargetField(e.target.value)
        const newURLData = e.target.value;
        // dispatch(changeExpectedURL({testcaseIndex, actionIndexes, newURL}));
        handleSetCurrentData({
            ...currentData,
            expectedURL, newURLData
        })
    }
    // console.log(expectedURL);
    return (
        <div>
            <span>Verify the current URL is </span>
            <Input 
            defaultValue={""} 
            onChange={handleChange} 
            placeholder={expectedURL}
            inputProps={{ style: { textAlign: "center", fontStyle: "italic" } }}
            required
            />
        </div>
        
    )
}