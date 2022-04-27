const Form = JSONSchemaForm.default;

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

ReactDOM.render(
    React.createElement(Form, {
        schema: schema,
        uiSchema: { "ui:options": { "submitButtonOptions": { "norender": false, "submitText": "Download" } } },
        onSubmit: (input) =>
            download("example.json", JSON.stringify(input.formData, null, 4)),
    }),
    document.getElementById("app"));
