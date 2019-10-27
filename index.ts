import core from '@actions/core';
import github from '@actions/github';

async function run() {
  const token = core.getInput('token', { required: true });
  const body = core.getInput('body', { required: true });

  const octokit = new github.GitHub(token);
  const owner = github.context.issue.owner;
  const repo = github.context.issue.repo;
  const issue_number = github.context.issue.number;

  const { data: comments } = await octokit.issues.listComments({
    owner,
    repo,
    issue_number,
  });

  if (!comments.find(c => c.body === body)) {
    await octokit.issues.createComment({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      issue_number: github.context.issue.number,
      body: body,
    });
  }
}

run();
