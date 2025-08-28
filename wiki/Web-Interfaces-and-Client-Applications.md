# Web Interfaces and Client Applications

> **Relevant source files**
> * [classes/jsp/index.html](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/jsp/index.html)
> * [classes/jsp/ohun/_nuxt/8512603.js](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/jsp/ohun/_nuxt/8512603.js)
> * [src/web/orinayo-ohun.jsp](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/web/orinayo-ohun.jsp)
> * [src/web/orinayo-oju.jsp](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/web/orinayo-oju.jsp)

This document covers the web-based user interfaces and client applications provided by the Orin Ayo plugin. This includes JSP-based admin console integration pages and the modern web client applications that end users interact with for audio/video conferencing and collaborative music features.

For information about the underlying XMPP protocol extensions that power these web interfaces, see [XMPP Protocol Extensions](/igniterealtime/openfire-orinayo-plugin/3-xmpp-protocol-extensions). For details about the core plugin architecture and server-side components, see [Core Plugin Architecture](/igniterealtime/openfire-orinayo-plugin/2-core-plugin-architecture).

## Overview

The Orin Ayo plugin provides web interfaces through two main mechanisms:

1. **JSP Integration Pages** - Server-side rendered pages that integrate with the Openfire admin console
2. **Client Applications** - Modern web applications built with Vue.js/Nuxt.js that provide the actual user experience

```mermaid
flowchart TD

AdminConsole["Openfire Admin Console"]
OjuJSP["orinayo-oju.jsp"]
OhunJSP["orinayo-ohun.jsp"]
OjuApp["Oju Video Client<br>/orinayo/oju/"]
OhunApp["Ohun Audio Client<br>/orinayo/ohun"]
IndexRedirect["index.html redirect"]
VueJS["Vue.js Framework"]
NuxtJS["Nuxt.js SSR"]
Vuex["Vuex State Management"]
I18n["Vue i18n"]
ServiceWorker["Service Worker"]

OjuJSP --> OjuApp
OhunJSP --> OhunApp
OjuApp --> VueJS
OhunApp --> VueJS

subgraph subGraph2 ["Client Technologies"]
    VueJS
    NuxtJS
    Vuex
    I18n
    ServiceWorker
    VueJS --> NuxtJS
    VueJS --> Vuex
    VueJS --> I18n
    NuxtJS --> ServiceWorker
end

subgraph subGraph1 ["Web Client Applications"]
    OjuApp
    OhunApp
    IndexRedirect
    IndexRedirect --> OhunApp
end

subgraph subGraph0 ["Openfire Admin Console"]
    AdminConsole
    OjuJSP
    OhunJSP
    AdminConsole --> OjuJSP
    AdminConsole --> OhunJSP
end
```

