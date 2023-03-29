import React, { Component } from 'react'
import './Styles.css'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material'
import Modal from './Modal';

import Alert from '../Alerts/Alert'
import { getElements, getLists } from '../../Functions/Get'
import { getElementById } from '../../Functions/Get'
import { simpleRequest } from '../../Functions/Post'
import { simpleAlert } from '../../Functions/SwalAlert'
import { setSelectOptions2 } from '../../Functions/Helpers'
import {
  LIST_PAGES,
  LIST_PAGES_BYID,
  ALERT_TIMEOUT,
  NO_ITEMS_ERROR,
  NO_ITEM_MESSAGE,
  ERROR_MESSAGE,
  CONFIRM_DELETE_CATEGORY
} from '../../Functions/Constants'

class ListPages extends Component {
  constructor() {
    super()
    this.state = {
      lists: [],
      idList: 0,
      pages: [],
      alert: '',
      timeout: '',
    }
  }

  componentDidMount() {
    let lists = ''
    let session_id = sessionStorage.getItem('user_id')
    let idList = sessionStorage.getItem('idList')

    console.log(idList)

    if (idList == null) {
      sessionStorage.removeItem('idList')
      return getElements('pages', LIST_PAGES + '?user_id=' + session_id, this.setPages)
    } else {
      sessionStorage.removeItem('idList')

      return getElements('pages', LIST_PAGES_BYID + idList, this.setPages)
    }
    /*  getLists(session_id, this.setLists) */
    //getElements('pages', LIST_PAGES + '?user_id=' + session_id, this.setPages)
    //getElements('pages', LIST_PAGES_BYID + idList, this.setPages)

  }

  componentWillUnmount() {
    clearTimeout(this.state.timeout)
  }

  setLists = (response, body) => {
    if (response == 'success') {

      return this.setState({ lists: body })
    }

    if (body == NO_ITEMS_ERROR) {
      return this.buildAlert(
        'attention',
        'No hay listas.'
      )
    }

    return this.buildAlert('error', ERROR_MESSAGE)
  }

  // Functions to handle states
  handleChange = (event) => {
    let attribute = event.target.id
    let value = event.target.value
    let session_id = sessionStorage.getItem('user_id')

    if (attribute == 'idList') {
      let idList = value
      getElements('pages', LIST_PAGES_BYID + idList, this.setPages)
    }
    this.setState({ [attribute]: value })
  }


  routeRemove = (event) => {
    let id = event.target.id.split('-')

    let body = {
      category_id: id[1]
    }

    return simpleAlert(CONFIRM_DELETE_CATEGORY, () => simpleRequest(DELETE_CATEGORY, 'DELETE', body, this.responseHandler));
  }

  responseHandler = (response, body) => {
    if (response == 'success') {
      //getElements('page', LIST_PAGES, this.setPages)
      /* sessionStorage.removeItem('idList') */
      getElements('page', LIST_PAGES_BYID, this.setPages)
      return this.buildAlert(
        'success',
        'La solicitud ha sido procesada exitosamente.'
      );
    }

    return this.buildAlert('error', ERROR_MESSAGE)
  }

  // Functions to handle requests
  setPages = async (response, body) => {
    if (response == 'success') {
      return this.setState({ pages: body.data })
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

  // Functions to handle modal
  showModal(title, description, link, category, linkImage) {
    return this.props.showModal(
      <Modal title={title} description={description} link={link} category={category} linkImage={linkImage} closeModal={this.closeModal} />
    )
  }

  closeModal = () => {
    return this.props.closeModal()
  }


  setTable() {
    let rows = this.state.pages
    let table_rows = []
    for (let i = 0; i < rows.length; i++) {
      let obj = rows[i]

      table_rows.push(
        <div key={'card' + obj.id}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Card sx={{ minWidth: 320, maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  alt="imagen"
                  height="140"
                  image={obj.linkImage}
                />
                <CardContent>
                  <Typography className='global-comp-title' gutterBottom variant="h5" component="div">
                    {obj.title}
                  </Typography>
                  <Typography className='global-comp-description' variant="body2" color="text.secondary">
                    {obj.link}
                  </Typography>
                </CardContent>
                <CardActions>
                  <span
                    className='global-table-link'
                    onClick={() => this.showModal(obj.title, obj.description, obj.link, obj.category, obj.linkImage)}
                  >
                    Ver más
                  </span>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </div>
      )

    }

    let table = (
      <div className='container'>
        {table_rows}
      </div>
    )



    return table
  }


  render() {
    let table = this.setTable()
    return (
      <div className='ca-container'>
        {this.state.alert}
        <span className='global-comp-title'>Lista de páginas</span>
        <span className='global-comp-description'>
          Aquí podrá ver todas las páginas compartidas.
        </span>
       
        
        <div className='container'>
          {table}
        </div>

      </div>

    );
  }
}

export default ListPages
