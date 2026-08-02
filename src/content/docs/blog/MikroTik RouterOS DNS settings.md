---
title: MikroTik DNS settings
date: 2026-07-29
tags:
  - DNS
  - MikroTik
  - RouterOS
  - notes
  - config
  - quad9
  - DOH
  - http
---

TLDR: Skip to the bottom of the post for the resolution.


I tried to switch my DNS over to quad9 today in my MikroTik router. 
I mean I already was running it via my pi-hole but I wanted to move where I'm running my pi-hole so I followed this documentation to get it up and running with DOH.
https://docs.quad9.net/Setup_Guides/Open-Source_Routers/MikroTik_RouterOS_%28Encrypted%29/

I also updated the firmware, there seemed to be an issue with having the DNS set to the new servers so I reverted long enough to run the update. I reverted back and I couldn't resolve from the terminal again, I wasn't clear if this is a feature or a bug. The clients have no issues resolving, but they weren't using DOH for some reason.

I confirmed the cert was present but I was getting the following error:
```
 DoH server connection error: SSL: handshake failed: unable to get issuer certificate (6)
```

I ended up trying a bunch of different things after that, but its a known issue with Miktrotik not yet supporting HTTP/2 and quad9 discontinuing support for HTTP 1.1 in December of last year.

https://github.com/Quad9DNS/documentation/issues/12
