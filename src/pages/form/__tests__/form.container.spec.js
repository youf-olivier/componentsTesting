import React from "react";
import { render, waitForDomChange, fireEvent, waitFor } from "@testing-library/react";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import FormContainer from "../form.container";
import { MessageContext } from "shared/components/messages";

const getWrapper = (message, displayMessage) => ({ children }) => (
  <MessageContext.Provider value={{ message, displayMessage }}>{children}</MessageContext.Provider>
);

const listUsers = [
  {
    id: "01",
    html_url: "http://urluser1",
    avatar_url: "http://urlimageuser1",
    login: "johnpapa",
  },
  {
    id: "02",
    html_url: "http://urluser2",
    avatar_url: "http://urlimageuser2",
    login: "gaearon",
  },
  {
    id: "03",
    html_url: "http://urluser3",
    avatar_url: "http://urlimageuser3",
    login: "kentcdodds",
  },
];

const singleUser = [
  {
    id: "42",
    html_url: "http://urluser42",
    avatar_url: "http://urlimageuser42",
    login: "oyouf",
  },
];

describe("Form container tests suite", () => {
  const mock = new MockAdapter(axios);
  beforeEach(() => {
    mock
      .onGet("https://api.github.com/search/users?q=followers:%3E40000&order=desc&sort=followers")
      .reply(200, { items: listUsers });
    mock
      .onGet("https://api.github.com/search/users?q=user:oyouf")
      .reply(200, { items: singleUser });
  });

  it("should return correct render before request return", async () => {
    const { findAllByTestId } = render(<FormContainer />, {
      wrapper: getWrapper("", () => {}),
    });
    const userCards = await findAllByTestId("usercard");
    expect(userCards.length).toBe(3); //or not to be
  });

  it("should render a single user when search him in the form", async () => {
    let rendering;

    rendering = render(<FormContainer />, {
      wrapper: getWrapper("", () => {}),
    });

    //First Load
    const { getByText, getByLabelText, findAllByTestId, container } = rendering;
    const userCards = await findAllByTestId("usercard");
    expect(userCards.length).toBe(3); //or not to be

    // Search oyouf
    const input = getByLabelText(/Compte Github/i);
    const button = getByText(/rechercher/i);
    await fireEvent.change(input, { target: { value: "oyouf" } });
    await fireEvent.click(button);

    // Result Expected
    await waitForDomChange({ container });
    const userCardsAfterSearch = await findAllByTestId("usercard");
    expect(userCardsAfterSearch.length).toBe(1);
  });

  it("should show message when input empty", async () => {
    let rendering;

    rendering = render(<FormContainer />, {
      wrapper: getWrapper("", () => {}),
    });

    //First Load
    const { container, getByText, findAllByTestId } = rendering;

    // Search empty
    const button = getByText(/rechercher/i);
    fireEvent.click(button);

    // Result Expected
    const userCards = await findAllByTestId("usercard");
    expect(userCards.length).toBe(3);
    expect(container.querySelector(".form__error-message")).not.toBeNull();
  });
});
