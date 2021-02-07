describe("Redirects from event page due to login required", () => {
  it("should have url /events", () => {
    // test code, will naturally redirect to sign-in
    cy.visit("/events");
    cy.url().should("include", "/events");
  });
  it("should be redirected to /sign-in", () => {
    cy.url().should("include", "/sign-in");
  });
  it("should have a h1 of 'Login' due to redirecting", () => {
    cy.get("h1").should("have.text", "Login");
  });
});
