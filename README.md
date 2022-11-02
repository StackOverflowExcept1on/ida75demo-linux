### IDA 7.5 Demo on Linux

This repository contains scripts to make leaked IDA 7.5 demo work on linux, tested on Ubuntu 22.04

You can find IDA 7.5 Demo installer on
http://fckilfkscwusoopguhi7i6yg3l6tknaz7lrumvlhg5mvtxzxbbxlimid.onion.pet/7.5/Demo/

Features & limitations:
 - [x] you have a local linux debugger & decompiler that does not use cloud services like in IDA freeware
 - [ ] currently without ability to save database

### Installing

```bash
pip3 install frida
```

### Running

```bash
# cat is useful to pass input when debugging
./ida.py ~/ida/idademo-7.5/ida64 | cat
```
