export const addClickAction = () => {
    // dispatch({type: 'ADD_USER_ACTION_CLICK', index})
    dispatch(addUserClickActionEvent(testcaseIndex));
}

export const addAndExpression = () => {
    dispatch(addUserAndExpressionEvent(testcaseIndex));
}

export const menuItemsData = {
    label:'Add action',
    items:[
        {
            label: 'Actions flow'
        },

        {
            label: 'Normal actions',
            items:[
                {
                    label: 'Click Element',
                    callback: addClickAction
                },
                {
                    label: 'And Expression',
                    callback: addAndExpression
                }
            ],
        }
    ],
        
}