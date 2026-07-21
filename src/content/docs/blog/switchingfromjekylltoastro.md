---
title: Switching from Jekyll to Astro
date: 2026-07-21
---

## Switching to Astro

Today I switched to Astro from Jekyll. Well mostly yesterday, I'm writing this blog post today.

Whew... was it an adventure.

I got the right versions of  npm and node installed after some some tinkering using Node Version Manager (https://github.com/nvm-sh/nvm)
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.6/install.sh | bash
sudo apt install curl
```
Of course I had to install curl since this was a fresh vm, I need to just add it to a dotfile or something.

Next I installed starlight and catppuccian (a theme https://starlight.astro.build/ and a color palette https://github.com/catppuccin/starlight ).

Then I disabled Astro telemetry.
```

npm create astro@latest -- --template starlight
npm install @catppuccin/starlight

npm run astro telemetry disable

```

I went ahead and made some changes to the default terminal font and colors, again proving that I need to make a fresh install config.

I made some changes to the astro.config.js but ran into some problems since I had deleted the title property that starlight requires. I added the import and plugin call for catppuccian, with some more struggles with formatting, I should have installed a linter (something else for initial install config).

I finally got it up and running with the dev server.
```
npm run dev
```

Next I Installed  the starlight-blog plugin https://github.com/HiDeoo/starlight-blog
```
npm i starlight-blog
```
and added the  import and plugin lines to astro.config.mjs.
I added the site property so that it would create an RSS feed.

I then created this file as a placeholder blog post to work with. I had some issues with the date formatting, but I got it to work eventually.

Still struggling with json formatting I went over to src/content.config.ts and added the import and extend lines needed for the blog.

 I ran into some more formatting issues and had to go fix the astro.config.mjs before the it would work. I ended up asking AI about the formatting, again it would have been better to be using a linter, but haiku 4.5 came through again. The blog was working and so was the RSS, I figured out how to add the icon to the social bar at the top by GItHub and Linkedin (adding it to the astro.config.mjs as an entry).

I figured out that the main page doesn't display the sidebar because of the splash option.

I looked through a bunch of plugins and then made some configuration changes to select the palette versions I wanted from catppuccian.

I then edited the card grid to include my Credly badges with my certs. This is just a matter of copying and pasting the embed code from the Credly dashboard share page for the individual certs.

I grabbed my profile pic from Linkedin and struggled a bit with how to add it in place of the default image, but I figured out the correct path to add it to.

After that I spent a bunch of time figuring out how to setup the GitHub Action to deploy it. I ended up needing to switch the repo from the default workflow it was using for Jekyll to the new Astro deploy one.

Anyway I had to configure git with my username, anon email, and setup an ssh key so I could push to the website repo. I ended up having to fix some spelling errors and put .swp files in the .gitignore , but other then that I was up and running.


That was all yesterday, now today: I tried to install the obsidian plugin (https://starlight-obsidian.vercel.app/),
but I couldn't get it to work, I will probably revisit that later, for now I'll just stick to using it with the /src/content/docs directory as a vault.

Took a little bit to get pictures to work on the blog posts ... I swear I read the documentation (https://starlight.astro.build/guides/authoring-content/#images) but it didn't quite click until I read https://jero.zone/posts/astro-leaf-structure/.
