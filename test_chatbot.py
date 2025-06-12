#!/usr/bin/env python3
"""
Script de teste para o chatbot no terminal
Execute este script para testar o chatbot interativamente
"""

import requests
import json
import time
import sys
from datetime import datetime
from colorama import init, Fore, Back, Style

# Inicializar colorama para cores no terminal
init(autoreset=True)

class ChatbotTester:
    def __init__(self, base_url="http://localhost:6000"):
        self.base_url = base_url
        self.session = requests.Session()

    def print_header(self):
        """Imprime cabeçalho bonito"""
        print(f"{Fore.CYAN}{'='*60}")
        print(f"{Fore.CYAN}🤖 TESTE DO CHATBOT INTELIGENTE 🤖")
        print(f"{Fore.CYAN}{'='*60}")
        print(f"{Fore.YELLOW}URL do servidor: {self.base_url}")
        print(f"{Fore.YELLOW}Hora de início: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"{Fore.CYAN}{'='*60}\n")

    def check_health(self):
        """Verifica se o servidor está online"""
        try:
            print(f"{Fore.BLUE}🔍 Verificando status do servidor...")
            response = self.session.get(f"{self.base_url}/health", timeout=5)

            if response.status_code == 200:
                data = response.json()
                print(f"{Fore.GREEN}✅ Servidor online!")
                print(f"{Fore.GREEN}   Status: {data.get('status')}")
                print(f"{Fore.GREEN}   Modelo: {data.get('model')}")
                print(f"{Fore.GREEN}   Timestamp: {data.get('timestamp')}")
                return True
            else:
                print(f"{Fore.RED}❌ Servidor retornou status {response.status_code}")
                return False

        except requests.exceptions.ConnectionError:
            print(f"{Fore.RED}❌ Não foi possível conectar ao servidor!")
            print(f"{Fore.RED}   Certifique-se de que o chatbot está rodando em {self.base_url}")
            return False
        except Exception as e:
            print(f"{Fore.RED}❌ Erro ao verificar status: {str(e)}")
            return False

    def send_message(self, message):
        """Envia mensagem para o chatbot"""
        try:
            print(f"{Fore.BLUE}📤 Enviando mensagem...")

            payload = {"message": message}
            response = self.session.post(
                f"{self.base_url}/chat",
                json=payload,
                headers={"Content-Type": "application/json"},
                timeout=30
            )

            if response.status_code == 200:
                data = response.json()
                return data.get("response", "Sem resposta"), data.get("timestamp")
            else:
                error_data = response.json() if response.headers.get('content-type') == 'application/json' else {}
                error_msg = error_data.get('error', f'HTTP {response.status_code}')
                return f"Erro: {error_msg}", None

        except requests.exceptions.Timeout:
            return "Erro: Timeout - O servidor demorou muito para responder", None
        except Exception as e:
            return f"Erro: {str(e)}", None

    def clear_history(self):
        """Limpa o histórico de conversa"""
        try:
            response = self.session.post(f"{self.base_url}/clear_history")
            if response.status_code == 200:
                print(f"{Fore.GREEN}🧹 Histórico limpo com sucesso!")
                return True
            else:
                print(f"{Fore.RED}❌ Erro ao limpar histórico: {response.status_code}")
                return False
        except Exception as e:
            print(f"{Fore.RED}❌ Erro ao limpar histórico: {str(e)}")
            return False

    def run_automated_tests(self):
        """Executa testes automatizados"""
        print(f"{Fore.MAGENTA}🧪 EXECUTANDO TESTES AUTOMATIZADOS")
        print(f"{Fore.MAGENTA}{'='*40}")

        test_messages = [
            "Olá! Como você pode me ajudar?",
            "Quais serviços sua empresa oferece?",
            "Você pode me falar sobre desenvolvimento web?",
            "Qual é o horário de funcionamento?",
            "Como posso entrar em contato?",
            "Obrigado pela ajuda!"
        ]

        for i, message in enumerate(test_messages, 1):
            print(f"\n{Fore.CYAN}📝 Teste {i}/6:")
            print(f"{Fore.WHITE}👤 Usuário: {message}")

            bot_response, timestamp = self.send_message(message)

            print(f"{Fore.GREEN}🤖 Bot: {bot_response}")
            if timestamp:
                print(f"{Fore.YELLOW}   ⏰ {timestamp}")

            # Pequena pausa entre mensagens
            time.sleep(1)

        print(f"\n{Fore.MAGENTA}✅ Testes automatizados concluídos!")

    def interactive_mode(self):
        """Modo interativo de conversa"""
        print(f"{Fore.MAGENTA}💬 MODO INTERATIVO")
        print(f"{Fore.MAGENTA}{'='*40}")
        print(f"{Fore.YELLOW}Digite suas mensagens (ou 'sair' para encerrar)")
        print(f"{Fore.YELLOW}Comandos especiais:")
        print(f"{Fore.YELLOW}  - 'limpar': Limpa o histórico de conversa")
        print(f"{Fore.YELLOW}  - 'status': Verifica status do servidor")
        print(f"{Fore.YELLOW}  - 'sair': Encerra o programa")
        print()

        while True:
            try:
                # Input do usuário
                user_input = input(f"{Fore.CYAN}👤 Você: ").strip()

                if not user_input:
                    continue

                # Comandos especiais
                if user_input.lower() == 'sair':
                    print(f"{Fore.YELLOW}👋 Encerrando... Até logo!")
                    break
                elif user_input.lower() == 'limpar':
                    self.clear_history()
                    continue
                elif user_input.lower() == 'status':
                    self.check_health()
                    continue

                # Enviar mensagem normal
                print(f"{Fore.BLUE}🤖 Bot está pensando...")
                bot_response, timestamp = self.send_message(user_input)

                print(f"{Fore.GREEN}🤖 Bot: {bot_response}")
                if timestamp:
                    print(f"{Fore.YELLOW}   ⏰ {timestamp}")
                print()

            except KeyboardInterrupt:
                print(f"\n{Fore.YELLOW}👋 Encerrando... Até logo!")
                break
            except Exception as e:
                print(f"{Fore.RED}❌ Erro: {str(e)}")

    def run_performance_test(self):
        """Testa performance com múltiplas mensagens"""
        print(f"{Fore.MAGENTA}⚡ TESTE DE PERFORMANCE")
        print(f"{Fore.MAGENTA}{'='*40}")

        messages = [
            "Teste de performance 1",
            "Como está o tempo hoje?",
            "Conte-me uma piada",
            "Qual é o sentido da vida?",
            "Teste de performance 5"
        ]

        total_time = 0
        successful_requests = 0

        for i, message in enumerate(messages, 1):
            print(f"{Fore.CYAN}⚡ Teste {i}/5: {message}")

            start_time = time.time()
            response, timestamp = self.send_message(message)
            end_time = time.time()

            response_time = end_time - start_time
            total_time += response_time

            if not response.startswith("Erro:"):
                successful_requests += 1
                print(f"{Fore.GREEN}✅ Sucesso em {response_time:.2f}s")
            else:
                print(f"{Fore.RED}❌ Falha: {response}")

        avg_time = total_time / len(messages) if messages else 0
        success_rate = (successful_requests / len(messages)) * 100 if messages else 0

        print(f"\n{Fore.MAGENTA}📊 RESULTADOS:")
        print(f"{Fore.YELLOW}   Tempo total: {total_time:.2f}s")
        print(f"{Fore.YELLOW}   Tempo médio: {avg_time:.2f}s")
        print(f"{Fore.YELLOW}   Taxa de sucesso: {success_rate:.1f}%")
        print(f"{Fore.YELLOW}   Requisições bem-sucedidas: {successful_requests}/{len(messages)}")

def main():
    """Função principal"""

    # Verificar se colorama está instalado
    try:
        from colorama import init, Fore, Back, Style
    except ImportError:
        print("⚠️  Para melhor experiência, instale colorama: pip install colorama")
        # Definir cores vazias se colorama não estiver disponível
        class Fore:
            CYAN = RED = GREEN = YELLOW = BLUE = MAGENTA = WHITE = ""

    tester = ChatbotTester()
    tester.print_header()

    # Verificar se servidor está online
    if not tester.check_health():
        print(f"\n{Fore.RED}💡 DICAS PARA RESOLVER:")
        print(f"{Fore.YELLOW}1. Certifique-se de que o chatbot está rodando:")
        print(f"{Fore.YELLOW}   python app.py")
        print(f"{Fore.YELLOW}2. Verifique se a porta 6000 está correta")
        print(f"{Fore.YELLOW}3. Verifique se o token da Hugging Face está configurado")
        return

    print(f"\n{Fore.GREEN}🎉 Conexão estabelecida com sucesso!")

    # Menu de opções
    while True:
        print(f"\n{Fore.CYAN}📋 OPÇÕES DE TESTE:")
        print(f"{Fore.WHITE}1. 🧪 Testes automatizados")
        print(f"{Fore.WHITE}2. 💬 Modo interativo")
        print(f"{Fore.WHITE}3. ⚡ Teste de performance")
        print(f"{Fore.WHITE}4. 🧹 Limpar histórico")
        print(f"{Fore.WHITE}5. 🔍 Verificar status")
        print(f"{Fore.WHITE}6. 🚪 Sair")

        try:
            choice = input(f"\n{Fore.CYAN}Escolha uma opção (1-6): ").strip()

            if choice == '1':
                tester.run_automated_tests()
            elif choice == '2':
                tester.interactive_mode()
            elif choice == '3':
                tester.run_performance_test()
            elif choice == '4':
                tester.clear_history()
            elif choice == '5':
                tester.check_health()
            elif choice == '6':
                print(f"{Fore.YELLOW}👋 Até logo!")
                break
            else:
                print(f"{Fore.RED}❌ Opção inválida. Escolha entre 1-6.")

        except KeyboardInterrupt:
            print(f"\n{Fore.YELLOW}👋 Encerrando... Até logo!")
            break
        except Exception as e:
            print(f"{Fore.RED}❌ Erro: {str(e)}")

if __name__ == "__main__":
    main()