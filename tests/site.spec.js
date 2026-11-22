import { test, expect } from '@playwright/test';

test('homepage presents CONVERGIA 2027 with proposal theme and navigation', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/CONVERGIA 2027/i);
  await expect(page.getByRole('heading', { name: /CONVERGIA 2027/i })).toBeVisible();
  await expect(page.getByText('Converging Intelligence and Emerging Technologies', { exact: false })).toBeVisible();
  await expect(page.getByText('University of Engineering and Management (UEM), Jaipur', { exact: false })).toBeVisible();
  await expect(page.getByRole('button', { name: /Register Interest/i })).toBeVisible();
});

test('tabs navigate across Tracks (06), Publication Plan, Committees, and Registration', async ({ page }) => {
  await page.goto('/');

  // Navigate to Tracks
  await page.getByRole('button', { name: 'Tracks (06)', exact: true }).click();
  await expect(page.getByRole('heading', { name: /06 Technical Conference Tracks/i })).toBeVisible();
  await expect(page.getByText('Artificial Intelligence, Machine Learning and Data-Driven Systems', { exact: false })).toBeVisible();
  await expect(page.getByText('Machine Intelligence for Semiconductor, VLSI', { exact: false })).toBeVisible();
  await expect(page.getByText('Health Informatics and Rehabilitation Engineering', { exact: false })).toBeVisible();

  // Navigate to Publication Plan
  await page.getByRole('button', { name: 'Publication Plan', exact: true }).click();
  await expect(page.getByRole('heading', { name: /Publication Plan/i })).toBeVisible();
  await expect(page.getByText('Springer Nature', { exact: false })).toBeVisible();
  await expect(page.getByText('Atlantis Press', { exact: false })).toBeVisible();
  await expect(page.getByText('Scopus', { exact: false })).toBeVisible();
  await expect(page.getByText('Clarivate Web of Science', { exact: false })).toBeVisible();

  // Navigate to Committees
  await page.getByRole('button', { name: 'Committees', exact: true }).click();
  await expect(page.getByRole('heading', { name: /Conference Leadership & Committee/i })).toBeVisible();
  await expect(page.getByText('Prof. (Dr.) Banani Chakrabarti', { exact: false })).toBeVisible();
  await expect(page.getByText('Prof. (Dr.) Satyajit Chakrabarti', { exact: false })).toBeVisible();
  await expect(page.getByText('Prof. Sourav Chakraborty', { exact: false })).toBeVisible();

  // Navigate to Registration
  await page.getByRole('button', { name: 'Registration', exact: true }).click();
  await expect(page.getByRole('heading', { name: /Registration Fees/i })).toBeVisible();
  await expect(page.getByText('13,000', { exact: false })).toBeVisible();
  await expect(page.getByText('12,000', { exact: false })).toBeVisible();
  await expect(page.getByText('5,000', { exact: false })).toBeVisible();
  await expect(page.getByText('200', { exact: false })).toBeVisible();
});

test('mobile navigation menu toggles correctly', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'mobile viewport only');
  await page.goto('/');
  await page.getByRole('button', { name: 'Toggle navigation' }).click();
  await expect(page.locator('.mobile-nav')).toBeVisible();
  await page.locator('.mobile-nav').getByRole('button', { name: 'Tracks (06)' }).click();
  await expect(page.locator('.mobile-nav')).toHaveCount(0);
});
