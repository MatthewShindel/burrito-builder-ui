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
		
  });
});
