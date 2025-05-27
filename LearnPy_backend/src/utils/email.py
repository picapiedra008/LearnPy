import smtplib
from email.message import EmailMessage

def send_email(name, email, password):
    subject = '¡Bienvenido a LearnPy!'
    body = f"""Aquí están tus datos de acceso:
     Usuario: {name}
     Correo: {email}
     Contraseña: {password}

Recuerda mantener esta información segura.
¡Estamos felices de tenerte con nosotros!
"""

    msg = EmailMessage()
    msg.set_content(body)
    msg['subject'] = subject
    msg['to'] = email

    user = '' # email remitente
    msg['from'] = user
    passKey = '' # clave email
    
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
        server.login(user, passKey)
        server.send_message(msg)