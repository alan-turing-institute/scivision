from scivision.io.wrapper import PretrainedModel
# from scivision.io.installer import install_package
from skimage.io import imread
from skimage.transform import resize
from tensorflow.keras.applications.imagenet_utils import decode_predictions


def test_pretrained_model(imagenet_model):
    """Check that a pretrained model object can be created from config"""
    assert type(imagenet_model) == PretrainedModel


def test_pretrained_model_predict(koala, imagenet_model):
    """Check that an example pretrained model's predict function returns expected value"""
    image = resize(imread(koala), (224, 224), preserve_range=True, anti_aliasing=True)
    prediction = imagenet_model.predict(image)
    _, image_class, class_confidence = decode_predictions(prediction, top=1)[0][0]
    assert image_class == 'koala'
