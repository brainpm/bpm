# bpm
the package manager for the brain
----

bpm is based on npm. Like npm it uses package.json. It extends package.json with a property named `brain`. brain is an object that let's you specify what knowledge is required to understand the learning material and what knowledge the learning material provides.

``` javascript
...
    "brain": {
        "requires": ["html", "css"],
        "provides": ["css:flex-box"]
    }
...
```

## Installation

``` shell
npm install bpm --global
```

## Usage

### bpm init
Use `bpm init` instead of `npm init` to get the extra fields in yout package.json.

``` shell
bpm init
```

### bpm bundle
The `bundle` sub command takes your package.json and a markdown file (defaults to readme.md) and bundles them up as a JSONP comparible javascript file.

``` shell
bpm bundle
```

### bpm publish

`bpm publish` takes a previously created bundle and pushes it to the gh-pages branch of the git remote called 'origon'. If the origin points to github, this means the bundle becomes available on the web. 

``` shell
bpm publish
```

