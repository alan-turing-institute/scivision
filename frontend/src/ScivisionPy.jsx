import React, { useEffect } from "react";
import { Container } from "react-bootstrap";

// Component: The Scivision.Py tab
// route: /scivisionpy
export default function ScivisionPy() {
  useEffect(() => {
    window.Prism?.highlightAll();
  });

  return (
    <>
      <h3>The Scivision.Py Python Library</h3>
      <Container className="wide-block">
        <p>
          Scivision.Py is a Python library for exploring and accessing the
          Scivision catalog programmatically, and for loading
          Scivision-compatible models and datasources.
        </p>
        <p>
          The full documentation is{" "}
          <a href="https://scivision.readthedocs.io/en/latest/">here</a>.
        </p>
      </Container>
      <h4>Quick Start</h4>
      <Container className="wide-block">
        <h5>Installation</h5>
        <p>
          From a terminal, run
          <pre>
            <code className="language-shell">$ pip install scivision</code>
          </pre>
        </p>
        <h5>Load a model</h5>
        <pre>
          <code className="language-python">
            {`from scivision import load_pretrained_model

resnet18 = load_pretrained_model(
    # The model URL
    "https://github.com/alan-turing-institute/scivision_classifier",

    # A Scivision model can contain several variants --
    # below we select the one to use
    model_selection='resnet18',

    # Allow the model and its dependencies to be installed
    # if they are not already (including tensorflow in this
    # example)
    allow_install=True
)`}
          </code>
        </pre>
        <h5>Load a datasource</h5>
        <pre>
          <code className="language-python">
            {`from scivision import load_dataset

dataset = load_dataset(
    "https://github.com/alan-turing-institute/scivision-test-data"
)

# 'dataset' provides several named arrays.  This datasource
# provides one named 'test_image': The keys can be looked
# up with # \`list(dataset)\` (or by consulting the datasource
# documentation)
#
test_image = dataset['test_image'].read()`}
          </code>
        </pre>
        <p>
          Optionally, inspect the image (with matplotlib, for example):
          <pre>
            <code className="language-python">
              {`import matplotlib.pyplot as plt

plt.imshow(test_image)`}
            </code>
          </pre>
        </p>
        <samp>
          <img
            src="/koala-imview.webp"
            alt="result of matplotlib imview: a koala"
          />
        </samp>
        <h5>Run the model</h5>
        <pre>
          <code className="language-python">resnet.predict(test_image)</code>
        </pre>
        <p>
          Output: <samp>'koala : 99.80%' </samp>
        </p>
        <h5>Query the catalogs</h5>
        The model and datasource catalogs are available as pandas data frames
        <pre>
          <code className="language-python">
            {`from scivision import default_catalog

# The datasource catalog as a Pandas dataframe
default_catalog.data.to_dataframe()

# Similarly for the model catalog
default_catalog.models.to_dataframe()`}
          </code>
        </pre>
      </Container>
    </>
  );
}
