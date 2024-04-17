import React from 'react'
import UnstyledInputIntroduction from './Input'
import { FilledInput , Input, TextField } from '@mui/material'



export default function VerifyURLAction({ action, tempData, changeTempData }) {
      
    return (
        <>
            <span style={{ display: 'inline-block', verticalAlign: 'middle', height: '100%' }}>
                Verify the current URL is&nbsp;</span>
            <FilledInput
                placeholder={`data for ${action.url}`}
                value={tempData[action.url] || ""}
                inputProps={{ style: { textAlign: "center", fontStyle: "italic", padding: 0, width: '500px' } }}
                onChange={(e) => changeTempData({ ...tempData, [action.url]: e.target.value })}
                required
                hiddenLabel={true}
                
            />
            {/* <TextField 
            size='small'
            label={`data for ${action.url}`} 
            variant="filled" 
            inputProps={{ style: { textAlign: "center", fontStyle: "italic" } }}
            onChange={(e) => changeTempData({ ...tempData, [action.url]: e.target.value })}
            /> */}
        </>
    )
}
