from scivision.io import PretrainedModel
from skimage.io import imread
from skimage.transform import resize
from tensorflow.keras.applications.imagenet_utils import decode_predictions


def test_pretrained_model(IMAGENET_MODEL):
    """Check that a pretrained model object can be created from config"""
    assert type(IMAGENET_MODEL) == PretrainedModel


def test_pretrained_model_predict(KOALA, IMAGENET_MODEL):
    """Check that an example pretrained model's predict function returns expected value"""
    image = resize(imread(KOALA), (224, 224), preserve_range=True, anti_aliasing=True)
    prediction = IMAGENET_MODEL.predict(image)
    _, image_class, class_confidence = decode_predictions(prediction, top=1)[0][0]
    assert image_class == 'koala'
