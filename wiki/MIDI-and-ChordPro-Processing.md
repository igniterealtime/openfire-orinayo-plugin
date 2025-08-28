# MIDI and ChordPro Processing

> **Relevant source files**
> * [src/java/org/ifsoft/chordpro/MidiFile.java](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/java/org/ifsoft/chordpro/MidiFile.java)
> * [src/java/org/ifsoft/chordpro/Song2mid.java](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/java/org/ifsoft/chordpro/Song2mid.java)
> * [src/java/org/ifsoft/orinayo/openfire/CORSFilter.java](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/java/org/ifsoft/orinayo/openfire/CORSFilter.java)

This document covers the ChordPro to MIDI conversion system within the Orin Ayo plugin, which transforms musical chord charts and lyrics in ChordPro format into MIDI files with Yamaha arranger keyboard compatibility. The system processes ChordPro directives, chord symbols, lyrics, and annotations to generate time-synchronized MIDI sequences with embedded chord data and accompaniment control.

For WebRTC-based audio and video streaming capabilities, see [WebRTC Media Streaming](/igniterealtime/openfire-orinayo-plugin/5.2-webrtc-media-streaming).

## System Overview

The MIDI and ChordPro processing system consists of two primary components that work together to convert textual musical notation into playable MIDI sequences:

```mermaid
flowchart TD

CP_INPUT["ChordPro Text Input<br>Chords, Lyrics, Directives"]
SONG_PARSER["Song Parser<br>(External Component)"]
SONG_ELEMENTS["SongElement List<br>Parsed Components"]
SONG2MID["Song2mid<br>Main Converter"]
MIDI_FILE["MidiFile<br>MIDI Generation"]
MIDI_SEQUENCE["MIDI Sequence<br>Java Sound API"]
MIDI_OUTPUT["MIDI File Output<br>.mid files"]
MIDI_STREAM["MIDI Stream Output<br>Real-time data"]
CHORD_SYSEX["Chord SysEx Messages<br>F0 43 7E 02..."]
ACCOMP_CONTROL["Accompaniment Control<br>Start/Stop/Style"]
SECTION_CONTROL["Section Control<br>MA, MB, FA, etc."]

SONG_ELEMENTS --> SONG2MID
MIDI_FILE --> MIDI_SEQUENCE
SONG2MID --> CHORD_SYSEX
SONG2MID --> ACCOMP_CONTROL
SONG2MID --> SECTION_CONTROL

subgraph subGraph3 ["Yamaha Features"]
    CHORD_SYSEX
    ACCOMP_CONTROL
    SECTION_CONTROL
end

subgraph subGraph2 ["MIDI Output"]
    MIDI_SEQUENCE
    MIDI_OUTPUT
    MIDI_STREAM
    MIDI_SEQUENCE --> MIDI_OUTPUT
    MIDI_SEQUENCE --> MIDI_STREAM
end

subgraph subGraph1 ["Core Processing Classes"]
    SONG2MID
    MIDI_FILE
    SONG2MID --> MIDI_FILE
end

subgraph subGraph0 ["ChordPro Input Processing"]
    CP_INPUT
    SONG_PARSER
    SONG_ELEMENTS
    CP_INPUT --> SONG_PARSER
    SONG_PARSER --> SONG_ELEMENTS
end
```

