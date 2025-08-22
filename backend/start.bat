@echo off
REM Script para iniciar o backend do projeto Campanha De Corpo e Alma no Windows

REM Verificar se o ambiente virtual existe
if not exist venv (
    echo Ambiente virtual nao encontrado. Criando...
    python -m venv venv
    echo Ambiente virtual criado.
)

REM Ativar o ambiente virtual
echo Ativando ambiente virtual...
call venv\Scripts\activate

REM Verificar se as dependências estão instaladas
echo Verificando dependencias...
pip install -r requirements.txt

REM Verificar se o arquivo .env existe
if not exist .env (
    echo Arquivo .env nao encontrado. Criando a partir do exemplo...
    copy .env.example .env
    echo ATENCAO: Edite o arquivo .env e adicione suas chaves de API antes de continuar.
    echo Pressione qualquer tecla para continuar ou Ctrl+C para cancelar...
    pause > nul
)

REM Iniciar o servidor
echo Iniciando o servidor...
python run.py