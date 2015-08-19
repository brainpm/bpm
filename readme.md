# brainpm
a package manager for the brain (very experimental)

## Background
Read about the idea in this [blog post](http://now.she.codes/blog/articles/learning-db/)

brainpm is based on npm. Like npm it uses package.json. Like [browserify](npmjs.org/browserify) it extends package.json with an additional field.  `brain`. brain is an object that lets you specify what knowledge is required to understand the learning material and what knowledge the learning material provides.

``` javascript
    "name":"flex-boxes",
    ...
    "brain": {
        "requires": ["html", "css"],
        "provides": ["css:flex-box"]
    }
    ...
```

## Episodes
Episodes are short texts explaining a certain concept or technique. Typically they embed or link to some other ressources on the web. The main purpose of an episode is to add meta data to the linked/embedded learning resource. Some episodes may also include an interactive quiz or interactive illustrations.

Each episode lives in its own repository on github. See http://github.com/shecodes-content for examples.

`bpm bundle` generates a JavaScript file containing the episode's text (a markdown file) as well as the entire package.json file. The generated bundle can be put on a static file server, like the github-pages service, and can be loaded cross-origin via a `<script> tag` (JSONP-style).

# Repositories
`bpm create-remote` is a fast way to create a repository on github and set it as the origin remote of a pre-existing local repository.

`bpm publish` can then be used to push the generated bundle to the gh-pages branch of that repository, thus making it available on the web.

# Organisations
Repositories containing episodes need to be part of an organisation on github. The organisation provides the container and the context for episodes. `bpm create-remote` automatically creates a repository that belongs to the organisation that was specified in `.bpmrc`.

The organisation should contain episode repositories only.

## Typical workflow

``` bash
mkdir my-episode  # use snail-case
cd my-episode
git init
bpm init          # answer all the questions and git a package.json file
vim readme.md     # write your episode's text
git add package.json readme.md
git commit -am'initial commit'
git push
bpm create-remote
bpm publish       # bundle & publish to github pages
```

Later, when you need to make changes

``` bash
vim readme.md     # fix your typos
git ci -am'fixed typos'
npm version patch # bump the version number
git push --tags
bpm publish       # re-publish to gh-pages
````

## Installation

``` 
npm install brainpm  --global
```

## Configuration

Configuration is read from a `.bpmrc` file located in your home directory, or in several other places, see http://npmjs.org/rc

It should have the following entries

```
github_user=YOUR_GUTHUB_USERNAME
github_organisation=YOUR_GITHUB_ORGANISATION
```

## Usage

### bpm init
Use `bpm init` instead of `npm init` to get the extra fields in yout package.json.

``` 
bpm init
```

### bpm bundle
The `bundle` sub command takes your package.json and a markdown file (defaults to readme.md) and bundles them up as a JSONP comparible javascript file.

``` 
bpm bundle
```

### bpm publish

`bpm publish` takes a previously created bundle and pushes it to the gh-pages branch of the git remote called `origin`. If the origin points to github, this means the bundle becomes available on the web. 

``` 
bpm publish
```

### bpm toc

`bpm toc` shows all episodes in the organisation, their names, version numbers and what knowledge they provide and require. It shows warnings (exclamation point in the first column) for episodes that require knowledge that is not provided by any episode.

```
bpm toc
```

### bpm rebundle-all
clones, bundles and publishes all episodes found in the organisation. Useful when the bundler itself is updated.

```
bpm rebundle-all
```

### bpm list-repositories
shows a list of all repositories in the organsiation.

```
bpm list-repositories
```

### bpm info <episode-name>
shows information about a specific episode

```
bpm info intro
```

