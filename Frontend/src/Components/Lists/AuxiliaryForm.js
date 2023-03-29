import React, { Component } from "react";
import "./Styles.css";

class AuxiliaryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idArticle: 0,
      idCategory: 0,
      form_name: "Nuevo Link",
      links: [],
    };
  }

  componentDidMount() {
    localStorage.setItem(this.props.id, "incomplete");
  }

  componentWillUnmount() {
    localStorage.setItem(this.props.id, "delete");
  }

  // Functions to handle states
  handleChange = (event) => {
    let comp_attribute = event.target.id.split("-");
    let attribute = comp_attribute[1];
    let value = event.target.value;

    this.setState({ [attribute]: value });
    this.props.onChange({ id: attribute, value });
    console.log(event.target);
    //return this.setSecondaryForm(attribute, value)
  };

  setSecondaryForm = (attribute, value) => {
    let body = {
      key: this.props.id,
      idCategory: this.props.idCategory,
    };

    body[attribute] = value;
    return this.props.setSecondaryForm(body);
  };

  collapse = () => {
    let component = document.getElementById(this.props.id);

    if (component.style.display == "block") {
      component.style.display = "none";
      return;
    }

    component.style.display = "block";
    return;
  };

  delete = () => {
    return this.props.delete(this.props.id);
  };

  checkMandatoryInputs() {
    return true;
  }

  render() {
    return (
      <div className="af-container">
        <div className="af-header-container">
          <img
            className="af-delete-icon"
            src="./remove_gray.png"
            alt="delete"
            onClick={this.delete}
          />
          <div className="af-header">
            <span className="af-header-title">{this.state.form_name}</span>
            <img
              className="af-arrow-icon"
              src="./arrow_gray.png"
              alt="arrow"
              onClick={this.collapse}
            />
          </div>
        </div>
        <div
          id={this.props.id}
          className="af-body-container"
          style={{ display: "none" }}
        >
          <div className="global-form-group">
            <span className="global-form-label">
              Ingresa el link
              <strong className="global-form-mandatory"> *</strong>
            </span>
            <input
              id={this.props.id}
              type="text"
              className="global-form-input"
              value={this.state.link}
              onChange={this.handleChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default AuxiliaryForm;
