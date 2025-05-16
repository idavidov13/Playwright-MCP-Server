import { test, expect, Page } from '@playwright/test';

const url = process.env.URL!;
const email = process.env.EMAIL!;
const password = process.env.PASSWORD!;
const articleTitle = `Test Article for Playwright MCP Server ${Date.now()}`;
const articleAbout = 'This is a test article about Playwright MCP Server';
const articleContent = 'This article is created by Playwright MCP Server test automation';
const updatedArticleTitle = `Updated ${articleTitle}`;
const updatedArticleAbout = 'Updated article about';
const updatedArticleContent = 'This article has been updated';

test.describe('Article CRUD Operations', () => {
  const CREDENTIALS = {
    username: email,
    password: password
  };
  const TEST_ARTICLE = {
    title: articleTitle,
    content: articleContent,
    updatedTitle: updatedArticleTitle,
    updatedContent: updatedArticleContent
  };

  test.beforeEach(async ({ page }) => {
    await page.goto(url);
    await page.getByRole('link', { name: 'Sign in' }).click();
    await page.getByPlaceholder('Email').fill(CREDENTIALS.username);
    await page.getByPlaceholder('Password').fill(CREDENTIALS.password);
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByRole('link', { name: 'New Article' })).toBeVisible();
  });

  test('Create/edit/delete article', async ({ page }) => {
    // Create
    await page.getByRole('link', { name: 'New Article' }).click();
    await page.getByPlaceholder('Article Title').fill(TEST_ARTICLE.title);
    await page.getByPlaceholder('What\'s this article about?').fill(articleAbout);
    await page.getByPlaceholder('Write your article').fill(TEST_ARTICLE.content);
    await page.getByRole('button', { name: 'Publish Article' }).click();
    await expect(page.getByRole('heading', { name: TEST_ARTICLE.title })).toBeVisible();

    // Edit
    await page.getByRole('link', { name: 'Edit Article' }).first().click();
    await page.getByPlaceholder('Article Title').fill(TEST_ARTICLE.updatedTitle);
    await page.getByPlaceholder('What\'s this article about?').fill(updatedArticleAbout);
    await page.getByPlaceholder('Write your article').fill(TEST_ARTICLE.updatedContent);
    await page.getByRole('button', { name: 'Publish Article' }).click();
    await expect(page.getByRole('heading', { name: TEST_ARTICLE.updatedTitle })).toBeVisible();

    // Delete
    await page.getByRole('button', { name: 'Delete Article' }).first().click();
    await expect(page.getByText(TEST_ARTICLE.updatedTitle)).not.toBeVisible();
  });
});