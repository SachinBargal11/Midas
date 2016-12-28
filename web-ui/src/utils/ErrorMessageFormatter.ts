export class ErrorMessageFormatter {
    static getErrorMessages(error, errString): any {
        let errorBody = JSON.parse(error._body);
                // let errorString = 'Server error.';
                let errorString: string[] = [];
                if (errorBody.errorLevel === 4) {
                    if (errorBody.errorObject) {
                        let errorObjs = errorBody.errorObject;
                        for (let errorObj of errorObjs) {
                            // errorString += errorObj.validationMessage + '<br>';
                            errorString.push(errorObj.validationMessage);
                        }
                       return errorString;
                    }
                } else if (errorBody.errorLevel === 2) {
                    if (errorBody.errorMessage) {
                        errorString.push(errorBody.errorMessage);
                       return errorString;
                    }
                } else if (errorBody.errorLevel === 6) {
                    if (errorBody.errorMessage) {
                        errorString.push(errorBody.errorMessage);
                       return errorString;
                    }
                } else {
                    errorString.push(errString);
                    return errorString;
                    // return errString;
                }
    }
}
