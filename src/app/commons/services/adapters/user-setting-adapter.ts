import * as moment from 'moment';
import { UserSetting } from '../../models/user-setting';
import { UserAdapter } from '../../../medical-provider/users/services/adapters/user-adapter';
import { PatientAdapter } from '../../../patient-manager/patients/services/adapters/patient-adapter';

export class UserSettingAdapter {
    static parseResponse(data: any): UserSetting {
        let userSetting = null;
        if(data){
        userSetting = new UserSetting(
            {
               id: data.id,
            // patient: PatientAdapter.parseResponse(data.patient),
               patientId:data.patientId,
               isPushNotificationEnabled:data.isPushNotificationEnabled ? true : false,
               calendarViewId:data.calendarViewId,
               preferredModeOfCommunication:data.preferredModeOfCommunication,
               preferredUIViewId:data.preferredUIViewId,
               isDeleted: data.isDeleted ? true : false,
               createByUserID: data.createbyuserID,
               createDate: data.createDate ? moment.utc(data.createDate) : null,
               updateByUserID: data.updateByUserID,
               updateDate: data.updateDate ? moment.utc(data.updateDate) : null

            });
        }
        return userSetting;
    }

}