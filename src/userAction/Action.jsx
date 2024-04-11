

import { ClickAction } from './Click'
import { AndExpression} from './AndExpression'
import { InputAction } from './InputAction';
import { SelectAction } from './SelectAction';
import { CheckboxAction } from './Checkbox';
import { VerifyURlAction } from './VerifyURLAction';
import { OrExpression } from './OrExpression';
import Flow from './Flow';
import { OpenURLAction } from './OpenURL';


const Action = (info) => {
    console.log(info.type);
  switch(info.type) {
    case "open":
        return <OpenURLAction actionIndexes={info.actionIndexes} testcaseIndex={info.testcaseIndex}/>
    case "click":
        return <ClickAction target={info.target} actionIndexes={info.actionIndexes} testcaseIndex={info.testcaseIndex}/>
    case "and":
        return <AndExpression actions={info.children} actionIndexes={info.actionIndexes} testcaseIndex={info.testcaseIndex}/>
    case "input":
        return <InputAction actionIndexes={info.actionIndexes} testcaseIndex={info.testcaseIndex}/>
    case "select": 
        return <SelectAction actionIndexes={info.actionIndexes} testcaseIndex={info.testcaseIndex}/>
    case "checkbox":
        return <CheckboxAction actionIndexes={info.actionIndexes} testcaseIndex={info.testcaseIndex}/>
    case "verifyURL":
        return <VerifyURlAction actionIndexes={info.actionIndexes} testcaseIndex={info.testcaseIndex}/>
    case "or":
        return <OrExpression actions={info.children} actionIndexes={info.actionIndexes} testcaseIndex={info.testcaseIndex} />
    case "flow":
        return <Flow actionIndexes={info.actionIndexes} testcaseIndex={info.testcaseIndex}/>
  }
}

export default Action