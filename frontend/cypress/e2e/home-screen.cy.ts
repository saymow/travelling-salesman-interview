describe("HomeScreen", () => {
  it("Should call the api with the correct search values", () => {
    const searchInput = "Test";

    cy.visit("http://localhost:5173");

    cy.intercept(
      `http://localhost:3333/clients?limit=10&offset=0&q[email]=${searchInput}&q[name]=${searchInput}&q[phone]=${searchInput}`
    ).as("clients-search");

    cy.get(".table-search-text-field").type(searchInput);

    cy.wait("@clients-search");
  });
});
