import React, { Component } from 'react'
import './Styles.css'

import Alert from '../Alerts/Alert'
import { getElements } from '../../Functions/Get'
import { simpleRequest } from '../../Functions/Post'
import { simpleAlert } from '../../Functions/SwalAlert'
import { setSelectOptions } from '../../Functions/Helpers'
import {
  LIST_USERS,
  ALERT_TIMEOUT,
  NO_ITEMS_ERROR,
  NO_ITEM_MESSAGE,
  ERROR_MESSAGE,
  ROL_TYPES,
  DELETE_USER,
  CONFIRM_DELETE_USER
} from '../../Functions/Constants'

class ListUsers extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      filtered_users: [],
      rol: 'all',
      alert: '',
      timeout: '',
    }
  }

  componentDidMount() {
    getElements('users', LIST_USERS, this.setUsers)
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeout)
  }

  // Functions to handle states
  handleChange = (event) => {
    let attribute = event.target.id
    let value = event.target.value

    this.setState({ [attribute]: value })

    return this.filterUsers(attribute, value)
  }

  responseHandler = (response, body) => {
    if(response == 'success') {
      getElements('users', LIST_USERS, this.setUsers)
      return this.buildAlert(
        'success',
        "La solicitud ha sido procesada exitosamente"
      )
    }

    return this.buildAlert('error', ERROR_MESSAGE)
  }

  // Functions to handle requests
  setUsers = async (response, body) => {
    if (response == 'success') {
      this.setState({ filtered_users: body.data })
      return this.setState({ users: body.data })
    }

    this.setState({ users: [] })

    if (body == NO_ITEMS_ERROR) {
      return this.buildAlert('attention', NO_ITEM_MESSAGE)
    }

    return this.buildAlert('error', ERROR_MESSAGE)
  }

  // Functions to handle alerts
  close = () => {
    return this.setState({ alert: '' })
  }

  buildAlert = (type, text) => {
    clearTimeout(this.state.timeout)

    this.setState({
      timeout: setTimeout(() => this.setState({ alert: '' }), ALERT_TIMEOUT),
    })

    return this.setState({
      alert: <Alert type={type} text={text} close={this.close} />,
    })
  }

  // Auxiliary functions
  filterUsers(attribute, value) {
    let rol = 'all'

    if (attribute == 'rol') {
      rol = value
    } else {
      rol = this.state.rol
    }

    let filtered_by_rol = this.filterByRol(rol, this.state.users)

    return this.setState({ filtered_users: filtered_by_rol })
  }

  filterByRol(rol, array) {
    if (rol == 'all') {
      return array
    }

    let filtered_array = []

    for (let i = 0; i < array.length; i++) {
      let obj = array[i]
      if (obj.rol == rol) {
        filtered_array.push(obj)
      }
    }

    return filtered_array
  }

  routeRemove = (event) => {
    let id = event.target.id.split('-')
    let body = {
      user_id: id[1]
    }

    return simpleAlert(CONFIRM_DELETE_USER, () => simpleRequest(DELETE_USER + id, 'DELETE', body, this.responseHandler));
  }


  setTable() {
    let rows = this.state.filtered_users

    if (rows.length < 1) {
      return (
        <span className='global-body-text' style={{ marginBottom: '0px' }}>
          Actualmente no hay usuarios con los filtros seleccionados.
        </span>
      )
    }

    let table_rows = []
    for (let i = 0; i < rows.length; i++) {
      let obj = rows[i]

      table_rows.push(
        <tr key={'tr' + obj.id}>
          <td>{obj.id}</td>
          <td>{obj.userName}</td>
          <td>{obj.email}</td>
          <td style={{ textTransform: 'capitalize' }}>{obj.rol}</td>
          <td>
            {window.sessionStorage.getItem("user_id") != obj.id &&
              <span
                id={obj.id}
                className='global-table-link'
                onClick={this.routeRemove}
              >
                Eliminar
              </span>
            }
          </td>
        </tr>
      )
    }

    let table = (
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Nombre completo</th>
            <th>Correo electrónico</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
          {table_rows}
        </tbody>
      </table>
    )

    return table
  }

  render() {
    let table = this.setTable()

    return (
      <div className='cu-container'>
        {this.state.alert}
        <span className='global-comp-title'>Lista de usuarios</span>
        <span className='global-comp-description'>
          Aquí podrá listar todos los usuarios de la aplicación de LinkScribe.
          Utilice las listas desplegables para filtrar los elementos.
        </span>
        <div className='global-comp-form-container'>
          <div className='global-special-form-group'>
            <select
              id='rol'
              className='global-special-form-input-select'
              value={this.state.rol}
              onChange={this.handleChange}
            >
              <option value='all'>Todos los roles</option>
              {setSelectOptions(ROL_TYPES)}
            </select>

          </div>
          {table}
        </div>
      </div>
    )
  }
}

export default ListUsers
