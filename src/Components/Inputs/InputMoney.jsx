import React from 'react';
import InputError from "./InputError";

function InputMoney({formErrors, setValue, name, defaultValue, label = null, commaAsDecimalPoint = true, maxDecimalPlaces = 2, errorName = null, ...props}) {
    const changeHandler = (event) => {
        const removedAndReplacedCommas = event.target.value
            .replace(/[^0-9.,]/g, '')
            .replace(commaAsDecimalPoint ? '.' : ',', commaAsDecimalPoint ? ',' : '.')
            .replace(/(\.|,)(?=.*\1)/g, '');

        const parts = removedAndReplacedCommas.split(commaAsDecimalPoint ? ',' : '.');
        event.target.value = parts.length === 2 ? parts[0] + (commaAsDecimalPoint ? ',' : '.') + parts[1].slice(0, maxDecimalPlaces) : parts[0];

        setValue(event.target.value, name);
    }

    return (
        <>
            {label !== 'undefined' && <label htmlFor={name}>{name}:</label>}
            <input type="text" name={name} id={name} className={"border rounded"}
                   onInput={e => changeHandler(e)}
                   pattern="[0-9]+([,.][0-9]{1,2})?"
                   value={defaultValue}
                   {...props}
            />
            <InputError formErrors={formErrors} name={errorName ?? name} />
        </>
    );
}

export default InputMoney;
