import * as moment from 'moment';
import { UserSetting } from '../../models/user-setting';

export class UserSettingAdapter {
    static parseResponse(data: any): UserSetting {
        let userSetting = null;

        userSetting = new userSetting(
            {

            }
        );
        return userSetting;
    }

}