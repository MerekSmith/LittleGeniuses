import React, { Component } from "react";
import { ArrowUpward, ArrowDownward } from "@material-ui/icons";
import axios from "axios";

import UploadFacilityForm from "./UploadFacilityForm";
import DeleteAlert from "./DeleteAlert";

class EditFacilityIcons extends Component {
  handleDeleteClick = id => {
    this.props.deleteFacilitySlide(id);
    this.props.getFacilitySlides();
  };

  handleMoveUp = id => {
    let moveDirection = { orderMove: "up" };
    axios.put(`/api/facility/order/${id}`, moveDirection).then(res => {
      this.props.getFacilitySlides();
    });
  };

  handleMoveDown = id => {
    let moveDirection = { orderMove: "down" };
    axios.put(`/api/facility/order/${id}`, moveDirection).then(res => {
      this.props.getFacilitySlides();
    });
  };

  render() {
    const {
      slide,
      slideIndex,
      isLastSlide,
      addFacilitySlide,
      updateFacilitySlide
    } = this.props;
    const { _id } = slide;
    const isFirstSlide = slideIndex === 0;

    return (
      <div className='edit-icons rounded' style={{ zIndex: 2 }}>
        {/* Add upload form */}
        <UploadFacilityForm addFacilitySlide={addFacilitySlide} />
        {/* Edit upload form */}
        <UploadFacilityForm
          editMode={true}
          slide={slide}
          addFacilitySlide={addFacilitySlide}
          updateFacilitySlide={updateFacilitySlide}
        />
        {/* Does not show up for the first slide */}
        {!isFirstSlide && (
          <ArrowUpward
            className='move-up-icon'
            fontSize='large'
            onClick={() => this.handleMoveUp(_id)}
          />
        )}
        {/* Does not show up for the last slide */}
        {!isLastSlide && (
          <ArrowDownward
            className='move-down-icon'
            fontSize='large'
            onClick={() => this.handleMoveDown(_id)}
          />
        )}
        <DeleteAlert confirmDelete={this.handleDeleteClick} mongoId={_id} />
      </div>
    );
  }
}

export default EditFacilityIcons;
