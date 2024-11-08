# Welcome to DigitalSuits Shopify Boilerplate

The idea taken from [Shopify](https://github.com/Shopify) / **[slate](https://github.com/Shopify/slate)** and implemented as the simpler and modified alternative.

---

## Short documentation

For the correct work you need [nodejs](https://nodejs.org/en/), [npm](https://www.npmjs.com/) and [Shopify Theme Kit](https://shopify.github.io/themekit/).

### Code style

You need to follow [airbnb](https://github.com/airbnb) code styling:

- [styles](https://github.com/airbnb/css)
- [javascript](https://github.com/airbnb/javascript)

---

### Files structure

The main structure is following Shopify files structure [Structure of a theme](https://help.shopify.com/en/manual/using-themes/theme-structure). Extended are folders and files:

- #### /scripts/

  - **sections**/ – we are following the main folders structure for a better work experience
    - **sectionName.js** – _contains all code that are used in this section_
  - **templateName.js** – _contains all js files that are used in this template_

- #### /styles/ – the same idea as in scripts (following Shopify theme structure)

  - **core** – contains theme UI elements(buttons/fonts/etc)
  - **sections** – styles for the specific sections
  - **templates** – styles for the specific templates(you need to include section styles here)
    - **index.js** – _contains styles for the sectionы, that appear on every page_
    - **templateName.js** – _imports all the sections we use in this template_
  - **static/\*.scss** – files for the slider, plugins and so on
  - **IE11.scss** – stylew fixes for the IE browser
  - **variables.scss** - CSS variables that we use in the project

- #### /snippets/

  - **css-fonts.liquid** – snippet for the custom fonts
  - **css-variables.liquid** – [Custom CSS properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties). Ex.:`color: var(--variable);`
  - **lazy-img.liquid** - snippet for the images lazy loading

---

## Shopify git flow

> slightly adapted flow **bitbucket**

- **master** - main branch
- **develop** - branch is created form **master**
- **feature/** - branch is created from **develop**. When a _feature_ is complete it is merged into the **develop** branch. Branches should be named `feature/header`
- **bugfix/** - if an issue in **any branch** is detected a _bugfix_ branch is created from **issued branch**. Branches should be named `bugfix/[username]/[issue-name or month_day]` (_bugfix/johnds/06_13_)
- **hotfix/** - if an issue in **master** is detected a _hotfix_ branch is created from **master**. Branches should be named `hotfix/[username]/[issue-name]` (_hotfix/pedrods/header-flashing_)
- **release/** - when the branch is done it is merged into **develop** and **master**

## Shopify theme flow

- **Production** - main live theme
- **Staging** - main theme with all merged changes(that we can show to the client)
- **BACKUP | Staging | [date]** - theme is created from the **Staging** theme. We use these themes for fast backuping or review differences between functionality (ex. `BACKUP | Staging | 06.13`).
- **branch_name** - theme is created from the **Staging** theme, also named _development_ theme. These branches may be named _feature/homepage-instagram_, _bugfix/alexds/04_22_ etc.
- **SP | [date]** - theme is created from the **desired** theme. We use these themes for **special purposes**: testing, previewing etc.

### Shopify theme flow description

#### When you are going to start work on the theme

1. Duplicate your _theme_.
2. Rename your **theme**.
3. Create/checkout to a new **branch** (don't forget to pull all changes from the **development** branch).
4. Configure the _config.yml_ (change **theme_id**).
5. Install/Reinstall all `yarn` dependencies.
6. Deploy your **branch** changes into the **theme** `yarn deploy`.
7. Open your theme **preview** `theme open`
8. Check that everyting is okay.
9. Run **watcher** `yarn watch`.
10. Check that you working in the correct theme (open your theme preview/check theme ID's).
11. Make changes and don't **forget about commits**.

#### When you finished work with _bug/feature/hotfix_

1. **commit** your changes.
2. **push** changes to your branch.
3. Create **rebase** with **development** branch (ex. `git pull --rebase origin development`)
4. Create pull request **pull request**.

#### When you need to update **Staging**

1. Clarify what you need to deploy
2. Duplicate the live theme. Change this theme name to (ex. `Staging`).
3. Change the theme ID in **config.yml** to this new Staging theme ID.
4. Run `yarn deploy` command
5. Check that all the changes are in the **Staging** theme.
6. Publish the **Staging** theme, rename **Production** theme name to `BACKUP | Production | 12.16` and change the **Staging** theme name to **Production**

---

## Start theme customization

To begin test customization with this boilerplate on the store with existing theme:

> you need to configure config.yml before th start

1. Download all the theme files with [Shopify Theme Kit](https://shopify.github.io/themekit/) by running this command: `theme download`
   You will download the theme and it will contain all the theme files.
2. Then you need to "put" boilerplate files. You have 2 variants:
   - create these folders: **scripts, styles and the main files** in your downloaded theme and change the `theme.liquid` file (add scripts/styles and snippets connection)
   - move the theme files into boilerplate with files replacment and also change the `theme.liquid` file
3. Also you can integrate theme scripts/styles into the boilerplate but it will take much more time and it's not necessary
4. Create duplicate from the live theme and change ID in the `config.yml` file
5. Deploy "boilerplate" to the new duplicated theme. For this you need to do "Initial steps" and run`yarn deploy` command. This command will build scripts and styles into _assets_ folder and them will do deploy process.
   > You can face the errors on this step. All the information will be in the console. You need to fix it and deploy again

---

## Start theme development

> building from skratch

1. Create Shopify store
2. Create connection with the shop [Todo from Theme Kit](https://shopify.github.io/themekit/#get-api-access)
3. Configure `config.yml` file. Will look something like this:

   ```yml
   development:
     password: SHOPIFY_PRIVATE_APP_PASSWORD
     theme_id: SHOPIFY_THEME_ID
     store: SHOPIFY_STORE_URL.myshopify.com
     ignore_files:
   ```

4. Install all the dependecies with `npm i` or `yarn` commands.
5. Run your "watcher" `yarn watch`.
6. Type some code and enjoy the changes.
