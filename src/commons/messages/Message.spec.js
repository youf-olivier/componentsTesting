import React from "react";
import { render } from "@testing-library/react";
import Component from "./Message";

describe("Message test suite", () => {
  const message = "Une erreur est survenue";

  it("renders correctly", () => {
    const { debug } = render(
      <Component message={message} onClose={() => {}} />
    );
    debug();
  });
});
