import React from 'react'
import { FilledInput } from "@mui/material"

export default function SelectAction({ action, tempData, changeTempData }) {
    return (
        <>
            <span>Select </span>
            <FilledInput
                value={tempData[action.answer] || ""}
                placeholder={`${action.answer}`}
                onChange={(e) => changeTempData({ ...tempData, [action.answer]: e.target.value })}
                inputProps={{ style: { textAlign: "center", fontStyle: "italic", padding: 0 } }}
                required
            />
            <span> for </span>
            <FilledInput
                value={tempData[action.question] || ""}
                placeholder={`${action.question}`}
                onChange={(e) => changeTempData({ ...tempData, [action.question]: e.target.value })}
                inputProps={{ style: { textAlign: "center", fontStyle: "italic", padding: 0 } }}
                required
            />
            
        </>
    )
}
