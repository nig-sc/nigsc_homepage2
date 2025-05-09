---
id: pg_login_ssl-vpn_connection_linux
title: "How to connect to the VPN (Linux)"
---


For Linux, connect using the openfortivpn CUI.


1. Specify the configuration file as an argument and execute the command as follows.

```
$ sudo openfortivpn -c /path/to/config
```

After executing the command, a one-time password will be sent to the email address linked to the SSL-VPN account as follows.

![figure](VPNwin_15.png)

If the message is not sent, see [FAQ:Login > FAQ(Login)](/guides/FAQ/faq_personal_genome/faq_forticlient/faq_forticlient#no-onetime-pw-received).


2. Enter the one-time password (269274 in the example above) interactively as shown below and press the Enter key.

```
$ sudo openfortivpn -c /path/to/config
INFO: Connected to gateway.
Two-factor authentication token: Enter the ont-time password and press the Enter key
```

2. When the one-time password authentication is successful, the log is displayed as follows. When the following log is displayed, VPN connection is established. At this point, no prompt is returned. 

```
$ sudo openfortivpn -c config
INFO: Connected to gateway.
Two-factor authentication token:
INFO: Authenticated.
INFO: Remote gateway has allocated a VPN.
Using interface ppp0
Connect: ppp0 <--> /dev/pts/1
INFO: Got addresses: [10.212.134.11], ns [133.39.221.65, 133.39.222.41]
INFO: negotiation complete
INFO: negotiation complete
local IP address 10.212.134.11
remote IP address 192.0.2.1
INFO: Interface ppp0 is UP.
INFO: Setting new routes...
INFO: Adding VPN nameservers...
INFO: Tunnel is up and running.
```

To disconnect from the SSL-VPN connection, press Ctrl+C.
