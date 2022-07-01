import React from 'react';  
import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom';
import NavBar from "./components/NavBar/Navbar";
import EventList from "./components/events/EventList/EventList";
import AddEvent from "./components/events/AddEvent/AddEvent";
import EditEvent from "./components/events/EditEvent/EditEvent";
import ViewEvent from "./components/events/ViewEvent/ViewEvent";
import Spinner from "./components/spinner/Spinner";
import ContactForm from "./components/ContactForm/ContactForm";

let App=()=>{
  return (
    <React.Fragment>
      
      <NavBar/>
      <Routes>
        <Route path={'/'} element={<Navigate to={'/events/list'}/>}/>
        <Route path={'/events/list'} element={<EventList/>}/>
        <Route path={'/events/add'} element={<AddEvent/>}/>
        <Route path={'/events/view/:eventId'} element={<ViewEvent/>}/>
        <Route path={'/events/edit/:eventId'} element={<EditEvent/>}/>
        <Route path={'/ContactForm'} element={<ContactForm/>}/>
      </Routes>
      
    </React.Fragment>
  );
}

export default App;
