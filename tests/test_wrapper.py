from scivision.io import PretrainedModel
from skimage.io import imread


def test_pretrained_model(IMAGENET_MODEL):
    """Check that a pretrained model object can be created from config"""
    assert isinstance(IMAGENET_MODEL, PretrainedModel)


def test_pretrained_model_predict(KOALA, IMAGENET_MODEL):
    """Check that an example pretrained model's predict function returns expected value"""
    prediction = IMAGENET_MODEL.predict(imread(KOALA))
    assert 'koala' in prediction  # expects a string that also includes confidence
