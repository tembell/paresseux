# Contributing to Paresseux

Thank you for considering contributing to our project! To ensure a smooth collaboration, please follow the guidelines outlined below.

## Getting Started

1. Fork the repository.
2. Clone your forked repository: `git clone https://github.com/tembell/paresseux.git`
3. Create a new branch for your feature or bug fix (feat/fix/chore/docs...): `git checkout -b feat/feature-name`

## Conventional Commits

We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for our commit messages. Please adhere to this convention when making changes.

Example:
```bash
git commit -m "feat: add new feature"
git commit -m "fix: resolve a bug"
```

Don't hesitate to add a commit description

## Changeset

We use [Changesets](https://github.com/atlassian/changesets) to manage versioning and generate release notes. Please create a changeset for each commit.

Example:
```bash
pnpm changeset
```

## Pull Requests

1. Ensure your code adheres to the project's coding standards.
2. Make sure all tests pass.
3. Update the documentation if necessary.
4. Push your changes to your forked repository.
5. Submit a pull request to the `main` branch of the original repository.

## Release

To release a new version, use the following command:
```bash
pnpm changeset version
```

