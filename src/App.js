import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI'
import CreateContact from './CreateContact'
import {Route} from 'react-router-dom'

class App extends Component {
  state ={
    contacts: [],
  }

  componentDidMount() {
   ContactsAPI.getAll()
     .then((response) => {
       this.setState({
         contacts: response,
       })
     })
 }

  removeContact = (contact) => {
    this.setState(currentState => ({
    contacts: currentState.contacts.filter(c => {
      return c.id!==contact.id // we have to use return explicitly as it is a return function
    })
  }))
  ContactsAPI.remove(contact)
}

  createContact = (contact)=>{
    ContactsAPI.create(contact).then(
      contact => {
        this.setState(currentState => ({
           contacts : [...currentState.contacts,contact]
        }))
      })
  }
  render() {
    return (
      <div>
        <Route exact path='/' render = {()=>(
          <ListContacts
          contacts={this.state.contacts}
          deleteContact ={this.removeContact}
        />
      )}
    />
        <Route path='/create' render = {({history})=>(
          <CreateContact
            onCreateContact = {(contact)=>{
               this.createContact(contact)
               history.push('/')
            }}
          />
        )}
      />
      </div>
    );
  }
}

export default App;
