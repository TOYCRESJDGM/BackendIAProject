import React, { Component } from 'react'
import {
  IMAGE_HOST
} from '../../Functions/Constants'
import './Styles.css'

class Modal extends Component {
  constructor() {
    super()
    this.state = {}
  }

  closeModal = () => {
    return this.props.closeModal()
  }

  render() {
    return (
      <div className='global-modal-background'>
        <div className='global-modal-container'>
          <div className='global-modal-header'>
            <span className='global-modal-title'>Información</span>
            <img
              className='global-modal-icon'
              src='./close_white.png'
              alt='close'
              onClick={this.closeModal}
            />
          </div>
          <div className='global-modal-body'>
            <div className='global-modal-group-container'>
              <span className='global-form-label'>Título</span>
              <span className='global-modal-text'>
                {this.props.title}
              </span>
            </div>
            <div className='global-modal-group-container'>
              <span className='global-form-label'>Link</span>
              <span className='global-modal-text'>
              {this.props.link}
              </span>
            </div>
            <div className='global-modal-group-container'>
              <span className='global-form-label'>Descripción</span>
              <span className='global-modal-text'>
              {this.props.description}
              </span>
            </div>
            <div className='global-modal-group-container'>
              <span className='global-form-label'>Categoría</span>
              <span className='global-modal-text'>
              {this.props.category}
              </span>
            </div>
            <div className='global-modal-group-container'>
              <span className='global-form-label'>Imagen</span>
              <span className='global-modal-text'>
                <img src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" width={300} height={200}/>
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal
