from autobahn.twisted.websocket import WebSocketServerProtocol, \
    WebSocketServerFactory

class MyServerProtocol(WebSocketServerProtocol):
  
    def onConnect(self, request):
        print("Client connecting: {0}".format(request.peer))

    def onOpen(self):
        print("WebSocket connection open.")
        
        # Send data
        timeout = 0.5
        def sendRandomDirection():
          newDirection = random.choice(['up', 'down', 'left', 'right'])
          payload = newDirection.encode('utf8')
          self.sendMessage(payload, isBinary = False)
          pass
        
        #Repeat a task every x time
        l = task.LoopingCall(sendRandomDirection)
        l.start(timeout)

    def onMessage(self, payload, isBinary):
        print("Text message received: {0}".format(payload.decode('utf8')))

    def onClose(self, wasClean, code, reason):
        print("WebSocket connection closed: {0}".format(reason))


if __name__ == '__main__':

    import sys
    import random

    from twisted.python import log
    from twisted.internet import reactor
    from twisted.internet import task

    log.startLogging(sys.stdout)

    factory = WebSocketServerFactory(u"ws://127.0.0.1:9000", debug=False)
    factory.protocol = MyServerProtocol

    reactor.listenTCP(9000, factory)
    reactor.run()