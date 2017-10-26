#!/usr/bin/python

import fbchat

email = "klasbot@gmail.com"
password = "alfred22"

client = fbchat.Client(email, password)

friends = client.getUsers("klaslofstedt")
friend = friends[0]
print friend

sent = client.send(friend.uid, "Alfred rebooted")
if sent:
	print("Message sent")


class EchoBot(fbchat.Client):

	def __init__(self, email, password, debug=True, user_agent=None):
		fbchat.Client.__init__(self, email, password, debug, user_agent)

	def on_message(self, mid, author_id, author_name, message, metadata):
		self.markAsDelivered(author_id, mid)
		self.markAsRead(author_id)

		print("%s said: %s"%(author_id, message))

		if str(author_id) != str(self.uid):
			self.send(author_id, message)

bot = EchoBot(email, password)
bot.listen()
