# Core Plugin Architecture

> **Relevant source files**
> * [changelog.html](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/changelog.html)
> * [classes/jsp/WEB-INF/web.xml](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/jsp/WEB-INF/web.xml)
> * [classes/linux-64/broadcast-box](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/linux-64/broadcast-box)
> * [classes/win-64/broadcast-box.exe](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/win-64/broadcast-box.exe)
> * [plugin.xml](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/plugin.xml)
> * [pom.xml](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/pom.xml)
> * [src/i18n/orinayo_i18n.properties](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/i18n/orinayo_i18n.properties)
> * [src/java/org/ifsoft/orinayo/openfire/BroadcastBox.java](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/java/org/ifsoft/orinayo/openfire/BroadcastBox.java)
> * [src/java/org/ifsoft/orinayo/openfire/OlMeetIQHandler.java](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/java/org/ifsoft/orinayo/openfire/OlMeetIQHandler.java)
> * [src/web/orinayo-summary.jsp](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/web/orinayo-summary.jsp)

This document describes the core architecture of the Orin Ayo Openfire plugin, focusing on the main plugin class, lifecycle management, and integration with the Openfire XMPP server. For information about XMPP protocol extensions and IQ handlers, see [XMPP Protocol Extensions](/igniterealtime/openfire-orinayo-plugin/3-xmpp-protocol-extensions). For details about web interfaces and client applications, see [Web Interfaces and Client Applications](/igniterealtime/openfire-orinayo-plugin/4-web-interfaces-and-client-applications).

## Plugin Overview and Structure

The Orin Ayo plugin is built as a standard Openfire plugin that extends the XMPP server with collaborative music capabilities. The plugin follows Openfire's plugin architecture patterns while integrating external media streaming processes and custom XMPP extensions.

```mermaid
flowchart TD

OF["Openfire Core Server"]
PM["PluginManager"]
IR["IQRouter"]
HBM["HttpBindManager"]
BC["BroadcastBox<br>(Main Plugin Class)"]
WHIP["WhipIQHandler"]
WHEP["WhepIQHandler"]
MEET["OlMeetIQHandler"]
JSP["JSP Web Context"]
PROXY["Proxy Servlets"]
BBC_LINUX["broadcast-box<br>(Linux x64)"]
BBC_WIN["broadcast-box.exe<br>(Windows x64)"]
MIDI["Apple MIDI Server<br>(Port 50004)"]

PM --> BC
BC --> IR
BC --> HBM
BC --> BBC_LINUX
BC --> BBC_WIN
BC --> MIDI
IR --> WHIP
IR --> WHEP
IR --> MEET
HBM --> JSP
PROXY --> BBC_LINUX
PROXY --> BBC_WIN

subgraph subGraph2 ["External Processes"]
    BBC_LINUX
    BBC_WIN
    MIDI
end

subgraph subGraph1 ["Orin Ayo Plugin (orinayo.jar)"]
    BC
    WHIP
    WHEP
    MEET
    JSP
    PROXY
    JSP --> PROXY
end

subgraph subGraph0 ["Openfire Server Environment"]
    OF
    PM
    IR
    HBM
end
```

