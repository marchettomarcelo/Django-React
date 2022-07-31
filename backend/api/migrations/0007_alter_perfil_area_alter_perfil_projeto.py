# Generated by Django 4.0.1 on 2022-07-31 19:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_perfil_area'),
    ]

    operations = [
        migrations.AlterField(
            model_name='perfil',
            name='area',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.area'),
        ),
        migrations.AlterField(
            model_name='perfil',
            name='projeto',
            field=models.ManyToManyField(blank=True, null=True, to='api.Projetos'),
        ),
    ]
