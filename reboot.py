import datetime
import time
import os

reboot_time = datetime.datetime.now().time().strftime("%H:%M:%S")
while(reboot_time != "06:00:00"):
	reboot_time = datetime.datetime.now().time().strftime("%H:%M:%S")
	print reboot_time
	time.sleep(0.5)
print "rebooting"
os.system("/usr/bin/sudo /sbin/shutdown -r now")
#os.system("sudo reboot")