**Sources:** [src/java/org/ifsoft/chordpro/Song2mid.java L1-L738](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/java/org/ifsoft/chordpro/Song2mid.java#L1-L738)

 [src/java/org/ifsoft/chordpro/MidiFile.java L1-L436](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/java/org/ifsoft/chordpro/MidiFile.java#L1-L436)

## Core Classes and Architecture

The system is built around two main classes that handle the conversion pipeline from ChordPro format to MIDI output:

| Class | Primary Responsibility | Key Methods |
| --- | --- | --- |
| `Song2mid` | ChordPro to MIDI conversion logic | `convertSongToMidi()`, `convertChord()`, `convertDirective()` |
| `MidiFile` | MIDI sequence generation and file I/O | `addChord()`, `addTempo()`, `writeMidiFile()` |

```mermaid
flowchart TD

S2M_CONVERT["convertSongToMidi()"]
S2M_CHORD["convertChord()"]
S2M_DIRECTIVE["convertDirective()"]
S2M_LYRIC["convertLyric()"]
S2M_ANNOTATION["convertAnnotation()"]
MF_SEQUENCE["makeMidiSequence()"]
MF_CHORD["addChord()"]
MF_TEMPO["addTempo()"]
MF_TIME_SIG["addTimeSignature()"]
MF_WRITE["writeMidiFile()"]
ENCODE_CHORD["encodeChordNote()"]
ENCODE_TYPE["encodeChordType()"]
CONVERT_KEY["convertKey()"]
CONVERT_TIME["convertTimeSignature()"]

S2M_CHORD --> MF_CHORD
S2M_DIRECTIVE --> MF_TEMPO
S2M_DIRECTIVE --> MF_TIME_SIG
S2M_CHORD --> ENCODE_CHORD
S2M_CHORD --> ENCODE_TYPE
S2M_DIRECTIVE --> CONVERT_KEY
S2M_DIRECTIVE --> CONVERT_TIME

subgraph subGraph2 ["Supporting Methods"]
    ENCODE_CHORD
    ENCODE_TYPE
    CONVERT_KEY
    CONVERT_TIME
end

subgraph subGraph1 ["MidiFile Class"]
    MF_SEQUENCE
    MF_CHORD
    MF_TEMPO
    MF_TIME_SIG
    MF_WRITE
end

subgraph subGraph0 ["Song2mid Class"]
    S2M_CONVERT
    S2M_CHORD
    S2M_DIRECTIVE
    S2M_LYRIC
    S2M_ANNOTATION
    S2M_CONVERT --> S2M_CHORD
    S2M_CONVERT --> S2M_DIRECTIVE
    S2M_CONVERT --> S2M_LYRIC
    S2M_CONVERT --> S2M_ANNOTATION
end
```

**Sources:** [src/java/org/ifsoft/chordpro/Song2mid.java L38-L61](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/java/org/ifsoft/chordpro/Song2mid.java#L38-L61)

 [src/java/org/ifsoft/chordpro/Song2mid.java L690-L736](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/java/org/ifsoft/chordpro/Song2mid.java#L690-L736)

 [src/java/org/ifsoft/chordpro/MidiFile.java L59-L72](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/java/org/ifsoft/chordpro/MidiFile.java#L59-L72)

## ChordPro Element Processing Pipeline

The `Song2mid` class processes different types of ChordPro elements through a dispatch mechanism that routes each element type to its appropriate conversion method:

```mermaid
flowchart TD

COMMENT_ELEM["Comment Element"]
LYRIC_ELEM["Lyric Element"]
CHORD_ELEM["Chord Element"]
DIRECTIVE_ELEM["Directive Element"]
ANNOTATION_ELEM["Annotation Element"]
TAB_ELEM["Tab Element"]
LINE_ELEM["Line Element"]
CONV_COMMENT["convertComment()"]
CONV_LYRIC["convertLyric()"]
CONV_CHORD["convertChord()"]
CONV_DIRECTIVE["convertDirective()"]
CONV_ANNOTATION["convertAnnotation()"]
CONV_TAB["convertTab()"]
CONV_LINE["convertLine()"]
MIDI_EVENTS["MIDI Events Generated"]
CHORD_SYSEX_OUT["Chord SysEx Messages"]
LYRIC_META["Lyric Meta Events"]
TEMPO_META["Tempo Meta Events"]
TIME_ADVANCE["Time Advancement"]

COMMENT_ELEM --> CONV_COMMENT
LYRIC_ELEM --> CONV_LYRIC
CHORD_ELEM --> CONV_CHORD
DIRECTIVE_ELEM --> CONV_DIRECTIVE
ANNOTATION_ELEM --> CONV_ANNOTATION
TAB_ELEM --> CONV_TAB
LINE_ELEM --> CONV_LINE
CONV_CHORD --> CHORD_SYSEX_OUT
CONV_CHORD --> TIME_ADVANCE
CONV_LYRIC --> LYRIC_META
CONV_DIRECTIVE --> TEMPO_META
CONV_LINE --> LYRIC_META

subgraph subGraph2 ["MIDI Output Generation"]
    MIDI_EVENTS
    CHORD_SYSEX_OUT
    LYRIC_META
    TEMPO_META
    TIME_ADVANCE
    CHORD_SYSEX_OUT --> MIDI_EVENTS
    LYRIC_META --> MIDI_EVENTS
    TEMPO_META --> MIDI_EVENTS
end

subgraph subGraph1 ["Processing Methods"]
    CONV_COMMENT
    CONV_LYRIC
    CONV_CHORD
    CONV_DIRECTIVE
    CONV_ANNOTATION
    CONV_TAB
    CONV_LINE
end

subgraph subGraph0 ["SongElement Types"]
    COMMENT_ELEM
    LYRIC_ELEM
    CHORD_ELEM
    DIRECTIVE_ELEM
    ANNOTATION_ELEM
    TAB_ELEM
    LINE_ELEM
end
```

**Sources:** [src/java/org/ifsoft/chordpro/Song2mid.java L704-L725](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/java/org/ifsoft/chordpro/Song2mid.java#L704-L725)

 [src/java/org/ifsoft/chordpro/Song2mid.java L569-L627](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/java/org/ifsoft/chordpro/Song2mid.java#L569-L627)

 [src/java/org/ifsoft/chordpro/Song2mid.java L334-L489](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/java/org/ifsoft/chordpro/Song2mid.java#L334-L489)

## Chord Processing and Yamaha Encoding

The system converts ChordPro chord symbols into Yamaha arranger keyboard format using proprietary encoding schemes for chord roots, types, and bass notes:

### Chord Note Encoding

The `encodeChordNote()` method converts musical notes to Yamaha format:

| Note | Modifier | Yamaha Code | Binary Pattern |
| --- | --- | --- | --- |
| C | Natural | 0x31 | 0011 0001 |
| C | Sharp (#) | 0x41 | 0100 0001 |
| C | Flat (b) | 0x21 | 0010 0001 |

```mermaid
flowchart TD

CHORD_INPUT["Chord Symbol<br>'Am7', 'F#maj7', 'C/G'"]
ROOT_NOTE["Root Note<br>A, F#, C"]
CHORD_TYPE["Chord Type<br>m7, maj7, major"]
BASS_NOTE["Bass Note<br>A, F#, G"]
ENCODE_ROOT["encodeChordNote()<br>Root Encoding"]
ENCODE_TYPE_FUNC["encodeChordType()<br>Type Encoding"]
ENCODE_BASS["encodeChordNote()<br>Bass Encoding"]
SYSEX_MSG["Chord SysEx Message<br>F0 43 7E 02 cn ct bn bt F7"]
MIDI_EVENT["MIDI Event<br>with Timestamp"]

ROOT_NOTE --> ENCODE_ROOT
CHORD_TYPE --> ENCODE_TYPE_FUNC
BASS_NOTE --> ENCODE_BASS
ENCODE_ROOT --> SYSEX_MSG
ENCODE_TYPE_FUNC --> SYSEX_MSG
ENCODE_BASS --> SYSEX_MSG

subgraph subGraph2 ["MIDI Output"]
    SYSEX_MSG
    MIDI_EVENT
    SYSEX_MSG --> MIDI_EVENT
end

subgraph subGraph1 ["Yamaha Encoding"]
    ENCODE_ROOT
    ENCODE_TYPE_FUNC
    ENCODE_BASS
end

subgraph subGraph0 ["Chord Symbol Parsing"]
    CHORD_INPUT
    ROOT_NOTE
    CHORD_TYPE
    BASS_NOTE
    CHORD_INPUT --> ROOT_NOTE
    CHORD_INPUT --> CHORD_TYPE
    CHORD_INPUT --> BASS_NOTE
end
```

**Sources:** [src/java/org/ifsoft/chordpro/Song2mid.java L187-L229](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/java/org/ifsoft/chordpro/Song2mid.java#L187-L229)

 [src/java/org/ifsoft/chordpro/Song2mid.java L234-L332](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/java/org/ifsoft/chordpro/Song2mid.java#L234-L332)

 [src/java/org/ifsoft/chordpro/Song2mid.java L592-L594](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/java/org/ifsoft/chordpro/Song2mid.java#L592-L594)

### Chord Type Classification

The system supports extensive chord type recognition with Yamaha-specific encoding:

| Qualifier | Extensions | Yamaha Type | Usage |
| --- | --- | --- | --- |
| "" (major) | "7" | 0x13 | Dominant 7th |
| "maj" | "7" | 0x02 | Major 7th |
| "min" | "7" | 0x0A | Minor 7th |
| "dim" | "7" | 0x12 | Diminished 7th |

**Sources:** [src/java/org/ifsoft/chordpro/Song2mid.java L234-L332](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/java/org/ifsoft/chordpro/Song2mid.java#L234-L332)

## MIDI File Generation and Timing

The `MidiFile` class manages MIDI sequence creation, timing calculations, and Yamaha-specific system exclusive messages:

### Timing System

The system uses a default resolution of 1920 ticks per quarter note and calculates timing based on time signatures:

```mermaid
flowchart TD

RESOLUTION["defaultResolution<br>1920 ticks/quarter"]
TIME_SIG["Time Signature<br>divisionsPerBar/division"]
TEMPO_BPM["Tempo (BPM)<br>Integer beats per minute"]
TICKS_PER_DIV["ticksPerDivision<br>resolution * multiplier"]
TICKS_PER_BAR["ticksPerBar<br>divisionsPerBar * ticksPerDivision"]
TICK_DELAY["tickDelay<br>Duration until next chord"]
TIMESTAMP["timeStamp<br>Current MIDI time"]
ADVANCE_TIME["advanceTime()<br>Add tick delay"]
NEXT_EVENT["Next MIDI Event<br>Positioned in time"]

RESOLUTION --> TICKS_PER_DIV
TIME_SIG --> TICKS_PER_BAR
TICK_DELAY --> ADVANCE_TIME

subgraph subGraph2 ["Time Advancement"]
    TIMESTAMP
    ADVANCE_TIME
    NEXT_EVENT
    TIMESTAMP --> ADVANCE_TIME
    ADVANCE_TIME --> NEXT_EVENT
end

subgraph subGraph1 ["Tick Calculations"]
    TICKS_PER_DIV
    TICKS_PER_BAR
    TICK_DELAY
    TICKS_PER_DIV --> TICKS_PER_BAR
    TICKS_PER_BAR --> TICK_DELAY
end

subgraph subGraph0 ["Timing Configuration"]
    RESOLUTION
    TIME_SIG
    TEMPO_BPM
end
```

**Sources:** [src/java/org/ifsoft/chordpro/Song2mid.java L21-L28](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/java/org/ifsoft/chordpro/Song2mid.java#L21-L28)

 [src/java/org/ifsoft/chordpro/Song2mid.java L51-L54](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/java/org/ifsoft/chordpro/Song2mid.java#L51-L54)

 [src/java/org/ifsoft/chordpro/Song2mid.java L66-L68](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/java/org/ifsoft/chordpro/Song2mid.java#L66-L68)

 [src/java/org/ifsoft/chordpro/MidiFile.java L57-L58](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/java/org/ifsoft/chordpro/MidiFile.java#L57-L58)

### MIDI Event Generation

The `MidiFile` class provides methods for generating various types of MIDI events with proper timing:

| Event Type | Method | Purpose |
| --- | --- | --- |
| Chord Data | `addChord()` | Yamaha chord SysEx messages |
| Accompaniment | `addAccompStart()`, `addAccompStop()` | Control auto-accompaniment |
| Section Control | `addSectionControl()` | Song structure (MA, MB, FA, etc.) |
| Lyrics | `addLyric()`, `addLineBreak()` | Text synchronization |
| Style | `addStyleCode()` | Yamaha style selection |

**Sources:** [src/java/org/ifsoft/chordpro/MidiFile.java L343-L414](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/java/org/ifsoft/chordpro/MidiFile.java#L343-L414)

 [src/java/org/ifsoft/chordpro/MidiFile.java L315-L341](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/java/org/ifsoft/chordpro/MidiFile.java#L315-L341)

 [src/java/org/ifsoft/chordpro/MidiFile.java L362-L370](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/java/org/ifsoft/chordpro/MidiFile.java#L362-L370)

## ChordPro Directive Processing

The system processes ChordPro directives to configure MIDI file parameters and generate appropriate meta events:

### Core Directives

```mermaid
flowchart TD

TITLE_DIR["{title}"]
TEMPO_DIR["{tempo}"]
TIME_DIR["{time}"]
KEY_DIR["{key}"]
STYLE_DIR["{stylecode}"]
SOC_DIR["{start_of_chorus}"]
EOC_DIR["{end_of_chorus}"]
SOI_DIR["{start_of_instrumental}"]
EOI_DIR["{end_of_instrumental}"]
START_ACCOMP["{start_accomp}"]
STOP_ACCOMP["{stop_accomp}"]
COMMENT_DIR["{comment}"]
TRACK_NAME["Track Name Meta Event"]
TEMPO_META["Tempo Meta Event"]
TIME_META["Time Signature Meta Event"]
KEY_META["Key Signature Meta Event"]
STYLE_SYSEX["Style Code SysEx"]
PAGE_BREAK["Page Break Meta Event"]
ACCOMP_SYSEX["Accompaniment SysEx"]

TITLE_DIR --> TRACK_NAME
TEMPO_DIR --> TEMPO_META
TIME_DIR --> TIME_META
KEY_DIR --> KEY_META
STYLE_DIR --> STYLE_SYSEX
SOC_DIR --> PAGE_BREAK
SOI_DIR --> PAGE_BREAK
COMMENT_DIR --> PAGE_BREAK
START_ACCOMP --> ACCOMP_SYSEX
STOP_ACCOMP --> ACCOMP_SYSEX

subgraph subGraph3 ["MIDI Events Generated"]
    TRACK_NAME
    TEMPO_META
    TIME_META
    KEY_META
    STYLE_SYSEX
    PAGE_BREAK
    ACCOMP_SYSEX
end

subgraph subGraph2 ["Control Directives"]
    START_ACCOMP
    STOP_ACCOMP
    COMMENT_DIR
end

subgraph subGraph1 ["Structure Directives"]
    SOC_DIR
    EOC_DIR
    SOI_DIR
    EOI_DIR
end

subgraph subGraph0 ["Setup Directives"]
    TITLE_DIR
    TEMPO_DIR
    TIME_DIR
    KEY_DIR
    STYLE_DIR
end
```

**Sources:** [src/java/org/ifsoft/chordpro/Song2mid.java L339-L489](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/java/org/ifsoft/chordpro/Song2mid.java#L339-L489)

### Key and Time Signature Conversion

The system includes sophisticated parsing for musical keys and time signatures:

* **Key Conversion**: Supports major and minor keys with circle of fifths encoding
* **Time Signature**: Validates power-of-two denominators and calculates tick subdivisions
* **Tempo**: Converts BPM to MIDI microseconds per quarter note

**Sources:** [src/java/org/ifsoft/chordpro/Song2mid.java L74-L119](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/java/org/ifsoft/chordpro/Song2mid.java#L74-L119)

 [src/java/org/ifsoft/chordpro/Song2mid.java L132-L177](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/java/org/ifsoft/chordpro/Song2mid.java#L132-L177)

 [src/java/org/ifsoft/chordpro/MidiFile.java L237-L249](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/java/org/ifsoft/chordpro/MidiFile.java#L237-L249)

## Integration with Orin Ayo System

The MIDI and ChordPro processing system integrates with the broader Orin Ayo platform through the BroadcastBox plugin architecture, providing musical score processing capabilities for collaborative music applications. The generated MIDI data can be streamed to connected clients or saved for later playback through the system's WebRTC infrastructure.

**Sources:** [src/java/org/ifsoft/chordpro/Song2mid.java L1-L10](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/java/org/ifsoft/chordpro/Song2mid.java#L1-L10)

 [src/java/org/ifsoft/chordpro/MidiFile.java L16-L22](https://github.com/igniterealtime/openfire-orinayo-plugin/blob/932fc61c/src/java/org/ifsoft/chordpro/MidiFile.java#L16-L22)