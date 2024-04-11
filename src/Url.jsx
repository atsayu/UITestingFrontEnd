import { Input, TextField } from "@mui/material";
import { InputComponent } from "./components/InputComponent";

function UrlComponent({url, setUrl}) {
    return (
        <div style={{fontFamily: 'sans-serif'}}>
            <span>On: </span>
            {/* <TextField id="outlined-basic" label="URL" variant="outlined" size="small"/> */}
            <InputComponent onChange={(e) => setUrl(e.target.value)} initialValue={url || ""} placeholder={"Link to the webpage"}/>
            
        </div>
    )
}

export default UrlComponent;