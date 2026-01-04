export const InAction = () => async dispatch =>
{
    dispatch({
        type:"INCREASE"
    })
}

export const DeAction = () => async dispatch =>
{
    dispatch({
        type:"DECREASE"
    })
}