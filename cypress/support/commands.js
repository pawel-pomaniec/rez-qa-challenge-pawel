// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//Hide xhr requests
const origLog = Cypress.log;
Cypress.log = function (opts, ...other) {
  if (opts.displayName === "script" || opts.name === "request") {
    return;
  }
  return origLog(opts, ...other);
};

///////CUSTOM COMMANDS

//@counter is total of items added as favorite
Cypress.Commands.add("verifyFiltersValues", (counter) => {
  cy.get(`span#bt-range-value--Minimum\\ Bathrooms`).should(
    "have.text",
    counter
  );
  cy.get(`span#bt-range-value--Minimum\\ Bedrooms`).should(
    "have.text",
    counter
  );
});

//@index is index of card in the view
//@indicator has two values: unflagged or flagged for
//@counter is total of items added as favorite
Cypress.Commands.add(
  "clickFavButtonAndVerifyCounter",
  (index, indicator, counter) => {
    cy.get("[class*=bt-favorite-icon]").eq(index).click();
    cy.get(".bt-teaser").eq(index).children(`.bt-favorite--${indicator}`);
    cy.get(".bt-favorites-link__count").should("have.text", `(${counter})`);
  }
);

//function return true or false, depends if filtered bookings meet filter criteria or not
//@text string to modify
//@bedNo equal value from bedrooms filter
//@bathNo equal value from bathrooms filter
Cypress.Commands.add("validateFilteredOptions", (text, bedNo, bathNo) => {
  let array = [];
  const newText = text.split(" | ").forEach((el) => {
    const numbers = el.replace(/[^\d.-]/g, "");
    array.push(numbers);
  });

  if (array[0] >= bedNo && array[1] >= bathNo) {
    return true;
  } else {
    return false;
  }
});
