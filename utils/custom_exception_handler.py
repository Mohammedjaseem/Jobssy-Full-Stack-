from rest_framework.views import exception_handler

def custom_exception_handler(exc, context):

    response = exception_handler(exc, context)

    exception_class = exc.__class__.__name__

    print(exception_class)# to print the exception class name in  console to handle it

    if exception_class == 'AuthenticationFailed':
        response.data = {
            'errors': "Invalid email or password, Please Login to continue"
        }

    if exception_class == 'PermissionDenied':
        response.data = {
            'errors': "You do not have permission to perform this action"
        }
    
    if exception_class == 'NotFound':
        response.data = {
            'errors': "Not found"
        }
    
    if exception_class == 'ValidationError':
        response.data = {
            'errors': response.data
        }
    
    if exception_class == 'MethodNotAllowed':
        response.data = {
            'errors': "Method not allowed"
        }
    
    if exception_class == 'ParseError':
        response.data = {
            'errors': "Parse error"
        }
    
    if exception_class == 'NotAuthenticated':
        response.data = {
            'errors': "Not authenticated"
        }

    if exception_class == 'NotAcceptable':
        response.data = {
            'errors': "Not acceptable"
        }
    
    if exception_class == 'UnsupportedMediaType':
        response.data = {
            'errors': "Unsupported media type"
        }
    
    if exception_class == 'Throttled':
        response.data = {
            'errors': "Throttled"
        }

    if exception_class == 'InvalidToken':
        response.data = {
            'errors': "Your token is expired or invalid please login again"
        }
    

    return response