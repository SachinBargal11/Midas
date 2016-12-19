export class ErrorMessageValidator {
    static errorMessage(error) {
        let errorBody = JSON.parse(error._body);
                let errorString = 'Server error.';
                if (errorBody.errorLevel === 4) {
                    if (errorBody.errorObject) {
                        errorString = '';
                        let errorObjs = errorBody.errorObject;
                        for (let errorObj of errorObjs) {
                            errorString += errorObj.validationMessage + '<br>';
                        }
                       return errorString;
                    }
                } else if (errorBody.errorLevel === 2) {
                    if (errorBody.errorMessage) {
                        errorString = errorBody.errorMessage;
                       return errorString;
                    }
                } else {
                    return errorString = 'Server error.';
                }
    }
}
