# Client-Side Applications

> **Relevant source files**
> * [classes/jsp/chordpro-pdf-online/assets/ChordChart-BX1Cf9wD.js](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/jsp/chordpro-pdf-online/assets/ChordChart-BX1Cf9wD.js)
> * [classes/jsp/chordpro-pdf-online/assets/LoaderBars-DBcuEUPu.js](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/jsp/chordpro-pdf-online/assets/LoaderBars-DBcuEUPu.js)
> * [classes/jsp/chordpro-pdf-online/assets/index-CvaTRoAw.js](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/jsp/chordpro-pdf-online/assets/index-CvaTRoAw.js)
> * [classes/jsp/chordpro-pdf-online/assets/sample-chart-Dmy9BZI4.js](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/jsp/chordpro-pdf-online/assets/sample-chart-Dmy9BZI4.js)
> * [classes/jsp/chordpro-pdf-online/index.html](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/jsp/chordpro-pdf-online/index.html)
> * [classes/jsp/ohun/_nuxt/LICENSES](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/jsp/ohun/_nuxt/LICENSES)

This page documents the client-side web applications built with Vue.js and Nuxt.js that provide user interfaces for the Orin Ayo collaborative music platform. These applications handle audio/video conferencing, musical score processing, and real-time collaboration features.

For server-side admin interfaces, see [Admin Console Integration](/igniterealtime/openfire-orinayo-plugin/4.1-admin-console-integration). For WebRTC media streaming implementations, see [WebRTC Media Streaming](/igniterealtime/openfire-orinayo-plugin/5.2-webrtc-media-streaming).

## Vue.js Application Architecture

The Orin Ayo plugin includes several Vue.js-based client applications that provide different aspects of the collaborative music experience:

```mermaid
flowchart TD

OHUN["Ohun Audio Client<br>/jsp/ohun/"]
OJU["Oju Video Client<br>/jsp/oju/"]
CHORDPRO["ChordPro PDF Online<br>/jsp/chordpro-pdf-online/"]
ORINAYO["OrinAyo Main Client<br>/jsp/orinayo/"]
VUE["Vue.js v2.7.16"]
VUEX["Vuex v3.6.2"]
VUEI18N["vue-i18n v8.28.2"]
VUECLASS["vue-class-component v7.2.6"]
VUECLIENT["vue-client-only v0.0.0"]
VITE["Vite Build System"]
NUXT["Nuxt.js Framework"]
BUNDLES["JavaScript Bundles<br>index-CvaTRoAw.js"]
JETTY["Embedded Jetty Server"]
JSP["JSP Pages"]
PROXY["HTTP Proxy Services"]

OHUN --> VUE
OJU --> VUE
CHORDPRO --> VUE
ORINAYO --> VUE
BUNDLES --> JETTY

subgraph subGraph3 ["Server Integration"]
    JETTY
    JSP
    PROXY
    JSP --> JETTY
    JETTY --> PROXY
end

subgraph subGraph2 ["Build System"]
    VITE
    NUXT
    BUNDLES
    VITE --> BUNDLES
    NUXT --> VITE
end

subgraph subGraph1 ["Vue.js Framework Stack"]
    VUE
    VUEX
    VUEI18N
    VUECLASS
    VUECLIENT
    VUE --> VUEX
    VUE --> VUEI18N
    VUE --> VUECLASS
    VUE --> VUECLIENT
end

subgraph subGraph0 ["Client Applications"]
    OHUN
    OJU
    CHORDPRO
    ORINAYO
end
```

