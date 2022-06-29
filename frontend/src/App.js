import logo from './logo.svg';
import './App.css';
import Form from '@rjsf/bootstrap-4';
import schema from './datasource_schema.js'

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function App() {
  return (
      <div className="app">
          <div className="container">
              <div className="row">
                  <div className="col-md-6">
                      <Form onSubmit={(input) => download("one-datasource.json", JSON.stringify(input.formData, null, 4))}
                            uiSchema={{"ui:options": { "submitButtonOptions": { "norender": false, "submitText": "Download" } }}}
                            schema={schema} />
                  </div>
              </div>
          </div>
      </div>
  );
}

export default App;
