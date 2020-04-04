import React, { Component } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Container, Item } from "../Grid";

export const StyledTextField = styled(TextField)`
  && {
    min-width: 250px;
  }
`;

class LobbyLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changingPlayerName: props.playerName
    };
  }

  handlePlayerNameChange = ({ target: { value } }) => {
    this.setState({ changingPlayerName: value });
  };

  handleLogin = () => {
    // TODO add user to AUTH server
    this.props.onLogin(this.state.changingPlayerName);
  };

  getErrorMessage = (changingPlayerName, playersNames) => {
    if (!changingPlayerName) {
      return "Name must be not empty";
    }
    if (!/^\w+$/.test(changingPlayerName)) {
      return "Name must have only latin letters, digits and _";
    }
    if (changingPlayerName.length > 15) {
      return "Name must be less than 15 characters";
    }
    // TODO load players names from AUTH server
    if (playersNames.includes(changingPlayerName)) {
      return "Name is already taken";
    }
    return null;
  };

  render() {
    const { changingPlayerName } = this.state;
    const { playersNames } = this.props;

    const errorMessage = this.getErrorMessage(changingPlayerName, playersNames);
    const hasError = !!errorMessage;

    return (
      <Container column alignItems="center">
        <Item>
          <StyledTextField
            label="Enter unique name"
            error={hasError}
            helperText={errorMessage}
            margin="normal"
            value={changingPlayerName}
            variant="outlined"
            onKeyPress={({ key }) =>
              !hasError && key === "Enter" && this.handleLogin()
            }
            onChange={this.handlePlayerNameChange}
          />
        </Item>
        <Item>
          <Button
            disabled={hasError}
            color="primary"
            size="large"
            variant="extendedFab"
            onClick={this.handleLogin}
          >
            Login
          </Button>
        </Item>
      </Container>
    );
  }
}

export default LobbyLogin;