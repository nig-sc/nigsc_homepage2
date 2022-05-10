---
id: aspera
title: How to use Aspera
---

When you transfer files to and from the NIG supercomputer, you can use scp or sftp, which are widely used as the file transfer software. But their transfer speed is slow when a large numbers of files are transfered over long distances.

For high-speed file transfer over long distances, the file transfer software Aspera is available on the general analysis section, and HCP tools is available on the personal genome analysis section on the NIG supercomputer.
- The total speed for all users can be up to 10 Gbps.

Reference
- [ascp4 official manual](https://www.ibm.com/docs/en/ahte/3.9.6?topic=solaris-ascp4-transferring-from-command-line-ascp)

For more useful options, see the output of `ascp --help`, etc..



## Installing Aspera Connect transfer client software

For using your Aspera, all user must install the Aspera Connect transfer client software on user's client computer.

how to install Aspera Connect transfer client software：See [Installing Aspera](/software/aspera/install_Aspera) page

- You need to install Aspera Connect transfer client software version 4 or later. To install version 4 or later, you must install the Aspera connect web browser plug-in. 
- Note: You can't download the version 4 `ascp` command unless you install version 4 or later.

## Transfer with Aspera Connect transfer client

### Upload files to the NIG supercomputer

Start a terminal emulator on the user's client computer and execute the following command.

```
$ ascp -l 1G -P 33001 -i ~/.ssh/DDBJ/id_rsa \
  $HOME/test.txt \
  youraccount@ascp.ddbj.nig.ac.jp:
```

Write the path relative to the user's home directory after `youraccount@ascp.ddbj.nig.ac.jp:`.

Ascp Optins and meaning of each option in the above example
- `-l` : transfer max_rate [bits per second]: transfer at rates up to the specified target rate.
    - You can specify the unit of measure in alphabetic characters, such as "10M". On the NIG supercomputer system, "10G" is the upper limit and 10M is the default value when this option is not specified.
- `-P` : ssh-port: the port number used by aspera.
- `-i` : private_key_file: specify user's SSH private key file （In the example `~/.ssh/DDBJ/id_rsa`）.
- `$HOME/test.txt`: the upload source file path
- `youraccount@ascp.ddbj.nig.ac.jp:`: the upload destination file path



### Download files from the NIG supercomputer

Start a terminal emulator on the user's client computer and execute the following command.

```
$ ascp -l 1G -P 33001 -i ~/.ssh/DDBJ/id_rsa \
  youraccount@ascp.ddbj.nig.ac.jp:somedir/test.txt \
  $HOME/tmp
```

When this command is executed, `/home/youraccount/somedir/test.txt` on the NIG supercomputer is downloaded as `$HOME/tmp/test.txt` on the local machine.

