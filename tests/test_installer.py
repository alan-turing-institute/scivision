from scivision.io import package_from_config


def test_package_from_config(IMAGENET_MODEL_CONFIG):
    """Check that the install string for the imagenet example model looks as expected"""
    # see the url field in tests/test_model_scivision.yml:
    expected = 'git+https://github.com/alan-turing-institute/scivision-test-plugin@main#egg=scivision_test_plugin'
    assert package_from_config(IMAGENET_MODEL_CONFIG) == expected
