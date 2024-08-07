import { TextField, Button } from '@mui/material'

export default function ScenarioDescription({ description, changeDescription, changeActionList, enableInputTestData}) {
    function turnFlowToAction() {
        const lines = description.split("\n");
        const preprocessedLines = lines.map((line) => {
            return line.replace(/^[^a-zA-Z]+/, '').trim();
        })
        fetch("http://localhost:8081/parse-flow", {
            body: JSON.stringify(preprocessedLines),
            headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS'
            },
            method: "POST",
        }).then((response) => {
            return response.json();
        }).then((newActions) => {
            console.log(JSON.stringify(newActions));
            enableInputTestData();
            changeActionList(newActions);
        })
    }
    return (
        <div>
            <TextField 
            value={description} 
            size='small' 
            onChange={(e) => changeDescription(e.target.value)} variant='outlined' 
            multiline rows={5} fullWidth 
            placeholder='Description of the scenario'
            style={{marginTop: '20px'}} 
            />
            <Button style={{marginTop: '20px'}}  onClick={turnFlowToAction} size='small' variant='contained'>Input Test Data</Button>
        </div>
    )
}
