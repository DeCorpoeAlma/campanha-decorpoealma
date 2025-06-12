#!/bin/bash
# Script para remover tokens e credenciais sensíveis do histórico do Git
# Baseado nas recomendações do GitHub

# Cores para melhor visualização
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
RESET='\033[0m'

echo -e "${BLUE}=== Limpeza de Tokens Expostos no Histórico do Git ===${RESET}"
echo -e "${YELLOW}Este script ajudará a remover tokens/chaves sensíveis do histórico do Git.${RESET}"
echo -e "${YELLOW}IMPORTANTE: Este processo reescreve o histórico do Git. Use com cuidado.${RESET}"
echo ""
echo -e "${RED}ATENÇÃO: Esse script deve ser executado apenas após fazer backup do repositório!${RESET}"
echo ""

read -p "Deseja continuar? (s/n): " choice
if [[ ! "$choice" =~ ^[Ss]$ ]]; then
    echo -e "${YELLOW}Operação cancelada pelo usuário.${RESET}"
    exit 0
fi

echo -e "${BLUE}Verificando se git-filter-repo está instalado...${RESET}"
if ! command -v git-filter-repo &> /dev/null; then
    echo -e "${YELLOW}git-filter-repo não encontrado. Instalando...${RESET}"
    pip install git-filter-repo
    
    if ! command -v git-filter-repo &> /dev/null; then
        echo -e "${RED}Falha ao instalar git-filter-repo. Por favor, instale manualmente:${RESET}"
        echo "pip install git-filter-repo"
        exit 1
    fi
fi

echo -e "${BLUE}Fazendo backup do repositório atual...${RESET}"
current_dir=$(basename "$PWD")
backup_dir="../${current_dir}_backup_$(date +%Y%m%d%H%M%S)"
cp -r ../"$current_dir" "$backup_dir"
echo -e "${GREEN}Backup criado em: $backup_dir${RESET}"

echo -e "${BLUE}Removendo token Hugging Face do histórico...${RESET}"
# O padrão abaixo procura por tokens da Hugging Face (começando com 'hf_')
git filter-repo --force --replace-text <(echo "seu_token_aqui==>seu_token_aqui")

echo -e "${GREEN}Limpeza concluída!${RESET}"
echo ""
echo -e "${YELLOW}Para aplicar as mudanças no GitHub:${RESET}"
echo -e "1. Faça push com a flag --force-with-lease:"
echo -e "   ${BLUE}git push --force-with-lease origin main${RESET}"
echo ""
echo -e "${YELLOW}IMPORTANTE:${RESET}"
echo -e "1. Todos os colaboradores precisarão clonar o repositório novamente"
echo -e "2. Certifique-se de que todos os tokens expostos foram substituídos no código"
echo -e "3. Verifique se o arquivo .gitignore inclui .env e outros arquivos com credenciais"
echo ""
echo -e "${GREEN}Para mais informações, consulte:${RESET}"
echo -e "https://docs.github.com/code-security/secret-scanning/working-with-secret-scanning-and-push-protection/working-with-push-protection-from-the-command-line#resolving-a-blocked-push"