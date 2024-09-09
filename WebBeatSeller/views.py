from django.shortcuts import render
from .models import Album
from django.http import JsonResponse
from django.shortcuts import get_object_or_404

# Create your views here.

def index(request):
    albums = Album.objects.all()
    return render(request, 'index.html', {'albums': albums})

def album_detail(request, album_id):
    album = get_object_or_404(Album, id=album_id)
    data = {
        'id': album.id,
        'title': album.title,
        'description': album.description,
        'price': str(album.price),
        'cover_video': album.cover_video.url if album.cover_video else None,
        'features': [f.description for f in album.features.all()],
        'demos': [{'title': d.title, 'audio_file': d.audio_file.url} for d in album.demos.all()],
    }
    return JsonResponse(data)
