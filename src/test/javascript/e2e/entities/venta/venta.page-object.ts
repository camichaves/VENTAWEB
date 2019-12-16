import { element, by, ElementFinder } from 'protractor';

export class VentaComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-venta div table .btn-danger'));
  title = element.all(by.css('jhi-venta div h2#page-heading span')).first();

  async clickOnCreateButton() {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton() {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class VentaUpdatePage {
  pageTitle = element(by.id('jhi-venta-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  montoInput = element(by.id('field_monto'));
  clienteSelect = element(by.id('field_cliente'));
  tarjetaSelect = element(by.id('field_tarjeta'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setMontoInput(monto) {
    await this.montoInput.sendKeys(monto);
  }

  async getMontoInput() {
    return await this.montoInput.getAttribute('value');
  }

  async clienteSelectLastOption() {
    await this.clienteSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async clienteSelectOption(option) {
    await this.clienteSelect.sendKeys(option);
  }

  getClienteSelect(): ElementFinder {
    return this.clienteSelect;
  }

  async getClienteSelectedOption() {
    return await this.clienteSelect.element(by.css('option:checked')).getText();
  }

  async tarjetaSelectLastOption() {
    await this.tarjetaSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async tarjetaSelectOption(option) {
    await this.tarjetaSelect.sendKeys(option);
  }

  getTarjetaSelect(): ElementFinder {
    return this.tarjetaSelect;
  }

  async getTarjetaSelectedOption() {
    return await this.tarjetaSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class VentaDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-venta-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-venta'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
