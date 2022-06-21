#!/usr/bin/env python
# -*- coding: UTF-8 -*-

from IPython.display import display
from distinctipy.distinctipy import get_colors, get_text_color
from matplotlib.image import AxesImage
from matplotlib.colors import rgb2hex
import numpy as np
import pandas as pd
from PIL import Image, ImageDraw, ImageFont
import os.path


def _draw_bounding_box(im, score, xmin, ymin, xmax, ymax, num_boxes, font, hex_color, label, label_nums):
    """Draw a bounding boxes for object detection."""
    im_with_rectangle = ImageDraw.Draw(im)  
    im_with_rectangle.rounded_rectangle((xmin, ymin, xmax, ymax), outline = hex_color, width = 2, radius = 10)
    if label_nums:
        im_with_rectangle.text((xmin+3, ymin+1), label, fill=hex_color, font = font)
    return im


def predplot(image: np.ndarray,
             predictions: list,
             task: str = "object detection",
             label_nums: bool = False) -> AxesImage:
    """Plot an image loaded via scivison with predictions from a scivision model.

    Parameters
    ----------
    image : np.ndarray
        A numpy ndarray representation of an image.
    predictions : list
        A list of dictionaries, on for each detected object containing 'score',
        'label' and 'box' keys.
        'score' should be a float between 0 and 1.
        'label' should be a string that labels the object.
        'box' should be a dict with 'xmin', 'ymin', 'xmax' and 'ymax' keys,
        which denote the boundaries of each box (detected object).
    label_nums : bool = False
        When True, bounding boxes are numbered in addition to being colored.
        
    Returns
    -------
    The input image with colored bounding boxes and an accompanying pandas
    dataframe legend showing corresponding labels and scores for each object.
    """
    if task != "object detection":
        raise NotImplementedError("Visualisation for model predictions other than object detection have not been developed yet")

    pillow_image = Image.fromarray(image.to_numpy(), 'RGB')

    font_path = os.path.abspath(os.path.dirname(__file__)) + '/fonts/arial.ttf'
    font = ImageFont.truetype(font_path, 15)

    num_boxes = len(predictions)
    # generate visually distinct colours for each bounding box
    rgb_colors = get_colors(num_boxes, colorblind_type="Deuteranomaly")
    hex_colors = []
    text_hex_colors = []
    for color in rgb_colors:
        hex_colors.append(rgb2hex(color))
        text_hex_colors.append(rgb2hex(get_text_color(color)))

    index = 0
    for bounding_box in predictions:
        box = bounding_box["box"]
        bounded_image = _draw_bounding_box(pillow_image,
                                           bounding_box["score"],
                                           box["xmin"], box["ymin"],
                                           box["xmax"], box["ymax"],
                                           num_boxes, font,
                                           hex_colors[index],
                                           str(index),
                                           label_nums)
        index += 1

    display(bounded_image)

    # return colored pandas df table relating to the objects shown in image
    object_predictions = pd.DataFrame(predictions).drop('box', 1)
    object_predictions['bbox'] = object_predictions.index
    def get_col(s):
        return ['background-color: ' + hex_colors[s.bbox] + '; color: ' + text_hex_colors[s.bbox]]*3
    return object_predictions.style.apply(get_col, axis=1)