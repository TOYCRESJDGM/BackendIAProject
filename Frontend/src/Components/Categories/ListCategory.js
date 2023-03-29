import React, { Component } from 'react'
import './Styles.css'

import Alert from '../Alerts/Alert'
import { getElements } from '../../Functions/Get'
import { simpleRequest } from '../../Functions/Post'
import { simpleAlert } from '../../Functions/SwalAlert'
import { setSelectOptions } from '../../Functions/Helpers'
import {
  LIST_CATEGORY,
  ALERT_TIMEOUT,
  NO_ITEMS_ERROR,
  NO_ITEM_MESSAGE,
  ERROR_MESSAGE,
  DELETE_CATEGORY,
  CONFIRM_DELETE_CATEGORY
} from '../../Functions/Constants'

class ListCategory extends Component {
  constructor() {
    super()
    this.state = {
      categories: [],
      alert: '',
      timeout: '',
    }
  }

  componentDidMount() {
    getElements('category', LIST_CATEGORY, this.setCategories)
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

  routeEdit = (event) => {
    let id = event.target.id.split('-')
    sessionStorage.setItem('edit_user_id', id[1])

    return this.props.changeSelected(3)
  }

  routeRemove = (event) => {
    let id = event.target.id.split('-')

    let body = {
      category_id: id[1]
    }

    console.log(body)

    return simpleAlert(CONFIRM_DELETE_CATEGORY, () => simpleRequest(DELETE_CATEGORY + id, 'DELETE', body, this.responseHandler));
  }

  responseHandler = (response, body) => {
    if (response == 'success') {
      getElements('category', LIST_CATEGORY, this.setCategories)
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
  setCategories = async (response, body) => {
    if (response == 'success') {
      return this.setState({ categories: body.data })
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
    let rows = this.state.categories

    let table_rows = []
    for (let i = 0; i < rows.length; i++) {
      let obj = rows[i]

      table_rows.push(
        <tr key={'tr' + obj.id}>
            <td>{obj.id}</td>
          <td>{obj.title}</td>
          <td>{obj.description}</td>
          <td>
            <span
            id={obj.id}
            className='global-table-link'
            onClick={this.routeRemove}
            >
             Eliminar
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
            <th>Título</th>
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
        <span className='global-comp-title'>Lista de categorías</span>
        <span className='global-comp-description'>
          Aquí podrá listar todas las categorías de la aplicación.
        </span>
        <div className='global-comp-form-container'>
          {table}
        </div>
      </div>
    )
  }
}

export default ListCategory
