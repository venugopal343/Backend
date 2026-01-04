const userdata = {
    email:localStorage.getKey("email") || "",
    
}
export default function reducer(state=count,action)
{
    const {type,payload} = action;
    console.log("Payload ",payload);
    switch(type)
    {
        case 'INCREASE':
            return state + 1;
        case 'DECREASE':
            return state - 1;
        default :
        return  state;
    }
}

