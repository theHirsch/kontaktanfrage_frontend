import React from 'react';

//Defaults for the FormikErrorText used for the phonenumber textfield validation
const FormikErrorText = (props) => {
    let { formikInstance, fieldName } = props;

    return (
        <>
            {formikInstance.touched[fieldName] && formikInstance.errors[fieldName] ? (
                <span style={{ color: 'red' }}>{formikInstance.errors[fieldName]}</span>
            ) : null}
        </>
    );
};

export default FormikErrorText;