# Overview

> **Relevant source files**
> * [README.md](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/README.md)
> * [changelog.html](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/changelog.html)
> * [plugin.xml](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/plugin.xml)
> * [pom.xml](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/pom.xml)
> * [readme.html](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/readme.html)
> * [src/i18n/orinayo_i18n.properties](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/i18n/orinayo_i18n.properties)
> * [src/web/orinayo-summary.jsp](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/web/orinayo-summary.jsp)

This document provides a comprehensive overview of the Orin Ayo Openfire plugin, a collaborative music platform that enables real-time musical collaboration through XMPP and WebRTC technologies. The plugin transforms Openfire into a live music server that supports MIDI instrument publishing/subscribing and WebRTC media streaming.

For detailed information about specific subsystems, see [Core Plugin Architecture](/igniterealtime/openfire-orinayo-plugin/2-core-plugin-architecture) for the main plugin implementation, [XMPP Protocol Extensions](/igniterealtime/openfire-orinayo-plugin/3-xmpp-protocol-extensions) for custom XMPP handlers, [Web Interfaces and Client Applications](/igniterealtime/openfire-orinayo-plugin/4-web-interfaces-and-client-applications) for user-facing components, and [Media Processing Systems](/igniterealtime/openfire-orinayo-plugin/5-media-processing-systems) for MIDI and audio/video handling.

## Purpose and Functionality

Orin Ayo (Yoruba for "A Song of Joy") extends Openfire to support collaborative music-making by integrating multiple communication protocols and media processing capabilities. The plugin enables musicians to:

* Share MIDI events over XMPP using XEP-0231 (Bits of Binary)
* Connect wireless MIDI hardware over LAN networks via RTP-MIDI
* Stream audio and video content using WebRTC with WHIP/WHEP protocols
* Convert ChordPro musical notation to MIDI accompaniment
* Participate in voice and video conferences

