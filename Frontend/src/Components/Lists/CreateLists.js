import React, { Component } from "react";
import "./Styles.css";

import Alert from "../Alerts/Alert";
import AuxiliaryForm from "./AuxiliaryForm";
import { validateString, setSelectOptions2 } from "../../Functions/Helpers";
import { simpleRequest } from "../../Functions/Post";
import { getCategories } from "../../Functions/Get";
import {
  CREATE_LIST,
  MANDATORY_MESSAGE,
  ERROR_MESSAGE,
  ALERT_TIMEOUT,
  INVALID_STRING_MESSAGE,
  NO_ITEMS_ERROR,
} from "../../Functions/Constants";

class CreateList extends Component {
  constructor() {
    super();
    this.myRef = React.createRef();
    this.state = {
      name: "",
      description: "",
      idCategory: 0,
      user_id: sessionStorage.getItem("user_id"),

      links: [
        <AuxiliaryForm
          id={"sf-1"}
          key={"sf-1"}
          scroll={this.scroll}
          responseHandler={this.responseHandler}
          delete={this.deleteSecondaryForm}
          onChange={this.cambio}
        ></AuxiliaryForm>,
      ],
      links_list_tmp: [],
      links_list: [],
      categories: [],
      cont: 1,
      alert: "",
      timeout: "",
    };
  }

