module.exports = async ({ github, context }) => {
  const { owner, repo } = context.repo;
  
  // Get all workflow runs
  const runs = await github.rest.actions.listWorkflowRunsForRepo({
    owner,
    repo,
    status: 'completed'
  });

  // Keep only the last 30 days of runs
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // Delete old workflow runs
  for (const run of runs.data.workflow_runs) {
    const runDate = new Date(run.created_at);
    if (runDate < thirtyDaysAgo) {
      await github.rest.actions.deleteWorkflowRun({
        owner,
        repo,
        run_id: run.id
      });
      console.log(`Deleted workflow run ${run.id} from ${runDate}`);
    }
  }

  // Clean up old artifacts
  const artifacts = await github.rest.actions.listArtifactsForRepo({
    owner,
    repo
  });

  for (const artifact of artifacts.data.artifacts) {
    const artifactDate = new Date(artifact.created_at);
    if (artifactDate < thirtyDaysAgo) {
      await github.rest.actions.deleteArtifact({
        owner,
        repo,
        artifact_id: artifact.id
      });
      console.log(`Deleted artifact ${artifact.id} from ${artifactDate}`);
    }
  }
};