import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TarjetaComponentsPage, TarjetaDeleteDialog, TarjetaUpdatePage } from './tarjeta.page-object';

const expect = chai.expect;

describe('Tarjeta e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tarjetaComponentsPage: TarjetaComponentsPage;
  let tarjetaUpdatePage: TarjetaUpdatePage;
  let tarjetaDeleteDialog: TarjetaDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Tarjetas', async () => {
    await navBarPage.goToEntity('tarjeta');
    tarjetaComponentsPage = new TarjetaComponentsPage();
    await browser.wait(ec.visibilityOf(tarjetaComponentsPage.title), 5000);
    expect(await tarjetaComponentsPage.getTitle()).to.eq('ventawebApp.tarjeta.home.title');
  });

  it('should load create Tarjeta page', async () => {
    await tarjetaComponentsPage.clickOnCreateButton();
    tarjetaUpdatePage = new TarjetaUpdatePage();
    expect(await tarjetaUpdatePage.getPageTitle()).to.eq('ventawebApp.tarjeta.home.createOrEditLabel');
    await tarjetaUpdatePage.cancel();
  });

  it('should create and save Tarjetas', async () => {
    const nbButtonsBeforeCreate = await tarjetaComponentsPage.countDeleteButtons();

    await tarjetaComponentsPage.clickOnCreateButton();
    await promise.all([
      tarjetaUpdatePage.setTipoInput('tipo'),
      tarjetaUpdatePage.setNumeroInput('numero'),
      tarjetaUpdatePage.setCodSeguridadInput('5'),
      tarjetaUpdatePage.setFechaVencimientoInput('5'),
      tarjetaUpdatePage.setMontoMaxInput('5'),
      tarjetaUpdatePage.clienteSelectLastOption()
    ]);
    expect(await tarjetaUpdatePage.getTipoInput()).to.eq('tipo', 'Expected Tipo value to be equals to tipo');
    expect(await tarjetaUpdatePage.getNumeroInput()).to.eq('numero', 'Expected Numero value to be equals to numero');
    expect(await tarjetaUpdatePage.getCodSeguridadInput()).to.eq('5', 'Expected codSeguridad value to be equals to 5');
    expect(await tarjetaUpdatePage.getFechaVencimientoInput()).to.eq('5', 'Expected fechaVencimiento value to be equals to 5');
    expect(await tarjetaUpdatePage.getMontoMaxInput()).to.eq('5', 'Expected montoMax value to be equals to 5');
    await tarjetaUpdatePage.save();
    expect(await tarjetaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await tarjetaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Tarjeta', async () => {
    const nbButtonsBeforeDelete = await tarjetaComponentsPage.countDeleteButtons();
    await tarjetaComponentsPage.clickOnLastDeleteButton();

    tarjetaDeleteDialog = new TarjetaDeleteDialog();
    expect(await tarjetaDeleteDialog.getDialogTitle()).to.eq('ventawebApp.tarjeta.delete.question');
    await tarjetaDeleteDialog.clickOnConfirmButton();

    expect(await tarjetaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
