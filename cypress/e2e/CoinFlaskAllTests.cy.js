describe('Test Main Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080');
    });
    it('check table rows', () => {
        cy.get('.t-body-test').children().should('have.length', 100);
    });

    const getStore = () => cy.window().its('app.$store')


    it('Check currency symbol', () => {
      getStore().its('state.currencySymbol').should('equal', '$')
    })

    it('Check currency symbol as EURO', () => {
        cy.get('.test-dropdown').click({ force: true })
      cy.get('[data-cy="setCurrencyEuro"]').click({ force: true })
      getStore().its('state.currencySymbol').should('equal', '€')
    })

    it('Check currency symbol as YEN', () => {
        cy.get('.test-dropdown').click({ force: true })
      cy.get('[data-cy="setCurrencyYen"]').click({ force: true })
      getStore().its('state.currencySymbol').should('equal', '¥')
    })

    it('Check currency symbol as USD', () => {
        cy.get('.test-dropdown').click({ force: true })
      cy.get('[data-cy="setCurrencyUSD"]').click({ force: true })
      getStore().its('state.currencySymbol').should('equal', '$')
    })

    it('Check marketData Array Length', () => {
      getStore().its('state.marketData').should('have.length', 100);
    })

    it('Check favoriteMarketData Array Length', () => {
      getStore().its('state.favoriteMarketData').should('have.length', 0);
    })

    it('Check searchQuery Array Length', () => {
      getStore().its('state.searchQuery').should('have.length', 0);
    })

    it('Favorite all coins and then unfavorite', () => {
        cy.viewport(1536, 960)
        cy.get('[data-cy="addFavorite"]').click({ multiple: true, force: true })
        getStore().its('state.favoriteMarketData').should('have.length', 100);
        cy.get('[data-cy="removeFavorite"]').click({ multiple: true, force: true })
        getStore().its('state.favoriteMarketData').should('have.length', 0);
    });

    it('Search for ethereum', () => {
        cy.viewport(1536, 960)
        cy.get('[data-cy="searchBar"]').type("ethereum {enter}")
        getStore().its('state.searchResults').should('have.length', 1);
    });

});
