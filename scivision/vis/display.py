#!/usr/bin/env python
# -*- coding: UTF-8 -*-

from matplotlib.pyplot import imshow
import numpy as np
from PIL import Image, ImageDraw

def _draw_bounding_box(im, score, label, xmin, ymin, xmax, ymax, index, num_boxes):
    """Draw a bounding boxes for object detection."""
    im_with_rectangle = ImageDraw.Draw(im)  
    im_with_rectangle.rounded_rectangle((xmin, ymin, xmax, ymax), outline = "red", width = 5, radius = 10)
    im_with_rectangle.text((xmin+35, ymin-25), label, fill="white", stroke_fill = "red")
    return im


def predplot(image: np.ndarray,
             predictions: Any,
             task: str = "object detection") -> matplotlib.image.AxesImage:
    """Plot an image loaded via scivison with predictions
    from a scivision model"""
    if task != "object detection":
        raise NotImplementedError("Visualisation for model predictions other than object detection have not been developed yet")
    
    pillow_image = Image.fromarray(image.to_numpy(), 'RGB')
    num_boxes = len(bounding_boxes)
    index = 0
    for bounding_box in bounding_boxes:
        box = bounding_box["box"]
        bounded_image = _draw_bounding_box(pillow_image, bounding_box["score"], bounding_box["label"],\
            box["xmin"], box["ymin"], box["xmax"], box["ymax"], index, num_boxes)
        index += 1

    imshow(bounded_image)