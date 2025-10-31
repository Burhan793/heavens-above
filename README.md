# Heavens Above - Automated Workflows

This repository contains automated GitHub Actions workflows for the Heavens Above project. These workflows handle continuous integration, deployment, maintenance, and more.

## Workflow Overview

### 1. Continuous Integration
- File: `.github/workflows/ci.yml`
- Triggers: Push to main, Pull Requests
- Features: Testing, Linting, Security Checks

### 2. Deployment Pipeline
- File: `.github/workflows/deploy.yml`
- Triggers: Push to main, Manual
- Features: Build, Test, Deploy to GitHub Pages

### 3. Scheduled Tasks
- File: `.github/workflows/scheduled-tasks.yml`
- Schedule: Daily at 00:00 UTC
- Features: Backups, Cache Updates, Cleanup

### 4. Dependency Updates
- File: `.github/workflows/dependency-updates.yml`
- Schedule: Weekly
- Features: Automated Updates via Dependabot

### 5. Code Review
- File: `.github/workflows/code-review.yml`
- Triggers: Pull Requests
- Features: Quality Checks, Security Analysis

### 6. Documentation
- File: `.github/workflows/documentation.yml`
- Triggers: Documentation Changes
- Features: Build and Deploy Docs

### 7. Release Management
- File: `.github/workflows/release.yml`
- Triggers: Version Tags
- Features: Changelog, Release Creation

## Setup Instructions

1. Configure Repository Secrets:
   - `SONAR_TOKEN`: For SonarCloud integration
   - `NPM_TOKEN`: For package publishing

2. Enable GitHub Pages:
   - Go to repository settings
   - Navigate to Pages section
   - Select gh-pages branch

3. Configure Branch Protection:
   - Go to repository settings
   - Navigate to Branches
   - Add rule for main branch
   - Enable required status checks

## Development Workflow

1. Create feature branch
2. Make changes
3. Create pull request
4. Wait for automated checks
5. Address review feedback
6. Merge when approved

## Maintenance

- Monitor workflow runs in Actions tab
- Review generated reports
- Check dependabot alerts
- Update workflow configurations as needed

## Documentation

Detailed documentation is available in the [docs](./docs) directory:
- [Workflow Documentation](./docs/workflows.md)

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Create pull request
5. Follow code review process

## License

This project is licensed under the MIT License - see the LICENSE file for details