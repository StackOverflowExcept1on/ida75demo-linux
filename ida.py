#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# pip3 install frida

import argparse
import frida
import os
import time

parser = argparse.ArgumentParser(description="unofficial patches for ida75 demo on linux")
parser.add_argument("executable")
args = parser.parse_args()

pid = frida.spawn(args.executable)

stopped = False
destroyed = False

def on_message(_message, _data):
    global stopped
    stopped = True

def on_destroyed():
    global destroyed
    destroyed = True

session = frida.attach(pid)

with open("patches.js", "r") as file:
    script = session.create_script(file.read())

script.on("message", on_message)
script.on("destroyed", on_destroyed)
script.load()

script.post({"type": "input", "hexx64": os.path.join(os.path.dirname(args.executable), "plugins", "hexx64.so")})

frida.get_local_device().resume(target=pid)

try:
    # load script & edit memory
    while not stopped:
        time.sleep(1)

    # wait until IDA is not closed to join gracefully
    while not destroyed:
        time.sleep(1)
except KeyboardInterrupt:
    pass
