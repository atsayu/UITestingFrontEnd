import React from 'react'
import { Input } from '@mui/material'
export default function OpenURLAction({ action }) {
    return (
        <>
            <span>Open </span>
            <span style={{fonStyle: "italic", fontWeight: "bold"}}>{action.url}</span>
            {/* <Input
                value={action.url}
                inputProps={{ style: { textAlign: "center", fontStyle: "italic" } }}
                disabled /> */}
        </>
    )
}