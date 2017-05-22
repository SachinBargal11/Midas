// import { Record } from 'immutable';

// const MyEventRecord = Record({
//     id: 0,
//     title: '',
//     start: '',
//     end: '',
//     allDay: true
// });
// export class MyEvent extends MyEventRecord {
export class MyEvent {
    id: number;
    title: string;
    start: string;
    end: string;
    allDay: boolean = true;
}
