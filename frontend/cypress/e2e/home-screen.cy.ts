describe("HomeScreen", () => {
  beforeEach(() => {
    cy.fixture("list-clients-response.json").then((body) => {
      cy.intercept(`http://localhost:3333/clients*`, { statusCode: 200, body });
    });

    cy.fixture("path-response.json").then((body) => {
      cy.intercept(`http://localhost:3333/path`, { statusCode: 200, body });
    });
  });

  it("Should display all clients returned from the api", () => {
    cy.visit("http://localhost:5173");

    cy.intercept(`http://localhost:3333/clients*`).as("list-clients");

    cy.wait("@list-clients");
    const tableRows = cy.get(".MuiTableRow-root");

    tableRows.should("have.length", 10 + 1); // + 1 comes because of the header row
  });

  it("Should call the api with the correct search values", () => {
    const searchInput = "Test";

    cy.visit("http://localhost:5173");

    cy.intercept(
      `http://localhost:3333/clients?limit=10&offset=0&q[email]=${searchInput}&q[name]=${searchInput}&q[phone]=${searchInput}`
    ).as("clients-search");

    cy.get(".table-search-text-field").type(searchInput);

    cy.wait("@clients-search");
  });

  it("Should call the api with the correct pagination page values", () => {
    cy.visit("http://localhost:5173");

    const goToNextPageBtn = cy.get("[title='Go to next page']");
    const goToPreviousPageBtn = cy.get("[title='Go to previous page']");

    cy.intercept(
      `http://localhost:3333/clients?limit=${10}&offset=${10}&q[email]=&q[name]=&q[phone]=`
    ).as("clients-paginate-forward");

    goToNextPageBtn.click({ force: true });

    cy.wait("@clients-paginate-forward");

    cy.intercept(
      `http://localhost:3333/clients?limit=${10}&offset=${0}&q[email]=&q[name]=&q[phone]=`
    ).as("clients-paginate-backward");

    goToPreviousPageBtn.click({ force: true });

    cy.wait("@clients-paginate-backward");
  });

  it("Should call the api with the correct pagination limit values", () => {
    cy.visit("http://localhost:5173");

    cy.intercept(
      `http://localhost:3333/clients?limit=${25}&offset=${0}&q[email]=&q[name]=&q[phone]=`
    ).as("clients-change-limit");

    cy.get(".MuiTablePagination-input").click();

    cy.get("#menu- .MuiMenu-list > li:nth-child(2)").trigger("click"); // The "25" li option

    cy.wait("@clients-change-limit");
  });

  it("Should open the path modal on clicking on 'Mostrar Rota' button", () => {
    cy.visit("http://localhost:5173");

    cy.intercept("http://localhost:3333/path").as("show-path");

    cy.wait("@show-path");

    cy.contains("Mostrar Rota").click();

    cy.get(".MuiModal-root .path-modal-container");
  });

  it("Should navigate to CreateClientScreen on clicking on 'Cadastrar Cliente' button", () => {
    cy.visit("http://localhost:5173");

    cy.contains("Cadastrar cliente").click();

    cy.url().should("include", "/create-client");
  });
});
