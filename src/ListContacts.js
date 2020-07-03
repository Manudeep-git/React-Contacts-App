import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

class ListContacts extends React.Component { // if we use class ListContacts extends component then should use this.props
    //console.log('Props', this.props)
    static propTypes = {
      contacts: PropTypes.array.isRequired,
      deleteContact : PropTypes.func.isRequired
    }

    state ={
      query : "",
    }
    updateQuery = (query) => {
      this.setState ({
        query: query.trim()
      })
    }

    clearQuery = () => {
      this.updateQuery('')
    }
    // render method
    render(){
      const {query}=this.state
      const {contacts,deleteContact}=this.props

      const showingContacts = query === "" ?
        contacts
       :contacts.filter(c=>(
         c.name.toLowerCase().includes(query.toLowerCase())
       ))
    return (
      // Search contacts bar with input field
      <div className = 'list-contacts'>
      {/*{JSON.stringify(query)}*/}
        <div className = "list-contacts-top">
          <input
            className="search-contacts"
            type="text"
            placeholder = "Search Contacts"
            value={query}
            onChange={event => this.updateQuery(event.target.value)}
          />
          <Link//replacement for anchor tag used previously
             to='/create'
             className='add-contact'
          >Add Contact</Link>
        </div>
        {/* Display message for search contacts and is valid only when user input matches characters in contacts*/ }
        {showingContacts.length!== contacts.length && (
          <div className='showing-contacts'>
            <span> Now Showing {showingContacts.length} of {contacts.length}</span>
            <button onClick={this.clearQuery}>Show All</button>
          </div>
        )}
      <ol className='contact-list'>
      {showingContacts.map(contact => (
        <li key={contact.id} className='contact-list-item'>
          <div
            className='contact-avatar'
            style={{
              backgroundImage : `url(${contact.avatarURL})`
            }}>
          </div>
          <div className='contact-details'>
          <p>{contact.name}</p>
          <p>{contact.handle}</p>
          </div>
          <button
          onClick ={()=> deleteContact(contact)}
          className='contact-remove'>
          remove
          </button>
        </li>
      ))}
      </ol>
      </div>
    )
  }
}


export default ListContacts