Sources: [classes/jsp/ohun/_nuxt/LICENSES L1-L51](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/jsp/ohun/_nuxt/LICENSES#L1-L51)

 [classes/jsp/chordpro-pdf-online/index.html L1-L14](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/jsp/chordpro-pdf-online/index.html#L1-L14)

 [classes/jsp/chordpro-pdf-online/assets/index-CvaTRoAw.js L1-L20](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/jsp/chordpro-pdf-online/assets/index-CvaTRoAw.js#L1-L20)

## ChordPro PDF Online Application

The ChordPro PDF Online application converts musical chord charts from ChordPro format to PDF documents:

```mermaid
flowchart TD

INDEX["index.html<br>Main Entry Point"]
MAINJS["index-CvaTRoAw.js<br>Vue Application Bundle"]
SAMPLE["sample-chart-Dmy9BZI4.js<br>Sample ChordPro Data"]
LOADER["LoaderBars-DBcuEUPu.js<br>Loading Component"]
CSS["index-DsqqHCMn.css<br>Application Styles"]
CHORDPRO_TEXT["ChordPro Text Input<br>{title: Your Mercy Flows}"]
PARSER["ChordPro Parser"]
PDF_OUTPUT["PDF Document Output"]
APP_COMPONENT["#app<br>Root Vue Instance"]
CHART_COMPONENT["ChordChart Component<br>ChordChart-BX1Cf9wD.js"]
LOADER_COMPONENT["LoaderBars Component<br>data-v-996e47c4"]

MAINJS --> APP_COMPONENT
SAMPLE --> CHORDPRO_TEXT
LOADER --> LOADER_COMPONENT

subgraph subGraph2 ["Vue Components"]
    APP_COMPONENT
    CHART_COMPONENT
    LOADER_COMPONENT
    APP_COMPONENT --> CHART_COMPONENT
    APP_COMPONENT --> LOADER_COMPONENT
end

subgraph subGraph1 ["ChordPro Processing"]
    CHORDPRO_TEXT
    PARSER
    PDF_OUTPUT
    CHORDPRO_TEXT --> PARSER
    PARSER --> PDF_OUTPUT
end

subgraph subGraph0 ["ChordPro Application Components"]
    INDEX
    MAINJS
    SAMPLE
    LOADER
    CSS
    INDEX --> MAINJS
    INDEX --> CSS
end
```

Sources: [classes/jsp/chordpro-pdf-online/index.html L8-L9](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/jsp/chordpro-pdf-online/index.html#L8-L9)

 [classes/jsp/chordpro-pdf-online/assets/sample-chart-Dmy9BZI4.js L1-L59](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/jsp/chordpro-pdf-online/assets/sample-chart-Dmy9BZI4.js#L1-L59)

 [classes/jsp/chordpro-pdf-online/assets/LoaderBars-DBcuEUPu.js L1-L2](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/jsp/chordpro-pdf-online/assets/LoaderBars-DBcuEUPu.js#L1-L2)

The sample ChordPro chart demonstrates the format structure:

```css
{title: Your Mercy Flows}
{artist: Dele Olajide}
{key: E}
{time: 4/4}
{tempo: 100}

{comment: Verse 1}
Your [E:2]mercy [A:2]flows like a [C#m:2]river through my [B:2]soul
```

Sources: [classes/jsp/chordpro-pdf-online/assets/sample-chart-Dmy9BZI4.js L2-L18](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/jsp/chordpro-pdf-online/assets/sample-chart-Dmy9BZI4.js#L2-L18)

## Vue.js Dependencies and Libraries

The client applications utilize a comprehensive set of Vue.js ecosystem libraries:

| Library | Version | Purpose |
| --- | --- | --- |
| `Vue.js` | v2.7.16 | Core reactive framework |
| `Vuex` | v3.6.2 | State management |
| `vue-i18n` | v8.28.2 | Internationalization |
| `vue-class-component` | v7.2.6 | Class-based components |
| `vue-client-only` | v0.0.0 | Client-side only rendering |
| `vue-no-ssr` | v1.1.1 | SSR exclusion |
| `clipboard.js` | v2.0.11 | Clipboard operations |

Sources: [classes/jsp/ohun/_nuxt/LICENSES L1-L51](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/jsp/ohun/_nuxt/LICENSES#L1-L51)

## Component Loading System

The application uses dynamic imports and lazy loading for optimal performance:

```mermaid
flowchart TD

VITE_MAP["__vite__mapDeps<br>Dynamic Import Map"]
CHART_LAZY["ChordChart-BX1Cf9wD.js<br>Lazy Loaded"]
LOADER_LAZY["LoaderBars-DBcuEUPu.js<br>Lazy Loaded"]
CSS_LAZY["CSS Assets<br>*.css"]
COMPONENT_FACTORY["Component Factory<br>defineAsyncComponent"]
SUSPENSE["Suspense Wrapper"]
ERROR_BOUNDARY["Error Boundary"]
LOADING["Loading State<br>LoaderBars Component"]
SUCCESS["Loaded Component"]
ERROR["Error State"]

CHART_LAZY --> COMPONENT_FACTORY
LOADER_LAZY --> LOADING
COMPONENT_FACTORY --> SUCCESS
COMPONENT_FACTORY --> ERROR

subgraph subGraph2 ["Loading States"]
    LOADING
    SUCCESS
    ERROR
end

subgraph subGraph1 ["Vue Component System"]
    COMPONENT_FACTORY
    SUSPENSE
    ERROR_BOUNDARY
    COMPONENT_FACTORY --> SUSPENSE
    SUSPENSE --> ERROR_BOUNDARY
end

subgraph subGraph0 ["Module Loading"]
    VITE_MAP
    CHART_LAZY
    LOADER_LAZY
    CSS_LAZY
    VITE_MAP --> CHART_LAZY
    VITE_MAP --> LOADER_LAZY
    VITE_MAP --> CSS_LAZY
end
```

Sources: [classes/jsp/chordpro-pdf-online/assets/index-CvaTRoAw.js L1-L2](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/jsp/chordpro-pdf-online/assets/index-CvaTRoAw.js#L1-L2)

 [classes/jsp/chordpro-pdf-online/assets/LoaderBars-DBcuEUPu.js L1-L2](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/jsp/chordpro-pdf-online/assets/LoaderBars-DBcuEUPu.js#L1-L2)

## Integration with Server Components

The client applications integrate with the Openfire plugin's server components through several mechanisms:

```mermaid
flowchart TD

VUE_APPS["Vue.js Applications"]
WEBSOCKET["WebSocket Connections"]
HTTP_API["HTTP API Calls"]
JETTY_SERVER["Embedded Jetty Server<br>BroadcastBox"]
WHIP_PROXY["/api/whip<br>Proxy Endpoint"]
WHEP_PROXY["/api/whep<br>Proxy Endpoint"]
STATUS_PROXY["/api/status<br>Status Endpoint"]
WHIP_IQ["WhipIQHandler<br>urn:xmpp:whip:0"]
WHEP_IQ["WhepIQHandler<br>urn:xmpp:whep:0"]
XMPP_CORE["XMPP Core Server"]
BROADCAST_BOX["broadcast-box<br>WebRTC Media Server"]
MIDI_SERVER["Apple MIDI Server<br>Port 50004"]

WEBSOCKET --> JETTY_SERVER
HTTP_API --> WHIP_PROXY
HTTP_API --> WHEP_PROXY
HTTP_API --> STATUS_PROXY
WHIP_PROXY --> WHIP_IQ
WHEP_PROXY --> WHEP_IQ
JETTY_SERVER --> BROADCAST_BOX
JETTY_SERVER --> MIDI_SERVER

subgraph subGraph3 ["External Processes"]
    BROADCAST_BOX
    MIDI_SERVER
end

subgraph subGraph2 ["XMPP Protocol Layer"]
    WHIP_IQ
    WHEP_IQ
    XMPP_CORE
    WHIP_IQ --> XMPP_CORE
    WHEP_IQ --> XMPP_CORE
end

subgraph subGraph1 ["Server-Side Integration Points"]
    JETTY_SERVER
    WHIP_PROXY
    WHEP_PROXY
    STATUS_PROXY
end

subgraph subGraph0 ["Client-Side Applications"]
    VUE_APPS
    WEBSOCKET
    HTTP_API
    VUE_APPS --> WEBSOCKET
    VUE_APPS --> HTTP_API
end
```

Sources: [classes/jsp/chordpro-pdf-online/index.html L5-L6](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/jsp/chordpro-pdf-online/index.html#L5-L6)

The client applications are served through the plugin's embedded Jetty server and communicate with the backend through a combination of HTTP APIs, WebSocket connections, and XMPP protocol extensions for real-time collaborative features.