---
title: THM Hacker Holidays - Overheard At Breakfast
date: 2026-08-06
tags:
  - ctf
  - THM
  - hackerholidays
  - OSINT
  - email
---
https://tryhackme.com/room/hh-overheardatbreakfast-6f01793c

This one is very straightforward.
We are given a png screenshot and the following checklist:
1. Analyze the provided conversation for identifying details

 2. Extract the relevant clues

 3. Locate the hidden account

 4. Submit the flag

I downloaded the zip and extracted the png. I ran exiftool on it and strings to check if any information could be gathered from metadata etc. or the file itself.

I then moved on to reading the chat that can be seen in the png.

I started out by DDGing the email address that can be seen in the conversation. First 3 results and I saw the a summary of a write up talking about EmailOSINT.
I tried looking up the email using that site and instantly got a result. 
But I wasn't satisfied with that, so I tried some more sites with mixed success.
If there's anything I've learned with OSINT over the years it's that a lot of sites are garbage that either want you to pay or don't do anything useful. I found that usersearch.com actually came back with a hit, but the data isn't nearly as rich.

The result is a Gravatar profile, as we know the conversation mentioned something starting with a G. 

Visiting the profile page gives us a base64 string which I quickly decoded via https://www.base64decode.org/ giving me the flag. 

This is possible due to the fact that the hashed email address of Gravatar users redirects to their public Gravatar page. 

See this article for a more in depth look.
https://www.bleepingcomputer.com/news/security/online-avatar-service-gravatar-allows-mass-collection-of-user-info/