---
id: faq_forticlient
title: "FAQ: SSL-VPN, FortiClient"
---


## &#x1F180; I don't know how to download the SSL-VPN client software FortiClient. {#how-to-DL-VPN}

&#x1F150; 

Click on the URL below to access the official ForiClient website page, then download the FortiClient VPN client software for Windows or Mac from 'FortiClient VPN' at the bottom of the displayed page. Click on ① and ② in the diagram below to download the software.

- FortiClient official website:[https://www.fortinet.com/support/product-downloads](https://www.fortinet.com/support/product-downloads)


＜Windows＞
![figure](VPNwin_2_701_2.png)

＜Mac＞
![figure](VPN_MAC_install_1_701_2.png)



## &#x1F180; VPN connection to the personal genome analysis division cannot be established. {#error-vpn-connection}

&#x1F150; If you got the error `Credential or ssl vpn configuration is wrong (-7200)` when accessing the personal genome analysis division with FortiClient on Windows 10 or 11,

Control Panel => Internet Options => Security tab => Trusted Sites

Register the SSL-VPN address here.

![](faq_pg-vpn.png)


## &#x1F180; When logging in to FortiClient, the "Security Warning" dialogue box does not appear and does not proceed beyond about 40% status.{#dialogbox_disappear}

![](faq_login_personal_1.png)

&#x1F150; If the connection does not proceed beyond about 40% and does not connect,

1. first, check that the dialogue box is not behind another screen or window. 
2. second, if this does not solve the problem, see ['Installing FortiClient VPN Client software'](/guides/using_personal_genome_division/pg_login/#install-sslvpn) and reinstall the latest FortiClient.



## &#x1F180; When entering your username and password for FortiClient for an SSL-VPN connection to the personal genome analysis division, the one-time password is not sent to the email address associated with your VPN account. {#no-onetime-pw-received}

&#x1F150; 
- Google has tightened the security since 1 March 2022, therefore there have been incidents that the email with one-time password from the NIG supercomputer VPN is not sent to gmail.
- We recommend that you register your institution's email address instead of a free email to sent the e-mail to the wrong person.
