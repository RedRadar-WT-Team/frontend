describe("Create Account Form", () => {
  beforeEach(() => {
    cy.visit("/create-account"); 
  });

  it("renders the form correctly", () => {
    cy.get("h2").should("contain", "Create account");

    cy.get("input[type=email]").should("exist");

    cy.get("select").should("exist");

    cy.get("input[type=text]").should("exist");

    cy.get("button[type=submit]").should("contain", "Create Account");
  });

  it("should allow a user to fill out the form and submit", () => {
    const testEmail = "test@example.com";
    const testZip = "12345";
    const testState = "California";

    cy.get("input[type=email]").type(testEmail);

    cy.get("select").select(testState);

    cy.get("input[type=text]").type(testZip);

    cy.get("button[type=submit]").click();

    cy.intercept("POST", "http://localhost:3000/create_account", {
      statusCode: 200,
      body: { message: "Account created successfully" },
    }).as("createAccountRequest");

    cy.wait("@createAccountRequest").its("response.statusCode").should("eq", 200);
  });

  it("should show an error if the API call fails", () => {
    cy.intercept("POST", "http://localhost:3000/create_account", {
      statusCode: 500,
      body: { message: "Server error" },
    }).as("createAccountRequest");

    cy.get("input[type=email]").type("test@example.com");
    cy.get("select").select("California");
    cy.get("input[type=text]").type("12345");

    cy.get("button[type=submit]").click();

    cy.wait("@createAccountRequest");

    cy.get("body").should("not.contain", "Account created successfully");
  });

  it("validates zip code input", () => {
    cy.get("input[type=email]").type("test@example.com");
    cy.get("select").select("California");
    cy.get("input[type=text]").type("123"); 

    cy.get("button[type=submit]").click();

    cy.get("input[type=text]").then(($input) => {
      const pattern = $input.attr("pattern");
      expect(pattern).to.equal("[0-9]{5}");
      cy.get("input[type=text]:invalid").should("exist"); // Check if the input is invalid
    });
  });
});
