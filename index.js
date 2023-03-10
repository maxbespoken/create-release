const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require("@octokit/action");
const { createTokenAuth } = require('@octokit/auth-token');

async function main() {
    github.getOctokit(await createTokenAuth('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'))

    const owner = "bespoken"
    const repo = "iac"

    const list = await octokit.rest.repos.listReleases({
        owner, repo
    })

    console.log('All', list)
    // `who-to-greet` input defined in action metadata file
    const nameToGreet = core.getInput('who-to-greet');
    console.log(`Hello ${nameToGreet}!`);
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
}

main().catch(err => core.setFailed(err.message))