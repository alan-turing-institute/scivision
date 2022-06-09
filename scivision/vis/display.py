#!/usr/bin/env python
# -*- coding: UTF-8 -*-

import matplotlib.pyplot as plt
from matplotlib.image import AxesImage
import numpy as np
import pandas as pd
from PIL import Image, ImageDraw, ImageFont
import os.path


def _draw_bounding_box(im, score, xmin, ymin, xmax, ymax, index, num_boxes, font):
    """Draw a bounding boxes for object detection."""
    im_with_rectangle = ImageDraw.Draw(im)  
    im_with_rectangle.rounded_rectangle((xmin, ymin, xmax, ymax), outline = "red", width = 5, radius = 10)
    im_with_rectangle.text((xmin+35, ymin-25), str(index), fill="white", stroke_fill = "red", font=font)
    return im


def predplot(image: np.ndarray,
             predictions: list,
             task: str = "object detection") -> AxesImage:
    """Plot an image loaded via scivison with predictions
    from a scivision model"""
    if task != "object detection":
        raise NotImplementedError("Visualisation for model predictions other than object detection have not been developed yet")
    
    pillow_image = Image.fromarray(image.to_numpy(), 'RGB')
    font_path = os.path.abspath(os.path.dirname(__file__)) + '/fonts/arial.ttf'
    font = ImageFont.truetype(font_path, 40)
    num_boxes = len(predictions)
    index = 1
    for bounding_box in predictions:
        box = bounding_box["box"]
        bounded_image = _draw_bounding_box(pillow_image, bounding_box["score"],\
            box["xmin"], box["ymin"], box["xmax"], box["ymax"], index, num_boxes, font)
        index += 1
    # display(bounded_image)

    # print pandas object_predictions table relating to the objects shown in image
    object_predictions = pd.DataFrame(predictions).drop('box', 1)
    object_predictions.index += 1
    object_predictions = object_predictions[['label', 'score']]
    
    plt.rcParams["figure.figsize"] = [7.50, 3.50]
    plt.rcParams["figure.autolayout"] = True

    fig = plt.figure()
    ax1 = fig.add_subplot(121)
    ax1.imshow(bounded_image)
    ax2 = fig.add_subplot(122)
    font_size = 14
    bbox = [0, 0, 1, 1]
    ax2.axis('off')
    mpl_table = ax2.table(cellText=object_predictions.values, rowLabels=object_predictions.index, bbox=bbox, colLabels=object_predictions.columns)
    plt.show()