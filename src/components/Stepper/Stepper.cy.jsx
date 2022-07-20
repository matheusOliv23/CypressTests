import Stepper from "./index";

// Set up some constants for the selectors
const counterSelector = "[data-cy=counter]";
const incrementSelector = "[aria-label=increment]";
const decrementSelector = "[aria-label=decrement]";

describe("<Stepper>", () => {



  it("mounts", () => {
    cy.mount(<Stepper />);
  });

  it("deve ter como valor inicial o 0", () => {
    cy.mount(<Stepper />);
    cy.get(counterSelector).should("have.text", "0");
  });

  it("deve ter uma prop inicial para atribuir um valor", () => {
    cy.mount(<Stepper initial={500} />);
    cy.get(counterSelector).should("have.text", "500");
  });

  it("ao clicar no botão +, o contador incrementa um valor", () => {
    cy.mount(<Stepper />);
    cy.get(incrementSelector).click();
    cy.get(counterSelector).should("have.text", "1");
  });

  it("ao clicar no botão -, o contador diminui um valor", () => {
    cy.mount(<Stepper />);
    cy.get(decrementSelector).click();
    cy.get(counterSelector).should("have.text", "-1");
  });

  it("ao clicar em diminuir ou acrescentar os valores são mudados conforme espera-se", () => {
    cy.mount(<Stepper initial={100} />);
    cy.get(counterSelector).should("have.text", "100");
    cy.get(incrementSelector).click();
    cy.get(counterSelector).should("have.text", "101");
    cy.get(decrementSelector).click().click();
    cy.get(counterSelector).should("have.text", "99");
  });

  it("clicando em + causa uma mudança de evento com o valor incrementado", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(<Stepper onClick={onChangeSpy} />);
    cy.get(incrementSelector).click();
    cy.get("@onChangeSpy").should("have.been.calledWith", 1);
  });
});
