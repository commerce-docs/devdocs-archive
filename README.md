# Magento 1 Developer Documentation

This project contains the source code of the latest Magento 1 developer documentation archived.
The website built from this project is available at <https://commerce-docs.github.io/devdocs-archive/1.x/>.

## Building this site

### Prerequisites

1. [Ruby](https://www.ruby-lang.org/en/documentation/installation/), v2
1. [Bundler](https://bundler.io/), v2

### Install devdocs

Clone or download the repository. The first time you are at the `devdocs` directory, run:

```sh
bundle install
```

Once you have completed preparing your environment, you can build locally and review the site in your browser.

### Build and preview locally

[rake](https://github.com/ruby/rake) is a native Ruby tool that helps to automate tasks.

1. Run the rake task that installs all required dependencies and starts the [Jekyll](https://jekyllrb.com/) server:

   ```sh
   rake preview
   ```

1. Press `Ctrl+C` in the serve terminal to stop the server.

## Build and deploy (for admins)

The website is deployed using the [GitHub Pages](https://pages.github.com/) service.
The builds are pushed to the 1.x directory at the gh-pages branch.

To build and deploy the website, run:

```sh
rake build_and_deploy
```

The command performs the following actions:

1. Clears the _site directory.
1. Builds the website with the base URL `devdocs-archive/1.x`.
1. Remembers the number of commit that's been built to use later in a commit message for reference.
1. Checkouts the gh-pages branch.
1. Copies the content of the _site directory to the 1.x directory.
   The \_site directory is ignored by git that makes the build from the archived-docs-v1.x available in the gh-pages branch.
1. Adds and commits the changes with the message that has reference to the commit of the built source code (see item 3 in this list).
1. Pushes the commit to the remote repository.
1. Checkouts back to the source code branch.
