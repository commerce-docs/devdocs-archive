# Adobe Commerce Developer Documentation

This branch contains the latest 2.3 Adobe Commerce and Magento Open Source developer documentation archived.
The website is available at <https://commerce-docs.github.io/devdocs-archive/2.3/>.
> **Important update**
>
> Adobe Commerce and Magento Open Source 2.4.x documentation has been migrated to Adobe sites. See our new landing pages to access the most current information.
>
>[Adobe Commerce Developer Documentation](https://developer.adobe.com/commerce/docs/) (Adobe Developer site)—Develop, customize, integrate, extend, and use advanced capabilities
>
>[Adobe Commerce Documentation](https://experienceleague.adobe.com/docs/commerce.html) (Adobe Experience League)—Plan, implement, operate, upgrade, and maintain your Commerce projects
>
> Some content was consolidated or moved to different guides. If you have trouble finding a topic, see the [Migrated topics](https://devdocs.magento.com/migrated.html).
>
> We welcome contributions to migrated content! You can find similar links to GitHub on the Adobe sites.

## Build locally

You do not need to set up a web server to serve the site locally. Jekyll will use its own web server for this.

### Set up Ruby

Consider to set up the Ruby version defined in [.ruby-version](.ruby-version).
Ruby version manager such as [rvm](https://www.ruby-lang.org/en/documentation/installation/#rvm) or [rbenv](https://www.ruby-lang.org/en/documentation/installation/#rbenv) can help to manage the correct version for this automatically.

See [official documentation](https://www.ruby-lang.org/en/documentation/installation/) for the most recent installation guidelines and available options.

### Install devdocs

Clone the repository. The first time you are at the `devdocs` directory, run:

```bash
bundle install
```

The website file structure contains directories pulled from multiple sources, not only this repository. The full list with mapped directories is defined in the [Docfile.yml](./Docfile.yml). It includes public and private repositories.
To pull all the mapped sources:

```bash
rake init
```

Docfile contains public sources, because the `rake init` task fails when it attempts to clone content from private repositories without the corresponding permissions.

>**NOTE**
>By default _rake_ clones using SSH. If you want to clone with HTTPS, you can run it with the `token` variable:
>
>```bash
>token=none rake init
>```
>
> Use `none` if you do not want to use a real token. To have access to private repositories, you will need a [GitHub token](https://github.com/settings/tokens) with the relevant access permissions.

>**TIP**
>All the helper CLI commands for this project are implemented using [rake](https://github.com/ruby/rake).
Use the `rake --tasks` command for a complete list of available tasks, or filter the list using a keyword, such as `rake --tasks test`.

Once you have completed preparing your environment, you can build locally and preview the site in your browser.

### Run the website

1. Using the following rake task, verify all the required dependencies and start the embedded web server:

   ```bash
   rake preview
   ```

   You will see the commands called by the rake task and the corresponding output. Each command is typically highlighted with the magenta color:

   ```terminal
   ~/magento/devdocs (master)$ rake preview
   Install gems listed in the Gemfile: $ bundle install
   Using rake 13.0.1
   Using public_suffix 4.0.3
   <truncated>
   Bundle complete! 16 Gemfile dependencies, 70 gems now installed.
   Use `bundle info [gemname]` to see where a bundled gem is installed.
   Installed!
   Cleaning after the last site generation: $ bundle exec jekyll clean
   Configuration file: /Users/user/magento/devdocs/_config.yml
             Cleaner: Removing /Users/user/magento/devdocs/_site...
             Cleaner: Removing src/.jekyll-metadata...
             Cleaner: Removing src/.jekyll-cache...
             Cleaner: Nothing to do for .sass-cache.
   Clean!
   Enabled the default configuration: $ bundle exec jekyll serve --incremental \
                                   --open-url \
                                   --livereload \
                                   --trace \
                                   --plugins _plugins,_checks
   Configuration file: /Users/user/magento/devdocs/_config.yml
   Theme Config file: /Users/user/.rvm/gems/ruby-2.6.5/bundler/gems/devdocs-theme-e1a4ff6880d5/ _config.yml
               Source: /Users/user/magento/devdocs/src
         Destination: /Users/user/magento/devdocs/_site
   Incremental build: enabled
         Generating...
   Running ["ImageCheck", "HtmlCheck", "LinkCheck", "ScriptCheck",  "LinkChecker::DoubleSlashCheck"] on ["/Users/user/magento/devdocs/_site"] on *.html...


   Ran on 1747 files!


   HTML-Proofer finished successfully.
                       done in 220.316 seconds.
   Auto-regeneration: enabled for 'src'
   LiveReload address: http://127.0.0.1:35729
       Server address: http://127.0.0.1:4000/
     Server running... press ctrl-c to stop.
           LiveReload: Browser connected
   ```

1. The generated website launches automatically in a new tab in your browser.
1. Press `Ctrl+C` in the serve terminal to stop the server.

> ***TIP***
> Leave the serve terminal open and running. Every time you save changes to a file, it automatically regenerates the site so you can test the output immediately. Changing the `_config.yml` file or other YAML file with data or configuration requires a fresh build (stop and start the server again with `rake preview`).

## Build and deploy (for admins)

The website is deployed using the [GitHub Pages](https://pages.github.com/) service.
The builds are pushed to the 2.3 directory at the gh-pages branch.

To build and deploy the website, run:

```sh
rake build_and_deploy
```

The command performs the following actions:

1. Clears the _site directory.
1. Builds the website with the base URL `devdocs-archive/2.3`.
1. Remembers the number of commit that's been built to use later in a commit message for reference.
1. Checkouts the gh-pages branch.
1. Copies the content of the _site directory to the 2.3 directory.
   The \_site directory is ignored by git that makes the build from the archived-docs-v2.3 available in the gh-pages branch.
1. Adds and commits the changes with the message that has reference to the commit of the built source code (see item 3 in this list).
1. Pushes the commit to the remote repository.
1. Checkouts back to the source code branch.
