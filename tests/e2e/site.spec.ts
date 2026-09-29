// Pruebas end-to-end (Playwright). Ejecutar con: npx playwright test
// Requiere: npm i -D @playwright/test && npx playwright install
import { expect, test } from "@playwright/test";

const BASE = process.env["BASE_URL"] ?? "http://localhost:4173";

test.beforeEach(async ({ page }) => {
  await page.goto(BASE);
});

test("1. el título de la página menciona WiMAX", async ({ page }) => {
  await expect(page).toHaveTitle(/WiMAX/);
});

test("2. el hero muestra ZenithSpace", async ({ page }) => {
  await expect(page.getByRole("heading", { level: 1, name: "ZenithSpace" })).toBeVisible();
});

test("3. el home lista las últimas 3 publicaciones", async ({ page }) => {
  await expect(page.locator("#ultimas article")).toHaveCount(3);
});

test("4. la sección «WiMAX en números» es visible", async ({ page }) => {
  await expect(page.getByRole("heading", { name: "WiMAX en números" })).toBeVisible();
});

test("5. navega a Historia", async ({ page }) => {
  await page.getByRole("navigation", { name: "Principal" }).getByRole("link", { name: "Historia" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Historia de WiMAX");
});

test("6. los artículos llevan la firma del autor", async ({ page }) => {
  await page.goto(`${BASE}/#/blog/wimax-bolivia`);
  await expect(page.getByText("Por: Calle Cucho Josue Salomon").first()).toBeVisible();
});

test("7. el artículo de Bolivia incluye tablas y «Sabías que»", async ({ page }) => {
  await page.goto(`${BASE}/#/blog/wimax-bolivia`);
  await expect(page.locator("table").first()).toBeVisible();
  await expect(page.getByText("Sabías que…").first()).toBeVisible();
});

test("8. el mapa de cobertura permite elegir un país", async ({ page }) => {
  await page.goto(`${BASE}/#/blog/cobertura-mundial`);
  await page.getByRole("button", { name: /Rusia/ }).click();
  await expect(page.getByRole("heading", { name: "Rusia" })).toBeVisible();
});

test("9. el formulario de contacto valida con Zod", async ({ page }) => {
  await page.goto(`${BASE}/#/contact`);
  await page.getByRole("button", { name: /Enviar mensaje/ }).click();
  await expect(page.getByRole("alert").first()).toBeVisible();
});

test("10. el pie muestra el crédito del autor", async ({ page }) => {
  await expect(page.getByRole("contentinfo")).toContainText("Calle Cucho Josue Salomon");
  await expect(page.getByRole("contentinfo")).toContainText("Built with");
});

test("11. el botón de sonido está disponible y es accesible", async ({ page }) => {
  await expect(page.getByRole("button", { name: /ambiente sonoro/i })).toBeVisible();
});

test("12. respeta prefers-reduced-motion (letras visibles sin animación)", async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(BASE);
  await expect(page.locator(".split-char").first()).toHaveCSS("opacity", "1");
  await ctx.close();
});
