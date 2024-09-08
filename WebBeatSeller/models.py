from django.db import models

# Create your models here.

class Album(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    cover_image = models.ImageField(upload_to='album_covers/', blank=True, null=True)
    cover_video = models.FileField(upload_to='album_videos/', blank=True, null=True)

    def __str__(self):
        return self.title

class Feature(models.Model):
    album = models.ForeignKey(Album, related_name='features', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return f"{self.album.title} - {self.name}"

class Demo(models.Model):
    album = models.ForeignKey(Album, related_name='demos', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    audio_file = models.FileField(upload_to='demos/')

    def __str__(self):
        return f"{self.album.title} - {self.title}"
