<?php 
/*

1-digitalocean da server ac(biz lokal server da calisacagiz)
2-server a node.js kur(bizde zaten kurulu, lokal serverimz yani pc miz)
3-server a socket-io kur
4-socket in gerekli ayarlaini yap
5-client da socket i dinlemeye basla
6-backend den socket e data gonder
7-clientte da gelen data yi isle

!Biz burda daha degisik bir praktise yapip, backendden data yi socket-io ya gonderecegiz ordan da data yi client a gonderecegiz..yani data yi clienttan alip socket e degil de .php den yani  backendden socket-io ya data gonderecegiz

!https://www.digitalocean.com/community/tutorials/how-to-install-composer-on-ubuntu-22-04-quickstart
!Wisembly's Elephant.io is a PHP library that provides an alternative way to communicate with a WebSocket server (such as a Socket.IO server) from PHP code. It's designed to offer WebSocket client capabilities in PHP, enabling PHP applications to interact with WebSocket servers for real-time data exchange.
!WebSocket technology facilitates full-duplex communication channels over a single TCP connection, commonly used in real-time web applications for live messaging, notifications, and similar features. While JavaScript is the primary language for interacting with WebSockets in the browser, server-side languages like PHP might also need to communicate with WebSocket servers for various reasons, such as emitting events or sending messages from the server to the WebSocket server.
!Elephant.io aims to bridge this gap by allowing PHP applications to send data to and receive data from a WebSocket server, effectively enabling real-time communication capabilities. This can be particularly useful for applications that are primarily built with PHP and need to interact with a real-time component, such as a chat service or live notifications, that's handled through a WebSocket server.

!PHP ICERISINDE SOCKET-SERVER SOCKET-CLIENT ILE ILGILI BIRCOK FARKLI KUTUPHANELER VARDIR KULLANILAN
!BIZIM SIRKETTE KULLANDGIMZDA TTextalk WebSocket PHP DIR

In PHP, there are several libraries available for working with WebSockets, both for creating WebSocket servers and for acting as WebSocket clients. Here's a list of some notable libraries, including Elephant.io, which I'll mention again with more context:

WebSocket Server Libraries in PHP
Ratchet: Ratchet is a popular PHP library for creating WebSocket servers. It allows you to create real-time, bi-directional applications between clients and servers over WebSockets. Ratchet is known for its ease of use and is widely used in the PHP community for adding WebSocket-based communication to applications.

ReactPHP Socket: Part of the ReactPHP project, this library provides asynchronous WebSocket capabilities for PHP, enabling the development of non-blocking WebSocket servers. It's suitable for high-performance applications that require long-running processes or real-time data communication.

WebSocket Client Libraries in PHP
Elephant.io: As previously mentioned, Elephant.io is a WebSocket client library that provides an easy way for PHP applications to communicate with WebSocket servers, particularly with Socket.IO servers. It's useful for scenarios where your PHP server needs to emit events or messages to a WebSocket server.

Textalk WebSocket PHP: This is a WebSocket client library for PHP that supports the RFC6455 (WebSocket) protocol. It's useful for PHP scripts that need to connect to WebSocket servers as a client, send messages, and receive responses.

GuzzleHttp WebSocket: Guzzle is a PHP HTTP client that simplifies sending HTTP requests and integrates with WebSocket client libraries. While Guzzle itself is more focused on HTTP communications, it can be used in conjunction with WebSocket client libraries for WebSocket support.

Choosing the Right Library
When selecting a WebSocket library for PHP, consider the following factors:

Server vs. Client: Determine whether you need to create a WebSocket server or if you need to connect to an existing WebSocket server as a client. This will guide your choice between server libraries (like Ratchet) and client libraries (like Elephant.io).

Compatibility: Ensure the library is compatible with the WebSocket server you're using, especially if you're connecting to a server using specific protocols or features, such as Socket.IO.

Community and Support: Consider the library's popularity, community support, and maintenance status. A well-supported library with active development and a large community can be more reliable and easier to work with.

Requirements and Features: Assess the specific requirements of your project, such as support for SSL/TLS, proxy connections, or specific WebSocket subprotocols, and ensure the library meets those needs.

Each of these libraries has its own set of features, strengths, and use cases. Your choice will depend on whether you're building a WebSocket server or client, your specific project requirements, and your personal preferences in terms of API and documentation.


*/