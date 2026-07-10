---
id: ClaudeScienceNig_260706_oo01
title: Using Claude Science on the NIG Supercomputer
description: |
  A procedure for general users of the NIG supercomputer (DDBJ) to use Claude Science. You SSH into the a001 compute node through gw.ddbj.nig.ac.jp as a stepping stone, install claude-science under your own home directory, launch it, and use it from a web browser on your local machine via SSH port forwarding. Heavy processing and GPU processing are submitted to Slurm. Preparing the execution environment such as bubblewrap and unprivileged namespaces is administrator work; see `ClaudeScienceNigAdmin_260706_oo01`.
---

# Running Claude Science serve on the NIG Supercomputer (user operations)

This document explains a configuration in which claude science serve runs on a node of the NIG supercomputer instead of on the user's PC.

- Effective when the user's PC is underpowered.
- It becomes difficult to use a workflow that submits jobs to Slurm.

This is not the recommended way to use it, but since there may be cases where this configuration is required, it is left here as a note.

## System configuration

![](claude_science02.png)


## Installation procedure


### 1. Configure multi-hop SSH so you can log in to the login node directly


Write the following in the `~/.ssh/config` on the user's PC. This lets you log in to the login node a003 with a single command from the user's PC (without explicitly logging in to the gateway node).

```sshconfig
# Write in ~/.ssh/config on the user's PC (a file on the user's PC)
Host nig-gw
  HostName gw.ddbj.nig.ac.jp                 # NIG supercomputer gateway machine (stepping stone)
  User youraccount
  IdentityFile ~/.ssh/<private key for the NIG supercomputer>
  IdentitiesOnly yes

Host nig-a003
  HostName a003                              # NIG supercomputer a003 compute node (name visible from gw)
  User youraccount
  IdentityFile ~/.ssh/<private key for the NIG supercomputer>
  IdentitiesOnly yes
  ProxyJump nig-gw                           # automatically hop through gw
```

Run the following to confirm that you can log in to a003 from the user's PC in a single operation.

```bash
# Run on the user's PC (open a login terminal). Log in to a003
ssh nig-a003   # reaches a003
```

### 2. Install claude-science into your own home directory on the supercomputer, on the login node

Run the following to install claude-science.

```bash
# Run on a003 (already logged in to a003 in the login terminal)
curl -fsSL https://claude.ai/install-claude-science.sh | bash
```


### 3. Setting the PATH environment variable

`claude-science` is installed under `~/.local/bin`.
So that it is available in both the current shell and future shells, add its path to the `PATH` environment variable.

```bash
# Run on a003
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```


## Usage procedure

In the simplest configuration, claude science runs both the web browser and claude science serve on the user's PC, but you can also run large computations on a separate machine such as the NIG supercomputer.
In that case, you connect the two machines with SSH port forwarding.


### 1. Check for an available port

Check which ports are free with the following command.

```
# Run on a003 (login terminal). Only the numbers in use within this range are shown. Choose from the numbers that did not appear
ss -tlnp 'sport >= :43000 and sport <= :43100'
```

### 2. Check the path of your own home directory

When launching claude science server, the fact that the home directory `/home/youraccount` on the NIG supercomputer is a symbolic link causes a startup problem.
Therefore, obtain the full path of the real directory with the following command.

```
readlink -f $HOME
```

Example

```
youraccount@a003:~$ readlink -f $HOME
/lustre10/home/youraccount
```

### 3. Launch claude science serve

Launch claude science serve with the following command.

```
# Run on a003 (login terminal). This command keeps running in the foreground and occupies this terminal from now on
HOME=/lustre10/home/youraccount claude-science serve --no-browser --port 43000 
```

- For `--port`, specify the free port you checked in step 1.
- For `HOME=`, specify the path of your own home directory that you checked in step 2.



Example

```
youraccount@a003:~$ HOME=/lustre10/home/youraccount claude-science serve --no-browser --port 43000
[claude-science] data dir: /lustre10/home/youraccount/.claude-science (0xbd00bd0)
[migrate] 1ms total · 0 stmts · 0 slow (≥100ms)
[daemon] growthbook: not signed in — flags stay at defaults
[daemon] sandbox origin: http://localhost:43001/mcp_apps
[daemon] warming 24 built-in MCP connectors...
[daemon] listening on 127.0.0.1:43000 (pid 2532362, version 0.1.16-dev.20260707.t155726.shaf2472db)

  ───────────────────────────────────────────────────────────────────────────────────
  Web UI →  http://localhost:43000/?nonce=19XXXXXXXXXXXXXXXXXXXXf9f375fab6ed23385
  ───────────────────────────────────────────────────────────────────────────────────

  Remote? Forward both ports: 43000 (app) and 43001 (sandbox content)

  This link is a one-time password, not a bookmark: it logs one
  browser tab in, then expires (3 min). The tab stays logged in
  until the daemon restarts.

  Seeing "session expired", or need a fresh link?  claude-science url

... the messages continue below
```

You will use the Web UI shown here in step 5.


### 4. SSH port forwarding

**Open a new terminal emulator on the user's PC** and run the following command.

```bash
# Run on the user's PC (open a new port-forwarding terminal, a separate window from the login terminal)
ssh -L 43000:localhost:43000 nig-a003
```

- For `43000`, specify the port number you used in step 3.


| Part | Meaning |
|---|---|
| Left `43000` | Port number on the user's PC side. This number also needs to be free on the user's PC. |
| `localhost` | Means that `nig-a003` forwards to its own `localhost:43000` |
| Right `43000` | Port number on the a003 compute node (match the `--port 43000` in step 1) |
| `nig-a003` | The name of the destination written in `~/.ssh/config` on the user's PC |


