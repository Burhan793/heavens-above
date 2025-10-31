# Workflow Testing Guide

This guide explains how to test and validate each GitHub Actions workflow.

## 1. Continuous Integration Testing

### Test Push to Main
```bash
git checkout main
git commit --allow-empty -m "test: Trigger CI workflow"
git push origin main
```

Expected Results:
- CI workflow triggers automatically
- Tests run on multiple Node.js versions
- Linting checks execute
- Security scan completes

### Test Pull Request
1. Create new branch
2. Make changes
3. Create PR to main
4. Verify CI checks

## 2. Deployment Pipeline Testing

### Test Staging Deployment
1. Push to main branch
2. Monitor deployment to staging
3. Verify staging environment
4. Check notification delivery

### Test Production Deployment
1. Approve staging deployment
2. Monitor production deployment
3. Verify production environment
4. Validate Azure resources

## 3. Scheduled Tasks Testing

### Manual Trigger
1. Go to Actions tab
2. Select scheduled-tasks workflow
3. Click "Run workflow"
4. Choose main branch

### Verify Results
- Check backup creation
- Verify Azure Storage upload
- Review cleanup operations
- Check status report

## 4. Dependency Updates Testing

### Test Dependabot
1. Add new dependency
2. Wait for weekly check
3. Review created PR
4. Verify tests pass

### Manual Update Check
1. Go to Security tab
2. Click "Check for updates"
3. Review dependency graph

## 5. Code Review Testing

### Test PR Analysis
1. Create PR with changes
2. Wait for analysis
3. Review automated comments
4. Check SonarCloud results

### Security Scan
1. Add test security issue
2. Create PR
3. Verify detection
4. Check CodeQL results

## 6. Documentation Testing

### Test Auto-Deploy
1. Edit markdown file
2. Commit and push
3. Check workflow run
4. Verify GitHub Pages

### Manual Deploy
1. Trigger workflow
2. Monitor build process
3. Check deployment
4. Validate links

## 7. Release Testing

### Test Release Creation
1. Create new tag:
```bash
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

2. Verify:
- Release creation
- Changelog generation
- Package publishing

## Common Issues

### CI Failures
- Check Node.js version compatibility
- Verify dependency installation
- Review test configurations

### Deployment Issues
- Check Azure credentials
- Verify resource availability
- Review environment variables

### Security Alerts
- Review dependency versions
- Check code scanning results
- Validate security rules

## Monitoring

### GitHub Actions Dashboard
- Monitor workflow runs
- Check job duration
- Review resource usage

### Azure Monitoring
- Check Application Insights
- Review performance metrics
- Monitor error rates

## Troubleshooting

### Workflow Debugging
1. Enable debug logging
2. Check step outputs
3. Review action logs

### Common Solutions
- Clear workflow caches
- Update dependencies
- Verify secrets
- Check permissions