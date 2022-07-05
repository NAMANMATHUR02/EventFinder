import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {EventService} from "../../../services/EventService";
import Spinner from "../../spinner/Spinner";

let ViewEvent = ()=>{

    let {eventId}=useParams();

    let [state,setState] = useState( {
        loading: false,
        event : {},
        errorMessage : '',
        group:{}

    });

    // useEffect(async()=>{
    //     try{
    //          setState({...state,loading:true});
    //         let response = await EventService.getEvent(eventId);
    //         let groupResponse = await EventService.getGroup(response.data);

    //         setState({
    //             ...state,
    //             loading: false,
    //             event: response.data,
    //             group: groupResponse.data
    //         });
    //     }
    //     catch(error){   
    //         setState({
    //             ...state,
    //             loading: false,
    //             errorMessage: error.message
    //         });

    //     }
    // },[eventId]);

    useEffect(()=>{
        async function fetchData(){
            let response = await EventService.getEvent(eventId);
            let groupResponse = await EventService.getGroup(response.data);
            
            setState({
                            ...state,
                            loading: false,
                            event: response.data,
                            group: groupResponse.data
                        });
        }
        fetchData();
    },[eventId]);

    let {loading,event,errorMessage,group}=state;

    return (
        <React.Fragment>
            <section className="view-event-intro p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-warning fw-bold">View Event</p>
                            <p className="fst-italic">When you see events as just 'happenings' rather than as doings, you are liberated right away</p>
                        </div>
                    </div>
                </div>
            </section>

        {
            loading ? <Spinner/> :<React.Fragment>
                {
                    Object.keys(event).length > 0 && Object.keys(group).length > 0 &&
                    <section className="view-event mt-3">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-4">
                            <img src={event.photo} alt="" className="event-img"/>
                        </div>
                        <div className="col-md-8">
                        <ul className="list-group">
                            <li className="list-group-item list-group-item-action">
                                Event Name : <span className="fw-bold">{event.name}</span>
                            </li>
                            <li className="list-group-item list-group-item-action">
                                Date : <span className="fw-bold">{event.date}</span>
                            </li>
                            <li className="list-group-item list-group-item-action">
                               Email : <span className="fw-bold">{event.email}</span>
                            </li>
                            <li className="list-group-item list-group-item-action">
                            location : <span className="fw-bold">{event.location}</span>
                            </li>
                            <li className="list-group-item list-group-item-action">
                               Title : <span className="fw-bold">{event.title}</span>
                            </li>
                            <li className="list-group-item list-group-item-action">
                               Group : <span className="fw-bold">{group.name}</span>
                            </li>
                        </ul>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <Link to={'/events/list'} className="btn btn-warning">Back</Link>
                        </div>
                    </div>
                </div>
            </section>
                }
            </React.Fragment>
        }   
        </React.Fragment>
    )
};
export default ViewEvent;  