import React, {useState,useEffect} from "react";
import {Link,useNavigate} from 'react-router-dom';
import { EventService } from "../../../services/EventService";
 
let AddEvent = ()=>{
    let navigate = useNavigate();
    let [state,setState] = useState({
        loading: false,
        event : {
            name : '',
            photo : '',
            mobile : '',
            email : '',
            company : '',
            title : '',
            groupId : '' 
        },
        groups : [],
        errorMessage : '' 
    });

    let updateInput = (event)=>{
        setState({
            ...state,
            event: {
                ...state.event,
                [event.target.name] : event.target.value
            }
        });
    }; 

    // useEffect(async()=>{
    //     try{
    //          setState({...state,loading:true});
    //         let response = await EventService.getGroups();
    //         setState({
    //             ...state,
    //             loading: false,
    //             groups: response.data
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
            const response=await EventService.getGroups();
            
            setState({
                            ...state,
                            loading: false,
                            events: response.data,
                            filteredEvents : response.data
                        });
        }
        fetchData();
    },[]);

    let submitForm= async (event)=>{
        
        event.preventDefault();
        try{
            let response = await EventService.createEvent(state.event);
            if(response){
                navigate('/events/list',{replace: true});
            }
        }
        catch(error){
            setState({...state, errorMessage:error.message});
            navigate('/event/add',{replace: false});
        }
    };


    let {loading, event , groups, errorMessage} = state;



    return (
        <React.Fragment>
            <section className="add-event p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-success fw-bold">Create Event</p>
                            <p className="fst-italic fw-bold">"A goal without a plan is just a wish."</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <form onSubmit={submitForm}>
                                <div className="mb-2">

                                    <input 
                                    required={true}
                                    name="name"
                                    value={event.name}
                                    onChange={updateInput}
                                    
                                    type="text" className="form-control" placeholder="Event Name"/>
                                
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
                                    name="mobile"
                                    value={event.mobile}
                                    onChange={updateInput}

                                     type="number" className="form-control" placeholder="Mobile"/>
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
                                    name="company"
                                    value={event.company}
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
                                        //required={true}
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
                                        <input type="submit" className="btn btn-success" value="Create"/>
                                        <Link to={'/events/list'} className="btn btn-dark ms-2">Cancel</Link>
                                    </div>  
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
};
export default AddEvent;  

