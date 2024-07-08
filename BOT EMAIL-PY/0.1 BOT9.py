import os
import time
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

# Configurações de e-mail
sender_email = "SEU EMAIL GOOGLE AQUI"
sender_password = "SENHA********"

# Função para enviar e-mail com conteúdo do DB.txt
def enviar_email_com_conteudo(to_email, content):
    try:
        # Conexão SMTP
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender_email, sender_password)

        # Criar o e-mail
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = to_email
        msg['Subject'] = 'Assunto do E-mail'

        # Corpo do e-mail
        body = content
        msg.attach(MIMEText(body, 'plain'))

        server.sendmail(sender_email, to_email, msg.as_string())
        server.quit()
        print(f"E-mail enviado para {to_email}")
    except Exception as e:
        print(f"Erro ao enviar e-mail para {to_email}: {str(e)}")

# Monitor de eventos de arquivo
class WatchdogHandler(FileSystemEventHandler):
    def on_modified(self, event):
        if event.src_path.endswith('DB.txt'):
            print(f"Arquivo DB.txt modificado: {event.src_path}")
            try:
                with open(event.src_path, 'r') as file:
                    content = file.read()
                
                # Lendo os destinatários do arquivo email.txt
                email_path = '/storage/emulated/0/Download/email.txt'
                if os.path.exists(email_path):
                    with open(email_path, 'r') as file:
                        recipients = file.read().splitlines()
                    
                    for to_email in recipients:
                        enviar_email_com_conteudo(to_email, content)

                # Limpar o conteúdo do arquivo após enviar o e-mail
                with open(event.src_path, 'w') as file:
                    file.write("")
                print("Conteúdo do DB.txt limpo após envio de e-mail.")
            except Exception as e:
                print(f"Erro ao ler o arquivo {event.src_path}: {str(e)}")

if __name__ == "__main__":
    # Pasta a ser monitorada
    path = '/storage/emulated/0/Download'

    # Verificar se o diretório existe
    if not os.path.exists(path):
        print(f"Diretório {path} não encontrado.")
        exit(1)

    # Inicializar o observador
    observer = Observer()
    observer.schedule(WatchdogHandler(), path, recursive=False)
    observer.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    
    observer.join()