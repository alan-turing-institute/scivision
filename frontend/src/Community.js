import { Container } from "react-bootstrap";

// Component: The community tab
// route: /community
export function Community() {
    return (
        <Container>
            <h3>Community Resources</h3>
            <h5>Code of Conduct</h5>
            The Scivision <a href="https://github.com/alan-turing-institute/scivision/blob/main/CODE_OF_CONDUCT.md">Code of Conduct</a> which sets out the expectations of people participating in the project or events.

            <h5>Email Newsletter</h5>

            <p>Scivision has a low-volume email newsletter, for announcements about the project and forthcoming events (one email per month or so).</p>

            <p>Read previous newsletters or subscribe to the list on Substack <a href="https://scivision.substack.com">here</a>.</p>

            <p>It is possible to unsubscribe at any time by following the link at the bottom of any email from the list.</p>

            <h5>Slack Workspace</h5>

            <p>The Scivision Slack workspace is open to all, for</p>

            <ul>
                <li>Discussion of computer vision in the sciences and humanities</li>
                <li>Getting and sharing help with computer vision methods</li>
                <li>Getting and sharing help with the Scivision catalogue and software tools</li>
                <li>Sharing and finding out about interesting events</li>
            </ul>

            <p>Using (or intending to use) the Scivision software is not a prerequisite for joining the Slack workspace.  We aim for this to be a welcome and supportive place to discuss all aspects of computer vision in the sciences and humanities, share ideas and ask questions.</p>

            <p>If you would like to join the Slack workspace, please submit your email address through the form <a href="https://docs.google.com/forms/d/e/1FAIpQLSfDPbsb_CWApnodHlNyOQMQdKhKA9meJi_SAuh8K8dVpbIiDA/viewform?usp=sf_link">here</a> (link redirects to Google Forms) and one of the team will send an invitation.</p>

            <p>We will use email addresses submitted through this form only for the purpose of sending the Slack invitation.</p>
            
            <h5>GitHub</h5>
            Development of Scivision is hosted on GitHub.
            <ul>
                <li><a href="https://github.com/alan-turing-institute/scivision/discussions">Discussions</a> &mdash; ask a question, make a suggestion</li>
                <li><a href="https://github.com/alan-turing-institute/scivision/issues">Issues</a> &mdash; report a bug, request a feature</li>
                <li>Code contributions welcome, see the <a href="https://scivision.readthedocs.io/en/latest/contributing.html">contributing guide</a></li>
            </ul>

            <h5>Scivision Improvement Proposal Index</h5>
            <a href="https://scivision.readthedocs.io/en/latest/scip_index.html">SCIPI</a> &mdash; Community driven design documents, specs and proposals

            <h5>Contact the Core Team</h5>
            The Scivision project is run by a team at the Alan Turing Institute.
            
            In addition to the channels above, you can email the team at <a href="mailto:scivision@turing.ac.uk">scivision@turing.ac.uk</a>.
        </Container>
    );
}
