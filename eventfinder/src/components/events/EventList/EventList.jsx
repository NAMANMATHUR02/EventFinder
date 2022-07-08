import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { EventService } from "../../../services/EventService";
import Spinner from "../../spinner/Spinner";

let EventList = ()=>{

    let [query,setQuery]= useState({
        text : ''
    });

    let [state,setState] = useState( {
        loading: false,
        events : [],
        filteredEvents : [],
        errorMessage : ''

    });

    // useEffect(async()=>{
    //     try{
    //         setState({...state,loading:true});
    //         let response = await EventService.getAllEvents();
    //         setState({
    //             ...state,
    //             loading: false,
    //             events: response.data,
    //             filteredEvents : response.data
    //         });
    //     }
    //     catch(error){   
    //         setState({
    //             ...state,
    //             loading: false,
    //             errorMessage: error.message
    //         });
    //     }
    // },[]);

    useEffect(()=>{
        async function fetchData(){
            const response=await EventService.getAllEvents();
            
            setState({
                            ...state,
                            loading: false,
                            events: response.data,
                            filteredEvents : response.data
                        });
        }
        fetchData();
    },[]);
    
    //delete Event
    let clickDelete = async(eventId)=>{
        try{
            let response = await EventService.deleteEvent(eventId);
            if(response){
                setState({...state,loading:true});
            let response = await EventService.getAllEvents();
            setState({
                ...state,
                loading: false,
                events: response.data,
                filteredEvents : response.data
            });
            }
        }
        catch(error){
            setState({
                ...state,
                loading: false,
                errorMessage: error.message
            });
        }
    };


    let searchEvents=(event)=>{
        setQuery({...query, text:event.target.value});
        let theEvents = state.events.filter(event=>{
            return event.name.toLowerCase().includes(event.target.value.toLowerCase())
        });
        setState({
            ...state, 
          filteredEvents: theEvents
        });
    };

    let{loading,events,filteredEvents,errorMessage}=state;

    return (
        <React.Fragment>

            <section className="event-search">
            
                <div className="container">
                    <div className="grid">
                        <div className="row">
                            <div className="col">
                                <p className="h3 fw-bold">Event Manager
                                    <Link to={'/events/add'} className="btn btn-primary ms-2">
                                    <i className="fa fa-plus-circle me-2"/>New</Link>
                                </p>
                                <p className="fst-italic" ><span className="fw-bold">“Plans are nothing. Planning is everything.”</span>

:: Is there anything more critical to an event planner’s process than planning, planning and planning some more? Having big ideas is great, but they’re nothing without rolling your sleeves up and getting down to the actual planning that goes into any big event or program. And, at the end of the day, that’s everything.</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <form className="row">
                                <div className="col">
                                <div className="mb-2">
                                        <input
                                            name="text"
                                            value={query.text}
                                            onChange={searchEvents}
                                         type="text" className="form-control" placeholder="search Names"/>
                                    </div>
                                </div>
                                <div className="col">
                                <div className="mb-2">
                                    <input type="submit" className="btn btn-outline-dark" value="search"/>
                                    </div>
                                </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {
                loading?<Spinner/>: <React.Fragment>
                
                <section className="event-list">
                <div className="container">
                    <div className="row">
                    {
                        filteredEvents.length > 0 &&
                        filteredEvents.map(event=>{
                                return (
                            <div className="col-md-6" key={event.id}>
                            <div className="card my-2">
                                <div className="card-body ">
                                    <div className="row align-items-center d-flex justify-content-around">
                                    <div className="col-md-4">
                                        <img src={event.photo} alt="" className="event-img"/>
                                    </div>
                                    <div className="col-md-7">
                                        <ul className="list-group">
                                            <li className="list-group-item list-group-item-action">
                                                Event Name : <span className="fw-bold">{event.name}</span>
                                            </li>
                                            <li className="list-group-item list-group-item-action">
                                                Date : <span className="fw-bold">{event.date}</span>
                                            </li>
                                            <li className="list-group-item list-group-item-action">
                                                location : <span className="fw-bold">{event.company}</span>
                                            </li>
                                            <li className="list-group-item list-group-item-action">
                                                Title : <span className="fw-bold">{event.title}</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="d-flex justify-content-center" >
                                        <Link to={`/events/view/${event.id}`} className="btn btn-warning ">
                                            <i className="fa fa-eye"/>
                                        </Link>
                                        <Link to={`/events/edit/${event.id}`} className="btn btn-primary">
                                            <i className="fa fa-pen"/>
                                        </Link>
                                        <button  className="btn btn-danger" onClick={()=>clickDelete(event.id)}>
                                            <i className="fa fa-trash"/>
                                        </button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                                )
                            })
                    }
                   
                    </div>
                </div>
            </section>        
                </React.Fragment>
            }

            
        </React.Fragment>
    )
};
export default EventList;  

