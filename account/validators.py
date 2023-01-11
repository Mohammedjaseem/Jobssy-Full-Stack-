import os

def validate_file_extension(name):
    isValid = True

    ext = os.path.splitext(name)[1] # eg:  ('resume', '.pdf')
    valid_extensions = ['.pdf']

    if not ext.lower() in valid_extensions:
        isValid = False

    return isValid

def profile_pic_validator(name):
    isValid = True

    ext = os.path.splitext(name)[1] # eg:  ('resume', '.pdf')
    valid_extensions = ['.jpg']

    if not ext.lower() in valid_extensions:
        isValid = False

    return isValid