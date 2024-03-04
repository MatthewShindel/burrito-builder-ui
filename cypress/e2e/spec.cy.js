describe("testing burrito page interaction", () => {
	beforeEach(() => {
		cy.intercept("GET", "http://localhost:3001/api/v1/orders", {
      statusCode: 200,
      fixture: "example.json",
    })


		cy.intercept("POST", "http://localhost:3001/api/v1/orders", {
      statusCode: 201,
			body: {
				id: 4,
				name: "Matthew's Test Burrito",
				ingredients: ["beans","carnitas", "pico de gallo","hot sauce"]
			}
    })
	})

  it("should have basic information on the webpage, assuming you just turned on the API ", () => {
    cy.visit("http://localhost:3000/")
		.get('h1').should("have.text", "Burrito Builder")
		.get('p').should('contain', 'Order: Nothing selected')
		cy.get('form button[name]').each(($button) => {
      const expectedName = $button.attr('name');
      expect(expectedName).to.exist;
      expect(expectedName).to.not.be.empty;
    })
		.get('button.submitOrderButton').should('have.text', 'Submit Order')
		.get('section.orderSection div.order').then(($orders) => {
			const ordersLength = $orders.length;
			cy.expect(ordersLength).to.equal(3);
			cy.wrap($orders.first()).within(() => {
				cy.get('h3').should('have.text' , 'Pat')
				.get('ul.ingredient-list').should('contain', 'beans')
				.get('ul.ingredient-list').should('contain', 'lettuce')
				.get('ul.ingredient-list').should('contain', 'carnitas')
				.get('ul.ingredient-list').should('contain', 'queso fresco')
				.get('ul.ingredient-list').should('contain', 'jalapeno')
			})
			cy.wrap($orders.last()).within(() => {
				cy.get('h3').should('have.text' , 'Alex')
				.get('ul.ingredient-list').should('contain', 'sofritas')
				.get('ul.ingredient-list').should('contain', 'beans')
				.get('ul.ingredient-list').should('contain', 'sour cream')
				.get('ul.ingredient-list').should('contain', 'carnitas')
				.get('ul.ingredient-list').should('contain', 'queso fresco')
			})
		})
  });

	it("Should be able to submit an order" , () => {

	})
	
});
