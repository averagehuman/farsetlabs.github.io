# Farset Labs Main Website

A [Jekyll][jekyll] and [Bootstrap][bootstrap] based informational website for
[Farset Labs][farsetlabs], a hackerspace and charity located in Belfast,
Northern Ireland.

## Requirements

Uses [Jekyll][jekyll] which requires Ruby 1.9.3. To setup your ruby
environment it is suggested that you use [RVM][rvm].

- Ruby 1.9.3
- bundler `$ gem install bundler`
- jekyll `$ gem install jekyll`

A Gemfile is included so you can run `$ bundle install` after you install
bundler with `$ gem install bundler`.

## Contributing

### Making your changes

All contributions to the website and content should be done through a branch.
You should follow the [Feature Branch Workflow][feature-branch-workflow] when
contributing.

We have one main branch, `master`, which represents the
[live website][farsetlabs]. Ongoing improvements to the site that are not live
yet live in feature branches, either on this repository or its forks.

Please branch from the latest `master` for your changes.

If you do not have access to our repository, please fork us on Github and
submit your branch through a pull request.

If you are not a developer, you should raise corrections and content
improvements as [issues].

### Editing Sidebar Links

Sidebar links are included from `_includes/sidebar-links.md` This is a
markdown list which is parsed when the jekyll site is built. To update sidebar
links just edit this file.

### Running / testing locally

You can run the site locally using `jekyll serve -w` (See
[Requirements](#requirements))

### Submitting your changes

Once you have pushed your changes (either to our repo or your fork as a
contributor) you should open a [pull request]. Our web team will review it.
Please leave at least a brief description of what the changes are, and detail
any changes made to layout or the functionality of the website.


## Voltaic Theme

To develop and build the proposed theme update (voltaic) requires both docker
and npm (nodejs package manager). Supposing that these are both installed run:

    $ npm install

This installs gulp, sass and associated javascript dependencies.

Then

    $ npm start

This compiles assets, runs a jekyll build (via docker) and watches source files
for changes so that the compile/build steps are run automatically on subsequent
edits. Then the site is opened in a browser with live-reload enabled, ie. the
browser refreshes automatically whenever new files are added or existing files
are updated.

[bootstrap]: http://getbootstrap.com/
[farsetlabs]: https://farsetlabs.org.uk/
[feature-branch-workflow]: https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow
[jekyll]: http://jekyllrb.com/
[rvm]: https://rvm.io/

[issues]: https://github.com/FarsetLabs/farsetlabs.github.io/issues
[pull request]: https://github.com/FarsetLabs/farsetlabs.github.io/pulls
