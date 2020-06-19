import React from 'react'
import PropTypes from 'prop-types'

function ListContacts(props) { // if we use class ListContacts extends component then should use this.props
    //console.log('Props', this.props)
    return (
      <ol className='contact-list'>
      {props.contacts.map(contact => (
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
          onClick ={()=> props.deleteContact(contact)}
          className='contact-remove'>
          remove
          </button>
        </li>
      ))}
      </ol>
    )
}

ListContacts.propTypes = {//propTypes is not PropTypes we imported, we are adding it as property
  contacts: PropTypes.array.isRequired,
  deleteContact : PropTypes.func.isRequired
}

export default ListContacts
