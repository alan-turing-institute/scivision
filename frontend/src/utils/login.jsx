import { useParams, useLocation } from 'react-router-dom'

import { FaGithub } from 'react-icons/fa'

import { useNavigate } from 'react-router'
import { React, useState, useEffect, useRef } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import { Octokit } from '@octokit/core'
import {
    server_config_selected,
    GH_TOKEN_KEY,
    RANDOM_UUID_KEY,
} from '../config.js'

// Obtain the GitHub OAuth token from Scivision backend
//
// * gh-code - the code obtained from the GitHub OAuth API
async function get_github_token(gh_code) {
    const response = await fetch(server_config_selected.uri + gh_code)
    const json = await response.json()
    if (!json.token) {
        if (json.error) {
            throw json.error
        } else {
            throw Error('An unknown error occurred')
        }
    }
    return json.token
}

// Component: Login progress/redirection page
// route /login/:referrer
//
// This is used as the redirect URL for GitHub OAuth login - GitHub
// redirects back to this page after a login attempt.  This component
// then redirects again to the requested page given as the 'referrer'
// parameter, expected to be the page the user was viewing when they
// initiated the login.
export function Login({ gh_logged_in, set_gh_logged_in }) {
    const login_attempted = useRef(false)
    const { referrer_encoded } = useParams()
    const navigate = useNavigate()

    const location = new URL(window.location)
    const query_params = location.searchParams

    const gh_code = query_params.get('code')
    const gh_state = query_params.get('state')

    const random_uuid = sessionStorage[RANDOM_UUID_KEY]

    const referrer = decodeURIComponent(referrer_encoded)

    useEffect(() => {
        if (!login_attempted.current) {
            login_attempted.current = true
            if (gh_code) {
                ;(async () => {
                    if (gh_logged_in) throw Error('Already logged in to GitHub')
                    if (gh_state !== random_uuid)
                        throw Error('OAuth state mismatch')
                    return get_github_token(gh_code)
                })()
                    .then((tok) => {
                        sessionStorage[GH_TOKEN_KEY] = tok
                        set_gh_logged_in(true)
                    })
                    .catch((e) => {
                        console.log(
                            `Could not log in to GitHub.  The reason was: ${e.message}`
                        )
                    })
                    .finally(() => {
                        // Clearing the search parameters triggers a
                        // reload, and then 'navigate' is never called.
                        //
                        // window.location.search = "";
                        navigate(referrer)
                    })
            } else {
                console.log("Missing 'code' query parameter")
            }
        }
    }, [])

    return (
        <Container fluid className="d-flex justify-content-center">
            <Alert variant="info" className="col-7">
                <Alert.Heading>Logging in...</Alert.Heading>
                <p>
                    <Spinner animation="border" role="status" size="sm" />
                    &nbsp;&nbsp;Redirecting to GitHub to confirm your login
                </p>
                <hr />
                <p>Navigate away from this page to abort</p>
            </Alert>
        </Container>
    )
}

// GitHub OAuth login
//
// * referrer - redirect back to this page
// * gh_logged_in - current login state
//
// This function is called to initiate a login attempt
function github_auth({ referrer, gh_logged_in }) {
    if (!gh_logged_in) {
        var github_auth_url = new URL(
            'https://github.com/login/oauth/authorize'
        )

        const random_uuid = crypto.randomUUID()
        sessionStorage[RANDOM_UUID_KEY] = random_uuid

        const referrer_encoded = encodeURIComponent(
            encodeURIComponent(referrer)
        )

        github_auth_url.search = new URLSearchParams({
            client_id: server_config_selected.client_id,
            redirect_uri:
                server_config_selected.redirect_uri + referrer_encoded,
            scope: 'public_repo workflow',
            state: random_uuid,
        }).toString()

        // Redirect to GitHub
        window.location = github_auth_url
    } else {
        // Should not get here via the web interface (the login link
        // should not be visible when already logged in)
        console.log('Already logged in to GitHub')
    }
}

// Component: Username/logout link
//
// * set_gh_logged_in - setter for State variable
function LoginStatusLinkLoggedIn({ set_gh_logged_in }) {
    const octokit = new Octokit({ auth: sessionStorage[GH_TOKEN_KEY] })
    const [gh_username, set_gh_username] = useState('...')
    useEffect(() => {
        ;(async () => {
            const {
                data: { login },
            } = await octokit.rest.users.getAuthenticated()
            set_gh_username(login)
        })()
    }, [gh_username])

    return (
        <>
            Logged in as {gh_username}&nbsp;
            <a
                href="#"
                onClick={(e) => {
                    e.preventDefault()
                    set_gh_logged_in(false)
                    sessionStorage.removeItem(GH_TOKEN_KEY)
                }}
            >
                (logout)
            </a>
        </>
    )
}

// Component: Login link (shown when not logged in) or username/logout
// link (when logged in)
//
// * gh_logged_in - State variable
// * set_gh_logged_in - setter for State variable
export function LoginStatusLink({ gh_logged_in, set_gh_logged_in }) {
    const loc = useLocation()

    if (!gh_logged_in) {
        return (
            <a
                className="flex items-center gap-4 rounded-md bg-white bg-opacity-0 px-3 py-2 text-sm font-medium text-white hover:bg-opacity-10"
                href="#"
                onClick={(e) => {
                    e.preventDefault()
                    github_auth({
                        referrer: loc.pathname,
                        gh_logged_in: gh_logged_in,
                    })
                }}
            >
                <span>Login with GitHub</span>
                <FaGithub className="h-7 w-7 text-white" />
            </a>
        )
    } else {
        return <LoginStatusLinkLoggedIn set_gh_logged_in={set_gh_logged_in} />
    }
}

export function LoginButton({ gh_logged_in, children }) {
    const loc = useLocation()
    return (
        <Button
            onClick={() =>
                github_auth({
                    referrer: loc.pathname,
                    gh_logged_in: gh_logged_in,
                })
            }
        >
            {children}
        </Button>
    )
}
