---
title: THM Hacker Holidays - Complimentary
excerpt:
date: 2026-08-02
draft: false
isFeatured: false
tags:
  - THM
  - hackerholidays
  - ctf
  - AWS
  - Cognito
---

This one was a bit rough, I got about half-way there on my own before I had to watch the walk-through video.

It starts out by giving us  a link to an app on AWS us-east-1 and the following checklist:
1. Track down the AWS mechanism issuing you credentials behind the scenes.
 2. Use those credentials to dump more than your own record from the app's DynamoDB table.
 3. Retrieve the flag from another guest's data.

Starting out on the app page I tried going to /Spa since it said something about spa visits, this of course gave me an error and some info as the key was not found. 

I opened Firefox dev tools and found app.js which shows us that we are being handed a temporary id from a Cognito pool.

Some quick searching later and I found this blog post https://infosecwriteups.com/attacking-aws-common-cognito-misconfigurations-a898bf092218 which got me through the first part by showing me how to get a temp

```

```