Sources: [src/java/org/ifsoft/orinayo/openfire/BroadcastBox.java L1-L494](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/java/org/ifsoft/orinayo/openfire/BroadcastBox.java#L1-L494)

 [plugin.xml L1-L25](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/plugin.xml#L1-L25)

 [pom.xml L1-L164](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/pom.xml#L1-L164)

## BroadcastBox Main Class Architecture

The `BroadcastBox` class serves as the central orchestrator for the plugin, implementing multiple interfaces to handle different aspects of the system:

```mermaid
flowchart TD

BC["BroadcastBox"]
PLUGIN["Plugin<br>(Lifecycle Management)"]
PROP["PropertyEventListener<br>(Configuration Changes)"]
PROC["ProcessListener<br>(External Process Events)"]
MUC["MUCEventListener<br>(Chat Room Events)"]
RECV["Receiver<br>(MIDI Message Handling)"]
LIFECYCLE["initializePlugin()<br>destroyPlugin()"]
EXTERNAL["External Process<br>Management"]
WEB["Web Service<br>Setup"]
IQ["IQ Handler<br>Registration"]
MIDI_SRV["MIDI Server<br>Management"]

PLUGIN --> LIFECYCLE
BC --> EXTERNAL
BC --> WEB
BC --> IQ
BC --> MIDI_SRV

subgraph subGraph1 ["Core Responsibilities"]
    LIFECYCLE
    EXTERNAL
    WEB
    IQ
    MIDI_SRV
end

subgraph subGraph0 ["BroadcastBox Class Interfaces"]
    BC
    PLUGIN
    PROP
    PROC
    MUC
    RECV
    BC --> PLUGIN
    BC --> PROP
    BC --> PROC
    BC --> MUC
    BC --> RECV
end
```

Sources: [src/java/org/ifsoft/orinayo/openfire/BroadcastBox.java L68-L85](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/java/org/ifsoft/orinayo/openfire/BroadcastBox.java#L68-L85)

 [src/java/org/ifsoft/orinayo/openfire/BroadcastBox.java L124-L171](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/java/org/ifsoft/orinayo/openfire/BroadcastBox.java#L124-L171)

 [src/java/org/ifsoft/orinayo/openfire/BroadcastBox.java L87-L122](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/java/org/ifsoft/orinayo/openfire/BroadcastBox.java#L87-L122)

## Plugin Lifecycle and Initialization

The plugin initialization process follows a structured sequence that sets up all required components and services:

| Phase | Method | Key Actions |
| --- | --- | --- |
| **Startup** | `initializePlugin()` | Initialize caches, register listeners, start services |
| **IQ Registration** | `initializePlugin()` | Register WHIP, WHEP, and OlMeet IQ handlers |
| **Process Management** | `startGoProcesses()` | Launch platform-specific broadcast-box executable |
| **Web Services** | `startJSP()` | Configure Jetty web context and proxy servlets |
| **MIDI Services** | `initializePlugin()` | Setup Apple MIDI server and mDNS registration |
| **Shutdown** | `destroyPlugin()` | Clean shutdown of all services and processes |

```mermaid
sequenceDiagram
  participant PluginManager
  participant BroadcastBox
  participant IQRouter
  participant HttpBindManager
  participant External Process

  PluginManager->>BroadcastBox: initializePlugin(manager, pluginDirectory)
  BroadcastBox->>BroadcastBox: Create MUC cache
  BroadcastBox->>BroadcastBox: Register property/MUC listeners
  BroadcastBox->>IQRouter: Register WhipIQHandler
  BroadcastBox->>IQRouter: Register WhepIQHandler
  BroadcastBox->>IQRouter: Register OlMeetIQHandler
  BroadcastBox->>BroadcastBox: checkNatives(pluginDirectory)
  BroadcastBox->>External Process: startGoProcesses()
  BroadcastBox->>HttpBindManager: startJSP()
  BroadcastBox->>BroadcastBox: Setup MIDI server and mDNS
  note over PluginManager,External Process: Plugin fully initialized
  PluginManager->>BroadcastBox: destroyPlugin()
  BroadcastBox->>External Process: Terminate external processes
  BroadcastBox->>IQRouter: Remove IQ handlers
  BroadcastBox->>HttpBindManager: Remove web services
  BroadcastBox->>BroadcastBox: Cleanup resources
```

Sources: [src/java/org/ifsoft/orinayo/openfire/BroadcastBox.java L124-L171](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/java/org/ifsoft/orinayo/openfire/BroadcastBox.java#L124-L171)

 [src/java/org/ifsoft/orinayo/openfire/BroadcastBox.java L87-L122](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/java/org/ifsoft/orinayo/openfire/BroadcastBox.java#L87-L122)

 [src/java/org/ifsoft/orinayo/openfire/BroadcastBox.java L289-L323](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/java/org/ifsoft/orinayo/openfire/BroadcastBox.java#L289-L323)

## External Process Management

The plugin manages platform-specific external executables that handle the core media streaming functionality:

```mermaid
flowchart TD

ENV["Environment Variables"]
HTTP_ADDR["HTTP_ADDRESS"]
UDP_PORT["UDP_MUX_PORT"]
STUN["STUN_SERVERS"]
ICE["NAT_ICE_CANDIDATE_TYPE"]
CHK["checkNatives()"]
LINUX["OSUtils.IS_LINUX64"]
WIN["OSUtils.IS_WINDOWS64"]
SPAWN["Spawn.startProcess()"]
BBC_L["broadcast-box<br>(classes/linux-64/)"]
BBC_W["broadcast-box.exe<br>(classes/win-64/)"]
PROC_LIST["ProcessListener callbacks"]

LINUX --> BBC_L
WIN --> BBC_W

subgraph subGraph2 ["Executable Management"]
    SPAWN
    BBC_L
    BBC_W
    PROC_LIST
    SPAWN --> BBC_L
    SPAWN --> BBC_W
    SPAWN --> PROC_LIST
end

subgraph subGraph0 ["Platform Detection"]
    CHK
    LINUX
    WIN
    CHK --> LINUX
    CHK --> WIN
end

subgraph subGraph1 ["Process Configuration"]
    ENV
    HTTP_ADDR
    UDP_PORT
    STUN
    ICE
    ENV --> HTTP_ADDR
    ENV --> UDP_PORT
    ENV --> STUN
    ENV --> ICE
end
```

Sources: [src/java/org/ifsoft/orinayo/openfire/BroadcastBox.java L325-L351](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/java/org/ifsoft/orinayo/openfire/BroadcastBox.java#L325-L351)

 [src/java/org/ifsoft/orinayo/openfire/BroadcastBox.java L289-L323](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/java/org/ifsoft/orinayo/openfire/BroadcastBox.java#L289-L323)

 [src/java/org/ifsoft/orinayo/openfire/BroadcastBox.java L300-L316](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/java/org/ifsoft/orinayo/openfire/BroadcastBox.java#L300-L316)

## Web Services Integration

The plugin integrates with Openfire's HTTP binding manager to serve web content and proxy API requests:

```mermaid
flowchart TD

JSP_CTX["WebAppContext<br>(/orinayo)"]
CLASSES["pluginDirectory/classes/jsp"]
MIME["MIME Type Mapping<br>(wasm → application/wasm)"]
WHIP_PROXY["ProxyServlet<br>(/api/whip/*)"]
WHEP_PROXY["ProxyServlet<br>(/api/whep/*)"]
SSE_PROXY["ProxyServlet<br>(/api/sse/*)"]
STATUS_PROXY["ProxyServlet<br>(/api/status/*)"]
TARGET["webUrl = Unsupported markdown: link"]
IP_ADDR["orinayo.ipaddr property"]
TCP_PORT["orinayo.port property"]

JSP_CTX --> WHIP_PROXY
JSP_CTX --> WHEP_PROXY
JSP_CTX --> SSE_PROXY
JSP_CTX --> STATUS_PROXY
WHIP_PROXY --> TARGET
WHEP_PROXY --> TARGET
SSE_PROXY --> TARGET
STATUS_PROXY --> TARGET

subgraph subGraph2 ["Target Configuration"]
    TARGET
    IP_ADDR
    TCP_PORT
    TARGET --> IP_ADDR
    TARGET --> TCP_PORT
end

subgraph subGraph1 ["Proxy Servlet Configuration"]
    WHIP_PROXY
    WHEP_PROXY
    SSE_PROXY
    STATUS_PROXY
end

subgraph subGraph0 ["Web Context Setup"]
    JSP_CTX
    CLASSES
    MIME
    JSP_CTX --> CLASSES
    JSP_CTX --> MIME
end
```

Sources: [src/java/org/ifsoft/orinayo/openfire/BroadcastBox.java L256-L287](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/java/org/ifsoft/orinayo/openfire/BroadcastBox.java#L256-L287)

 [src/java/org/ifsoft/orinayo/openfire/BroadcastBox.java L261-L283](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/java/org/ifsoft/orinayo/openfire/BroadcastBox.java#L261-L283)

## Configuration and Properties Management

The plugin uses Openfire's property system for configuration management with support for runtime changes:

| Property Key | Default Value | Purpose |
| --- | --- | --- |
| `orinayo.enabled` | `true` | Enable/disable the broadcast-box process |
| `orinayo.ipaddr` | `getIpAddress()` | Local IP address for HTTP server |
| `orinayo.port` | `"8080"` | TCP port for HTTP server |
| `orinayo.port.udp` | `"10000"` | UDP port for media streaming |
| `orinayo.ipaddr.public` | `getPublicIpAddress()` | Public IP for external access |
| `orinayo.webapp.url.override` | `null` | Override webapp URL |
| `orinayo.muc.enabled` | `false` | Enable MUC integration features |

```mermaid
flowchart TD

DEFAULTS["Default Values<br>(getPort(), getIpAddress())"]
GLOBALS["JiveGlobals<br>(openfire.xml)"]
OVERRIDE["URL Override<br>(orinayo.webapp.url.override)"]
PROCESS["External Process<br>Environment"]
WEB["Web Service<br>Configuration"]
PROXY["Proxy Target<br>URLs"]
WEBAPP["Webapp URL<br>Generation"]

DEFAULTS --> PROCESS
GLOBALS --> PROCESS
GLOBALS --> WEB
GLOBALS --> PROXY
OVERRIDE --> WEBAPP

subgraph subGraph1 ["Property Usage"]
    PROCESS
    WEB
    PROXY
    WEBAPP
end

subgraph subGraph0 ["Property Sources"]
    DEFAULTS
    GLOBALS
    OVERRIDE
end
```

Sources: [src/java/org/ifsoft/orinayo/openfire/BroadcastBox.java L290-L323](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/java/org/ifsoft/orinayo/openfire/BroadcastBox.java#L290-L323)

 [src/java/org/ifsoft/orinayo/openfire/BroadcastBox.java L206-L234](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/java/org/ifsoft/orinayo/openfire/BroadcastBox.java#L206-L234)

 [src/java/org/ifsoft/orinayo/openfire/BroadcastBox.java L173-L204](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/java/org/ifsoft/orinayo/openfire/BroadcastBox.java#L173-L204)

## Build System and Dependencies

The Maven build system handles platform-specific resource management and dependency resolution:

```mermaid
flowchart TD

POM["pom.xml"]
PARENT["plugins parent<br>(org.igniterealtime.openfire)"]
ARTIFACT["orinayo artifact<br>(version 1.0.2-SNAPSHOT)"]
SRC_ROOT["src/root/"]
WIN_COPY["copy-win-64<br>(classes/win-64)"]
LINUX_COPY["copy-linux-64<br>(classes/linux-64)"]
JSP_COMPILE["jetty-ee8-jspc-maven-plugin"]
JETTY["Jetty HTTP3/HTTP2"]
PROXY["jetty-ee8-proxy"]
JSON["json-lib-0.8"]
LOMBOK["lombok-1.18.36"]
VALIDATION["hibernate-validator"]

POM --> WIN_COPY
POM --> LINUX_COPY
POM --> JSP_COMPILE
POM --> JETTY
POM --> PROXY
POM --> JSON
POM --> LOMBOK
POM --> VALIDATION

subgraph subGraph2 ["Key Dependencies"]
    JETTY
    PROXY
    JSON
    LOMBOK
    VALIDATION
end

subgraph subGraph1 ["Resource Management"]
    SRC_ROOT
    WIN_COPY
    LINUX_COPY
    JSP_COMPILE
    SRC_ROOT --> WIN_COPY
    SRC_ROOT --> LINUX_COPY
end

subgraph subGraph0 ["Maven Configuration"]
    POM
    PARENT
    ARTIFACT
    POM --> PARENT
    POM --> ARTIFACT
end
```

Sources: [pom.xml L22-L74](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/pom.xml#L22-L74)

 [pom.xml L76-L142](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/pom.xml#L76-L142)

 [pom.xml L28-L62](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/pom.xml#L28-L62)