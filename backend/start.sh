#!/bin/bash

# Script para iniciar o backend do projeto Campanha De Corpo e Alma

# Verificar se o ambiente virtual existe
if [ ! -d "venv" ]; then
    echo "Ambiente virtual não encontrado. Criando..."
    python -m venv venv
    echo "Ambiente virtual criado."
fi

# Ativar o ambiente virtual
echo "Ativando ambiente virtual..."
source venv/bin/activate

# Verificar se as dependências estão instaladas
echo "Verificando dependências..."
pip install -r requirements.txt

# Verificar se o arquivo .env existe
if [ ! -f ".env" ]; then
    echo "Arquivo .env não encontrado. Criando a partir do exemplo..."
    cp .env.example .env
    echo "ATENÇÃO: Edite o arquivo .env e adicione suas chaves de API antes de continuar."
    echo "Pressione Enter para continuar ou Ctrl+C para cancelar..."
    read
fi

# Iniciar o servidor
echo "Iniciando o servidor..."
python run.py