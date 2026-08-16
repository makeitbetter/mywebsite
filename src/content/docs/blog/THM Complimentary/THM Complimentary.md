---
title: THM Hacker Holidays - Complimentary
date: 2026-08-02
tags:
  - THM
  - hackerholidays
  - ctf
  - AWS
  - Cognito
---
https://tryhackme.com/room/hh-complimentary-05e0b604

This one was a bit rough, I got about half-way there on my own before I had to watch the walk-through video.

It starts out by giving us  a link to an app on AWS us-east-1 and the following checklist:
1. Track down the AWS mechanism issuing you credentials behind the scenes.
 2. Use those credentials to dump more than your own record from the app's DynamoDB table.
 3. Retrieve the flag from another guest's data.

Starting out on the app page I tried going to /Spa since it said something about spa visits, this of course gave me an error and some info as the key was not found. 

I opened Firefox dev tools and found app.js which shows us that we are being handed a temporary id from a Cognito pool.

Some quick searching later and I found this blog post https://infosecwriteups.com/attacking-aws-common-cognito-misconfigurations-a898bf092218 which got me through the first part by showing me how to get temp credentials from the temp pool id.

```
aws cognito-identity get-id --identity-pool-id <identity-pool-id>
```

```
aws cognito-identity get-credentials-for-identity --identity-id <identity-id-from-previous-command>
```

From there I saw that it expired but I didn't check the expiration time, and was concerned that I would have to retype it. I had Claude (Haiku 4.5) write me a script for running these automatically, which worked fine but there was a problem I didn't discover until much later.

I had it try to view the table but it came back permission denied so I tried a bunch of different stuff. I found these slides (https://www.yassineaboukir.com/talks/NahamConEU2022.pdf) and tried having Claude write in a step using  https://github.com/andresriancho/enumerate-iam to enumerate the permissions. 

I was able to see that the role had permission but I was still getting access denied.

At this point I figured I needed help and started watching the walkthrough. I got part of the way through which basically validated my approach. I checked the script and confirmed that like the video the credentials were being exported via env variables. Except they weren't. When I checked the awscli they weren't configured properly. I finally entered it manually and it just worked, from there I was able to scan the DynamoDB table, (the name of the table could be seen in the app.js)
```
aws dynamodb scan --table-name your-table-name
```
Which listed the profiles of the other users, revealing the flag in one of the profiles.


