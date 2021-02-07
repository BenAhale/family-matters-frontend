import { cyan } from "@material-ui/core/colors";

describe("Create New Event", () => {
  it("should have the url '/events'", () => {
    cy.visit("/events");
    cy.findByEventLabelText(/name/i).type("Test").should("have.value", "Test");
    cy.findByEventLabelText(/description/i)
      .type("Testing Form")
      .should("have.value", "Testing Form");
  });
});