  componentDidMount() {
    getCategories(this.setCategories);
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeout);
  }

  // Functions to handle states
  handleChange = (event) => {
    let attribute = event.target.id;
    let value = event.target.value;

    if (attribute == "idCategory") {
      sessionStorage.setItem("idCategory", value);
    }
    return this.setState({ [attribute]: value });
  };

  cambio = (props) => {
    let lista = this.state.links_list_tmp;

    if (lista.length > 0) {
      let encontrado = false;

      for (let index = 0; index < lista.length; index++) {
        const element = lista[index];

        if (element.id == props.id) {
          element.value == props.value;

          lista[index].value = props.value;
          encontrado = true;
          break;
        }
      }
      if (!encontrado) {
        lista.push(props);
      }
    } else {
      lista.push(props);
    }

    this.setState({ ...this.state, links_list_tmp: lista });
    /* console.log(lista); */
  };

  clearInputs = () => {
    this.setState({
      idCategory: 0,
      name: "",
      description: "",
      cont: 1,
      links: [],
    });

    let array = [];
    array.push(
      <AuxiliaryForm
        id={"sf-1"}
        key={"sf-1"}
        scroll={this.scroll}
        responseHandler={this.responseHandler}
        delete={this.deleteSecondaryForm}
        onChange={this.cambio}
      />
    );

    return this.setState({
      links: array,
    });
  };

  setCategories = (response, body) => {
    if (response == "success") {
      return this.setState({ categories: body });
    }

    if (body == NO_ITEMS_ERROR) {
      return this.buildAlert("attention", "No hay categorias creadas");
    }

    return this.buildAlert("error", ERROR_MESSAGE);
  };

  scroll = () => {
    this.myRef.current.scrollIntoView({ behavior: "smooth" });
  };

  componentWillUnmount() {
    localStorage.clear();
    clearTimeout(this.state.timeout);
  }

  // Functions to handle alerts
  close = () => {
    return this.setState({ alert: "" });
  };

  buildAlert = (type, text) => {
    clearTimeout(this.state.timeout);

    this.setState({
      timeout: setTimeout(() => this.setState({ alert: "" }), ALERT_TIMEOUT),
    });

    return this.setState({
      alert: <Alert type={type} text={text} close={this.close} />,
    });
  };

  // Functions related to requests
  responseHandler = (response, body) => {
    if (response == "success") {
      this.buildAlert("success", "Lista creada con éxito.");
      return this.clearInputs();
    }

    return this.buildAlert("error", body);
  };

  createList = () => {
    this.close();
    this.scroll();

    // Verify that the required fields are filled
    if (!this.checkMandatoryInputs()) {
      setTimeout(() => this.buildAlert("attention", MANDATORY_MESSAGE), 10);
      return;
    }

    const links = this.state.links_list_tmp.map((link) => link.value);

    let body = {
      name: this.state.name,
      description: this.state.description,
      idCreationUser: this.state.user_id,
      idCategory: this.state.idCategory,
      links: links,
    };
/* 
    console.log(body); */

    return simpleRequest(CREATE_LIST, "POST", body, this.responseHandler);
  };

  // Auxiliary functions
  checkMandatoryInputs() {
    if (!this.state.name) {
      return false;
    }

    if (!this.state.idCategory) {
      return false;
    }

    if (!this.state.description) {
      return false;
    }

    return true;
  }

  addNewSecondaryForm = () => {
    let array = this.state.links;
    let newCont = this.state.cont + 1;

    array.push(
      <AuxiliaryForm
        id={"sf-" + newCont}
        key={"sf-" + newCont}
        scroll={this.scroll}
        responseHandler={this.responseHandler}
        delete={this.deleteSecondaryForm}
        onChange={this.cambio}
      />
    );

    return this.setState({ links: array, cont: newCont });
  };

  deleteSecondaryForm = (key) => {
    if (this.state.links.length == 1) {
      return;
    }

    let array = this.state.links;
    let arrayStates = this.state.links_list_tmp;
    for (let i = 0; i < array.length; i++) {
      if (array[i].key == key) {
        array.splice(i, 1);
        arrayStates.splice(i, 1);
        continue;
      }
    }

    this.setState({ links: [] });
    this.setState({ links_list_tmp: [] });

    return this.setState({ links: array, links_list_tmp: arrayStates });
  };

  enableChildForms = () => {
    let length = this.state.links.length;

    if (length > 0) {
      let array = [];

      for (let i = 0; i < length; i++) {
        array.push(this.state.links[i]);
      }

      return (
        <div className="cb-secondary-form-container">
          {array}
          <div className="cb-secondary-form-add-container">
            <img
              className="cb-add-icon"
              src="./add_gray.png"
              alt="add"
              onClick={this.addNewSecondaryForm}
            />
            <span
              className="sf-header-title"
              style={{ cursor: "pointer" }}
              onClick={this.addNewSecondaryForm}
            >
              Agregar link
            </span>
          </div>
        </div>
      );
    }
    return;
  };

  render() {
    let forms = this.enableChildForms();
    return (
      <div className="ca-container">
        {this.state.alert}
        <span className="global-comp-title" ref={this.myRef}>
          Crear lista
        </span>
        <span className="global-comp-description">
          Diligencie el formulario para crear una nueva lista. Todos los campos
          con <strong className="global-form-mandatory">*</strong>son
          obligatorios
        </span>
        <div
          className="global-comp-form-container"
          encType="multipart/form-data"
        >
          <div className="global-form-group">
            <span className="global-form-label">Nombre</span>
            <input
              id="name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
              className="global-form-input"
            ></input>
          </div>

          <div className="global-form-group">
            <span className="global-form-label">Categoría</span>
            <select
              id="idCategory"
              className="global-form-input-select"
              value={this.state.idCategory}
              onChange={this.handleChange}
            >
              <option value={0} disabled={true}>
                Seleccione una categoría...
              </option>
              {setSelectOptions2(this.state.categories)}
            </select>
          </div>

          <div className="global-form-group">
            <span className="global-form-label">Descripción</span>
            <input
              id="description"
              type="text"
              value={this.state.description}
              onChange={this.handleChange}
              className="global-form-input"
            ></input>
          </div>

          <span className="global-comp-sub-title">LINKS</span>
          {forms}

          <div className="global-form-buttons-container">
            <button
              className="global-form-solid-button"
              onClick={this.createList}
            >
              Enviar
            </button>
            <button
              className="global-form-outline-button"
              onClick={this.clearInputs}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateList;
