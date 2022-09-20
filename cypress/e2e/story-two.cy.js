describe("Iterate over elements", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(".bt-modal-toggle").click({
      scrollBehavior: false,
    });
    cy.verifyFiltersValues("0");
  });

  it("The Filters selection should allow the user to select the number of either bedrooms and/or bathrooms", () => {
    //click on decrease both values to 1 and verify text
    cy.get('[aria-label="0 Minimum Bedrooms, decrease"]').click();
    cy.get('[aria-label="0 Minimum Bathrooms, decrease"]').click();
    cy.verifyFiltersValues("0");
  });

  it("The Clear Filters button should reset both filters to their lower value", () => {
    //increase both values to 1 and verify text
    cy.get('[aria-label="0 Minimum Bedrooms, increase"]').click();
    cy.get('[aria-label="0 Minimum Bathrooms, increase"]').click();
    cy.verifyFiltersValues("1");

    //click on clear filters button and verify if text is 0
    cy.get(".bt-clear-filters").click({ force: true });
    cy.verifyFiltersValues("0");
  });

  it.only("The View Results button should close the Filter Results page and display meeting criteria.", () => {
    //Filter out booking
    cy.get('[aria-label="0 Minimum Bedrooms, increase"]')
      .click()
      .click()
      .click()
      .click()
      .click()
      .click();
    cy.get('[aria-label="0 Minimum Bathrooms, increase"]')
      .click()
      .click()
      .click()
      .click()
      .click();
    //Static wait added cause counter of filtered bookings needs time for refresh, no option to use dynamic waiton
    cy.wait(500);
    //Verify if number of records is the same for filter modal and view
    cy.get(`div[role='dialog'] strong`).then(($el) => {
      const text = $el.text();

      cy.get(".bt-modal-toggle--close").click();
      cy.get(`div[role='dialog']`).should("not.exist");
      cy.get("strong").should("have.text", text);
    });
    cy.get(".bt-teaser__info").then(($el) => {
      const text = $el.text();

      cy.validateFilteredOptions(text, 6, 5).should("be.true");
    });
  });
});
