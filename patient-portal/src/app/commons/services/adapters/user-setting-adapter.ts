import * as moment from 'moment';
import { UserSetting } from '../../models/user-setting';
import { UserAdapter } from '../../../medical-provider/users/services/adapters/user-adapter';

export class UserSettingAdapter {
    static parseResponse(data: any): UserSetting {
        let userSetting = null;
        if(data){
        userSetting = new UserSetting(
            {
            //    id: data.id,
               userId:data.userId,
               companyId:data.companyId,
               isPublic:data.isPublic ? true : false,
               isSearchable:data.isSearchable ? true : false,
               isCalendarPublic:data.isCalendarPublic ? true : false,
               SlotDuration:data.slotDuration,
               user:UserAdapter.parseResponse(data.user),
               calendarViewId:data.calendarViewId,
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