**Sources:** [src/web/orinayo-oju.jsp L1-L63](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/web/orinayo-oju.jsp#L1-L63)

 [src/web/orinayo-ohun.jsp L1-L63](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/web/orinayo-ohun.jsp#L1-L63)

 [classes/jsp/index.html L1-L9](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/jsp/index.html#L1-L9)

 [classes/jsp/ohun/_nuxt/8512603.js L1-L50](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/jsp/ohun/_nuxt/8512603.js#L1-L50)

## JSP Admin Console Integration

The plugin integrates with the Openfire admin console through JSP pages that serve as gateways to the client applications. These pages handle server-side configuration and URL construction.

### JSP Page Structure

Both `orinayo-oju.jsp` and `orinayo-ohun.jsp` follow the same architectural pattern:

```mermaid
flowchart TD

WebManager["org.jivesoftware.util.WebManager"]
JSPPage["JSP Page"]
EmbedCheck["orinayo.embed.appurl property check"]
IframeEmbed["Iframe Embedding"]
LinkDisplay["Link Display"]
ClientApp["Client Application"]

JSPPage --> WebManager
JSPPage --> EmbedCheck
EmbedCheck --> IframeEmbed
EmbedCheck --> LinkDisplay
IframeEmbed --> ClientApp
LinkDisplay --> ClientApp
```

**Sources:** [src/web/orinayo-oju.jsp L31-L33](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/web/orinayo-oju.jsp#L31-L33)

 [src/web/orinayo-ohun.jsp L31-L33](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/web/orinayo-ohun.jsp#L31-L33)

### URL Construction and Configuration

The JSP pages construct URLs using Openfire server configuration:

* **Host Construction**: Uses `XMPPServer.getInstance().getServerInfo().getHostname()`
* **Port Configuration**: Uses `JiveGlobals.getProperty("httpbind.port.secure", "7443")`
* **URL Patterns**: * Oju: `https://${publicHost}/orinayo/oju/` * Ohun: `https://${publicHost}/orinayo/ohun`

| Component | Oju JSP | Ohun JSP |
| --- | --- | --- |
| File Path | [src/web/orinayo-oju.jsp](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/web/orinayo-oju.jsp) | [src/web/orinayo-ohun.jsp](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/web/orinayo-ohun.jsp) |
| URL Pattern | `/orinayo/oju/` | `/orinayo/ohun` |
| Page ID | `orinayo-oju` | `orinayo-ohun` |
| Message Key | `admin.sidebar.webclients.item.oju.description` | `admin.sidebar.webclients.item.ohun.description` |

**Sources:** [src/web/orinayo-oju.jsp L35-L36](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/web/orinayo-oju.jsp#L35-L36)

 [src/web/orinayo-ohun.jsp L35-L36](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/web/orinayo-ohun.jsp#L35-L36)

### Embedding Behavior

The JSP pages support two display modes controlled by the `orinayo.embed.appurl` property:

```mermaid
flowchart TD

PropertyCheck["JiveGlobals.getBooleanProperty('orinayo.embed.appurl', false)"]
TrueCase["Iframe with full permissions"]
FalseCase["External link display"]

PropertyCheck --> TrueCase
PropertyCheck --> FalseCase
```

When embedding is enabled, the iframe includes comprehensive permissions:

* `geolocation`
* `microphone`
* `camera`
* `fullscreen`
* `display-capture`

**Sources:** [src/web/orinayo-oju.jsp L51-L60](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/web/orinayo-oju.jsp#L51-L60)

 [src/web/orinayo-ohun.jsp L51-L60](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/web/orinayo-ohun.jsp#L51-L60)

## Client Application Architecture

The client applications are modern web applications built with Vue.js and Nuxt.js, providing rich interactive experiences for audio and video conferencing.

### Technology Stack

```mermaid
flowchart TD

Vue["Vue.js 2.x"]
Nuxt["Nuxt.js SSR Framework"]
Vuex["Vuex Store"]
AppModule["app module"]
ProfileState["profile state"]
ChatState["chat state"]
VueI18n["Vue i18n"]
LocaleDetection["Browser locale detection"]
LanguageFiles["en, zh, zhTW, ja, es, de"]
Axios["Axios HTTP client"]
WebRTC["WebRTC APIs"]
ServiceWorker["Service Worker (PWA)"]

Vue --> Vuex
Vue --> VueI18n
Nuxt --> Axios
Nuxt --> WebRTC
Nuxt --> ServiceWorker

subgraph Networking ["Networking"]
    Axios
    WebRTC
    ServiceWorker
end

subgraph Internationalization ["Internationalization"]
    VueI18n
    LocaleDetection
    LanguageFiles
    VueI18n --> LocaleDetection
    VueI18n --> LanguageFiles
end

subgraph subGraph1 ["State Management"]
    Vuex
    AppModule
    ProfileState
    ChatState
    Vuex --> AppModule
    AppModule --> ProfileState
    AppModule --> ChatState
end

subgraph subGraph0 ["Core Framework"]
    Vue
    Nuxt
    Vue --> Nuxt
end
```

**Sources:** [classes/jsp/ohun/_nuxt/8512603.js L314-L350](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/jsp/ohun/_nuxt/8512603.js#L314-L350)

 [classes/jsp/ohun/_nuxt/8512603.js L365-L400](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/jsp/ohun/_nuxt/8512603.js#L365-L400)

### Application State Management

The Vuex store manages application state across several modules:

```mermaid
flowchart TD

AppModule["app module"]
SnackbarState["snackbar: {show, message, color}"]
ChatState["chat: {rooms, mutes}"]
ProfileState["profile: {uid}"]
AppbarState["appbar: {title, style, show, back, home, dark, animation, color}"]
ToastMutation["toast()"]
SetSnackbar["setSnackbar()"]
SetProfile["SET_PROFILE()"]
SetAppbar["SET_APPBAR()"]
AddRoom["ADD_ROOM()"]
RemoveRoom["REMOVE_ROOM()"]
AddMute["ADD_MUTE()"]
RemoveMute["REMOVE_MUTE()"]

SnackbarState --> ToastMutation
SnackbarState --> SetSnackbar
ProfileState --> SetProfile
AppbarState --> SetAppbar
ChatState --> AddRoom
ChatState --> RemoveRoom
ChatState --> AddMute
ChatState --> RemoveMute

subgraph subGraph1 ["State Mutations"]
    ToastMutation
    SetSnackbar
    SetProfile
    SetAppbar
    AddRoom
    RemoveRoom
    AddMute
    RemoveMute
end

subgraph subGraph0 ["Vuex Store Structure"]
    AppModule
    SnackbarState
    ChatState
    ProfileState
    AppbarState
    AppModule --> SnackbarState
    AppModule --> ChatState
    AppModule --> ProfileState
    AppModule --> AppbarState
end
```

**Sources:** [classes/jsp/ohun/_nuxt/8512603.js L389-L450](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/jsp/ohun/_nuxt/8512603.js#L389-L450)

### Internationalization Support

The applications support multiple languages with automatic browser detection:

| Language Code | Language | Status |
| --- | --- | --- |
| `en` | English | Default |
| `zh` | Chinese Simplified | Full support |
| `zhTW` | Chinese Traditional | Full support |
| `ja` | Japanese | Full support |
| `es` | Spanish | Full support |
| `de` | German | Full support |

The i18n system includes:

* Automatic browser language detection
* Fallback to English for unsupported languages
* Dynamic locale switching
* Message interpolation and pluralization

**Sources:** [classes/jsp/ohun/_nuxt/8512603.js L365-L380](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/jsp/ohun/_nuxt/8512603.js#L365-L380)

### Service Worker and PWA Features

The client applications include Progressive Web App (PWA) capabilities:

```mermaid
flowchart TD

ServiceWorkerReg["Service Worker Registration"]
WorkboxLib["Workbox Library"]
SWScope["Scope: /orinayo/ohun/"]
SWFile["sw.js"]
OfflineSupport["Offline Support"]
CacheStrategy["Cache Strategy"]

ServiceWorkerReg --> WorkboxLib
WorkboxLib --> SWScope
WorkboxLib --> SWFile
SWFile --> OfflineSupport
SWFile --> CacheStrategy
```

The service worker is registered with error handling and supports:

* Offline functionality
* Resource caching
* Background sync capabilities

**Sources:** [classes/jsp/ohun/_nuxt/8512603.js L234-L250](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/jsp/ohun/_nuxt/8512603.js#L234-L250)

## Client-Server Communication

The web clients communicate with the Openfire server through multiple channels:

```mermaid
flowchart TD

VueApp["Vue.js Application"]
AxiosClient["Axios HTTP Client"]
XMPPClient["XMPP Client (Strophe.js)"]
WebRTCPeer["WebRTC Peer Connection"]
HTTPEndpoints["HTTP API Endpoints"]
XMPPServer["XMPP Server"]
WebRTCSignaling["WebRTC Signaling"]
StaticAssets["Static Assets"]

AxiosClient --> HTTPEndpoints
XMPPClient --> XMPPServer
WebRTCPeer --> WebRTCSignaling
VueApp --> StaticAssets

subgraph subGraph1 ["Server Endpoints"]
    HTTPEndpoints
    XMPPServer
    WebRTCSignaling
    StaticAssets
end

subgraph subGraph0 ["Client Application"]
    VueApp
    AxiosClient
    XMPPClient
    WebRTCPeer
    VueApp --> AxiosClient
    VueApp --> XMPPClient
    VueApp --> WebRTCPeer
end
```

**Sources:** [classes/jsp/ohun/_nuxt/8512603.js L480-L520](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/jsp/ohun/_nuxt/8512603.js#L480-L520)

### HTTP Client Configuration

The Axios HTTP client is configured with:

* Base URL: `http://localhost:3000/` (development)
* Automatic loading progress integration
* Request/response interceptors
* Error handling with user feedback

**Sources:** [classes/jsp/ohun/_nuxt/8512603.js L480-L500](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/jsp/ohun/_nuxt/8512603.js#L480-L500)

### Component Architecture

The client applications use a component-based architecture:

| Component Type | Purpose | Key Features |
| --- | --- | --- |
| Layout Components | Page structure | App bar, navigation, background |
| UI Components | User interface | Buttons, dialogs, forms |
| Media Components | Audio/video | WebRTC integration, controls |
| Utility Components | Common functionality | Loading, error handling, toasts |

**Sources:** [classes/jsp/ohun/_nuxt/8512603.js L450-L480](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/jsp/ohun/_nuxt/8512603.js#L450-L480)