import React from 'react'
import{CopyBlock, nord} from "react-code-blocks"

export default function TestScript({script}) {
  return (
    <div style={{ fontFamily: 'Monaco' }}>
      <CopyBlock text={script} language="java" codeBlock showLineNumbers theme={nord}/>
    </div>
  )
}
