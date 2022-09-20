describe("Iterate over elements", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Each property should have Favorite on/off button", () => {
    cy.get(".bt-teaser")
      .children()
      .within(() => cy.get("[class*=bt-favorite-icon]"));
  });

  it("Hub should have an indicator on the number of favourites", () => {
    //By default indicator should be equal 0
    cy.get(".bt-favorites-link__count").should("have.text", "(0)");
    //Get first card from the list and buffer text
    cy.get(".bt-teaser")
      .eq(0)
      .then(($el) => {
        const text = $el.text();
        //click on the favorite button and verify counter
        cy.get("[class*=bt-favorite-icon]").eq(0).click();
        cy.get(".bt-favorites-link__count").should("have.text", "(1)");

        //open favorites list and verify name of booking from favorites
        cy.get(".bt-favorites-link__count").click({
          scrollBehavior: false,
        });
        cy.get(".bt-teaser").should("have.text", text);
      });
    //Un-save just added product to card
    cy.get("[class*=bt-favorite-icon]").eq(0).click();
    cy.get(".bt-favorites-link__count").should("have.text", "(0)");
  });

  it("Property is selected, there should be indicator showing property is saved", () => {
    //check if default state favorites counter is 0
    cy.get(".bt-favorites-link__count").should("have.text", "(0)");
    cy.get(".bt-teaser").eq(0).children(".bt-favorite--unflagged");
    //mark first element as favorite and then unmark, verify indicator and counter
    cy.clickFavButtonAndVerifyCounter(0, `flagged`, 1);
    cy.clickFavButtonAndVerifyCounter(0, `unflagged`, 0);
  });
});
