# frozen_string_literal: true

# This file contains tasks with no namespace.
# All namespaced tasks are defined in the '../rakelib' directory.
# Each namespace is defined in a separate file.
# For example, 'preview:all' is defined in the '../rakelib/preview.rake' file.
# To see the list of tasks to use, run 'rake -T'.

require 'html-proofer'
require 'kramdown'
require 'launchy'
require 'colorator'

# Require helper methods from the 'lib' directory
Dir.glob('lib/**/*.rb') { |file| require_relative(file) }

desc "Same as 'rake', 'rake preview'"
task default: %w[preview]

desc "Same as 'test:report'"
task test: %w[test:report]

desc 'Preview the devdocs locally'
task preview: %w[install clean] do
  puts 'Generating devdocs locally ... '.magenta
  if File.exist?('_config.local.yml')
    print 'enabled the additional configuration parameters from _config.local.yml: $ '.magenta
    sh 'bundle exec jekyll serve --incremental \
                                 --open-url \
                                 --livereload \
                                 --trace \
                                 --config _config.yml,_config.local.yml \
                                 --plugins _plugins,_checks'
  else
    Rake::Task['preview:all'].invoke
  end
end

task :clean do
  print 'Cleaning after the last site generation: $ '.magenta
  sh 'bundle exec jekyll clean'
  puts 'Clean!'.green
end

task :install do
  print 'Install gems listed in the Gemfile: $ '.magenta
  sh 'bundle install'
  puts 'Installed!'.green
end

desc 'Build the entire website'
task build: %w[clean] do
  print 'Building the site with Jekyll: $ '.magenta
  sh 'bundle exec jekyll build --verbose --trace'
  puts 'Built!'.green
end

desc 'Build the entire website'
task build_and_deploy: %w[clean] do
  print 'Building the site with Jekyll: $ '.magenta

  # Check for uncommitted messages
  abort "\nCannot checkout. The branch contains uncommitted messages.".red unless `git status --short`.empty?

  # Back up an environmental variable
  jekyll_env = ENV['JEKYLL_ENV']
  ENV['JEKYLL_ENV'] = 'production'
  # Build the site
  sh 'bundle exec jekyll build --verbose --baseurl=/devdocs-archive/2.1'
  # Restore the environmental variable
  ENV['JEKYLL_ENV'] = jekyll_env

  # Remember the SHA of the built commit
  commit = `git log --pretty=format:"%h" -1`

  # Deploy the site
  `git checkout gh-pages`
  `cp -R _site/ 2.1/`
  `git add 2.1/`
  `git commit --message "Deploy archived-docs-v2.1: #{commit}"`
  `git push git@github.com:commerce-docs/devdocs-archive.git`
  `git checkout -`

  puts 'Done!'.green
end

desc 'Pull docs from external repositories'
task init: %w[multirepo:init]

desc 'Run checks (image optimization).'
task check: %w[check:image_optim] 

desc 'Generate data for the weekly digest.'
task :whatsnew do
  print 'Generating data for the weekly digest: $ '.magenta
  sh 'whatsup_github'
end
