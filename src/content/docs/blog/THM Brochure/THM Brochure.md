---
title: THM Hacker Holidays - Brochure
date: 2026-07-25
tags:
  - THM
  - hackerholidays
  - OSINT
  - ctf
---
https://tryhackme.com/room/hh-thebrochure-081f3e36

I tried exiftool and tineye first.
Did some DDGing and found the resort insta.

Poked around at the pictures and searched for 0xMia to see if there was an account.
Finally searched for Vera the byte lotus resort and found the insta account.

I grabbed each part of the base64 from the comments and pasted it in cyberchef in one contiguous line, ran magic on it and from there it was solved.