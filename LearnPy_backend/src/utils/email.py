import os
import smtplib
from email.message import EmailMessage

def send_email(name, email, password):
    subject = '¡Bienvenido a LearnPy! Tus datos de acceso'
    
    # Cuerpo en texto plano
    text_body = f"""Aquí están tus datos de acceso:

Usuario: {name}
Correo: {email}
Contraseña: {password}

Recuerda mantener esta información segura.
Estamos felices de tenerte con nosotros.
"""

    # Cuerpo en HTML 
    html_body = f"""
    <html>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #ffffff; color: #333; padding: 30px;">
        <div style="max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
          <h2 style="color: #005288;">Bienvenido a LearnPy</h2>
          <p>Gracias por registrarte en LearnPy. A continuación, encontrarás tus credenciales de acceso:</p>
          <table style="width:100%; border-collapse: collapse;">
            <tr><td style="padding: 8px;"><strong>Usuario:</strong></td><td>{name}</td></tr>
            <tr><td style="padding: 8px;"><strong>Correo:</strong></td><td>{email}</td></tr>
            <tr><td style="padding: 8px;"><strong>Contraseña:</strong></td><td>{password}</td></tr>
          </table>
          <p style="margin-top: 20px;">Por favor, guarda esta información en un lugar seguro.</p>
          <p>Atentamente,<br>El equipo de LearnPy</p>
          <hr style="margin-top: 30px; border: none; border-top: 1px solid #eee;">
          <small style="color: #888;">Este correo fue generado automáticamente. No respondas a este mensaje.</small>
        </div>
      </body>
    </html>
    """

    msg = EmailMessage()
    msg['Subject'] = subject
    msg['To'] = email

    user = os.getenv('EMAIL_USER')
    msg['From'] = f"LearnPy <{user}>"
    passKey = os.getenv('EMAIL_PASS')

    msg.set_content(text_body)
    msg.add_alternative(html_body, subtype='html')

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
        server.login(user, passKey)
        server.send_message(msg)