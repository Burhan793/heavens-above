module.exports = async ({ github, context }) => {
  const { owner, repo } = context.repo;

  // Get the current tag
  const tag = context.ref.replace('refs/tags/', '');
  
  // Get the last release tag
  const releases = await github.rest.repos.listReleases({
    owner,
    repo,
    per_page: 1
  });

  const lastTag = releases.data[0]?.tag_name || '';

  // Get commits between tags
  const compareResult = await github.rest.repos.compareCommits({
    owner,
    repo,
    base: lastTag,
    head: tag
  });

  // Generate changelog
  let changelog = `# Changelog for ${tag}\n\n`;

  // Group commits by type
  const groups = {
    features: [],
    fixes: [],
    docs: [],
    other: []
  };

  for (const commit of compareResult.data.commits) {
    const message = commit.commit.message.split('\n')[0];
    if (message.startsWith('feat:')) {
      groups.features.push(message);
    } else if (message.startsWith('fix:')) {
      groups.fixes.push(message);
    } else if (message.startsWith('docs:')) {
      groups.docs.push(message);
    } else {
      groups.other.push(message);
    }
  }

  // Format changelog
  if (groups.features.length) {
    changelog += '## 🚀 New Features\n\n';
    groups.features.forEach(msg => changelog += `- ${msg.replace('feat: ', '')}\n`);
    changelog += '\n';
  }

  if (groups.fixes.length) {
    changelog += '## 🐛 Bug Fixes\n\n';
    groups.fixes.forEach(msg => changelog += `- ${msg.replace('fix: ', '')}\n`);
    changelog += '\n';
  }

  if (groups.docs.length) {
    changelog += '## 📚 Documentation\n\n';
    groups.docs.forEach(msg => changelog += `- ${msg.replace('docs: ', '')}\n`);
    changelog += '\n';
  }

  if (groups.other.length) {
    changelog += '## 🔄 Other Changes\n\n';
    groups.other.forEach(msg => changelog += `- ${msg}\n`);
  }

  return changelog;
};