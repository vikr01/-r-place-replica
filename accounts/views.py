from django.shortcuts import render, HttpResponse


# Create your views here.
def home(request):
    # return HttpResponse("<br/>".join([
    # '<script src=\"../DropboxPrototype/static/bundles/index.js\"></script>',
    # 'Home page! Welcome.'
    # ]))
    return render(request, 'react.html')
