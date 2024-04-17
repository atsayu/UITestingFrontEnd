import React from 'react'
import { Input } from '@mui/material'
export default function ClickAction({action}) {
  return (
    <>
            <span>Click: </span>
            <span style={{fonStyle: "italic", fontWeight: "bold"}}>{action.describedLocator}</span>
            {/* <Input 
            value={action.describedLocator}
            inputProps={{ style: { textAlign: "center", fontStyle: "italic" } }}
            disabled/> */}
        </>
  )
}
