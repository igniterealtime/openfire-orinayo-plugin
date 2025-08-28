# Build Artifacts and Platform Resources

> **Relevant source files**
> * [.gitignore](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/.gitignore)
> * [classes/linux-64/web/build/audio-publisher.html](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/linux-64/web/build/audio-publisher.html)
> * [classes/linux-64/web/build/audio-watcher.html](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/linux-64/web/build/audio-watcher.html)
> * [classes/linux-64/web/build/video-publisher.html](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/linux-64/web/build/video-publisher.html)
> * [classes/linux-64/web/build/video-watcher.html](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/linux-64/web/build/video-watcher.html)
> * [classes/win-64/web/build/audio-publisher.html](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/win-64/web/build/audio-publisher.html)
> * [classes/win-64/web/build/audio-watcher.html](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/win-64/web/build/audio-watcher.html)
> * [classes/win-64/web/build/video-publisher.html](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/win-64/web/build/video-publisher.html)
> * [classes/win-64/web/build/video-watcher.html](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/win-64/web/build/video-watcher.html)
> * [logo_large.gif](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/logo_large.gif)
> * [logo_small.gif](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/logo_small.gif)

This page documents the platform-specific build artifacts and static resources that are generated and packaged with the Orin Ayo Openfire plugin. These artifacts include WebRTC example applications, platform-specific binaries, static assets, and configuration resources that support the plugin's deployment across different operating systems.

For information about the core build system configuration, see [Plugin Configuration and Build System](/igniterealtime/openfire-orinayo-plugin/2.2-plugin-configuration-and-build-system). For details about the WebRTC streaming functionality these examples demonstrate, see [WebRTC Media Streaming](/igniterealtime/openfire-orinayo-plugin/5.2-webrtc-media-streaming).

## Platform-Specific Build Structure

The plugin generates platform-specific build artifacts organized into separate directories for different target operating systems. This structure supports the plugin's cross-platform deployment requirements and external process management.

```mermaid
flowchart TD

LogoSmall["logo_small.gif"]
LogoLarge["logo_large.gif"]
Target["target/"]
Classes["classes/"]
TempDir["tempdir/"]
Linux64["classes/linux-64/"]
Win64["classes/win-64/"]
LinuxWeb["web/build/"]
LinuxEnvDev["classes/linux-64/.env.development"]
LinuxEnvProd["classes/linux-64/.env.production"]
LinuxBinary["broadcast-box (executable)"]
WinWeb["web/build/"]
WinEnvDev["classes/win-64/.env.development"]
WinEnvProd["classes/win-64/.env.production"]
WinBinary["broadcast-box.exe"]

Classes --> Linux64
Classes --> Win64
Linux64 --> LinuxWeb
Linux64 --> LinuxEnvDev
Linux64 --> LinuxEnvProd
Linux64 --> LinuxBinary
Win64 --> WinWeb
Win64 --> WinEnvDev
Win64 --> WinEnvProd
Win64 --> WinBinary

subgraph WindowsArtifacts ["Windows 64-bit Artifacts"]
    WinWeb
    WinEnvDev
    WinEnvProd
    WinBinary
end

subgraph LinuxArtifacts ["Linux 64-bit Artifacts"]
    LinuxWeb
    LinuxEnvDev
    LinuxEnvProd
    LinuxBinary
end

subgraph PlatformDirs ["Platform-Specific Directories"]
    Linux64
    Win64
end

subgraph BuildRoot ["Build Root Directory"]
    Target
    Classes
    TempDir
end

subgraph SharedResources ["Shared Static Resources"]
    LogoSmall
    LogoLarge
end
```

