
function Temp() {
    const { number } = state;

    dispatch({type: "add_number", value: 3});
    
    console.log(number);
}

export default Temp;