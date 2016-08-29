import {Doctor} from '../../models/doctor';
import {DoctorDetail} from '../../models/doctor-details';
import Moment from 'moment';
import _ from 'underscore';


export class DoctorAdapter {
    // static parseDoctorResponse(doctorData: any): Doctor {

    //     let doctor = null;
    //     if (doctorData) {
    //         let tempDoctor = _.omit(doctorData, 'updateDate');
    //         if (doctorData.doctor) {
    //             tempDoctor.user = doctorData.user.id;
    //         }
    //         doctor = new Doctor(tempDoctor);
    //     }
    //     return doctor;
    // }

    static parseResponse(doctorData: any): DoctorDetail {

        let doctor = null;
        let tempDoctor = _.omit(doctorData, 'updateDate');
        if (doctorData) {
            doctor = new DoctorDetail({
                doctor: tempDoctor,
                user:doctorData.user,
                address: doctorData.address,
                contactInfo: doctorData.contactInfo
            });
        }
        return doctor;
    }


}