import { Octokit } from '@octokit/core'
import { createPullRequest } from 'octokit-plugin-create-pull-request'

const server_configs = {
    development: {
        uri: 'https://scivision-dev-gh-gatekeeper.azurewebsites.net/authenticate/',
        client_id: 'b1f4db23eb46160d16b7',
        redirect_uri: 'http://localhost:3000/scivision/#/login/',
    },
    production: {
        uri: 'https://scivision-gh-gatekeeper.azurewebsites.net/authenticate/',
        client_id: '13bcb3c2a2c31a9f6f02',
        redirect_uri:
            'https://alan-turing-institute.github.io/scivision/#/login/',
    },
}

// export const server_config_selected = server_configs[process.env.NODE_ENV];

export const server_config_selected = server_configs[import.meta.env.MODE]

export const OctokitPRPlugin = Octokit.plugin(createPullRequest)
export const GH_TOKEN_KEY = 'gh_token'
export const RANDOM_UUID_KEY = 'random_uuid'
