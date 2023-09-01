import { useState, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import AvatarEditor from "react-avatar-editor";

export default function ImageUpload() {
  const editor = useRef(null);
  const [haveImage, setHaveImage] = useState(false);
  const [image, setImage] = useState("");

  function handleUpdateImage(e) {
    setImage(URL.createObjectURL(e.target.files[0]));
    setHaveImage(true);
  }

  return (
    <div
      style={{
        display: "flex",
        "align-items": "stretch",
        "justify-content": "space-between",
      }}
    >
      <div>
        {haveImage ? (
          <AvatarEditor
            ref={editor}
            image={image}
            width={256}
            height={256}
            scale={1.0}
            border={20.0}
          />
        ) : (
          <div
            style={{
              width: "300px",
              "aspect-ratio": "1 / 1",
              "background-color": "#eeeeee",
              display: "flex",
              "align-items": "center",
              "justify-content": "center",
              padding: "20px",
              "font-size": "small",
            }}
            className="m-1"
          >
            Select a thumbnail image to upload
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          "flex-direction": "column",
          "justify-content": "space-around",
        }}
      >
        <Form.Control
          type="file"
          accept="image/*"
          onChange={handleUpdateImage}
          className="my-3"
        />
        <div>
          {" "}
          Zoom: <Form.Control type="range" disabled={!haveImage} />
        </div>
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={() => {
            setImage(null);
            setHaveImage(false);
          }}
        >
          Clear selected image
        </Button>
      </div>
      {/*
      <button
        onClick={() => {
          if (editor && haveImage) {
            // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
            // drawn on another canvas, or added to the DOM.
            // window.canvas = editor.current.getImage();

            // If you want the image resized to the canvas size (also a HTMLCanvasElement)
            window.canvasScaled = editor.current
              .getImageScaledToCanvas()
              .toDataURL("image/jpeg");
            window.haveImage = haveImage;
          }
        }}
      >
        Save
        </button> */}
    </div>
  );
}
