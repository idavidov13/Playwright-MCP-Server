# Playwright-MCP-Server
Set Up and Utilization of Playwright MCP (Model Context Protocol) Server in [Windsurf IDE](https://windsurf.com/)

## Table of Contents

-   [Introduction](#introduction)
-   [Main Goal](#main-goal)
-   [Used LLMs](#used-llms)
-   [Prerequisites](#prerequisites)
-   [Installation](#installation)
-   [Configure Playwright MCP Server](#configure-playwright-mcp-server)
-   [Add Custom Instructions](#add-custom-instructions)
-   [Test Data](#test-data)
-   [Generate Test with Playwright MCP Server and GPT-4.1](#generate-test-with-playwright-mcp-server-and-gpt-41)
-   [Generate Test with Playwright MCP Server and Claude 3.7 Sonnet (Thinking)](#generate-test-with-playwright-mcp-server-and-claude-3.7-sonnet-thinking)

## Introduction

Playwright’s MCP (Multi-Channel Protocol) is a low-level protocol that enables communication between the Playwright client and browser servers (such as Chromium, Firefox, and WebKit). MCP is designed to be transport-agnostic, supporting communication over WebSockets, pipes, or other channels, and is the foundation for Playwright’s cross-browser automation capabilities.

## Main Goal
Playwright MCP (Model Context Protocol) Server is a tool that allows you to generate better Playwright tests with LLMs by providing much helpful context to the LLMs and ability to interact with the browsers. I try to generate tests for web app [Conduit](https://conduit.bondaracademy.com/) and compare the final results.
You can find the repository with MVP(Minimal Viable Product) for [Playwright Automation Framework](https://github.com/idavidov13/Playwright-Framework) for the same web app, which features TypeScript, Page Object Model Design Pattern, Custom Fixtures, REST API Testing and Mocking, Schema Validation with Zod, Environment Utilization, and CI/CD integration with GitHub Actions and GitLab CI/CD which I created before this repository.

### Used LLMs

-   GPT-4.1
-   Claude 3.7 Sonnet (Thinking)


## Prerequisites

-   **Node.js** (version 20.13.1 or later)
-   **npm** (version 10 or later)


## Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/idavidov13/Playwright-MCP-Server.git
    cd Playwright-MCP-Server
    ```

2. **Install dependencies:**

    ```sh
    npm install
    ```

3. **Install Playwright Browsers:**

    ```sh
    npx playwright install --with-deps
    ```

    This command ensures all necessary browser binaries and dependencies are installed.

## Configure Playwright MCP Server

Follow the instructions in the [Playwright MCP Server documentation](https://github.com/microsoft/playwright-mcp?tab=readme-ov-file) to configure the Playwright MCP Server.

## Add Custom Instructions

Create a folder .windserf/rules in the root of the project. Add a file playwright-mcp-server-test-generator.md in the .windserf/rules folder. Select "Always On" option from the dropdown menu. Put following content in Content Textarea:

```
1. You are a playwright test generator.
2. You are given a scenario and you need to generate a playwright test for it.
3. DO NOT generate test code based on the scenario alone.
4. DO run steps one by one using the tools provided by the Playwright MCP.
5. Only after all steps are completed, emit a Playwright TypeScript test that uses '@playwright/test'. Below are instruction for generating the test:
5.1. You are an expert in TypeScript, Frontend development, and Playwright end-to-end testing.
You write concise, technical TypeScript code with accurate examples and the correct types.
-   Create Class for all locators and methods for all actions
-   Avoid using `page.locator` and always use recommended build-in and role-based locators (`getByRole`, `getByLabel`, etc)
-   Prefer to use web-first assertions (`toBeVisible`, `toHaveText`, etc) whenever possible
-   Use build in config objects like `devices` whenever possible
-   Avoid hardcoded timeouts
-   Reuse Playwright locators by using variables
-   Follow the guidance and the best practices described on playwright.dev
-   Avoid commenting the resulting code
6. Save generated test file in the tests directory
7. Execute the test file and iterate until the test passes
```

## Test Data

Create a test file "yourTestName.spec.ts" add the test data as follows:

```
const url = process.env.URL || 'https://conduit.bondaracademy.com/';
const email = process.env.EMAIL || 'yourEmail';
const password = process.env.PASSWORD || 'yourPassword';
const articleTitle = `Test Article for Playwright MCP Server ${Date.now()}`;
const articleAbout = 'This is a test article about Playwright MCP Server';
const articleContent = 'This article is created by Playwright MCP Server test automation';
const updatedArticleTitle = `Updated ${articleTitle}`;
const updatedArticleAbout = 'Updated article about';
const updatedArticleContent = 'This article has been updated';

```

## Generate Test with Playwright MCP Server and GPT-4.1

1. Select GPT-4.1 as a model
2. Run the following prompt:

```
@gpt-4.1.spec.ts Create a test case utilizing provided constanst for navigating to the web app, login, create/edit/delete an article. Try to verify the result after every major step. Use provided instructions
```

After completion of the test, you can run it with the following command:

```sh
npx playwright test yourTestName.spec.ts
```

**Note:** The provided example was generated from the first time. Only update which was needed to be made was to specify `.first()` for the delete button and edit button. 

## Generate Test with Playwright MCP Server and Claude 3.7 Sonnet (Thinking)

1. Select Claude 3.7 Sonnet (Thinking) as a model
2. Run the following prompt:

```
@claude-3.7-Sonnet(Thinking).spec.ts Create a test case utilizing provided constanst for navigating to the web app, login, create/edit/delete an article. Try to verify the result after every major step. Use provided instructions
```

After completion of the test, you can run it with the following command:

```sh
npx playwright test yourTestName.spec.ts
```

**Note:** The provided example was generated from the first time. Only update which was needed to be made was to remove 'articleContent' locator due to wrong behavior. 