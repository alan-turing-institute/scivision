import { Container } from "react-bootstrap";

const slack_signup_form_url = "https://forms.office.com/Pages/ResponsePage.aspx?id=p_SVQ1XklU-Knx-672OE-TF37BUQLiBEhQiSUHIXyABUM1Y4RE9TRkIxUk1PN0I4VENSVFVaVVpDUi4u";


// Component: The community tab
// route: /community
export default function Community() {
  return (
    <>
      <h3>Community resources</h3>
      <Container className="text-block">
        <h5>Slack workspace</h5>
        <p>
          Please join our {" "}
          <a href={"https://forms.office.com/e/cW28TK4aui"}>Slack workspace</a> to stay up to date with the Scivision community! 
          You can use Slack to:
          <ul className="list-spaced mt-2">
            <li>
              Discuss computer vision in the sciences and humanities
            </li>
            <li>
              Get help with computer vision methods, and helping others
            </li>
            <li>
              Get support using the Scivision catalog and software
            </li>
            <li>
              Share and discover interesting events
            </li>
            <li>
              We aim for this to be a welcome and supportive place to discuss computer vision, share ideas and ask questions. Using (or even intending to use) the Scivision software is not a prerequisite for joining!
            </li> 
          </ul>
        </p>
        <p>
          We aim for this to be a welcome and supportive place to discuss
          computer vision, share ideas and ask questions. Using (or even
          intending to use) the Scivision software is not a prerequisite for
          joining!
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
        <h5>Code of conduct</h5>
        The Scivision{" "}
        <a href="https://github.com/alan-turing-institute/scivision/blob/main/CODE_OF_CONDUCT.md">
          code of conduct
        </a>{" "}
        sets out the expectations of people participating in the project or
        events.
        <h5>Contact the core team</h5>
        The Scivision project is run by a team at the Alan Turing Institute. In
        addition to the channels above, you can email the team at{" "}
        <a href="mailto:scivision@turing.ac.uk">scivision@turing.ac.uk</a>.
      </Container>
    </>
  );
}
