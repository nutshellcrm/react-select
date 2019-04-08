import baseSelectors from '../fixtures/selectors.json';

const selector = {
  caseDefault: '[data-cy="case-default"]',
  caseExpandDown: '[data-cy="case-expand-down"]',
  scrollContainer: '[data-cy="scroll-container"]',
};
//
// const viewport = ['macbook-15', 'iphone-6'];

Cypress.Screenshot.defaults({
  screenshotOnRunFailure: false,
});

describe('Menus', () => {
  before(function() {
    cy.visit('http://localhost:8000/cypress-menu-tests');
  });

  it('test page renders successfully', () => {
    cy.get('h1').should('contain', 'Test Page for React-Select Menus');
  });

  describe('Inside scroll containers', () => {
    describe('by default', () => {
      it('menu should be visible when select is clicked', () => {
        cy.get(selector.caseDefault)
          .find('.react-select__control')
          .click()
          .get(selector.caseDefault)
          .find(baseSelectors.menu)
          .should('be.visible');
      });
    });

    describe('At bottom of container', () => {
      it('menu should be visible when select is clicked', () => {
        cy.get(selector.caseExpandDown)
          .find('.react-select__control')
          .click()
          .get(selector.caseExpandDown)
          .find(baseSelectors.menu)
          .should('be.visible');
      });

      it('scroll container should expland & scroll to bottom', () => {
        cy.get(selector.caseExpandDown)
          .find(selector.scrollContainer)
          .then(scrollContainer => {
            console.log(scrollContainer[0].scrollHeight);
            const originalHeight = scrollContainer[0].scrollHeight;
            cy.get(selector.caseExpandDown)
              .find('.react-select__control')
              .click()
              .then(() => {
                cy.get(selector.caseExpandDown)
                  .find(selector.scrollContainer)
                  .its('scrollHeight')
                  .should('be.gt', originalHeight);
              });
          });
      });
    });
  });
});
