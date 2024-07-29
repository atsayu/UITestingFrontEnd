import { TextField, Button } from '@mui/material'

export default function TestOutline({editFlowEnabled, flow, setNewFlow, changeActionList}) {
    function turnFlowToAction() {
        const lines = flow.split("\n");
        const preprocessedLines = lines.map((line) => {
            return line.replace(/^[^a-zA-Z]+/, '').trim();
        })
        console.log(preprocessedLines);
        fetch("http://localhost:8081/parse-flow", {
            body: JSON.stringify(preprocessedLines),
            headers: {
                'content-type': 'application/json',
                // 'charser': 'utf-8',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS'
            },
            method: "POST",
        }).then((response) => {
            return response.json();
        }).then((newActions) => {
            console.log(newActions);
            changeActionList(newActions);
        })
    }
    return (
        <div>
            <TextField 
            value={flow} 
            size='small' 
            onChange={(e) => setNewFlow(e.target.value)} variant='outlined' 
            multiline rows={5} fullWidth 
            placeholder='Please generate scenario first'
            style={{marginTop: '20px'}} 
            disabled={!editFlowEnabled}
            />
            <Button style={{marginTop: '20px'}}  onClick={turnFlowToAction} size='small' variant='contained'>Turn to element</Button>
        </div>
    )
}
