import React, { Component } from "react";
import { ArrowUpward, ArrowDownward } from "@material-ui/icons";
import axios from "axios";

import UploadFacilityForm from "./UploadFacilityForm";
import DeleteAlert from "./DeleteAlert";
import BackdropLoader from "./BackdropLoader";

class EditFacilityIcons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  handleDeleteClick = id => {
    this.setState({ isLoading: true });
    this.props.deleteFacilitySlide(id).then(() => {
      this.props
        .getFacilitySlides()
        .then(() => this.setState({ isLoading: false }));
    });
  };

  handleMove = (id, direction) => {
    this.setState({ isLoading: true });
    let moveDirection = { orderMove: direction };
    axios.put(`/api/facility/order/${id}`, moveDirection).then(res => {
      this.props
        .getFacilitySlides()
        .then(() => this.setState({ isLoading: false }));
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
    const { isLoading } = this.state;
    const { _id } = slide;
    const isFirstSlide = slideIndex === 0;

    return (
      <div className='edit-icons rounded' style={{ zIndex: 2, right: "32px" }}>
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
        <BackdropLoader open={isLoading} />
      </div>
    );
  }
}

export default EditFacilityIcons;
