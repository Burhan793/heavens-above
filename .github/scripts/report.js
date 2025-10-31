module.exports = async ({ github, context, core }) => {
  const { owner, repo } = context.repo;
  
  // Generate date for report
  const date = new Date().toISOString().split('T')[0];
  
  // Create report content
  let reportBody = `# Maintenance Report - ${date}\n\n`;
  
  // Add backup status
  reportBody += '## Backup Status\n';
  if (process.env.BACKUP_SUCCESS === 'true') {
    reportBody += '✅ Backup completed successfully\n\n';
  } else {
    reportBody += '❌ Backup failed\n\n';
  }
  
  // Add cache update status
  reportBody += '## Cache Update Status\n';
  if (process.env.CACHE_UPDATE_SUCCESS === 'true') {
    reportBody += '✅ Cache updated successfully\n\n';
  } else {
    reportBody += '❌ Cache update failed\n\n';
  }
  
  // Add cleanup results
  reportBody += '## Cleanup Results\n';
  if (process.env.CLEANUP_RESULTS) {
    reportBody += process.env.CLEANUP_RESULTS + '\n\n';
  }
  
  // Create issue with report
  await github.rest.issues.create({
    owner,
    repo,
    title: `Maintenance Report - ${date}`,
    body: reportBody,
    labels: ['maintenance', 'automated-report']
  });
  
  // If any step failed, exit with error
  if (process.env.BACKUP_SUCCESS !== 'true' || 
      process.env.CACHE_UPDATE_SUCCESS !== 'true') {
    core.setFailed('One or more maintenance tasks failed');
  }
};