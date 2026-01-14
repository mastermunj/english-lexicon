# TypeScript Boilerplate for Node.js

## Features
* Latest & Greatest [TypeScript](https://github.com/Microsoft/TypeScript)
* [EsLint](https://github.com/eslint/eslint) & [Prettier](https://github.com/prettier/prettier) with recommended rules
* [Vitest](https://github.com/vitest-dev/vitest) for unit tests
* NPM scripts for build, lint, test & release
* [Commitlint](https://github.com/conventional-changelog/commitlint/) for ensuring [conventional commit format](https://www.conventionalcommits.org/)
* [Standard Version](https://github.com/conventional-changelog/standard-version) for easy release management using [semver](https://github.com/semver/semver)
* [GitHub Actions](https://github.com/features/actions) as CI

## How to Use?

1. Clone Repository
```sh
git clone git@github.com:mastermunj/typescript-boilerplate.git <Your-Project>
```

2. Run `reset.sh`
```sh
cd  <Your-Project>
chmod +x reset.sh && ./reset.sh
```

The script does following:
* Removes remote origin
* Clears git commit history making the repo as good as fresh initiated
* Runs npm install
* Removes `reset.sh` file for safety
