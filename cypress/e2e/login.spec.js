// import { userBuilder } from "../support/generate";

describe("Clicking on Login", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.findByText(/Sign In/).click();
  });
  it("should go to the login page", () => {
    cy.url().should("include", "/sign-in");
  });
  it("renders form inputs", () => {
    cy.visit("/sign-in");
    cy.get("h1").should("have.text", "Login");
    cy.findByLabelText(/email/i).should("be.visible");
    cy.findByLabelText(/password/i).should("be.visible");
  });
  it("should be able to type into email and password inputs", () => {
    // const { email, password } = userBuilder();
    cy.findByLabelText(/email/i)
      .type("test@gmail.com")
      .should("contain.value", "test@gmail.com");
    cy.findByLabelText(/password/i)
      .type("password")
      .should("contain.value", "password");
  });
  //   it("should be able to type into email and password inputs", () => {
  //     const { email, password } = userBuilder();
  //     cy.findByLabelText(/email/i).type(email).should("contain.value", email);
  //     cy.findByLabelText(/password/i)
  //       .type(password)
  //       .should("contain.value", password);
  //   });
});

describe("with the correct login credentials user", () => {
  before(() => {
    cy.fixture("user.json").then((user) => {
      cy.visit("/sign-in");
      cy.findByLabelText(/email/i).type(user.email);
      cy.findByLabelText(/password/i).type(user.password);
    });
  });

  //   it("should be able to click on submit and be navigated to root /", () => {
  //     cy.get("form").submit();
  //     cy.url().should("eql", "http://localhost:8080/");
  //   });

  after(() => {
    // we need to clean up after we run the tests
    window.localStorage.removeItem("token");
    window.sessionStorage.removeItem("auth");
  });
});
