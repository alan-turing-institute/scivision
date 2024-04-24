// Utility function to download a text file, with the given filename and contents 'text'
export function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text),
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

// helper: select a random sample of size 'n_sample' from the array 'arr'
export function sample_without_replacement(arr, n_sample) {
  var samples = [];
  for (var i = 0; i < arr.length; i++) {
    if (samples.length === n_sample) break;

    var u = Math.random();

    if ((arr.length - i) * u < n_sample - samples.length) {
      samples.push(arr[i]);
    }
  }
  return samples;
}
