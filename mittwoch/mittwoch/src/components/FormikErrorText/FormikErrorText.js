import React from 'react';

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