module.exports = async ({ github, context }) => {
  const { owner, repo } = context.repo;
  const prNumber = context.payload.pull_request.number;

  // Prepare review comment
  let reviewBody = '## Automated Code Review\n\n';

  // Add lint results if available
  if (process.env.LINT_RESULTS) {
    reviewBody += '### Linting Results\n\n';
    reviewBody += process.env.LINT_RESULTS;
    reviewBody += '\n\n';
  }

  // Add test coverage results if available
  if (process.env.COVERAGE_RESULTS) {
    reviewBody += '### Test Coverage\n\n';
    reviewBody += process.env.COVERAGE_RESULTS;
    reviewBody += '\n\n';
  }

  // Add security scan results if available
  if (process.env.SECURITY_RESULTS) {
    reviewBody += '### Security Scan\n\n';
    reviewBody += process.env.SECURITY_RESULTS;
    reviewBody += '\n\n';
  }

  // Add SonarCloud results if available
  if (process.env.SONAR_RESULTS) {
    reviewBody += '### Code Quality (SonarCloud)\n\n';
    reviewBody += process.env.SONAR_RESULTS;
    reviewBody += '\n\n';
  }

  // Post review comment
  await github.rest.issues.createComment({
    owner,
    repo,
    issue_number: prNumber,
    body: reviewBody
  });

  // Add labels based on analysis
  const labels = ['reviewed'];
  if (process.env.HAS_ISSUES === 'true') {
    labels.push('needs-work');
  } else {
    labels.push('ready-to-merge');
  }

  await github.rest.issues.addLabels({
    owner,
    repo,
    issue_number: prNumber,
    labels
  });
};