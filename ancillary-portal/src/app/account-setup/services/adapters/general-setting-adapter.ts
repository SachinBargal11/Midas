import * as moment from 'moment';
import * as _ from 'underscore';
import { GeneralSetting } from '../../../account-setup/models/general-settings';
import { CompanyAdapter } from '../../../account/services/adapters/company-adapter';


export class GeneralSettingAdapter {
    static parseResponse(data: any): GeneralSetting {

        let generalSetting: GeneralSetting = null;

        if (generalSetting) {
            generalSetting = new GeneralSetting({
                id: data.id,
                companyId: data.companyId,
                slotDuration: data.slotDuration,
                company: CompanyAdapter.parseResponse(data.company),
                invitationID: data.invitationID,
                isDeleted: data.isDeleted

            });
        }
        return generalSetting;
    }

}