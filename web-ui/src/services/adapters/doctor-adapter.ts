import {DoctorDetail} from '../../models/doctor-details';
import _ from 'underscore';


export class DoctorAdapter {
    static parseResponse(doctorData: any): DoctorDetail {

        let doctor = null;
        let tempDoctor = _.omit(doctorData, 'updateDate');
        if (doctorData) {
            doctor = new DoctorDetail({
                doctor: tempDoctor,
                user: doctorData.user,
                address: doctorData.address,
                contactInfo: doctorData.contactInfo
            });
        }
        return doctor;
    }


}