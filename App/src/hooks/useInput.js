import {useState} from 'react';

const useInput = function(logicFunc){
    const [value, setValue] = useState("")
    const [isTouched, setIsTouched] = useState(false);

    const isValid = logicFunc(value);
    const hasError = !isValid && isTouched;

    const changeHandler = function(event){
        setIsTouched(true);
        setValue(event.target.value);
    }

    const blurHandler = (event) => {
        setIsTouched(true);
    }

    const resetHandler = (event) => {
        setIsTouched(false);
        setValue("");
    }

    return {
        value,
        hasError,
        isValid,
        changeHandler,
        blurHandler,
        resetHandler
    }
}

export default useInput;