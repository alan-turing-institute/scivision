import { Container } from "react-bootstrap";

// Component: The community tab
// route: /community
export function Community() {
    return (
        <Container>
            <h3>Community Resources</h3>
            <h5>Code of Conduct</h5>
            The Scivision <a href="https://github.com/alan-turing-institute/scivision/blob/main/CODE_OF_CONDUCT.md">Code of Conduct</a> which sets out the expectations of people participating in the project or taking part in events.

            <h5>Email Newsletter</h5>

            <p>Scivision has a low-volume newsletter hosted on Substack. Expect one email per month or so with.  Read previous newsletters or subscribe to the list <a href="https://scivision.substack.com">here</a>.</p>

            <p>It is possible to unsubscribe from the list at any time by following the link at the bottom of any email.</p>

            <h5>Slack Workspace</h5>

            Scivision has a Slack workspace, open to anyone interested in joining a community of people interested in computer vision for the sciences and humnanities. If you would like to join, please submit your email address with the form below.
            
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfDPbsb_CWApnodHlNyOQMQdKhKA9meJi_SAuh8K8dVpbIiDA/viewform?usp=sf_link">Slack workspace</a>

            We will use email addresses submitted through this form only for the purpose of sending the Slack invitation.

            
            <h5>GitHub</h5>
            Development is hosted on GitHub
            <ul>
                <li><a href="https://github.com/alan-turing-institute/scivision/discussions">Discussions</a> &mdash; ask a question, make a suggestion</li>
                <li><a href="https://github.com/alan-turing-institute/scivision/issues">Issues</a> &mdash; report a bug, request a feature</li>
                <li>Code contributions welcome, see the <a href="https://scivision.readthedocs.io/en/latest/contributing.html">contributing guide</a></li>
            </ul>

            <h5>Scivision Improvement Proposal Index</h5>
            <a href="https://scivision.readthedocs.io/en/latest/scip_index.html">SCIPI</a> &mdash; Community driven design documents, specs and proposals

            <h5>Contact the Core Team</h5>
            Scivision is maintained by a team at the Alan Turing Institute.
            
            In addition to the channels above, you can email the Scivision maintainers at <a href="mailto:scivision@turing.ac.uk">scivision@turing.ac.uk</a>.
        </Container>
    );
}
