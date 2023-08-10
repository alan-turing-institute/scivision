import { Container } from "react-bootstrap";

// Component: The community tab
// route: /community
export function Community() {
    return (
        <Container>
            <h3>Community Resources</h3>
            <ul>
                <li>
                    Our <a href="https://github.com/alan-turing-institute/scivision/blob/main/CODE_OF_CONDUCT.md">Code of Conduct</a>
                </li>
                <li>
                    <a href="https://github.com/alan-turing-institute/scivision/discussions">
                        GitHub Discussions
                    </a>
                </li>
                <li>
                    <a href="https://scivision.readthedocs.io/en/latest/scip_index.html">SCIPI</a>, the Scivision Improvement Proposal Index: Community driven design documents, specs and proposals
                </li>
                <li>Email the Scivision core maintainers at <a href="mailto:scivision@turing.ac.uk">scivision@turing.ac.uk</a></li>
            </ul>
        </Container>
    );
}
