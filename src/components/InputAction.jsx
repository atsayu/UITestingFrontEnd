import React from 'react'
import { FilledInput } from "@mui/material"

export default function InputAction({ action, tempData, changeTempData }) {
    return (
        <>
            <span>Fill </span>
            <FilledInput
                value={tempData[action.value] || ""}
                placeholder={`data for ${action.value}`}
                onChange={(e) => changeTempData({ ...tempData, [action.value]: e.target.value })}
                inputProps={{ style: { textAlign: "center", fontStyle: "italic", padding: 0 } }}
                required
            />
            <span> into </span>
            <span style={{fonStyle: "italic", fontWeight: "bold"}}>{action.describedLocator}</span>
            
        </>
    )
}
