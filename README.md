## Orin Ayo
Orin Ayo in Yoruba means "A Song of Joy". 
This openfire plugin enables Openfire to be a live music collaborative platform that enables musical instruments to publish and subscribe to RTP-MIDI and WebRTC Media Streams with XMPP. 

It uses :
- [XEP-0231: Bits of Binary](https://xmpp.org/extensions/xep-0231.html) to send and receive MIDI events over XMPP
- [Java RTP-Midi](https://github.com/LeovR/rtp-midi) to support wireless MIDI hardware over a LAN (WIFI)
- [Broadcast Box](https://github.com/Glimesh/broadcast-box) to implement a [payload format for ingestion and egress of WebRTC media streams in XMPP based on HTTP WHIP and WHEP](https://igniterealtime.github.io/openfire-orinayo-plugin/xep)
- [Java code provided by Paul J. Drongowski](https://sandsoftwaresound.net/chordpro-auto-accompaniment-midi-messages/) to convert extended ChordPro text into an arranger compatible MIDI file.
- [OrinAyo Web Client](https://github.com/Jus-Be/orin-ayo) which creates accompaniment music with WebAudio and supports digital Guitar and Midi Controller devices.
- [Mornin Voice Chat App](https://github.com/deleolajide/mornin.fm) which provides an audio conference for voice chat. Use this to replace the deprecated Ohun plugin for Openfire.

## CI Build Status

[![Build Status](https://github.com/igniterealtime/openfire-orinayo-plugin/workflows/Java%20CI/badge.svg)](https://github.com/igniterealtime/openfire-orinayo-plugin/actions)

## Overview

## Known Issues

This version has embedded binaries for only Linux 64 and Windows 64.

## Installation

copy orinayo.jar to the plugins folder

## Configuration

## How to use
Goto https://jus-be.github.io/orinayo/help.html

## Further information




