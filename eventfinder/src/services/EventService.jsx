import axios from 'axios';

export class EventService{
    static serverURL =`http://localhost:9000`;

    static getGroups(){
        let dataURL = `${this.serverURL}/groups`;
        return axios.get(dataURL);
    }
    static getGroup(event){
        let groupId = event.groupId;
        let dataURL = `${this.serverURL}/groups/${groupId}`;
        return axios.get(dataURL);
    }

    static getAllEvents(){
        let dataURL = `${this.serverURL}/events`;
        return axios.get(dataURL);
    }
    static getEvent(eventId){
        let dataURL = `${this.serverURL}/events/${eventId}`;
        return axios.get(dataURL);
    }

    static createEvent(event){
        let dataURL = `${this.serverURL}/events`;
        return axios.post(dataURL,event);
    }

    static updateEvent(event,eventId){
        let dataURL = `${this.serverURL}/events/${eventId}`;
        return axios.put(dataURL,event);
    }

    static deleteEvent(eventId){
        let dataURL = `${this.serverURL}/events/${eventId}`;
        return axios.delete(dataURL);
    }
}