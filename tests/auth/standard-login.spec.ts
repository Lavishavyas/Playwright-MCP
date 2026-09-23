import { test, expect } from '../../src/fixtures/base';
import { InventoryPage } from '../../src/pages/InventoryPage';
import { LoginPage } from '../../src/pages/LoginPage';
import users from '../data/users.json';

test.describe('Standard user authentication @smoke @critical', () => {
  test('standard user can log in successfully @smoke @critical', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const credentials = users.standard;

    await test.step('Open the Sauce Demo login page', async () => {
      await loginPage.goto();
    });

    const inventoryPage = await test.step('Log in with the standard user', async () => {
      return loginPage.login(credentials.username, credentials.password);
    });

    await test.step('Verify the inventory page is displayed', async () => {
      await expect(page).toHaveURL(/\/inventory\.html$/);
      await expect(inventoryPage.productsLabel).toBeVisible();
      await expect(inventoryPage.shoppingCart).toBeVisible();
    });
  });
});