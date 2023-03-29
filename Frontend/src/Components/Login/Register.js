import React, { Component } from 'react'
import './Styles.css'

import Alert from '../Alerts/Alert'
import {
  validateString,
  validateEmail,
  setSelectOptions,
} from '../../Functions/Helpers'
import { simpleRequest } from '../../Functions/Post'
import {
  CREATE_USER,
  MANDATORY_MESSAGE,
  EMAIL_MESSAGE,
  ERROR_MESSAGE,
  USED_EMAIL_ERROR,
  ALERT_TIMEOUT,
  ROL_TYPES,
  INVALID_STRING_MESSAGE,
  LOGIN,
} from '../../Functions/Constants'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      user_name: '',
      branch: '',
      rol: 'Usuario',
      phone: '',
      password: '',
      password_check: '',
      alert: '',
      timeout: '',
    }
  }

    componentWillUnmount() {
      clearTimeout(this.state.timeout)
    }
  
    // Functions to handle states
    handleChange = (event) => {
    let attribute = event.target.id
    let value = event.target.value

    if (attribute == 'email') {
      value = value.toLowerCase()
    } else if (attribute == 'user_name') {
      value = value.toUpperCase()
    }

    return this.setState({ [attribute]: value })
  }

  clearInputs = () => {
    return this.setState({
      email: '',
      user_name: '',
      password: '',
      password_check: '',
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

  // Functions related to requests
  responseHandler = (response, body) => {
    if (response == 'success') {
      sessionStorage.removeItem('users')
      this.buildAlert('success', 'Usuario creado con éxito.')
      
      setTimeout(() => {
        return this.props.changeView('LoginView')
      }, 1500);
    }

      /* if (response == 'success') {
        sessionStorage.removeItem('users')
        this.buildAlert('success', 'Usuario creado con éxito.')

        return this.clearInputs()
      } */



    if (body == USED_EMAIL_ERROR) {
      return this.buildAlert(
        'attention',
        'Este usuario ya ha sido creado. Pruebe con un nuevo correo.'
      )
    }

    /* return this.buildAlert('error', ERROR_MESSAGE) */
  }

  createUser = () => {
    this.close()

    // Verify that the required fields are filled
    if (!this.checkMandatoryInputs()) {
      setTimeout(() => this.buildAlert('attention', MANDATORY_MESSAGE), 10)
      return
    }

    // Verify that the email format is valid
    if (!validateEmail(this.state.email)) {
      setTimeout(() => this.buildAlert('attention', EMAIL_MESSAGE), 10)
      return
    }

    // Verify strings
    if (
      !validateString(this.state.email) ||
      !validateString(this.state.user_name) ||
      !validateString(this.state.password)
    ) {
      setTimeout(() => this.buildAlert('attention', INVALID_STRING_MESSAGE), 10)
      return
    }

    // Verify that the password has been entered correctly
    if (this.state.password != this.state.password_check) {
      setTimeout(
        () =>
          this.buildAlert(
            'attention',
            'Las contraseñas no coinciden. Por favor, verifíquelas.'
          ),
        10
      )
      return
    }

    let body = {
      email: this.state.email,
      userName: this.state.user_name,
      rol: this.state.rol,
      password: this.state.password,
    }

    return simpleRequest(CREATE_USER, 'POST', body, this.responseHandler)
  }

  // Auxiliary functions
  checkMandatoryInputs() {
    if (!this.state.email) {
      return false
    }

    if (!this.state.user_name) {
      return false
    }


    if (!this.state.password) {
      return false
    }

    if (!this.state.password_check) {
      return false
    }

    return true
  }

  showPasswd(event) {
    let container, icon, input

    if (
      event.target.id == 'eye-icon-container-1' ||
      event.target.id == 'eye-icon-1'
    ) {
      container = document.getElementById('eye-icon-container-1')
      icon = document.getElementById('eye-icon-1')
      input = document.getElementById('password')
    } else {
      container = document.getElementById('eye-icon-container-2')
      icon = document.getElementById('eye-icon-2')
      input = document.getElementById('password_check')
    }

    if (input.attributes.type.value == 'password') {
      input.attributes.type.value = 'text'
      container.style.backgroundColor = '#b31d1d'
      icon.attributes.src.value = './eye_white.png'
    } else {
      input.attributes.type.value = 'password'
      container.style.backgroundColor = '#f2f4f7'
      icon.attributes.src.value = './eye_gray.png'
    }

    return
  }


    render() {
        return (
          <div className='lg-container'>
            {this.state.alert}
            <div className='lg-card'>
              <div className='lg-content'>
                <div className='recp-header'>
                  <span className='lg-title'>
                    Registro
                  </span>
                  <span className='lg-text'>
                    Diligencie el formulario para registrarse en el aplicativo.
                  </span>
                </div>				
                  <div className="lg-form">
                    <div className="form-register__body">
                    <div className="step active" id="step-1">
                      <div className="step__body">
                        <span className='global-form-label'>Nombre Completo</span>
                        <strong className='global-form-mandatory'> *</strong>
                        <input
                          id='user_name'
                          className='global-form-input'
                          type='text'
                          value= {this.state.user_name}
                          onChange={this.handleChange}
                        />
                      </div>
    
                      <div className="step__body">
                        <span className='global-form-label'>Correo electrónico</span>
                        <strong className='global-form-mandatory'> *</strong>
                        <input
                          id='email'
                          className='global-form-input'
                          type='email'
                          value= {this.state.email}
                          onChange={this.handleChange}
                        />
                      </div>
    
                      <div className="step__body">
                        <span className='global-form-label'>
                          Contraseña
                          <strong className='global-form-mandatory'> *</strong>
                        </span>
                        <div className='global-form-input-group'>
                          <input
                            id='password'
                            type='password'
                            className='global-form-input'
                            value={this.state.password}
                            onChange={this.handleChange}
                          />
                          <div
                            id='eye-icon-container-1'
                            className='global-form-img-container'
                            style={{ cursor: 'pointer' }}
                            onClick={this.showPasswd}
                          >
                          <img
                            id='eye-icon-1'
                            className='global-form-img'
                            src='./eye_gray.png'
                            alt='eye'
                          />
                          </div>
                        </div>
                      </div>
    
                      <div className="step__body">
                        <span className='global-form-label'>
                          Confirme contraseña
                          <strong className='global-form-mandatory'> *</strong>
                        </span>
                        <div className='global-form-input-group'>
                          <input
                            id='password_check'
                            type='password'
                            className='global-form-input'
                            value={this.state.password_check}
                            onChange={this.handleChange}
                          />
                        <div
                          id='eye-icon-container-2'
                          className='global-form-img-container'
                          style={{ cursor: 'pointer' }}
                          onClick={this.showPasswd}
                        >
                        <img
                          id='eye-icon-2'
                          className='global-form-img'
                          src='./eye_gray.png'
                          alt='eye'
                        />
                      </div>
                  </div>
                      </div>
    
                      <div className="step__footer">
                      <button
                        className='global-form-solid-button'
                        onClick={this.createUser}
                        >
                        Enviar
                      </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
}


export default Register