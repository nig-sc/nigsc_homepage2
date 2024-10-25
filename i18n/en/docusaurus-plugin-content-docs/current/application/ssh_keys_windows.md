---
id: ssh_keys_windows
title: SSH public key Registration Procedure(Windows)
---

This page provides detailed completion instructions when creating SSH public key and and registering it to the NIG  supercomputer with Windows.

PowerShell, which comes standard with Windows, is used as an example.

![](/img/ssh_keys/windows/ssh_win_1.png)


## ①Create SSH public key and private key

### Open PowerShell

![](/img/ssh_keys/windows/ssh_win_intro_1-1.png)


First, click the Windows symbol.

![](/img/ssh_keys/windows/ssh_win_3.png)

A search box appears. Click on "&#x1F50D; Type here to search". You can click anywhere in the search box.

![](/img/ssh_keys/windows/ssh_win_4.png)

When clicked, the following image is displayed.

![](/img/ssh_keys/windows/ssh_win_5.png)

Enter 'PowerShell' or 'pwsh'.

For more information on the differences between "PowerShell" and "pwsh", see [<u>FAQ "What are the main differences between PowerShell 5.1 and 7.2.6?"</u>](/faq/faq_sshkeys_windows#what-are-the-main-differences-between-powershell-51-and-726).

![](/img/ssh_keys/windows/ssh_win_6.png)

If you entered 'PowerShell', the executable file appears in the search results, as shown in the screen below.

![](/img/ssh_keys/windows/ssh_win_7_powershell.png)


If you entered 'pwsh', the executable file appears in the search results, as shown in the screen below.

![](/img/ssh_keys/windows/ssh_win_7_pwsh.png)


If the executable file does not appear in the search results as in the screen below after you entered 'pwsh', the latest version of PowerShell is not yet installed and installation is recommended. [<u>Refer to the FAQ "How to install the latest version of PowerShell" to install the latest version of PowerShell</u>](/faq/faq_sshkeys_windows#how-to-install-the-latest-version-of-powershell).

![](/img/ssh_keys/windows/ssh_win_7_nonpwsh.png)

When the executable file appears in the search results, click "Run as administrator".

![](/img/ssh_keys/windows/ssh_win_8.png)

Click 'Yes'.

![](/img/ssh_keys/windows/ssh_win_9.png)

PowerShell will be opened.

![](/img/ssh_keys/windows/ssh_win_10.png)

At this time, the PowerShell screen of the user who entered 'pwsh' appears as follows. The display screen shown above is the PowerShell screen when PowerShell 7.2.6, the latest version as of 19 October 2022, is started.

![](/img/ssh_keys/windows/ssh_win_11.png)

If the following message appears on your screen: you are told "A more up-to-date version has been released, you should upgrade." . [<u>Click here to go to the FAQ "How to install the latest version of PowerShell" page to install the latest version of PowerShell</u>](/faq/faq_sshkeys_windows#how-to-install-the-latest-version-of-powershell).

```
 A new PowerShell stable release is available: v7.2.7
   Upgrade now, or check out the release page at:
     https://aka.ms/PowerShell-Release?tag=v7.2.7
```

The PowerShell screen for a user typing 'PowerShell' will appear as follows. 

As in this display screen, you may see a message indicating that the version of PowerShell is out of date, as shown in the image below. In that case, it is recommended to upgrade the version of PowerShell before starting the work on this page. For instructions, see [<u>"How to install the latest version of PowerShell" on the FAQ page</u>](/faq/faq_sshkeys_windows#how-to-install-the-latest-version-of-powershell).

![](/img/ssh_keys/windows/ssh_win_PS5_1.png)

When the Terminal screan appears, you can see a command prompt. It ends with '>'. When it appears, you are ready to enter commands. The blinking square box after this prompt is called Cursor, where you enter commands.

- When entering commands, do not type '>'. It is automatically displayed on PowerShell 7.2.6. You don't need to enter it.
- You don't need to click '>', Cursor or its black screen using the mouse. When Cursor appears, enter the command as it is and press the Enter key. The mouse is not used.

![](/img/ssh_keys/windows/ssh_win_12.png)

Once you have verified that the command prompt and cursor appear, check that openSSH client is installed before creating the SSH public key and private key.

OpenSSH client is a software, which is used to create SSH public key and private key, and to execute commands to communicate with NIG supercomputer using SSH. If it is not installed, you will not be able to do any further work, so check here.

Enter the following command and press the Enter key.

```
Get-WindowsCapability -Online | Where-Object Name -like 'OpenSSH*'
```

![](/img/ssh_keys/windows/ssh_win_13.png)

Then, you will see whether the OpensSSH client is installed on users PC or not, as follows.

![](/img/ssh_keys/windows/ssh_win_14.png)

```
Name  : OpenSSH.Client~~~~0.0.1.0
State : Installed
```

If 'State' of "OpenSSH.Client~~~~0.0.1.0" is 'Installed', the OpensSSH client is installed. [Continue to the next "Create SSH public key and private key"](/application/ssh_keys_windows#ssh公開鍵と秘密鍵を作る-1).

If it is 'NotPresent', the OpenSSH client is not yet installed. [See References and install this software](/application/ssh_keys_windows#参考文献), and then proceed to the next division "Create SSH public key and private key".

![](/img/ssh_keys/windows/ssh_win_14.png)


### Create SSH public key and private key

![](/img/ssh_keys/windows/ssh_win_intro_1-2.png)

When a new command prompt and cursor appear on the line following the line showing the status of the OpensSSH client installation, you can type the command again.

![](/img/ssh_keys/windows/ssh_win_15.png)

Type the following command and press the Enter key.

```
ssh-keygen -t rsa -b 3072
``` 

![](/img/ssh_keys/windows/ssh_win_16.png)

Then, two lines are output as the following screen.

![](/img/ssh_keys/windows/ssh_win_17.png)

You are asked to `Enter file in which to save the key (C:\Users\your_username/.ssh/id_rsa):`. This means: "Where in your PC do you want to save the SSH public key and private key you created?".

Normally, do not type anything and just press the Enter key.

![](/img/ssh_keys/windows/ssh_win_18.png)

Two lines will then be displayed, as shown in the following screen.

![](/img/ssh_keys/windows/ssh_win_19.png)

The message `Enter passphrase (empty for no passphrase):` is displayed. Enter your passphrase here.

The passphrase is different from the NIG supercomputer password. It can be any long string of characters.
The passphrase is supposed to be a long random string of characters, including spaces, such as the first line of a page when you open random a book.

<table>
	<tbody>
		<tr>
			<td>SSH treats possession of a private key file as evidence of identity. If the private key file is stolen, impersonation is possible. Although it is possible to omit the passphrase setting, it is strongly recommended to set it to reduce the damage in the event of private key theft.</td>
		</tr>
	</tbody>
</table>


Enter the passphrase and press the Enter key.

&#x2757; After entering the passphrase, the screen remains as shown below and nothing changes. While entering the passphrase, the screen also remains as shown below and nothing changes, but do not worry about it and continue entering. When you have finished typing, press the Enter key.

![](/img/ssh_keys/windows/ssh_win_20.png)

You will then see the following screen.

![](/img/ssh_keys/windows/ssh_win_21.png)

The message `Enter same passphrase again: ` will be displayed. Enter the same passphrase as entered above and press the Enter key.

&#x2757; After entering the passphrase, the screen remains as shown below and nothing changes. While entering the passphrase, the screen also remains as shown below and nothing changes, but do not worry about it and continue entering. When you have finished typing, press the Enter key.

![](/img/ssh_keys/windows/ssh_win_22.png)

You will then see the following screen.

![](/img/ssh_keys/windows/ssh_win_23.png)


#### &#x2666;**Check the existence of the SSH public key and private key you created**


Check that the SSH public key and private key are indeed created in the directory C:\Users\your_username/.ssh.

![](/img/ssh_keys/windows/ssh_win_24.png)

First, to check that the directory named .ssh has really been created, type the following command and press the Enter key.

```
Get-ChildItem -Directory C:\Users\your_username
```

![](/img/ssh_keys/windows/ssh_win_25.png)

Then, you can confirm the existence of a directory named .ssh in the directory C:\Users\your_username as the following screen.

![](/img/ssh_keys/windows/ssh_win_26.png)


Then, move into the directory named .ssh to check that the SSH public key and private key have indeed been created.

To move into .ssh, type the following command and press the Enter key.

```
Set-Location C:\Users\your_username\.ssh
```

Continue by typing the following command and pressing the Enter key to check that the SSH public and private keys have indeed been created.

```
Get-ChildItem
```

![](/img/ssh_keys/windows/ssh_win_27.png)

you can confirm that the SSH public and private keys have indeed been created as the following screen.

![](/img/ssh_keys/windows/ssh_win_28.png)


#### &#x2666;**Check the SSH public key you created**

Type the following command and press the Enter key to check the contents of the SSH public key you created.

```
cat .\id_rsa.pub
```

![](/img/ssh_keys/windows/ssh_win_29.png)

Then, the contents of the SSH public key you created are output, as shown in the following screen. It is written in the string.

![](/img/ssh_keys/windows/ssh_win_30.png)


## ②Register the SSH public key with the NIG supercomputer

![](/img/ssh_keys/windows/ssh_win_intro_2.png)

When the contents of the SSH public key you created are displayed, select all the contents displayed and copy them.

To select a range and copy that: Left-click the mouse just to the left of the first letter 's' of the first string 'ssh-rsa' and drag it straight to the end (in this case, the "S" (capital s) of "your_username@LAPTOP-USERS"). When dragged, the selected string is highlighted in gray, as shown in the screen below. Then release your hand from the mouse. On the gray highlighted string, right-click the mouse. After right-clicking, the highlight disappears. The copying is then complete. Right-clicking can be anywhere the gray highlighted area. Note that Ctrl + C will not make a copy.

![](/img/ssh_keys/windows/ssh_win_32.png)

On the <!-- <a href="https://sc-account.ddbj.nig.ac.jp/application/registration">Application for new use page</a> -->[Application for new use pag](/blog/2024-10-25-account_system_maintenance), click in the 'SSH public Key' frame on the 'Account' page, press Ctrl + V to paste them.

![](/img/ssh_keys/windows/ssh_win_33.png)

After pasting, press the 'Next' button and continue filling in the [continue filling in the account application form](/application/registration/#application-for-use).

![](/img/ssh_keys/windows/ssh_win_34.png)

[The SSH public key registration is completed when you conpletedd the registration of the account application on the "The NIG supercomputer Account Application" of the "Account Application and Change of Application Details" page and the "Completed" screen appears as shown below](/application/registration/#application-for-use)

![](/img/ssh_keys/windows/ssh_win_35.png)


## Confirmation of connection to the NIG supercomputer

- To log in to the General Analysis division, refer to [<u>"General Analysis division > How to Login (The general analysis division)"</u>](/general_analysis_division/ga_login).
- To login to the Personal Genome Analysis division, refer to [<u>"Personal Genome Analysis division > How to Login（The Personal Genome Analysis division）</u>](/personal_genome_division/pg_login).

If you have trouble connecting, refer to FAQ.
- [<u>FAQ > The General Analysis Division > How to Login</u>](/faq/faq_login_general)
- [<u>FAQ > The Personal Genome Analysis Division > How to Login</u>](/faq/faq_login_personal)


## Reference

- <a href="https://learn.microsoft.com/en-gb/windows-server/administration/openssh/openssh_install_firstuse?source=recommendations&tabs=gui">Get started with OpenSSH for Windows</a>



