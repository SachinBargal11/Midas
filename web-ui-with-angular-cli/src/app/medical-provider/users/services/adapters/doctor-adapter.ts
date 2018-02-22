import { DoctorSpecialityAdapter } from './doctor-speciality-adapter';
import { DoctorTestSpecialityAdapter } from './doctor-test-speciality-adapter';
import { DoctorLocationScheduleAdapter } from './doctor-location-schedule-adapter';
import { DoctorLocationSchedule } from '../../models/doctor-location-schedule';
import { DoctorSpeciality } from '../../models/doctor-speciality';
import { DoctorTestSpeciality } from '../../models/doctor-test-speciality';
import * as moment from 'moment';
import { Doctor } from '../../models/doctor';
import { UserAdapter } from './user-adapter';
import * as _ from 'underscore';


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
            let doctorSpecialities: DoctorSpeciality[] = [];
            let doctorRoomTestMappings: DoctorTestSpeciality[] = [];
            let doctorLocationSchedule: DoctorLocationSchedule[] = [];
            if (doctorData.doctorSpecialities) {
                _.forEach(doctorData.doctorSpecialities, (currentDoctorSpeciality: any) => {
                    doctorSpecialities.push(DoctorSpecialityAdapter.parseResponse(currentDoctorSpeciality));
                });
            }
            if(doctorData.doctorRoomTestMappings){
                _.forEach(doctorData.doctorRoomTestMappings,(currentDoctorTestSpeciality: any)=>{
                    doctorRoomTestMappings.push(DoctorTestSpecialityAdapter.parseResponse(currentDoctorTestSpeciality));
                });
            }
            if (doctorData.doctorLocationSchedules) {
                _.forEach(doctorData.doctorLocationSchedules, (currentDoctorLocationSchedule: any) => {
                    doctorLocationSchedule.push(DoctorLocationScheduleAdapter.parseResponse(currentDoctorLocationSchedule));
                });
            }
            doctor = new Doctor({
                id: doctorData.id,
                licenseNumber: doctorData.licenseNumber,
                wcbAuthorization: doctorData.wcbAuthorization,
                wcbRatingCode: doctorData.wcbratingCode,
                npi: doctorData.npi,
                taxType: doctorData.taxType,
                title: doctorData.title,
                user: UserAdapter.parseResponse(doctorData.user),
                genderId:doctorData.genderId,
                doctorSpecialities: doctorSpecialities,
                doctorRoomTestMappings:doctorRoomTestMappings,
                doctorLocationSchedules: doctorLocationSchedule,
                isCalendarPublic: doctorData.isCalendarPublic,
                isDeleted: doctorData.isDeleted
            });
        }
        return doctor;
    }
}