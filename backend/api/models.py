from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

AREAS = (
        ('F', 'Financeiro'),
        ('GP', 'Gestão de Pessoas'),
        ('P', 'Gestão de Projetos'),
        ('M', 'Marketing'),
)

PROJETOS = (
    ('AMBI', 'Ambientar'),
    ('INFO', 'Informar'),
    ('PONT', 'Pontuais'),
    ('CA10', 'Camisa 10'),
    ('AULA', 'Aulas Solidárias'),
    ('CHAL', 'Challenge'),
    ('MUND', 'Mun'),
    ('SOMA', 'Somar'),
    ('SOCI', 'Social Planning'),
    ('VENU', 'Vênus'),
    ('ALEG', 'Alegrarte'),
)


class Perfil(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE)

    nome_exibicao = models.CharField(max_length=100)

    eh_lider = models.BooleanField(default=False)
    eh_diretor = models.BooleanField(default=False)

    area = models.CharField(max_length=2, choices=AREAS, null=True)
    projeto = models.CharField(max_length=4, choices=PROJETOS,  null=True)
    pontos = models.IntegerField(default=0)

    def __str__(self):
        return self.user.username


@receiver(post_save, sender=User)
def create_user_Perfil(sender, instance, created, **kwargs):
    if created:
        Perfil.objects.create(user=instance)
