describe("SMOKE TEST - Skatepark", () => {
	it("Carga de la Pagina Principañ", () => {
		cy.visit("https://skatepark-g13-jp.herokuapp.com/");
		cy.contains("Skate Park");
	});
});

describe("Test Completar Login", () => {
	it("Test a Un Input", () => {
		cy.visit("https://skatepark-g13-jp.herokuapp.com/Login");
        
        cy.get("input:first").type("me@me.com");
        cy.get("input:last").type("123");

        cy.contains("Ingresar").click();

	});
    
	it("Test a Un Click", () => {
        cy.contains("Ingresar").click();

	});
});