**Sources:** [.gitignore L1-L8](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/.gitignore#L1-L8)

## WebRTC Example Applications

Each platform build includes a set of standalone HTML example applications that demonstrate the WHIP and WHEP protocols for WebRTC media streaming. These examples serve as both testing tools and reference implementations for developers.

### Example Application Types

| Application Type | File Name | Purpose | Media Types |
| --- | --- | --- | --- |
| Audio Publisher | `audio-publisher.html` | Publish audio streams via WHIP | Audio only |
| Video Publisher | `video-publisher.html` | Publish video streams via WHIP | Audio + Video |
| Audio Watcher | `audio-watcher.html` | Subscribe to audio streams via WHEP | Audio only |
| Video Watcher | `video-watcher.html` | Subscribe to video streams via WHEP | Audio + Video |

### WebRTC Example Architecture

```mermaid
flowchart TD

AudioPub["audio-publisher.html<br>getUserMedia(audio: true)"]
VideoPub["video-publisher.html<br>getUserMedia(audio+video)"]
AudioWatch["audio-watcher.html<br>addTransceiver('audio')"]
VideoWatch["video-watcher.html<br>addTransceiver('audio','video')"]
WhipEndpoint["/api/whip<br>POST with SDP offer"]
WhepEndpoint["/api/whep<br>POST with SDP offer"]
StatusEndpoint["/api/status<br>Stream status"]
CreateOffer["peerConnection.createOffer()"]
SetLocalDesc["peerConnection.setLocalDescription()"]
FetchAPI["fetch() with SDP body"]
SetRemoteDesc["peerConnection.setRemoteDescription()"]

AudioPub --> CreateOffer
VideoPub --> CreateOffer
AudioWatch --> CreateOffer
VideoWatch --> CreateOffer
FetchAPI --> WhipEndpoint
FetchAPI --> WhepEndpoint
WhipEndpoint --> SetRemoteDesc
WhepEndpoint --> SetRemoteDesc

subgraph WebRTCFlow ["WebRTC Signaling Flow"]
    CreateOffer
    SetLocalDesc
    FetchAPI
    SetRemoteDesc
    CreateOffer --> SetLocalDesc
    SetLocalDesc --> FetchAPI
end

subgraph BroadcastBoxAPI ["BroadcastBox HTTP API"]
    WhipEndpoint
    WhepEndpoint
    StatusEndpoint
end

subgraph Watchers ["Watcher Examples"]
    AudioWatch
    VideoWatch
end

subgraph Publishers ["Publisher Examples"]
    AudioPub
    VideoPub
end
```

**Sources:** [classes/linux-64/web/build/audio-publisher.html L1-L62](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/linux-64/web/build/audio-publisher.html#L1-L62)

 [classes/win-64/web/build/video-publisher.html L1-L83](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/win-64/web/build/video-publisher.html#L1-L83)

 [classes/linux-64/web/build/audio-watcher.html L1-L64](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/linux-64/web/build/audio-watcher.html#L1-L64)

 [classes/win-64/web/build/video-watcher.html L1-L68](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/win-64/web/build/video-watcher.html#L1-L68)

## Publisher Example Implementation

The publisher examples demonstrate WebRTC stream ingestion using the WHIP protocol. They use the standard WebRTC APIs to capture media and send it to the BroadcastBox external process.

### Audio Publisher Flow

```mermaid
sequenceDiagram
  participant Browser
  participant navigator.mediaDevices
  participant RTCPeerConnection
  participant BroadcastBox API

  Browser->>navigator.mediaDevices: getUserMedia({audio: true, video: false})
  navigator.mediaDevices-->>Browser: MediaStream
  Browser->>RTCPeerConnection: addTransceiver(track, {direction: 'sendonly'})
  Browser->>RTCPeerConnection: createOffer()
  RTCPeerConnection-->>Browser: SDP Offer
  Browser->>RTCPeerConnection: setLocalDescription(offer)
  Browser->>BroadcastBox API: POST /api/whip (SDP + Bearer token)
  BroadcastBox API-->>Browser: SDP Answer
  Browser->>RTCPeerConnection: setRemoteDescription(answer)
  RTCPeerConnection-->>Browser: ICE Connection Established
```

**Sources:** [classes/linux-64/web/build/audio-publisher.html L36-L59](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/linux-64/web/build/audio-publisher.html#L36-L59)

 [classes/win-64/web/build/audio-publisher.html L36-L59](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/win-64/web/build/audio-publisher.html#L36-L59)

### Video Publisher Enhancements

The video publisher includes additional WebRTC features such as simulcast encoding with multiple resolution layers:

* **High resolution**: Full quality (`rid: 'high'`)
* **Medium resolution**: 2x downscale (`scaleResolutionDownBy: 2.0`)
* **Low resolution**: 4x downscale (`scaleResolutionDownBy: 4.0`)

**Sources:** [classes/linux-64/web/build/video-publisher.html L55-L71](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/linux-64/web/build/video-publisher.html#L55-L71)

 [classes/win-64/web/build/video-publisher.html L55-L71](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/win-64/web/build/video-publisher.html#L55-L71)

## Watcher Example Implementation

The watcher examples demonstrate WebRTC stream consumption using the WHEP protocol. They establish receive-only connections to consume published media streams.

### Common Watcher Pattern

All watcher examples follow this implementation pattern:

1. **Transceiver Setup**: Add receive-only transceivers for target media types
2. **Track Handling**: Attach received streams to HTML media elements
3. **Connection Monitoring**: Display ICE connection state changes
4. **WHEP Signaling**: POST SDP offers to `/api/whep` endpoint with Bearer token authentication

**Sources:** [classes/linux-64/web/build/audio-watcher.html L35-L61](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/linux-64/web/build/audio-watcher.html#L35-L61)

 [classes/win-64/web/build/video-watcher.html L35-L64](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/classes/win-64/web/build/video-watcher.html#L35-L64)

## Static Resources and Assets

The plugin includes static visual assets used in administrative interfaces and client applications.

### Logo Resources

| Asset | File | Usage |
| --- | --- | --- |
| Small Logo | `logo_small.gif` | Admin console icons, compact displays |
| Large Logo | `logo_large.gif` | Main branding, splash screens |

Both logo files use PNG format with transparency support, stored as GIF files for compatibility with older Openfire admin console versions.

**Sources:** [logo_small.gif L1-L9](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/logo_small.gif#L1-L9)

 [logo_large.gif L1-L16](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/logo_large.gif#L1-L16)

## Environment Configuration

Platform-specific environment configuration files support different deployment scenarios:

* **Development Environment**: `.env.development` files contain development-specific settings
* **Production Environment**: `.env.production` files contain production-optimized settings

These files are excluded from version control but included in platform-specific build artifacts to support proper environment separation during deployment.

**Sources:** [.gitignore L5-L8](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/.gitignore#L5-L8)

## Build Artifact Management

The build system generates and manages artifacts through Maven's standard lifecycle while accommodating platform-specific requirements:

```mermaid
flowchart TD

TargetDir["target/ directory"]
TempFiles["tempdir/ temporary files"]
EnvFiles["Environment configuration files"]
CmdFiles["*.cmd batch files"]
Compile["compile phase"]
Resources["process-resources"]
Package["package phase"]
JARFile["orinayo.jar"]
PlatformResources["Platform-specific resources"]
WebAssets["Web example assets"]

Compile --> JARFile
Resources --> PlatformResources
Resources --> WebAssets
Package --> JARFile

subgraph ArtifactOutput ["Generated Artifacts"]
    JARFile
    PlatformResources
    WebAssets
end

subgraph BuildProcess ["Maven Build Process"]
    Compile
    Resources
    Package
end

subgraph Exclusions ["Build Exclusions (.gitignore)"]
    TargetDir
    TempFiles
    EnvFiles
    CmdFiles
end
```

The build system ensures that platform-specific artifacts are properly included in the final plugin JAR while excluding development-time artifacts and temporary files from version control.

**Sources:** [.gitignore L1-L8](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/.gitignore#L1-L8)