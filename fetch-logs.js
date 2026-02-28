const fetch = require('node-fetch'); // wait, native fetch is in node 20
async function getLogs() {
  const runId = 22516146116;
  const res = await fetch('https://api.github.com/repos/ayobamizenthos/Teletraan/actions/runs/' + runId + '/jobs');
  const data = await res.json();
  const job = data.jobs[0];
  const logsRes = await fetch(job.html_url);
  const text = await logsRes.text();
  console.log('Got HTML page, but logs are streamed on UI...');
}
getLogs();
