import React, { Component } from 'react'
import './Styles.css'
import Modal from './Modal';

import Alert from '../Alerts/Alert'
import { getElements } from '../../Functions/Get'
import { simpleRequest } from '../../Functions/Post'
import { simpleAlert } from '../../Functions/SwalAlert'
import { setSelectOptions } from '../../Functions/Helpers'
import {
  LIST_SHARED,
  ALERT_TIMEOUT,
  NO_ITEMS_ERROR,
  NO_ITEM_MESSAGE,
  ERROR_MESSAGE,
  CONFIRM_DELETE_LIST,
} from '../../Functions/Constants'

class ListShared extends Component {
  constructor() {
    super()
    this.state = {
      lists: [],
      alert: '',
      timeout: '',
    }
  }

  componentDidMount() {
    let session_id = sessionStorage.getItem('user_id')
    getElements('list', LIST_SHARED + '?user_id=' + session_id, this.setLists)
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeout)
  }

  // Functions to handle states
  handleChange = (event) => {
    let attribute = event.target.id
    let value = event.target.value

    this.setState({ [attribute]: value })
  }


  routeSee = (event) => {
    let id = event.target.id.split('-')
    sessionStorage.setItem('idList', id[1])

    return this.props.changeSelected(9)
  }

  routeRemove = (event) => {
    let id = event.target.id.split('-')
    let body = {
      user_id: id[1]
    }

    return simpleAlert(CONFIRM_DELETE_LIST, () => simpleRequest(DELETE_LIST + id, 'DELETE', body, this.responseHandler));
  }

  // Functions to handle modal
  showModal(name, id, session_id) {
    return this.props.showModal(
      <Modal name={name} id={id} session_id={session_id} closeModal={this.closeModal} />
    )
  }

  closeModal = () => {
    return this.props.closeModal()
  }

  responseHandler = (response, body) => {
    if (response == 'success') {
      getElements('list', LIST_LISTS, this.setLists)
      return this.buildAlert(
        'success',
        'La solicitud ha sido procesada exitosamente.'
      );
    }
    if (body == 'El usuario tiene asociadas bodegas activas.' ||
      body == 'El usuario tiene prestamos pendientes o sin devolver.' ||
      body == 'No hay registros en el sistema.') {
      return this.buildAlert('error', body);
    }


    return this.buildAlert('error', ERROR_MESSAGE)
  }

  // Functions to handle requests
  setLists = async (response, body) => {
    if (response == 'success') {
      return this.setState({ lists: body.data })
    }

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

  setTable() {
    let rows = this.state.lists
    let session_id = sessionStorage.getItem('user_id')

    let table_rows = []
    for (let i = 0; i < rows.length; i++) {
      let obj = rows[i]

      table_rows.push(
        <tr key={'tr' + obj.id}>
          <td>{obj.id}</td>
          <td>{obj.name}</td>
          <td>{obj.description}</td>
          <td>
            <span
              id={'e-' + obj.id}
              className='global-table-link'
              onClick={this.routeSee}
              style={{ marginRight: '10px' }}
            >
              ver páginas
            </span>
          </td>
        </tr>
      )
    }

    let table = (
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
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
        <span className='global-comp-title'>Listas</span>
        <span className='global-comp-description'>
          Aquí podrá visualizar todas las listas de la aplicación.
        </span>
        <div className='global-comp-form-container'>
          {table}
        </div>
      </div>
    )
  }
}

export default ListShared
