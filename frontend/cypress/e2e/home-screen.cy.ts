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

  it("Should call the api with the correct pagination page values", async () => {
    cy.visit("http://localhost:5173");

    const goToNextPageBtn = cy.get("[title='Go to next page']");
    const goToPreviousPageBtn = cy.get("[title='Go to previous page']");

    cy.fixture("list-clients-response.json").then((body) => {
      cy.intercept(`http://localhost:3333/clients*`, {
        statusCode: 200,
        body,
      });
    });

    cy.intercept(
      `http://localhost:3333/clients?limit=${10}&offset=${10}&q[email]=&q[name]=&q[phone]=`
    ).as("clients-paginate-forward");

    goToNextPageBtn.click();

    cy.wait("@clients-paginate-forward");

    goToNextPageBtn.should("be.disabled");

    cy.intercept(
      `http://localhost:3333/clients?limit=${10}&offset=${0}&q[email]=&q[name]=&q[phone]=`
    ).as("clients-paginate-backward");

    goToPreviousPageBtn.click();

    cy.wait("@clients-paginate-backward");

    goToPreviousPageBtn.should("be.disabled");
  });
});
