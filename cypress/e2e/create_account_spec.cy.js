describe("Create Account Form", () => {
  beforeEach(() => {
    cy.visit("/create_account"); 
  });

  it("renders the form correctly", () => {
    cy.get("h2").should("contain", "Create account");

    cy.get("input[type=email]").should("exist");

    cy.get("select").should("exist");

    cy.get("input[type=text]").should("exist");

    cy.get("button[type=submit]").should("contain", "Create Account");
  });

  xit("should allow a user to fill out the form and submit", () => {
    const testEmail = "test@example.com";
    const testZip = "12345";
    const testState = "California";
    const testStateCode = "CA";

    cy.get("input[type=email]").type(testEmail);
    cy.get("select").select(testState).should('have.value', testStateCode);
    cy.get("input[type=text]").type(testZip);
    cy.get("button[type=submit]").click();

    cy.get("select").debug();

    cy.get("body").should("contain", "Account created successfully");
  });

  xit("should show an error if the API call fails", () => {
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
    cy.get("body").should("contain", "Server error"); // Optional: You can also check for error message on the UI
  });

  it("validates zip code input", () => {
    cy.get("input[type=email]").type("test@example.com");
    cy.get("select").select("California");
    cy.get("input[type=text]").type("123"); // Invalid zip code

    cy.get("button[type=submit]").click();

    cy.get("p").should("contain", "An error occurred while creating your account. Please try again.")

  });

  xit("should show a success message when the account is created", () => {
    const testEmail = "test@example.com";
    const testZip = "12345";
    const testState = "California";
  
    cy.intercept("POST", "http://localhost:3000/create_account", {
      statusCode: 201, // Ensure this matches your backend response
      body: { message: "Account created successfully!" },
    }).as("createAccountRequest");
  
    cy.get("input[type=email]").type(testEmail);
    cy.get("select").select(testState);
    cy.get("input[type=text]").type(testZip);
    cy.get("button[type=submit]").click();
  
    cy.wait("@createAccountRequest")
      .its("response.statusCode")
      .should("eq", 201); // Expect 201 Created status
  
    cy.get("body").should("contain", "Account created successfully!");
  });
});

