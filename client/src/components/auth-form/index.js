import React, { useState } from "react";
import { Card, Box, CircularProgress } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import GoogleButton from "../googleButton";
import { ValidationTextField, useStyles } from "./styles";
import { PrimaryButton } from "../cutomButtons/buttons";
import AuthFormFooter from "./authFormFooter";

export default function AuthForm({
  location,
  emailSignInStart,
  googleSignInStart,
  signUpStart,
  isLoggingIn,
}) {
  const classes = useStyles();
  const [action, setAction] = useState(location.state);
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    showPassword: false,
  });

  const formRef = React.useRef();

  const handleClick = (value) => {
    setAction(value);
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword });
  };
  const handleSignInAndUp = (e) => {
    if (formRef.current.reportValidity()) {
      const { name, email, password } = state;
      isSignUp
        ? signUpStart({ name, email, password })
        : emailSignInStart(email, password);
    }
  };

  const { name, email, password, showPassword } = state;
  const isSignUp = action === "sign up";

  return (
    <div className={classes.form}>
      <Card className={classes.formCard}>
        <h1 className={classes.formHeading}>{action || "sign in"}</h1>
        <form className={classes.root} autoComplete="off" ref={formRef}>
          {isSignUp && (
            <div>
              <ValidationTextField
                className={classes.margin}
                name="name"
                label="Name"
                value={name}
                onChange={handleChange}
                type="text"
                required
                variant="outlined"
              />
            </div>
          )}
          <div>
            <ValidationTextField
              className={classes.margin}
              name="email"
              label="Email"
              value={email}
              onChange={handleChange}
              type="email"
              required
              variant="outlined"
            />
          </div>
          <div className={classes.passwordContainer}>
            <div className={classes.password}>
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </div>

            <ValidationTextField
              className={classes.margin}
              name="password"
              label="password"
              value={password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              required
              variant="outlined"
            />
          </div>
          <Box display="flex" mt={2} mb={4}>
            <Box mr={2}>
              <GoogleButton
                view={action || "sign in"}
                onClick={googleSignInStart}
              />
            </Box>
            <PrimaryButton
              id="signUp"
              variant="contained"
              size="large"
              onClick={handleSignInAndUp}
              disabled={isLoggingIn}
            >
              {!isLoggingIn ? (
                action || "sign in"
              ) : (
                <CircularProgress color="white" size={15} />
              )}
            </PrimaryButton>
          </Box>
          <AuthFormFooter {...{ isSignUp, handleClick, classes }} />
        </form>
      </Card>
    </div>
  );
}
