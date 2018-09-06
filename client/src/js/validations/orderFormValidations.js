import isEmpty from 'lodash/isEmpty';

const orderFormValidations = (fields) => {
    const error = {};

    if (isEmpty(fields.academicLevel))
        error.academicLevel = 'Academic level is required';
    else if (isEmpty(fields.discipline))
        error.discipline = 'Discipline is required';       
    else if (isEmpty(fields.paperType))
        error.paperType = 'Paper type is required';
    else if (isEmpty(fields.topic))
        error.topic = 'Topic is required';
        
    return {
        error: error,
        isValid: isEmpty(error)
    };
}
export default orderFormValidations;