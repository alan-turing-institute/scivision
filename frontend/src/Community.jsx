import { Container } from "react-bootstrap";

const slack_signup_form_url =
  "https://docs.google.com/forms/d/e/1FAIpQLSfDPbsb_CWApnodHlNyOQMQdKhKA9meJi_SAuh8K8dVpbIiDA/viewform?usp=sf_link";

// Component: The community tab
// route: /community
export default function Community() {
  return (
    <>
      <h3>Community Resources</h3>
      <Container className="text-block">
        <h5>Email Newsletter</h5>
        <p>
          Scivision has a low-volume email newsletter for announcements about
          the project and forthcoming events (one email per month or so).
        </p>
        <p>
          Read previous newsletters or subscribe to the list on Substack{" "}
          <a href="https://scivision.substack.com">here</a>.
        </p>
        <p>
          It is possible to unsubscribe at any time by following the link at the
          bottom of any email from the list.
        </p>
        <h5>Community calls</h5>
        <p>
          Scivision runs an online call (over Zoom) from time to time, generally
          themed around computer vision or image analysis in a particular
          domain. There will also be a chance for an introduction to the
          Scivision project and hear any recent news.
        </p>
        <p>Future events will be advertised on Slack and the mailing list.</p>
        <h5>Slack Workspace</h5>
        <p>
          The Scivision Slack workspace is open to anyone interested in:
          <ul>
            <li>Discussing computer vision in the sciences and humanities</li>
            <li>
              Getting help with computer vision methods, and helping others
            </li>
            <li>Getting support using the Scivision catalogue and software</li>
            <li>Sharing and finding out about interesting events</li>
          </ul>
        </p>
        <p>
          We aim for this to be a welcome and supportive place to discuss
          computer vision, share ideas and ask questions. Using (or even
          intending to use) the Scivision software is not a prerequisite for
          joining!
        </p>
        <p>
          To join the Slack Workspace, submit your email address{" "}
          <a href={slack_signup_form_url}>here</a> (via a Google Form) and one
          of the team will invite you.
        </p>
        <h5>GitHub</h5>
        Development of Scivision is hosted on GitHub.
        <ul>
          <li>
            <a href="https://github.com/alan-turing-institute/scivision/discussions">
              Discussions
            </a>{" "}
            &mdash; ask a question, make a suggestion
          </li>
          <li>
            <a href="https://github.com/alan-turing-institute/scivision/issues">
              Issues
            </a>{" "}
            &mdash; report a bug, request a feature
          </li>
          <li>
            Code contributions welcome, see the{" "}
            <a href="https://scivision.readthedocs.io/en/latest/contributing.html">
              contributing guide
            </a>
          </li>
        </ul>
        <h5>Scivision Improvement Proposal Index</h5>
        <a href="https://scivision.readthedocs.io/en/latest/scip_index.html">
          SCIPI
        </a>{" "}
        &mdash; Community driven design documents, specs and proposals
        <h5>Code of Conduct</h5>
        The Scivision{" "}
        <a href="https://github.com/alan-turing-institute/scivision/blob/main/CODE_OF_CONDUCT.md">
          Code of Conduct
        </a>{" "}
        sets out the expectations of people participating in the project or
        events.
        <h5>Contact the Core Team</h5>
        The Scivision project is run by a team at the Alan Turing Institute. In
        addition to the channels above, you can email the team at{" "}
        <a href="mailto:scivision@turing.ac.uk">scivision@turing.ac.uk</a>.
      </Container>
    </>
  );
}
