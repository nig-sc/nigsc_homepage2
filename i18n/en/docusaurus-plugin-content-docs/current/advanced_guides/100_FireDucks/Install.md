---
sidebar_position: 10
---

# Installation (requires agreement to the End User License Agreement)

**Note: By installing this software, you are deemed to have agreed to the [End User License Agreement](./FireDucks_EULA_nigsc.pdf). Please review it before proceeding.**

On the NIG Supercomputer System, a wheel file for installing FireDucks is provided in the following shared directory:

```
/foo/bar/fireducks-enterprise-2026.03.0
```

Use the pip command with this directory to install FireDucks into your Python virtual environment:

```
$ pip install -f /foo/bar/fireducks-enterprise-2026.03.0 fireducks-enterprise
```

Make sure to specify `fireducks-enterprise` as the package name at the end of this command. Using `fireducks` instead will install the community edition, so please be careful.