:::note 
Unless there is a special reason, it is best to **use the same port number on the user's PC side and the serve side.** If they differ, step 5 fails with a `forbidden origin` error and you cannot proceed.

The reason this error occurs is that the Claude Science serve process performs a CSRF-protection Origin check on writes to the Web UI and on WebSocket connections. serve holds the address it is listening on (`http://localhost:43000`) in its allow list as a legitimate Origin. This check requires an exact match of the scheme (`http`), the host (`localhost`), and **the port number**.
:::


When you run it, after the login messages it stops with the a003 prompt showing. Leave this terminal open.


Example:

```
youraccount@stonefly514:~ (2026-07-08 17:54:26)
$ ssh -L 43000:localhost:43000 nig-a003
Welcome to Ubuntu 24.04.4 LTS (GNU/Linux 6.8.0-90-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/pro

 System information as of Thu Jul  9 00:57:53 JST 2026

  System load:  4.22                Temperature:                 70.0 C
  Usage of /:   15.4% of 878.65GB   Processes:                   3063
  Memory usage: 40%                 Users logged in:             14
  Swap usage:   99%                 IPv4 address for ibp129s0f0: 172.19.13.3

 * Strictly confined Kubernetes makes edge and IoT secure. Learn how MicroK8s
   just raised the bar for easy, resilient and secure K8s cluster deployment.

   https://ubuntu.com/engage/secure-kubernetes-at-the-edge

Expanded Security Maintenance for Applications is not enabled.

3 updates can be applied immediately.
To see these additional updates run: apt list --upgradable

99 additional security updates can be applied with ESM Apps.
Learn more about enabling ESM Apps service at https://ubuntu.com/esm


*** System restart required ***
Last login: Thu Jul  9 00:57:53 2026 from 172.19.13.202
youraccount@a003:~$
```



### 5. Display the Web UI in a browser 

**On the user's PC**, launch a web browser and open the URL shown in step 3 in the web browser.
`http://localhost:43000/?nonce=19XXXXXXXXXXXXXXXXXXXXf9f375fab6ed23385`

A screen like the following should appear.

![](cs01a.png)

![](cs01b.png)

![](cs01.png)

:::note
If it does not work, the login may have timed out.
In that case, stop claude science serve once and repeat steps 3 and 5.
:::

Follow the guidance and enter the required items in order.

![](cs02.png)

![](cs03.png)

![](cs04.png)

### 6. Stop claude science serve

Check the status

```
youraccount@a003:~$ HOME=/lustre10/home/youraccount claude-science status
{
  "running": true,
  "pid": 2533288,
  "version": "0.1.16-dev.20260707.t155726.shaf2472db",
  "port": 43000,
  "started_at": "2026-07-08T07:40:26.387Z",
  "health": {
    "flavor": "release",
    "channel": "public",
    "uptime_ms": 4187589,
    "active_frames": 1,
    "active_conversations": 1,
    "require_token": true,
    "fell_back_from": null,
    "url_host": "localhost"
  }
}
youraccount@a003:~$ 
```

Stop

```
youraccount@a003:~$ HOME=/lustre10/home/youraccount claude-science stop
Daemon stopped (pid 2533288).
youraccount@a003:~$ 

```


### 7. Stop SSH port forwarding

Run the `exit` command in the terminal emulator that is running the SSH port forwarding.

Example

```
channel 3: open failed: connect failed: Connection refused
channel 3: open failed: connect failed: Connection refused

youraccount@a003:~$ exit
logout
Connection to a003 closed.
your-pc$
```



### 8. Uninstall claude science serve

```
# Remove the program itself
rm ~/.local/bin/claude-science

# Remove the data and the conda environment
rm -rf /lustre10/home/youraccount/.claude-science
```

## Troubleshooting

### You're not signed in to Claude Science

If an error message like the following appears in the browser

```
You're not signed in to Claude Science
This browser's login is no longer valid — your sign-in link or session may have expired, or the daemon may have restarted.

To get back in: relaunch Claude Science the way you normally start it — open the Claude Science app from your Applications / launcher, or if you use the command line, run claude-science url and open the link it prints.
```

This appears when you started with a URL like `http://localhost:43000/`. Use the URL with the `nonce` appended.
`http://localhost:43000/?nonce=19XXXXXXXXXXXXXXXXXXXXf9f375fab6ed23385`

Alternatively, the login may have timed out.
In that case, stop claude science serve once and repeat steps 3 and 5.


## Other FAQ

## How to start multiple claude science serve instances

Claude Science **can start only one daemon per data-dir**.
You can start multiple claude science servers by redoing the installation with the `--data-dir` command-line option.


```bash
# Run on a003 (the second one; change --port and --data-dir from the first one)
HOME=/lustre10/home/youraccount claude-science serve --no-browser --port 43010 --data-dir /lustre10/home/youraccount/.claude-science-2
```

```bash
# Run on the user's PC (forward the second port; a separate terminal from the first)
ssh -L 43010:localhost:43010 nig-a003
```

Open the `http://localhost:43010/?nonce=...` shown at startup in the browser.


### How to submit heavy processing to Slurm, and how to use GPUs

With this installation method, it becomes difficult to submit to Slurm, because the sandbox prevents job submission to Slurm. If you try to force the use of Slurm, you would write nig-a003 as the SSH destination, but then you would have to place a private key on the supercomputer.

The correct configuration is to install claude science serve on the user's PC and specify nig-a003 for SSH.
