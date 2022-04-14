describe("SMOKE TEST - Skatepark", () => {
	it("Carga de la Pagina Principañ", () => {
		cy.visit("http://localhost:3000/");
		cy.contains("Skate Park");
	});
});

describe("Test Completar Login", () => {
	it("Test a Un Input", () => {
		cy.visit("http://localhost:3000/Login");
        
        cy.get("input:first").type("me@me.com");
        cy.get("input:last").type("123");

        cy.contains("Ingresar").click();

	});
    
	it("Test a Un Click", () => {
        cy.contains("Ingresar").click();

	});
});
