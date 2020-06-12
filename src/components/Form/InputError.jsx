import React from 'react';

export default function InputError({errors, name, touched}) {
    return (
        <div>   
            {errors[name] && touched[name] ? (
                <div data-testid="error">{errors[name]}</div>
            ): null}
        </div>
    )
}