# GitHub Actions Workflows

This directory contains all GitHub Actions workflow configurations for the Heavens Above project.

## Available Workflows

### 1. **ci.yml** - Continuous Integration
- **Trigger**: Push to main, Pull requests
- **Purpose**: Run tests, linting, and build verification
- **Status**: ![CI](https://github.com/Burhan793/heavens-above/actions/workflows/ci.yml/badge.svg)

### 2. **deploy.yml** - Deployment Pipeline
- **Trigger**: Push to main
- **Purpose**: Build and deploy to GitHub Pages
- **Status**: ![Deploy](https://github.com/Burhan793/heavens-above/actions/workflows/deploy.yml/badge.svg)

### 3. **scheduled-tasks.yml** - Scheduled Data Update
- **Trigger**: Weekly (Sunday 00:00 UTC)
- **Purpose**: Automated satellite data refresh
- **Status**: ![Scheduled](https://github.com/Burhan793/heavens-above/actions/workflows/scheduled-tasks.yml/badge.svg)

### 4. **dependency-updates.yml** - Dependency Updates
- **Trigger**: Weekly (Monday 00:00 UTC)
- **Purpose**: Monitor and update dependencies
- **Status**: ![Dependencies](https://github.com/Burhan793/heavens-above/actions/workflows/dependency-updates.yml/badge.svg)

### 5. **code-review.yml** - Code Review
- **Trigger**: Pull requests
- **Purpose**: Automated code quality and security checks
- **Status**: ![Code Review](https://github.com/Burhan793/heavens-above/actions/workflows/code-review.yml/badge.svg)

### 6. **documentation.yml** - Documentation Deployment
- **Trigger**: Push to main (docs changes)
- **Purpose**: Build and deploy documentation
- **Status**: ![Docs](https://github.com/Burhan793/heavens-above/actions/workflows/documentation.yml/badge.svg)

### 7. **release-notes.yml** - Release Notes Generator
- **Trigger**: Version tags (v*.*.*)
- **Purpose**: Automated release notes generation
- **Status**: ![Release](https://github.com/Burhan793/heavens-above/actions/workflows/release-notes.yml/badge.svg)

### 8. **dependency-auto-merge.yml** - Auto-merge Dependencies
- **Trigger**: PRs labeled 'dependencies'
- **Purpose**: Automatically merge dependency updates after tests pass
- **Status**: ![Auto-merge](https://github.com/Burhan793/heavens-above/actions/workflows/dependency-auto-merge.yml/badge.svg)

## Quick Reference

### Viewing Workflow Runs
```
https://github.com/Burhan793/heavens-above/actions
```

### Manual Workflow Triggers
Some workflows support manual triggering via `workflow_dispatch`:
- Deployment Pipeline
- Scheduled Tasks
- Dependency Updates
- Documentation Deployment
- Release Notes Generator

### Workflow Artifacts
Workflows generate various artifacts:
- **Coverage reports** (30 days retention)
- **Build artifacts** (7 days retention)
- **Documentation** (90 days retention)
- **Release notes** (90 days retention)

## Documentation

For comprehensive documentation on all workflows, see:
- [WORKFLOWS_DOCUMENTATION.md](../WORKFLOWS_DOCUMENTATION.md)

## Workflow Architecture

```
┌─────────────────────────────────────────────────┐
│          Developer Workflow                      │
├─────────────────────────────────────────────────┤
│                                                  │
│  1. Code Changes                                │
│      ↓                                          │
│  2. Push/PR → Triggers Workflows                │
│      ↓                                          │
│  3. CI Checks (ci.yml)                          │
│      ├─ Linting                                 │
│      ├─ Testing                                 │
│      └─ Build Verification                      │
│      ↓                                          │
│  4. Code Review (code-review.yml)               │
│      ├─ Quality Analysis                        │
│      └─ Security Scan                           │
│      ↓                                          │
│  5. Merge to Main                               │
│      ↓                                          │
│  6. Deploy (deploy.yml)                         │
│      ├─ Build                                   │
│      ├─ Test                                    │
│      └─ Deploy to GitHub Pages                  │
│                                                  │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│        Automated Maintenance                     │
├─────────────────────────────────────────────────┤
│                                                  │
│  Weekly (Sunday)                                │
│  └─ Scheduled Tasks (scheduled-tasks.yml)       │
│      └─ Update satellite data                   │
│                                                  │
│  Weekly (Monday)                                │
│  └─ Dependency Updates (dependency-updates.yml) │
│      └─ Check & update dependencies             │
│                                                  │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│            Release Process                       │
├─────────────────────────────────────────────────┤
│                                                  │
│  1. Create Version Tag                          │
│      ↓                                          │
│  2. Release Notes (release-notes.yml)           │
│      ├─ Generate changelog                      │
│      ├─ Create GitHub release                   │
│      └─ Publish release notes                   │
│                                                  │
└─────────────────────────────────────────────────┘
```

## Troubleshooting

### Common Issues

**Workflow Not Triggering**
- Check trigger conditions in workflow file
- Verify branch protection rules
- Check if workflow is disabled

**Workflow Failing**
- Review workflow logs in Actions tab
- Check for dependency issues
- Verify environment secrets/variables

**Permission Errors**
- Verify workflow permissions in YAML
- Check repository settings → Actions → General
- Ensure necessary secrets are configured

### Getting Help

1. Check workflow logs in Actions tab
2. Review [WORKFLOWS_DOCUMENTATION.md](../WORKFLOWS_DOCUMENTATION.md)
3. Search GitHub Actions documentation
4. Create an issue in the repository

## Best Practices

1. **Always test workflow changes in a feature branch first**
2. **Use meaningful commit messages for workflow changes**
3. **Keep workflows modular and focused**
4. **Document any new workflows added**
5. **Monitor workflow run times and optimize**
6. **Regularly update action versions**
7. **Use secrets for sensitive data**

## Workflow Maintenance

### Updating Workflows
1. Edit `.yml` files in this directory
2. Test changes in feature branch
3. Create pull request
4. Verify workflows run successfully
5. Merge to main

### Adding New Workflows
1. Create new `.yml` file
2. Follow existing naming conventions
3. Document purpose and configuration
4. Update this README
5. Update main documentation

---

**For detailed information about each workflow, please refer to [WORKFLOWS_DOCUMENTATION.md](../WORKFLOWS_DOCUMENTATION.md)**
