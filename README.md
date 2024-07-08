# InfoSaveEmail

Este projeto consiste em três componentes principais para gerenciamento automatizado de dados e envio de e-mails:

1. **Bot Python para Envio de E-mails**
   - Monitora o arquivo `DB.txt` e envia seu conteúdo por e-mail para uma lista de destinatários especificada no arquivo `email.txt`.
   - **Requisitos:** Python 3.x, biblioteca `watchdog`, conta de e-mail no Gmail.

2. **Interface HTML/JavaScript para Geração de Arquivos**
   - Permite a configuração de dados de banco de dados através de uma interface amigável.
   - Salva as configurações localmente e gera o arquivo `DB.txt` na pasta `/storage/emulated/0/Download`.

3. **Bot Node.js de Limpeza Automática**
   - Monitora a pasta `/storage/emulated/0/Download`.
   - Detecta e remove automaticamente o arquivo `DB.txt` após 10 segundos, permitindo a geração de novos arquivos sem interferências.

## Instalação e Configuração

### Pré-requisitos

Para executar este projeto, certifique-se de ter instalado:

- Python 3.x
- Biblioteca `watchdog` (para monitoramento de arquivos)
- Conta de e-mail no Gmail

### Passos para Instalação

1. **Instale o Python:**
   Se estiver usando um sistema baseado em Linux, como Termux, instale o Python 3 usando o `apt`:
   ```bash
   apt update
   apt install python
  
  Clone o repositório do GitHub para obter uma cópia do código do projeto.
  
Instale a biblioteca watchdog para que o bot Python funcione corretamente:
   ```bash
 pip install watchdog

Instale nodejs

apt install nodejs

Configuração do E-mail: Abra o arquivo BOT9.py e substitua as variáveis sender_email e sender_password com suas próprias credenciais do Gmail:

sender_email = "seuemail@gmail.com"
sender_password = "suasenha"

Arquivos Necessários: Crie um arquivo email.txt fora da pasta do projeto, em /storage/emulated/0/Download, adicionando os e-mails dos destinatários, um por linha.


Executar o Bot Python: 
No terminal, execute o seguinte comando para iniciar o bot Python: python BOT9.py

 O bot monitorará o arquivo DB.txt e enviará seu conteúdo para os e-mails listados em email.txt sempre que houver uma alteração.
 

Executar o Bot  Node.js:   lixo.js limpará automaticamente o arquivo DB.txt na pasta /storage/emulated/0/Download após 10 segundos de sua criação.

## TODO ENVIO DE DADOS POR  HTML
