import * as moment from 'moment';
import {Doctor} from '../../models/doctor';
import {DoctorDetail} from '../../models/doctor-details';
import { UserAdapter } from './user-adapter';
import _ from 'underscore';


export class DoctorAdapter {
    static parseDoctorResponse(doctorData: any): Doctor {

        let doctor: Doctor = null;
        if (doctorData) {
            let tempDoctor: any = _.omit(doctorData, 'account', 'updateDate');
            if (doctorData.account) {
                tempDoctor.accountId = doctorData.account.id;
            }
            doctor = new Doctor(_.extend(tempDoctor, {
                createDate: moment.utc(tempDoctor.createDate)
            }));
        }
        return doctor;
    }

    static parseResponse(doctorData: any): Doctor {

        let doctor = null;

        if (doctorData) {
            doctor = new Doctor({
                id: doctorData.id,
                licenseNumber: doctorData.licenseNumber,
                wcbAuthorization: doctorData.wcbAuthorization,
                wcbRatingCode: doctorData.wcbratingCode,
                npi: doctorData.npi,
                taxType: doctorData.taxType,
                title: doctorData.title,               
                user: UserAdapter.parseResponse(doctorData.user),
                doctorSpecialities: doctorData.user.doctorSpecialities,
                isDeleted: doctorData.isDeleted
            });
        }
        return doctor;
    }
    // static parseResponse(doctorData: any): DoctorDetail {

    //     let doctor = null;
    //     let tempDoctor = this.parseDoctorResponse(doctorData);
    //     if (doctorData) {
    //         doctor = new DoctorDetail({
    //             doctor: tempDoctor,
    //             user: doctorData.user,
    //             address: doctorData.address,
    //             contactInfo: doctorData.contactInfo
    //         });
    //     }
    //     return doctor;
    // }


}