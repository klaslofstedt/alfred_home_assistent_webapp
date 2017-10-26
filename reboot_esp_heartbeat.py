import time
import paho.mqtt.client as mqtt

mqttc = mqtt.Client()
mqttc.connect("10.0.0.131", 1883, 60)

while 1:
	mqttc.publish("esp", 1)
	print ("esp heartbeat")
	time.sleep(5)

mqttc.disconnect()

