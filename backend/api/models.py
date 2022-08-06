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


class Projetos(models.Model):
    projeto = models.CharField(max_length=4, choices=PROJETOS)

    def __str__(self):
        return self.projeto


class Area(models.Model):
    area = models.CharField(max_length=2, choices=AREAS)

    def __str__(self):
        return self.area


class Perfil(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nome_exibicao = models.CharField(max_length=100, blank=True)

    eh_lider = models.BooleanField(default=False)
    eh_diretor = models.BooleanField(default=False)

    area = models.ForeignKey(
        Area, blank=True, on_delete=models.CASCADE, null=True)

    projeto = models.ManyToManyField(Projetos, blank=True)

    pontos = models.IntegerField(default=0)

    def __str__(self):

        projetos_participando = []
        area_participando = ""
        # Adiciona os nomes dos projetos ao array proj
        for proj in self.projeto.all():
            projetos_participando.append(proj.projeto)
        projetos_participando = ', '.join(projetos_participando)

        if self.area:
            area_participando = self.area

        if self.eh_diretor:
            return f'{self.user.username}, diretor(a) {area_participando}'
        elif self.eh_lider:
            return f'{self.user.username}, líder do {projetos_participando}'
        else:
            return f'{self.user.username}, {area_participando} do {projetos_participando}'


@receiver(post_save, sender=User)
def create_user_Perfil(sender, instance, created, **kwargs):
    if created:
        Perfil.objects.create(user=instance)
