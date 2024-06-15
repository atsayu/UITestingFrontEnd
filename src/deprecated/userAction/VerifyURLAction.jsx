import { useState } from "react"
import { InputComponent } from "../components/InputComponent"
import { changeUserClickActionTarget } from "../redux/actions"
import { useDispatch, useSelector } from "react-redux"
import { changeDescribedLocator, changeExpectedURL } from "../redux/testActionSlice";

export function VerifyURlAction({actionIndexes, testcaseIndex}) {
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
        const newURL = e.target.value;
        dispatch(changeExpectedURL({testcaseIndex, actionIndexes, newURL}));
    }
    console.log(expectedURL);
    return (
        <div>
            <span>Verify the current URL is </span>
            <InputComponent initialValue={expectedURL || ""} onChange={handleChange}/>
        </div>
    )
}