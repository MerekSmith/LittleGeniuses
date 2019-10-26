import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import CloseIcon from "@material-ui/icons/Close";
import { amber, green } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";

const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon
};

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.main
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
}));

function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby='client-snackbar'
      message={
        <span id='client-snackbar' className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key='close'
          aria-label='close'
          color='inherit'
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  );
}

function SlideTransition(props) {
  return <Slide {...props} direction='right' />;
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(["error", "info", "success", "warning"]).isRequired
};

export default function CustomizedSnackbars(props) {
  const { successOpen, handleSuccessClose, message } = props;

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={successOpen}
        autoHideDuration={8000}
        onClose={handleSuccessClose}
      >
        <MySnackbarContentWrapper
          onClose={handleSuccessClose}
          variant='success'
          TransitionComponent={SlideTransition}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id='message-id'>{message}</span>}
        />
      </Snackbar>
      {/* <MySnackbarContentWrapper
        variant='error'
        className={classes.margin}
        message='This is an error message!'
      /> */}
    </div>
  );
}
