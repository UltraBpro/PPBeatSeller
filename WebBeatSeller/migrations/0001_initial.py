# Generated by Django 4.2.13 on 2024-09-08 21:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Album',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('cover_image', models.ImageField(blank=True, null=True, upload_to='album_covers/')),
                ('cover_video', models.FileField(blank=True, null=True, upload_to='album_videos/')),
            ],
        ),
        migrations.CreateModel(
            name='Feature',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('album', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='features', to='WebBeatSeller.album')),
            ],
        ),
        migrations.CreateModel(
            name='Demo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('audio_file', models.FileField(upload_to='demos/')),
                ('album', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='demos', to='WebBeatSeller.album')),
            ],
        ),
    ]
