async function getLogs() {
  const runId = 22516146116;
  const res = await fetch('https://api.github.com/repos/ayobamizenthos/Teletraan/actions/runs/' + runId + '/jobs');
  const data = await res.json();
  const job = data.jobs[0];
  const logsRes = await fetch('https://github.com/ayobamizenthos/Teletraan/commit/v1.0.0/checks/' + job.id + '/logs');
  const text = await logsRes.text();
  const lines = text.split('\n');
  console.log(lines.slice(-30).join('\n'));
}
getLogs();
