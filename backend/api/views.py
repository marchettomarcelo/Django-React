from .models import Perfil, Projetos, Area
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from api.serializer import MyTokenObtainPairSerializer, RegisterSerializer, PerfilSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt

# Create your views here.


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/',
        '/api/prediction/'
    ]
    return Response(routes)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = f"Congratulation {request.user}, your API just responded to GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = request.POST.get('text')
        data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUsername(request, user_id):

    if request.method == 'GET':
        user = User.objects.get(id=user_id)

        perfil_serializer = PerfilSerializer(user.perfil)

        data = {'perfil': perfil_serializer.data}
        return Response({'response': data}, status=status.HTTP_200_OK)

    return Response({}, status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def users(request):
    every_user = Perfil.objects.all()
    every_user_serialized = PerfilSerializer(every_user, many=True)

    return JsonResponse({'users': every_user_serialized.data})


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
@csrf_exempt  # This is to avoid the csrf error REMOVE DPS
def updateProfile(request):
    try:
        user_id = int(request.data.get('user_id'))
        novos_pontos = int(request.data.get('pontos'))

        user = User.objects.get(pk=user_id)
        user.perfil.pontos = novos_pontos

        user.perfil.save()
        print("oi")
        return Response({'response': "ok"}, status=status.HTTP_200_OK)

    except:

        return Response({'response': 'Não foi possível alterar o perfil, avise o Marcelo'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@csrf_exempt  # This is to avoid the csrf error REMOVE DPS
def create_perfil(request):
    try:
        # Achar o usuario
        user = User.objects.get(username=request.data.get('email'))

        user.perfil.nome_exibicao = request.data.get('nome_exibicao')

        # Se for líder, mudar boleano
        if request.data.get('eh_lider') == "True":
            user.perfil.eh_lider = True

        # Se for diretor, mudar boleano
        if request.data.get('eh_diretor') == "True":
            user.perfil.eh_diretor = True

        # Se pertencer a alguma area, alterar perfil
        area_request = request.data.get('area')
        if area_request != "nan":
            user.perfil.area = Area.objects.get(area=area_request)

        # Se pertencer a algum projeto, alterar perfil
        projeto_request = request.data.get('projeto')
        if projeto_request != "nan":
            projeto = Projetos.objects.get(projeto=projeto_request)
            user.perfil.projeto.add(projeto.id)

        # salvar alterações
        user.perfil.save()

        return Response({'response': 'ok'}, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response({'response': "erro"}, status=status.HTTP_400_BAD_REQUEST)
