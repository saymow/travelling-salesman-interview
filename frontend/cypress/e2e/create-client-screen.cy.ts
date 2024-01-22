describe("CreateClientScreen", () => {
  it("Should create a client and be redirected to home", () => {
    cy.visit("http://localhost:5173/create-client");
    const name = "name";
    const email = "name@example.com";
    const phone = "99 99999 9999";

    cy.intercept("POST", "http://localhost:3333/clients", {
      statusCode: 201,
    }).as("create-request");

    cy.get('[name="name"]').type(name);
    cy.get('[name="email"]').type(email);
    cy.get('[name="phone"]').type(phone);
    cy.get('[type="submit"]').click();

    cy.wait("@create-request")
      .its("request.body")
      .then((requestBody) => {
        expect(requestBody).to.have.property("name", name);
        expect(requestBody).to.have.property("email", email);
        expect(requestBody).to.have.property("phone", phone);
      });

    cy.url().should("eq", "http://localhost:5173/");
  });
});