Sources: [README.md L1-L11](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/README.md#L1-L11)

 [readme.html L36-L46](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/readme.html#L36-L46)

 [plugin.xml L1-L24](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/plugin.xml#L1-L24)

## Core Architecture Overview

The plugin architecture centers around the `BroadcastBox` main class, which orchestrates multiple subsystems including XMPP protocol handlers, web services, and external media processing components.

```mermaid
flowchart TD

OF["org.jivesoftware.openfire.XMPPServer"]
BC["org.ifsoft.orinayo.openfire.BroadcastBox"]
WHIP["WhipIQHandler<br>urn:xmpp:whip:0"]
WHEP["WhepIQHandler<br>urn:xmpp:whep:0"]
MEET["OlMeetIQHandler<br>urn:xmpp:http:online-meetings:0"]
JETTY["Embedded Jetty Server<br>HTTP/2, HTTP/3, ALPN"]
JSP["Admin Console JSP<br>orinayo-summary.jsp<br>orinayo-settings.jsp"]
PROXY["HTTP Proxy Services<br>/api/whip, /api/whep, /api/status"]
BBC_LINUX["broadcast-box<br>Linux 64-bit binary"]
BBC_WIN["broadcast-box.exe<br>Windows 64-bit binary"]
MIDI_SERVER["Apple MIDI Server<br>Port 50004"]
OHUN["Mornin Voice Chat<br>orinayo-ohun.jsp"]
OJU["Broadcast Box Video<br>orinayo-oju.jsp"]
XMPP_CLIENTS["XMPP WebRTC Examples<br>xmpp-video-publisher.html<br>xmpp-video-watcher.html"]

BC --> BBC_LINUX
BC --> BBC_WIN
BC --> MIDI_SERVER
JETTY --> OHUN
JETTY --> OJU
JETTY --> XMPP_CLIENTS
PROXY --> BBC_LINUX
PROXY --> BBC_WIN

subgraph subGraph4 ["Client Applications"]
    OHUN
    OJU
    XMPP_CLIENTS
end

subgraph subGraph3 ["External Processes"]
    BBC_LINUX
    BBC_WIN
    MIDI_SERVER
end

subgraph subGraph2 ["Openfire Server Environment"]
    OF
    BC
    OF --> BC
    BC --> WHIP
    BC --> WHEP
    BC --> MEET
    BC --> JETTY
    BC --> JSP
    BC --> PROXY

subgraph subGraph1 ["Web Services"]
    JETTY
    JSP
    PROXY
end

subgraph subGraph0 ["XMPP IQ Handlers"]
    WHIP
    WHEP
    MEET
end
end
```

Sources: [plugin.xml L4](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/plugin.xml#L4-L4)

 [pom.xml L78-L104](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/pom.xml#L78-L104)

 [src/web/orinayo-summary.jsp L17](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/web/orinayo-summary.jsp#L17-L17)

## Plugin Configuration and Dependencies

The plugin is built using Maven with a comprehensive dependency stack supporting modern web protocols and media processing capabilities.

| Component | Version/Purpose | Configuration |
| --- | --- | --- |
| Artifact ID | `orinayo` | Version 1.0.2-SNAPSHOT |
| Main Class | `org.ifsoft.orinayo.openfire.BroadcastBox` | Plugin entry point |
| Openfire Version | 5.0.0+ | Minimum server requirement |
| Jetty HTTP/3 | `${jetty.version}` | QUIC protocol support |
| Jetty HTTP/2 | `${jetty.version}` | HTTP/2 with ALPN |
| JSON Processing | json-lib 0.8 | API data exchange |
| Validation | Hibernate Validator 5.2.4 | Input validation |

The build system includes platform-specific resource copying for Linux and Windows 64-bit binaries, with separate execution phases handling `src/root` directory contents for each target platform.

Sources: [pom.xml L13-L15](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/pom.xml#L13-L15)

 [pom.xml L20-L21](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/pom.xml#L20-L21)

 [pom.xml L25-L64](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/pom.xml#L25-L64)

 [pom.xml L76-L141](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/pom.xml#L76-L141)

## XMPP Protocol Integration

The plugin extends XMPP with custom protocol handlers that enable WebRTC signaling and media stream management over existing XMPP infrastructure.

```mermaid
flowchart TD

WHIP_NS["urn:xmpp:whip:0<br>WhipIQHandler"]
WHEP_NS["urn:xmpp:whep:0<br>WhepIQHandler"]
MEET_NS["urn:xmpp:http:online-meetings:0<br>OlMeetIQHandler"]
XEP231["urn:xmpp:bob<br>XEP-0231 Bits of Binary"]
WHIP_PROTO["WHIP Protocol<br>WebRTC HTTP Ingestion"]
WHEP_PROTO["WHEP Protocol<br>WebRTC HTTP Egress"]
RTP_MIDI["RTP-MIDI<br>Network MIDI Transport"]
WEBRTC["WebRTC<br>P2P Media Streams"]
PUB["Media Publishers<br>Audio/Video Sources"]
SUB["Media Subscribers<br>Audio/Video Consumers"]
MIDI_DEV["MIDI Devices<br>Controllers/Synthesizers"]

WHIP_NS --> WHIP_PROTO
WHEP_NS --> WHEP_PROTO
XEP231 --> RTP_MIDI
MEET_NS --> WEBRTC
WHIP_PROTO --> PUB
WHEP_PROTO --> SUB
RTP_MIDI --> MIDI_DEV
WEBRTC --> PUB
WEBRTC --> SUB

subgraph subGraph2 ["Client Endpoints"]
    PUB
    SUB
    MIDI_DEV
end

subgraph subGraph1 ["Media Protocols"]
    WHIP_PROTO
    WHEP_PROTO
    RTP_MIDI
    WEBRTC
end

subgraph subGraph0 ["XMPP Namespace Handlers"]
    WHIP_NS
    WHEP_NS
    MEET_NS
    XEP231
end
```

The plugin implements a custom XEP specification for HTTP User Media Streams that bridges WHIP/WHEP protocols with XMPP messaging, enabling media stream coordination through existing XMPP client connections.

Sources: [README.md L6-L8](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/README.md#L6-L8)

 [src/i18n/orinayo_i18n.properties L1-L51](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/i18n/orinayo_i18n.properties#L1-L51)

## Web Services and Admin Integration

The plugin integrates with Openfire's admin console through JSP-based interfaces and provides HTTP proxy services for external media processing components.

```mermaid
flowchart TD

SUMMARY["orinayo-summary.jsp<br>Media Streams View"]
MEDIA_TAB["sidebar-media-services<br>config.page.summary<br>config.page.settings"]
SETTINGS["orinayo-settings.jsp<br>Broadcast-Box Settings"]
WEB_TAB["tab-webclients<br>admin.sidebar.webclients.name"]
OHUN_JSP["orinayo-ohun.jsp<br>Voice Chat Client"]
OJU_JSP["orinayo-oju.jsp<br>Video Streaming Client"]
API_WHIP["/api/whip<br>Media Ingestion Endpoint"]
API_WHEP["/api/whep<br>Media Egress Endpoint"]
API_STATUS["/api/status<br>Stream Status JSON"]
BB_PROXY["HTTP Proxy<br>Jetty EE8 Proxy"]
PUB_URL["xmpp-video-publisher.html<br>WebRTC Publisher Interface"]
SUB_URL["xmpp-video-watcher.html<br>WebRTC Subscriber Interface"]

API_WHIP --> PUB_URL
API_WHEP --> SUB_URL

subgraph subGraph3 ["Service URLs"]
    PUB_URL
    SUB_URL
end

subgraph subGraph2 ["HTTP Services"]
    API_WHIP
    API_WHEP
    API_STATUS
    BB_PROXY
    BB_PROXY --> API_WHIP
    BB_PROXY --> API_WHEP
    BB_PROXY --> API_STATUS
end

subgraph subGraph1 ["Admin Console Integration"]
    MEDIA_TAB
    WEB_TAB
    MEDIA_TAB --> SUMMARY
    MEDIA_TAB --> SETTINGS
    WEB_TAB --> OHUN_JSP
    WEB_TAB --> OJU_JSP

subgraph subGraph0 ["JSP Interfaces"]
    SUMMARY
    SETTINGS
    OHUN_JSP
    OJU_JSP
end
end
```

The admin interfaces provide real-time monitoring of active media streams and configuration management for the underlying broadcast-box media server processes.

Sources: [plugin.xml L12-L23](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/plugin.xml#L12-L23)

 [src/web/orinayo-summary.jsp L22-L26](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/web/orinayo-summary.jsp#L22-L26)

 [src/web/orinayo-summary.jsp L38-L40](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/web/orinayo-summary.jsp#L38-L40)

 [pom.xml L100-L104](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/pom.xml#L100-L104)

## Technology Stack and External Dependencies

The plugin leverages a modern technology stack combining XMPP messaging, WebRTC media processing, and MIDI protocol support.

| Technology | Purpose | Implementation |
| --- | --- | --- |
| **XMPP Core** | Message routing and presence | Openfire 5.0.0+ integration |
| **WebRTC** | Real-time media streaming | Custom WHIP/WHEP over XMPP |
| **RTP-MIDI** | Network MIDI transport | Java RTP-MIDI library |
| **ChordPro** | Musical notation processing | Paul J. Drongowski conversion code |
| **Jetty HTTP/3** | Modern web protocols | QUIC and HTTP/2 with ALPN |
| **Broadcast-Box** | Media server backend | External Rust-based WebRTC SFU |
| **Apple MIDI** | Wireless MIDI support | Port 50004 network service |

The plugin includes platform-specific binaries for Linux and Windows 64-bit systems, with automatic resource deployment during the Maven build process.

Sources: [README.md L5-L11](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/README.md#L5-L11)

 [pom.xml L78-L92](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/pom.xml#L78-L92)

 [pom.xml L30-L62](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/pom.xml#L30-L62)

 [changelog.html L46-L62](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/changelog.html#L46-L62)