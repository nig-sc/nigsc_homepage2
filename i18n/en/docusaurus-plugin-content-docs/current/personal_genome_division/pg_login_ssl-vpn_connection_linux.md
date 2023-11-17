---
id: pg_login_ssl-vpn_connection_linux
title: "How to connect to the VPN (Linux)"
---


For Linux, connect using the openfortivpn CUI.

## 1. Configure the SSL-VPN client

Save a configuration file with the following content
- Configration file name and location are optional.
- For username and password, enter the VPN account information obtained in advance.
- For trusted-cert, the following fixed value (hash value of the SSL-VPN server's certificate) must be specified.

```
$ sudo vi /path/to/config
host = 133.39.24.254
port = 443
username = ********
password = ********
trusted-cert = 860101b1dbaff15fa35da3f6ed643b3cae434234c9bd866d86f67948d07a7f94
```

## 2. Connect to VPN

1. Specify the configuration file as an argument and execute the command as follows.

```
$ sudo openfortivpn -c /path/to/config
```

After executing the command, a one-time password will be sent to the email address linked to the SSL-VPN account as follows.

![figure](VPNwin_15.png)

If the message is not sent, see [FAQ:Login > FAQ(Login)](/faq/faq_login_personal/#🆀-when-entering-your-username-and-password-for-forticlient-for-an-ssl-vpn-connection-to-the-personal-genome-analysis-division-the-one-time-password-is-not-sent-to-the-email-address-associated-with-your-vpn-account).


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
