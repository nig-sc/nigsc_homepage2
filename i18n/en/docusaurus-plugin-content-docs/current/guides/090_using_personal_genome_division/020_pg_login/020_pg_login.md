---
id: pg_login
title: "How to Login（The Personal Genome Analysis division）"
---


## Introduction

SSL-VPN connection is used for login and file transfer to the personal genome analysis division of the NIG supercomputer. For SSL-VPN connection, dedicated software called SSL-VPN Client software must be installed on the user's client machine. Two-factor authentication is used for SSL-VPN connection. For the purpose of improving security, the client machine is set to block access to the Internet when it is connected using SSL-VPN. At this time, communication within the local network to which the client machine belongs is not blocked. Therefore, for example, if the client machine is connected to a file server in the local network, it is possible to send data from that file server to the personal genome analysis division without any problem. On the other hand, if you are working by connecting to the client machine with ssh from outside the local network, the ssh connection will be cut off.

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

Download 'FortiClient VPN only' from 'Product Downloads'.

</td>
</tr>
</table>

For more information on how to download and install it, see the links below.

- [Installing FortiClient VPN Client software (Windows)](/guides/FAQ/faq_personal_genome/pg_login_ssl-vpn_install_win)
- [Installing FortiClient VPN Client software (MacOS)](/guides/FAQ/faq_personal_genome/pg_login_ssl-vpn_install_mac)
- [Installing FortiClient VPN Client software (Linux)](/guides/FAQ/faq_personal_genome/pg_login_ssl-vpn_install_linux)


### STEP 2. Configure the SSL-VPN client {#conf-sslvpn}


Set up the SSL-VPN client.

To set up, see the link below.
- [Configure the SSL-VPN client (Windows)](/guides/FAQ/faq_personal_genome/pg_login_ssl-vpn_configure_file_win)
- [Configure the SSL-VPN client (Mac)](/guides/FAQ/faq_personal_genome/pg_login_ssl-vpn_configure_file_mac)
- [Configure the SSL-VPN client (Linux)](/guides/FAQ/faq_personal_genome/pg_login_ssl-vpn_configure_file_linux)


### STEP 3. Connecting to the VPN  {#connect-sslvpn}

You should connect to the SSL-VPN before logging in to the prsonal genome analysis division.

For more information on how to connect, see the following link.
- [How to connect to the VPN (Windows)](/guides/FAQ/faq_personal_genome/pg_login_ssl-vpn_connection_win)
- [How to connect to the VPN (MacOS)](/guides/FAQ/faq_personal_genome/pg_login_ssl-vpn_connection_mac)
- [How to connect to the VPN (Linux)](/guides/FAQ/faq_personal_genome/pg_login_ssl-vpn_connection_linux)

If you have trouble connecting, refer to [FAQ](/guides/FAQ/faq_personal_genome/faq_forticlient/#dialogbox_disappear).

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

For questions on how to login, Refer to [FAQ](/guides/FAQ/faq_personal_genome/faq_forticlient/#dialogbox_disappear).


## Logging in to the analysis server using SSH {#ssh-login-analysis-server}

The personal genome analysis division is a node rental, so the user logs in to the borrowed node by SSH from the gateway.
The name of the relevant node will be provided at the start of use.

