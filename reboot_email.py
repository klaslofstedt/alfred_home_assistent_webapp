#!/usr/bin/python

import smtplib

server = smtplib.SMTP('smtp.gmail.com', 587)
server.starttls()
server.login("klaslofstedt22@gmail.com", "gmaileternal22")
sender = "klaslofstedt22@gmail.com"
receiver = "klaslofstedt22@gmail.com"

msg = "Alfred reboot"
server.sendmail(sender, receiver, msg)
