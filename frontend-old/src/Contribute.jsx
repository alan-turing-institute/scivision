import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Contribute() {
  return (
    <>
      <h3>Contribute a catalog entry</h3>
      <Container className="text-block">
        <p>
          I would like to add a...
          <ul className="list-spaced">
            <li>
              <Link to="/new-model">model</Link>
            </li>
            <li>
              <Link to="/new-datasource">datasource</Link>
            </li>
            <li>
              <Link to="/new-project">project</Link>
            </li>
          </ul>
        {" "} 
            <a href="https://scivision.readthedocs.io/en/latest/">View full documentation</a>
        </p>
      </Container>
    </>
  );
}
