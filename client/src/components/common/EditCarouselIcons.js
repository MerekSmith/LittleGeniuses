import React, { Component } from "react";
import { ArrowUpward, ArrowDownward } from "@material-ui/icons";
import axios from "axios";

import UploadCarouselForm from "./UploadCarouselForm";
import DeleteAlert from "./DeleteAlert";

class EditCarouselIcons extends Component {
  handleDeleteClick = id => {
    this.props.deleteCarouselSlide(id);
    this.props.getCarouselSlides();
  };

  handleMove = (id, direction) => {
    let moveDirection = { orderMove: direction };
    axios.put(`/api/carousel/order/${id}`, moveDirection).then(res => {
      this.props.getCarouselSlides();
    });
  };

  render() {
    const {
      slide,
      slideIndex,
      isLastSlide,
      addCarouselSlide,
      updateCarouselSlide
    } = this.props;
    const { _id } = slide;
    const isFirstSlide = slideIndex === 0;

    return (
      <div className='edit-icons rounded' style={{ zIndex: 2 }}>
        {/* Add upload form */}
        <UploadCarouselForm addCarouselSlide={addCarouselSlide} />
        {/* Edit upload form */}
        <UploadCarouselForm
          editMode={true}
          slide={slide}
          addCarouselSlide={addCarouselSlide}
          updateCarouselSlide={updateCarouselSlide}
        />
        {/* Does not show up for the first slide */}
        {!isFirstSlide && (
          <ArrowUpward
            className='move-up-icon'
            fontSize='large'
            onClick={() => this.handleMove(_id, "up")}
          />
        )}
        {/* Does not show up for the last slide */}
        {!isLastSlide && (
          <ArrowDownward
            className='move-down-icon'
            fontSize='large'
            onClick={() => this.handleMove(_id, "down")}
          />
        )}
        <DeleteAlert confirmDelete={this.handleDeleteClick} mongoId={_id} />
      </div>
    );
  }
}

export default EditCarouselIcons;
