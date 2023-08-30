import { Container } from "react-bootstrap";

// Component: The Scivision.Py tab
// route: /scivisionpy
export default function ScivisionPy() {
  return (
    <>
      <h3>The Scivision.Py Python Library</h3>
      <Container className="text-block">
        See the{" "}
        <a href="https://scivision.readthedocs.io/en/latest/">documentation</a>.
      </Container>
    </>
  );
}
