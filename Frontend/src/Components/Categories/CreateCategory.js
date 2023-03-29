import React, { Component } from 'react'
import './Styles.css'

import Alert from '../Alerts/Alert'
import { simpleRequest } from '../../Functions/Post'
import { setSelectOptions, validateString } from '../../Functions/Helpers'
import {
  CREATE_CATEGORY,
  MANDATORY_MESSAGE,
  ERROR_MESSAGE,
  ALERT_TIMEOUT,
  INVALID_STRING_MESSAGE,
} from '../../Functions/Constants'

class CreateCategory extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      description: '',
      alert: '',
      timeout: '',
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeout)
  }

  // Functions to handle states
  handleInputChange(event) {
    const target = event.target
    const name = target.name

    return this.setState({ [name]: value })
  }

  handleChange = (event) => {
    let attribute = event.target.id
    let value = event.target.value

    return this.setState({ [attribute]: value })
  }

  clearInputs = () => {
    return this.setState({
      title: '',
      description: '',
    })
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

  responseHandler = (response, body) => {
    if (response == 'success') {
      this.buildAlert('success', 'Categoría creada con éxito.')

      return this.clearInputs()
    }

    if (body == CATEGORY_TYPE_EXIST_ERROR) {
      return this.buildAlert(
        'attention',
        'Ya existe una categoría con ese nombre. Por favor utilizar un nuevo nombre.'
      )
    }

    return this.buildAlert('error', ERROR_MESSAGE)
  }

  createCategory = () => {
    this.close()

    // Verify that the required fields are filled
    if (!this.checkMandatoryInputs()) {
      setTimeout(() => this.buildAlert('attention', MANDATORY_MESSAGE), 10)
      return
    }

    // Verify that desc is valid
    if (!validateString(this.state.desc)) {
      setTimeout(() => this.buildAlert('attention', INVALID_STRING_MESSAGE), 10)
      return
    }

    // Verify that name is valid
    if (!validateString(this.state.name)) {
      setTimeout(() => this.buildAlert('attention', INVALID_STRING_MESSAGE), 10)
      return
    }

    let body = {
      title: this.state.title,
      description: this.state.description,
    }

    return simpleRequest(
      CREATE_CATEGORY,
      'POST',
      body,
      this.responseHandler
    )
  }

  checkMandatoryInputs() {
    if (!this.state.title) {
      return false
    }

    if (!this.state.description) {
      return false
    }

    return true
  }

  render() {
    return (
      <div className='ca-container'>
        {this.state.alert}
        <span className='global-comp-title'>Crear categoría</span>
        <span className='global-comp-description'>
          Diligencie el formulario para crear una nueva categoría. Todos los campos son obligatorios
        </span>
        <div className='global-comp-form-container'>
          <div className='global-form-group'>
            <span className='global-form-label'>Nombre</span>
            <input
              id='title'
              type='text'
              value={this.state.title}
              onChange={this.handleChange}
              className='global-form-input'
              >
            </input>
          </div>

          <div className='global-form-group'>
            <span className='global-form-label'>Descripción</span>
            <input
              id='description'
              type='text'
              value={this.state.description}
              onChange={this.handleChange}
              className='global-form-input'
              >
            </input>
          </div>
          <div className='global-form-buttons-container'>
            <button
              className='global-form-solid-button'
              onClick={this.createCategory}
            >
              Enviar
            </button>
            <button
              className='global-form-outline-button'
              onClick={this.clearInputs}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default CreateCategory