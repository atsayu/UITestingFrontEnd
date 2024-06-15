import React from 'react'
import ClickAction from './ClickAction'
import InputAction from './InputAction'
import VerifyURLAction from './VerifyURLAction'
import OpenURLAction from './OpenURLAction'
import AndExpressionAction from './AndExpressionAction'
import SelectAction from './SelectAction'
import { OrExpression } from '../userAction/OrExpression'
import { Divider } from '@mui/material'

export default function ActionWrapper(props) {
    let ActionComponent;
    switch (props.action.type) {
        case "click":
            ActionComponent =  <ClickAction {...props} />;
            break;
        case "input":
            ActionComponent = <InputAction {...props} />;
            break;
        case "verifyURL":
            ActionComponent = <VerifyURLAction {...props} />;
            break;
        case "open":
            ActionComponent = <OpenURLAction {...props} />;
            break;
        case "select":
            ActionComponent = <SelectAction {...props} />;
            break;
        case "and": 
            ActionComponent = <AndExpressionAction {...props}/>
            break;
        case "or":
            ActionComponent = <OrExpression {...props}/>;
            break;
    }
    return (
        <div>
            <span style={{margin: '10px'}}>{props.index + 1}</span>
            {ActionComponent}
            <Divider variant='fullWidth'/>
        </div>
    )
}
