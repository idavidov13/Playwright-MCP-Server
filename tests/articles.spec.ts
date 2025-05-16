import { test, expect, Page } from '@playwright/test';

const url = process.env.URL;
const email = process.env.EMAIL;
const password = process.env.PASSWORD;
const articleTitle = `Test Article for Playwright MCP Server ${Date.now()}`;
const articleAbout = 'This is a test article about Playwright MCP Server';
const articleContent = 'This article is created by Playwright MCP Server test automation';
const updatedArticleTitle = `Updated ${articleTitle}`;
const updatedArticleAbout = 'Updated article about';
const updatedArticleContent = 'This article has been updated';

class ArticlePage {
  constructor(private page: Page) {}

  nav = {
    signIn: this.page.getByRole('link', { name: 'Sign in' }),
    newArticle: this.page.getByRole('link', { name: /New Article/ }),
    username: (username: string) => this.page.getByRole('link', { name: username }),
  };

  loginForm = {
    email: this.page.getByRole('textbox', { name: 'Email' }),
    password: this.page.getByRole('textbox', { name: 'Password' }),
    submit: this.page.getByRole('button', { name: 'Sign in' }),
  };

  editorForm = {
    title: this.page.getByRole('textbox', { name: 'Article Title' }),
    about: this.page.getByRole('textbox', { name: "What's this article about?" }),
    content: this.page.getByRole('textbox', { name: /Write your article/ }),
    publish: this.page.getByRole('button', { name: 'Publish Article' }),
  };

  article = {
    title: (title: string) => this.page.getByRole('heading', { name: title }),
    edit: this.page.getByRole('link', { name: /Edit Article/ }).first(),
    delete: this.page.getByRole('button', { name: /Delete Article/ }).first(),
  };

  async login(email: string, password: string, username: string) {
    await this.nav.signIn.click();
    await this.loginForm.email.fill(email);
    await this.loginForm.password.fill(password);
    await this.loginForm.submit.click();
    await expect(this.nav.username(username)).toBeVisible();
  }

  async createArticle(title: string, about: string, content: string) {
    await this.nav.newArticle.click();
    await this.editorForm.title.fill(title);
    await this.editorForm.about.fill(about);
    await this.editorForm.content.fill(content);
    await this.editorForm.publish.click();
    await expect(this.article.title(title)).toBeVisible();
  }

  async editArticle(updatedTitle: string, updatedAbout: string, updatedContent: string) {
    await this.article.edit.click();
    await this.editorForm.title.fill(updatedTitle);
    await this.editorForm.about.fill(updatedAbout);
    await this.editorForm.content.fill(updatedContent);
    await this.editorForm.publish.click();
    await expect(this.article.title(updatedTitle)).toBeVisible();
  }

  async deleteArticle() {
    await this.article.delete.click();
    // After deletion, should be redirected to home/profile, article should not be visible
  }
}

test.describe('Articles Management E2E', () => {
  test('should login, create, edit, and delete an article', async ({ page }) => {
    const app = new ArticlePage(page);
    await page.goto(url);
    await app.login(email, password, 'idavidov');
    await app.createArticle(articleTitle, articleAbout, articleContent);
    await app.editArticle(updatedArticleTitle, updatedArticleAbout, updatedArticleContent);
    await app.deleteArticle();
    await page.goto(`${url}profile/idavidov`);
    await expect(page.getByText('No articles are here... yet.')).toBeVisible();
  });
});
