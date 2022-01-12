from scivision.io.wrapper import PretrainedModel
# from scivision.io.installer import install_package
from skimage.io import imread
from skimage.transform import resize
from tensorflow.keras.applications.imagenet_utils import decode_predictions
from tests import conftest

globals = conftest.GLOBALS()
IMAGENET_MODEL_CONFIG = globals['IMAGENET_MODEL_CONFIG']
KOALA = globals['KOALA']
IMAGENET_MODEL = globals['IMAGENET_MODEL']


def test_pretrained_model():
    """Check that a pretrained model object can be created from config"""
    assert type(IMAGENET_MODEL) == PretrainedModel


def test_pretrained_model_predict():
    """Check that an example pretrained model's predict function returns expected value"""
    image = resize(imread(KOALA), (224, 224), preserve_range=True, anti_aliasing=True)
    prediction = IMAGENET_MODEL.predict(image)
    _, image_class, class_confidence = decode_predictions(prediction, top=1)[0][0]
    assert image_class == 'koala'
