import { Input } from "@mui/material"
import { ChangeEventHandler } from "react"


export function InputComponent({placeholder, onChange, initialValue}) {
    return (
        <Input required placeholder={placeholder? placeholder : ""} defaultValue={initialValue? initialValue : ""} style={{fontStyle: "italic"}} onChange={onChange}/>
    )
}