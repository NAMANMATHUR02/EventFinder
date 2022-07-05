import React, {useState,useEffect} from "react";
import {Link,useNavigate,useParams} from 'react-router-dom';
import { EventService } from "../../../services/EventService";
import Spinner from "../../spinner/Spinner";

let EditEvent = ()=>{

    let {eventId} = useParams(); 
    let navigate = useNavigate();
    let [state, setState] = useState({
        loading : false,
        event : {
            name : '',
            photo : '',
            date : '',
            email : '',
            location : '',
            title : '',
            groupId : '' 
        }, 
        groups : [],
        errorMessage : ''
    });

    // useEffect(async () => {
    //     try{
    //         setState({...state,loading:true});
    //         let response = await EventService.getEvent(eventId);
    //         let groupResponse = await EventService.getGroups();
    //         setState({
    //             ...state,
    //             loading:false,
    //             event:response.data,
    //             groups:groupResponse.data
    //         });
    //     }
    //     catch(error){
    //         setState({
    //             ...state,
    //             loading:false,
    //             errorMessage:error.message
    //         });
    //     }
    // },[eventId]);
    useEffect(()=>{
        async function fetchData(){
            const response=await EventService.getEvent(eventId);
            const groupResponse=await EventService.getGroups();
            setState({
                            ...state,
                            loading: false,
                            event: response.data,
                            groups: groupResponse.data,
                            filteredEvents : response.data
                        });
        }
        fetchData();
    },[eventId]);

    let updateInput = (event)=>{
        setState({
            ...state,
            event: { 
                ...state.event,
                [event.target.name] : event.target.value
            }
        });
    }; 

    let submitForm = async (event) =>{
        event.preventDefault();
        try{
            let response = await EventService.updateEvent(state.event,eventId);
            if(response){
                navigate('/events/list',{replace: true});
            }
        }
        catch(error){
            setState({...state,errorMessage:error.message});
            navigate(`/events/edit/${eventId}`,{replace:false});
        }
    };

    let {loading,event,groups,errorMessage}=state;

    return (
        <React.Fragment>
            {
                loading ? <Spinner/> : <React.Fragment>
                <section className="add-event p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-primary fw-bold">Edit Event</p>
                            <p className="fst-italic fw-bold">To improve is to change; to be perfect is to change often </p>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-md-4">
                            <form onSubmit={submitForm}>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name="name"
                                        value={event.name}
                                        onChange={updateInput}
                                     type="text" className="form-control" placeholder="Name"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name="photo"
                                        value={event.photo}
                                        onChange={updateInput}
                                     type="text" className="form-control" placeholder="Photo URL"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name="date"
                                        value={event.date}
                                        onChange={updateInput}
                                     type="date" className="form-control" placeholder="Date"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name="email"
                                        value={event.email}
                                        onChange={updateInput}
                                     type="email" className="form-control" placeholder="Email"/>
                                   </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name="location"
                                        value={event.location}
                                        onChange={updateInput}
                                     type="text" className="form-control" placeholder="Location"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name="title"
                                        value={event.title}
                                        onChange={updateInput}
                                     type="text" className="form-control" placeholder="Title"/>
                                </div>
                                <div className="mb-2">
                                        <select
//                                            required={true}
                                            name="groupId"
                                            value={event.groupId}
                                            onChange={updateInput}
                                         className="form-control">
                                            <option value="">Select a Group</option>
                                            {
                                                groups.length > 0 && 
                                                    groups.map(group=>{
                                                        return(
                                                            <option key={group.id} value={group.id}>{group.name}</option>
                                                        )
                                                    })
                                            }
                                        </select>
                                </div>
                                    <div className="mb-2">
                                        <input type="submit" className="btn btn-primary" value="Update"/>
                                        <Link to={'/events/list'} className="btn btn-dark ms-2">Cancel</Link>
                                    </div>  
                            </form>
                        </div>
                        <div className="col-md-6">
                            <img src={event.photo} alt="" className="event-img"/>
                        </div>
                    </div>
                </div>
            </section>
                </React.Fragment>
            }
        </React.Fragment>
    )
};
export default EditEvent;  