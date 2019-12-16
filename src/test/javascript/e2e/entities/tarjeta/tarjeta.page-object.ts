import { element, by, ElementFinder } from 'protractor';

export class TarjetaComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-tarjeta div table .btn-danger'));
  title = element.all(by.css('jhi-tarjeta div h2#page-heading span')).first();

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

export class TarjetaUpdatePage {
  pageTitle = element(by.id('jhi-tarjeta-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  tipoInput = element(by.id('field_tipo'));
  numeroInput = element(by.id('field_numero'));
  codSeguridadInput = element(by.id('field_codSeguridad'));
  fechaVencimientoInput = element(by.id('field_fechaVencimiento'));
  montoMaxInput = element(by.id('field_montoMax'));
  clienteSelect = element(by.id('field_cliente'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTipoInput(tipo) {
    await this.tipoInput.sendKeys(tipo);
  }

  async getTipoInput() {
    return await this.tipoInput.getAttribute('value');
  }

  async setNumeroInput(numero) {
    await this.numeroInput.sendKeys(numero);
  }

  async getNumeroInput() {
    return await this.numeroInput.getAttribute('value');
  }

  async setCodSeguridadInput(codSeguridad) {
    await this.codSeguridadInput.sendKeys(codSeguridad);
  }

  async getCodSeguridadInput() {
    return await this.codSeguridadInput.getAttribute('value');
  }

  async setFechaVencimientoInput(fechaVencimiento) {
    await this.fechaVencimientoInput.sendKeys(fechaVencimiento);
  }

  async getFechaVencimientoInput() {
    return await this.fechaVencimientoInput.getAttribute('value');
  }

  async setMontoMaxInput(montoMax) {
    await this.montoMaxInput.sendKeys(montoMax);
  }

  async getMontoMaxInput() {
    return await this.montoMaxInput.getAttribute('value');
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

export class TarjetaDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-tarjeta-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-tarjeta'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
