module.exports = async ({ github, context, core }) => {
  const { owner, repo } = context.repo;
  const status = context.job.status;
  
  // Create deployment status message
  const message = `Deployment ${status.toLowerCase()} for ${context.sha}
  
Environment: ${process.env.ENVIRONMENT || 'production'}
Workflow: ${context.workflow}
Run: ${context.runNumber}
  
Details: ${context.serverUrl}/${owner}/${repo}/actions/runs/${context.runId}`;

  // Create issue comment with deployment status
  await github.rest.issues.createComment({
    owner,
    repo,
    issue_number: context.issue.number || context.pullRequest.number,
    body: message
  });

  // If deployment failed, create an issue
  if (status !== 'success') {
    await github.rest.issues.create({
      owner,
      repo,
      title: `Deployment Failed - ${new Date().toISOString()}`,
      body: message,
      labels: ['deployment', 'failed']
    });
  }
};