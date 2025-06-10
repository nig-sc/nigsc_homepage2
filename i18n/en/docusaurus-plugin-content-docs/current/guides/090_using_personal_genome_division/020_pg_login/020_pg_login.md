---
id: pg_login
title: "How to Login（The Personal Genome Analysis division）"
---


## Introduction

SSL-VPN connection is used for login and file transfer to the personal genome analysis division of the NIG supercomputer. For SSL-VPN connection, dedicated software called SSL-VPN Client software must be installed on the user's client machine. 

Two-factor authentication is used for SSL-VPN connection. For the purpose of improving security, the client machine is set to block access to the Internet when it is connected using SSL-VPN. At this time, communication within the local network to which the client machine belongs is not blocked. Therefore, for example, if the client machine is connected to a file server in the local network, it is possible to send data from that file server to the personal genome analysis division without any problem. On the other hand, if you are working by connecting to the client machine with ssh from outside the local network, the ssh connection will be cut off.

But it is possible to use only HTTPS on the Internet from the personal genome analysis division due to the settings on the firewall of the NIG supercomputer.


![figure](sslvpn.png)


## How to log in to the Personal Genome Analysis Division {#login-to-pg}

The outline of the connection procedure is shown in the figure below.

![figure](howto.png)

### STEP 1. Installing FortiClient VPN Client software {#install-sslvpn}


Download and install FortiClient on the official website of "[&#x1f517;FortiClient](https://www.fortinet.com/support/product-downloads)".

- The Official Website：&#x1f517;https://www.fortinet.com/support/product-downloads

<table>
<tr>
<td width="400" valign="top">

![](forticlientonly.png)

</td>
<td width="400" valign="top">

You can use FortiClient 'FortiClient VPN-only' version for free.

'FortiClient VPN-only' is located at the very bottom of the 'Product Downloads and Free Trials' page.

Please download 'FortiClient VPN-only' from the bottom of the 'Product Downloads and Free Trials' page.

</td>
</tr>
</table>

For more information on how to download and install it, see the links below.

- [Installing FortiClient VPN Client software (Windows)](/guides/FAQ/faq_personal_genome/faq_ssl-vpn_install/pg_login_ssl-vpn_install_win)
- [Installing FortiClient VPN Client software (MacOS)](/guides/FAQ/faq_personal_genome/faq_ssl-vpn_install/pg_login_ssl-vpn_install_mac)
- [Installing FortiClient VPN Client software (Linux)](/guides/FAQ/faq_personal_genome/faq_ssl-vpn_install/pg_login_ssl-vpn_install_linux)


### STEP 2. Configure the SSL-VPN client {#conf-sslvpn}


Set up the SSL-VPN client.

To set up, see the link below.
- [Configure the SSL-VPN client (Windows)](/guides/FAQ/faq_personal_genome/ssl-vpn_config_file/pg_login_ssl-vpn_configure_file_win)
- [Configure the SSL-VPN client (Mac)](/guides/FAQ/faq_personal_genome/ssl-vpn_config_file/pg_login_ssl-vpn_configure_file_mac)
- [Configure the SSL-VPN client (Linux)](/guides/FAQ/faq_personal_genome/ssl-vpn_config_file/pg_login_ssl-vpn_configure_file_linux)


### STEP 3. Connecting to the VPN  {#connect-sslvpn}

You should connect to the SSL-VPN before logging in to the prsonal genome analysis division.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="windows" label="Windows" attributes={{className: 'tab-blue'}}>
<div className="tab-blue-content">


For Windows, connect using the FortiClient GUI.

1. Enter 'User name' and 'Password'.
 - 'User name': enter the account name for the personal genome listed in the 'Usage category: personal genome analysis division' on the account registration card.
 - 'Password': enter the SSL-VPN password 'initial password' sent by SECURE DELIVER return mail.

![figure](VPNwin_13.png) 

2. A one-time password will be sent to the email address linked to the SSL-VPN account.
3. Enter the one-time password (In the example below, it is 269274.) in the "Token" field and click "OK".

![figure](VPNwin_16.png)

</div>
</TabItem>
<TabItem value="mac" label="MacOS" attributes={{className: 'tab-orange'}}>
<div className="tab-orange-content">

For MacOS, connect using the FortiClient GUI.

1. Enter 'User name' and 'Password'.
 - 'User name': enter the account name for the personal genome listed in the 'Usage category: personal genome analysis division' on the account registration card.
 - 'Password': enter the SSL-VPN password 'initial password' sent by SECURE DELIVER return mail.

![figure](VPNwin_13.png) 

2. A one-time password will be sent to the email address linked to the SSL-VPN account.
3. Enter the one-time password (In the example below, it is 269274.) in "Answer" and click "OK".

![figure](VPN_Mac_install_19.png)

</div>
</TabItem>
<TabItem value="linux" label="Linux" attributes={{className: 'tab-green'}}>
<div className="tab-green-content">

For Linux, connect using the openfortivpn CUI.

1. Specify the configuration file as an argument and execute the command as follows.

```
sudo openfortivpn -c config
```

For configuration instructions, refer to STEP 2: "How to Configure the SSV-VPN Client (Linux)".

2. A one-time password will be sent to the email address linked to the SSL-VPN account.
3. Enter the one-time password (In the example below, it is ikani269274.) interactively as shown below and press the Enter key.

An example of the command execution is shown below.

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

</div>
</TabItem> 
</Tabs> 

If you have trouble connecting, refer to [FAQ](/guides/FAQ/faq_personal_genome/faq_forticlient/faq_forticlient#dialogbox_disappear).

### STEP 4. SSH log in to the gateway {#ssh-login-gateway}

After connecting to the SSL-VPN, launch a terminal emulator and execute the following command to log in to the gateway of the personal genome analysis division.

There are two gateway nodes, `gwa.ddbj.nig.ac.jp` and `gwa2.ddbj.nig.ac.jp`. You can log in by executing the following commands, respectively.

```
ssh [username]@gwa.ddbj.nig.ac.jp 
```

or

```
ssh [username]@gwa2.ddbj.nig.ac.jp 
```

For questions on how to login, Refer to [FAQ](/guides/FAQ/faq_personal_genome/faq_forticlient/faq_forticlient).


## Logging in to the analysis server using SSH {#ssh-login-analysis-server}

The personal genome analysis division is a node rental, so the user logs in to the borrowed node by SSH from the gateway.
The name of the relevant node will be provided at the start of use.

