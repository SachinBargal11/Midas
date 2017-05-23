import * as moment from 'moment';
import * as _ from 'underscore';
import { Doctor } from '../../../../medical-provider/users/models/doctor';
import { Room } from '../../../../medical-provider/rooms/models/room';
import { PrefferedMedicalProvider } from '../../models/preferred-medical-provider';
import { DoctorAdapter } from '../../../../medical-provider/users/services/adapters/doctor-adapter';
import { RoomsAdapter } from '../../../../medical-provider/rooms/services/adapters/rooms-adapter';



export class PrefferedMedicalProviderAdapter {
    static parseResponse(providerData: any): PrefferedMedicalProvider {

        let prefferedMedicalProvider: PrefferedMedicalProvider = null;
        let doctors: Doctor[] = [];
        let rooms: Room[] = [];

        if (providerData) {
            if (providerData.doctor) {
                for (let doctor of providerData.doctor) {
                    doctors.push(DoctorAdapter.parseResponse(doctor));
                }
            }
            if (providerData.room) {
                for (let room of providerData.room) {
                    rooms.push(RoomsAdapter.parseResponse(room));
                }
            }
            prefferedMedicalProvider = new PrefferedMedicalProvider({
                id: providerData.id,
                name: providerData.name,
                registrationComplete: providerData.registrationComplete,
                doctor: doctors,
                room: rooms,
                invitationID: providerData.invitationID,
                isDeleted: providerData.isDeleted,

            });
        }
        return prefferedMedicalProvider;
    }

}

