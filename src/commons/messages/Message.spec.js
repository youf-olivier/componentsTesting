import React from "react";
import { render } from "@testing-library/react";
import Component from "./Message";

describe("Message test suite", () => {
  const message = "Une erreur est survenue";

  it("renders correctly and contains message", () => {
    const { asFragment, getByTestId } = render(<Component message={message} onClose={() => {}} />);
    expect(asFragment()).toMatchSnapshot();
    expect(getByTestId("mainMessage")).toHaveTextContent(message);
  });
});
