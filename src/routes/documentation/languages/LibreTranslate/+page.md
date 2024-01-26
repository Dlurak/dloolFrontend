---
title: Translating User Generated Content
author:
  name: Dlurak
  link: https://github.com/Dlurak
date: 2024-01-27
---

# Translating User Generated Content

Dlool can use [LibreTranslate](https://libretranslate.com/) to translate some user generated content.  
You will need to use a own API-Token or self host libretranslate.
Selfhosting, which I chose, is free but requires to run a server with LibreTranslate. You can use [this image from docker hub](https://hub.docker.com/r/libretranslate/libretranslate).  
Using the official API will cost you 30$/month but you won't need to manage so much yourself.

## Enabling LibreTranslate integration on Dlool

1. Visit [this site of the settings](/settings/language).
2. Enable _"Use LibreTranslate"_
3. Set the URL, for the official deployment this will be `https://libretranslate.com/`  
   When self hosting you will need to figure it out yourself
4. Set a token if needed.

## What happens when it is enabled

The client (so your device) will send a request to LibreTranslate to translate the assignments, this might take a moment or it might even fail, in the second case the homework will remain in the original language.  
When the option is enabled your homework will be translated to your normal language (so German or English).  
After changing the language you will need to reapply the filters, this will also be fixed in the future.
