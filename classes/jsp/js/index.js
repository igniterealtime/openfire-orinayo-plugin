const BASE = 48;
const KEYS = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
const SECTIONS = ["Arr A", "Arr B", "Arr C", "Arr D", "Intro 1", "End 1"];
const SECTION_IDS = ["arra", "arrb", "arrc", "arrd"]

const CHROME_EXTN_ID = "oileglflkhgmeabhodafmhahdbfbekdh";
const STRUM_NEUTRAL =  1.2857;
const STRUM_UP = -1.0000;
const STRUM_DOWN = 0.1429;
const STRUM_LEFT = 0.7143;
const STRUM_RIGHT = -0.4286;

const GREEN = 1;
const RED = 2;
const YELLOW = 0;
const BLUE = 3;
const ORANGE = 4;
const STARPOWER = 8;
const START = 9;

const STRUM = 9;
const TOUCH = 5;
const JSTICKX = 0;
const JSTICKY = 1;
const WHAMMY = 2;
const LOGO = 12;
const CONTROL = 100;

var smplrKeys = [];
var smplrPads = [];
var smplrLeads = [];
var noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
var whitelistedPlugins = [];

var analyser = null;
var mediaStreamSource = null;
var leadInstrument = null;
var droneActive = false;
var tempoEle = null;
var chatViewEle = null;
var speechObject = null;
var mobileViewpoint = false;
var desktopContainer = null;
var mobileContainer = null;
var midiInstrCheckedEle = [];
var midiVolumeEle = [];
var programChangeEle = null;
var bluetoothEle = null;
var drumCheckedEle = null;
var bassCheckedEle = null;
var chordCheckedEle = null;
var autoFillCheckedEle = null;
var introEndCheckedEle = null;
var syncStartCheckedEle = null;
var guitarIRDef = null;
var guitarPosition = null;
var tempoDiv = null;
var showVol = null;
var bassKnob = null;
var chordKnob = null;
var drumKnob = null;
var leadKnob = null;
var vocalistMode = false;
var muteChords = null;
var loopWait = 0;
var activeStreams = null;
var _converse = null;
var recorderDestination = null;
var streamDestination = null;
var publishConnection = null;
var watchConnection = null;
var lavaGenieWaitout = 1000;
var keysSound1 = null;
var keysSound2 = null;
var keysSound3 = null;
var savedDrumVol = 100;
var savedBassVol = 100;
var savedChordVol = 100;
var savedTempo = 100;
var midiNotesProceesed = false;
var midiNotes = new Map();
var padsEnvelopes = [];
var streamDeckPointer = 0;
var streamDeck = null;
var bluetoothGuitar = null;
var bassVol = 95;
var chordVol = 40;
var drumVol = 85;
var keysSound1Vol = 100;
var keysSound2Vol = 50;
var keysSound3Vol = 90;
var chordproParser = new ChordSheetJS.ChordProParser();
var lyricsX = 2;
var lyricsY = 18;
var displayShape = null;
var lyricsCanvas = null;
var lyricsContext = null;
var lyricsImage = null;
var recorderFilename = null;
var mediaRecorder = null;
var recordMode = false;
var writeCharacteristic = null;
var readCharacteristic = null;
var appliedVelocity = 0;
var microphone = true;
var handledStartStop = true;
var registration = 0;
var bluetoothDevice = null;
var midiSynth = null;
var arrSynth = null;
var requestArrEnd = false;
var requestedEnd = "Ending A"
var tempVariation = {};
var currentSffVar = "Intro A";
var loadFile = null;
var fretButton = 127;
var padFretButton = 127;
var isStrumUp = false;
var artiphonI1Base = 36;
var footSwCode7Enabled = false;
var playButton = null;
var gamePadModeButton = null;
var styleType = null;
var keyboard = new Map();
var bassLoop = null;
var riffLoop = null;
var drumLoop = null;
var chordLoop = null;
var realInstrument = null;
var songSequence = null;
var arrSequence = null;
var realdrumDevice = null;
var arranger = "webaudio";
var arrangerGroup = "imported";
var inputDeviceType = "keyboard";
var realGuitarStyle = "none";
var midiOutput = null;
var input = null;
var midiRealGuitar = null;
var guitarDeviceId = null;
var padsDevice = null;
var padsInitialised = false;
var chordTracker = null;
var orinayo = null;
var orinayo_section = null;
var orinayo_strum = null;
var orinayo_pad = null;
var orinayo_reg = null;
var orinayo_pitch = null;

var base = BASE;
var key = "C"
var keyChange = 0;
var keySign = null;
var padsMode = 0;
var savedPadsMode = 0;
var sectionChange = 0;
var rgIndex = 0;
var nextRgIndex = 0;
var styleStarted = false;
var activeChord = null;
var forwardChord = null;
var arrChordType = "maj";
var guitarAvailable = false;
var firstChord = [base, base + 4, base + 7];
var lastChord = firstChord;
var rcLooperChord = 0;
var aerosPart = 1;
var aerosChordTrack = 1;
var aerosAux = false;
var aerosAuxMode = false;
var currentPlayNote = 0;
var currentSongNote = 0;
var startofVariation;
var tempoCanvas = null;
var nextBeatTime = 0;
var playStartTime = 0;
var songStartTime = 0;
var audioContext = null
var unlocked = false;
var arrangerBeat;
var current16thNote;        		// What note is currently last scheduled?
var tempo = 100;          			// tempo (in beats per minute)
var lookahead = 25.0;       		// How frequently to call scheduling function 
									//(in milliseconds)
var scheduleAheadTime = 0.1;		// How far ahead to schedule audio (sec)
									// This is calculated from lookahead, and overlaps 
									// with next interval (in case the timer is late)
var nextNoteTime = 0.0;     		// when the next arranger note is due.
var nextSongNoteTime = 0.0;     	// when the next song note is due.
var canvasContext;          		// canvasContext is the canvas' context 2D
var last16thNoteDrawn = -1; 		// the last "box" we drew on the screen
var notesInQueue = [];      		// the notes that have been put into the web audio,
									// and may or may not have played yet. {note, time}
var timerWorker = null;     		// The Web Worker used to fire timer messages

var keysPlayer = new WebAudioFontPlayer();
var keysSelectedEle1 = null;
var keysSelectedEle2 = null;
var keysSelectedEle3 = null;

var guitarName = "none";
var player = new WebAudioFontPlayer();
var midiGuitar = null;
var guitarVolume = 0.25;
var savedGuitarVolume = 0.25;
var guitarReverb = null;
var guitarContext = null;
var guitarSource = null;
var strum1 = "3-2-1-2";
var strum2 = "[3+2+1]";
var strum3 = "3-2-4-1-4-2-4";
var guitarIR = "Conic Long Echo Hall";

var seqIndex = 0;
var liberLive = {drums1: "6/24", drums2: "16/24", chord1: "1/0", chord2: "1/0"};
var lock = {counter: 0, up: 0, down: 0, button: -1};

var O = 12;
var C = 0, Cs = 1, Db = 1, D = 2, Ds = 3, Eb = 3, E = 4, F = 5, Fs = 6, Gb = 6, G = 7, Gs = 8, Ab = 8, A = 9, As = 10, Bb = 10, B = 11;
var chordChart = [
	[{base:  C +O*2, strings: [ 3,  3, 2, 0, 1, 0]}, {base:  C +O*2, strings: [-1,  3, 5, 5, 4, 3]}, {base:  C +O*2, strings: [-1, -1, 3, 0, 1, 3]}],
	[{base: Cs +O*2, strings: [-1, -1, 3, 1, 2, 1]}, {base: Cs +O*2, strings: [-1, -1, 2, 1, 2, 0]}, {base: Cs +O*2, strings: [-1, -1, 3, 3, 4, 1]}],
	[{base:  D +O*2, strings: [-1, -1, 0, 2, 3, 2]}, {base:  D +O*2, strings: [-1, -1, 0, 2, 3, 1]}, {base:  D +O*2, strings: [-1, -1, 0, 2, 3, 3]}],
	[{base: Ds +O*2, strings: [-1, -1, 5, 3, 4, 3]}, {base: Ds +O*2, strings: [-1, -1, 4, 3, 4, 2]}, {base: Ds +O*2, strings: [-1, -1, 1, 3, 4, 4]}],
	[{base:  E +O*2, strings: [ 0,  2, 2, 1, 0, 0]}, {base:  E +O*2, strings: [ 0,  2, 2, 0, 0, 0]}, {base:  E +O*2, strings: [ 0,  2, 2, 2, 0, 0]}],
	[{base:  F +O*2, strings: [ 1,  3, 3, 2, 1, 1]}, {base:  F +O*2, strings: [ 1,  3, 3, 1, 1, 1]}, {base:  F +O*2, strings: [-1, -1, 3, 3, 1, 1]}],
	[{base: Fs +O*2, strings: [ 2,  4, 4, 3, 2, 2]}, {base: Fs +O*2, strings: [ 2,  4, 4, 2, 2, 2]}, {base: Fs +O*2, strings: [-1, -1, 4, 4, 2, 2]}],
	[{base:  G +O*2, strings: [ 3,  2, 0, 0, 0, 3]}, {base:  G +O*2, strings: [ 3,  5, 5, 3, 3, 3]}, {base:  G +O*2, strings: [-1, -1, 0, 0, 1, 3]}],
	[{base: Gs +O*2, strings: [ 4,  6, 6, 5, 4, 4]}, {base: Gs +O*2, strings: [ 4,  6, 6, 4, 4, 4]}, {base: Gs +O*2, strings: [-1, -1, 1, 1, 2, 4]}],
	[{base:  A +O*2, strings: [-1,  0, 2, 2, 2, 0]}, {base:  A +O*2, strings: [-1,  0, 2, 2, 1, 0]}, {base:  A +O*2, strings: [-1,  0, 2, 2, 3, 0]}],
	[{base: As +O*2, strings: [-1,  1, 3, 3, 3, 1]}, {base: As +O*2, strings: [-1,  1, 3, 3, 2, 1]}, {base: As +O*2, strings: [-1, -1, 3, 3, 4, 1]}],
	[{base:  B +O*2, strings: [-1,  2, 4, 4, 4, 2]}, {base:  B +O*2, strings: [-1,  2, 4, 4, 3, 2]}, {base:  B +O*2, strings: [-1, -1, 4, 4, 5, 2]}]
]
			
var canvas = {
  context : null,
  gameWidth : null,
  gameHeight : null
};

var game = null;
var pad = {buttons: [], axis: []};
var textDecoder = null;

var idbKeyval = (function (exports) {
	'use strict';

	class Store {
		constructor(dbName = 'keyval-store', storeName = 'keyval') {
			this.storeName = storeName;
			this._dbp = new Promise((resolve, reject) => {
				const openreq = indexedDB.open(dbName, 1);
				openreq.onerror = () => reject(openreq.error);
				openreq.onsuccess = () => resolve(openreq.result);
				// First time setup: create an empty object store
				openreq.onupgradeneeded = () => {
					openreq.result.createObjectStore(storeName);
				};
			});
		}
		_withIDBStore(type, callback) {
			return this._dbp.then(db => new Promise((resolve, reject) => {
				const transaction = db.transaction(this.storeName, type);
				transaction.oncomplete = () => resolve();
				transaction.onabort = transaction.onerror = () => reject(transaction.error);
				callback(transaction.objectStore(this.storeName));
			}));
		}
	}
	let store;

	function getDefaultStore() {
		if (!store)
			store = new Store();
		return store;
	}

	function get(key, store = getDefaultStore()) {
		let req;
		return store._withIDBStore('readonly', store => {
			req = store.get(key);
		}).then(() => req.result);
	}

	function set(key, value, store = getDefaultStore()) {
		return store._withIDBStore('readwrite', store => {
			store.put(value, key);
		});
	}

	function del(key, store = getDefaultStore()) {
		return store._withIDBStore('readwrite', store => {
			store.delete(key);
		});
	}

	function clear(store = getDefaultStore()) {
		return store._withIDBStore('readwrite', store => {
			store.clear();
		});
	}

	function keys(store = getDefaultStore()) {
		let req;
		return store._withIDBStore('readwrite', store => {
			req = store.getAll();
		}).then(() => req.result);
	}

	exports.Store = Store;
	exports.get = get;
	exports.set = set;
	exports.del = del;
	exports.clear = clear;
	exports.keys = keys;

	return exports;

}({}));

window.loopCache = {};
window.requestAnimFrame = window.requestAnimationFrame;
window.addEventListener("load", onloadHandler);
window.addEventListener("beforeunload", () => {if (!registration) saveConfig(); });
window.addEventListener('message', messageHandler);
window.addEventListener('resize', (event) =>	{setup()});	

async function messageHandler(evt) {
	console.debug("messageHandler", evt.data);	

	playButton.innerText = "Wait..";
	playButton.style.setProperty("--accent-fill-rest", "red");

	const parts = JSON.parse(localStorage.getItem("collaboration_server.server_url")).split("/");	
	const url = "https://" + parts[2] + "/orinayo/cp2midi";	

	const response = await fetch(url, {method: "POST", body: evt.data});
	const blob = await response.blob();	
	const buffer = await blob.arrayBuffer();		
	const data = new Uint8Array(buffer);				
	songSequence = parseMidi(data, "playback.mid");	
	songSequence.name = "playback";		
	setupSongSequence();

	document.querySelector("#songSequence").selectedIndex = 1;
	document.querySelector("#chord_pro").click();
	document.querySelector("#show_lyrics").click();		

	pad.buttons[YELLOW] = true;	
	toggleStartStop();
}

function handleLiberLive(selected) {
	bluetoothEle.style.display = selected ? "" : "none";	
	let device;
	
	if (selected) 
	{	
		if (mobileCheck() || mobileViewpoint) {
			const mobileToolbar = document.getElementById("mobile-toolbar");
			mobileToolbar.append(bluetoothEle);			
		}
	
		bluetoothEle.addEventListener("click", async (evt) => {
			device = await navigator.bluetooth.requestDevice({filters: [{services: ["000000ff-0000-1000-8000-00805f9b34fb"]}]});

			if (device) {
				console.debug("found liberlive", device);	
				
				if (bluetoothGuitar) {
					await device.forget();	
					bluetoothGuitar	= null;
					console.debug("forget liberlive", device);
				} else {
					bluetoothGuitar = device;
				}
			}
		});
	}
}

function handleLavaGenie(selected) {
	bluetoothEle.style.display = selected ? "" : "none";	
	let device;
	
	if (selected) 
	{
		if (mobileCheck() || mobileViewpoint) {
			const mobileToolbar = document.getElementById("mobile-toolbar");
			mobileToolbar.append(bluetoothEle);			
		}
		
		bluetoothEle.addEventListener("click", async (evt) => {			
		
			device = await navigator.bluetooth.requestDevice({		
				filters: [{
				services: ["0000fee0-0000-1000-8000-00805f9b34fb"],		
			}]});

			if (device) {
				console.debug("found lavagenie", device);				
				
				if (bluetoothGuitar) {			
					await device.forget();
					bluetoothGuitar	= null;				
					console.debug("forget lavagenie", device);				
				} else {
					bluetoothGuitar = device;
				}				
			}
		});
	}
}

function handleRecordSong(selected) {
	const recordSong = document.querySelector("#record_song");
	recordSong.style.display = selected ? "" : "none";
	
	recordSong.addEventListener("click", async (evt) => {
		console.debug("Record clicked", recordMode);
		
		if (playButton.innerHTML == "Play") {
			recorderFilename = prompt("Enter File name");
			
			if (recorderFilename) {
				console.debug("Record setup");
				recordMode = true;
			}
		}

	});		
}

function stopRecording() {
	console.debug('stopRecording');	
	
	recordMode = false;	
	mediaRecorder.stop();
}

function startRecording() {
	console.debug('startRecording');

	let blobType = "audio/webm; codecs=opus";
	let fileExtn = ".ogg";

	const gain = audioContext.createGain();	
	recorderDestination = audioContext.createMediaStreamDestination();	
	gain.connect(recorderDestination);	
	
	if (window.pedalOutput) pedalOutput.connect(recorderDestination);	
		
	if (lyricsCanvas.style.display != "none") {	
		recorderDestination.stream.addTrack(lyricsCanvas.captureStream().getVideoTracks()[0]);	
		blobType = 'video/mp4; codecs=mp4a.40.2"';
		fileExtn = ".mp4";		
	}	
	
	mediaRecorder = new MediaRecorder(recorderDestination.stream, { mimeType: blobType });	
	
	mediaRecorder.addEventListener('dataavailable', e => { 
		console.debug("startRecording - dataavailable", e.data);
		
		const blob = new Blob([e.data], { type: blobType });		
        const anchor = document.createElement('a');
        anchor.href = window.URL.createObjectURL(blob);
        anchor.style = "display: none;";
        anchor.download = recorderFilename + fileExtn;
        document.body.appendChild(anchor);
        anchor.click();
        window.URL.revokeObjectURL(anchor.href);
		
		recorderFilename = null;	
		recorderDestination	= null;
	})	
	
	mediaRecorder.addEventListener('onstop', e => { 
		 console.debug("startRecording - onstop", e.data);
	})
	
	mediaRecorder.start();
}

async function onLavaGenieClick() {
	console.debug('onLavaGenieClick');		
	
	let ready, device;
	const devices = await navigator.bluetooth.getDevices();

	if (devices.length > 0) {
		device = devices[0];
		bluetoothGuitar = device;
						
		device.addEventListener('advertisementreceived', (event) => {	
			//console.debug('Bluetooth device advert', event);
			
			if (!ready) {
				ready = true;
				textDecoder = new TextDecoder("utf-8"); 
				doLavaGenieSetup(device);
			}
		});
		
		await device.watchAdvertisements();		
		
	} else {
		device = await navigator.bluetooth.requestDevice({filters: [{services: ["0000fee0-0000-1000-8000-00805f9b34fb"]}]});

		if (device) {
			bluetoothGuitar = device;
			textDecoder = new TextDecoder("utf-8"); 			
			doLavaGenieSetup(device);		
		}
	}
	
	console.debug('onLavaGenieClick', device);		
}

async function onLiberLiveClick() {
	console.debug('onLiberLiveClick');	
	
	//00002902-0000-1000-8000-00805f9b34fb - Client Characteristic Configuration descriptor
	//000000ff-0000-1000-8000-00805f9b34fb	
	//0000FF03-0000-1000-8000-00805F9B34FB
	//0000FF02-0000-1000-8000-00805F9B34FB
	//0000FF01-0000-1000-8000-00805F9B34FB
	
	//000000ff-0000-1000-8000-00805f9b34fb, - Primary Service UUID
	//00001800-0000-1000-8000-00805f9b34fb, - Generic Access UUID
	//00001801-0000-1000-8000-00805f9b34fb	- Generic Attribute UUID
	
	let ready, device;
	const devices = await navigator.bluetooth.getDevices();
	console.debug('onLiberLiveClick - devices', devices);

	if (devices.length > 0) {
		device = devices[0];
		bluetoothGuitar = device;		
		
		device.addEventListener('advertisementreceived', (event) => {	
			console.debug('Bluetooth device advert', event);
			
			if (!ready) {
				ready = true;
				textDecoder = new TextDecoder("utf-8"); 
				doLiberLiveSetup(device);
			}
		});
		
		await device.watchAdvertisements();		
		
	} else {
		device = await navigator.bluetooth.requestDevice({filters: [{services: ["000000ff-0000-1000-8000-00805f9b34fb"]}]});

		if (device) {
			bluetoothGuitar = device;			
			textDecoder = new TextDecoder("utf-8"); 			
			doLiberLiveSetup(device);		
		}
	}
	
	console.debug('onLiberLiveClick', device);	
}

async function doLavaGenieSetup(device) {
	console.debug('doLavaGenieSetup', device);	
	
	if (device) {
		bluetoothEle.style.display = "none";		
		const ui = document.getElementById("lyrics");

		device.addEventListener('gattserverdisconnected', (event) => {
			console.debug('Bluetooth device ' + device.name + ' is disconnected.', event);
			if (_converse.api.connection) _converse.api.disconnect();
		});
		
		const handlers = {};		
		const server = await device.gatt.connect();
		console.debug('GATT server', server);

		const services = await server.getPrimaryServices();
		
		for (let service of services) {
			console.debug("GATT service", service.uuid, service.isPrimary, service);
			const characteristics = await service.getCharacteristics();
			
			for (let characteristic of characteristics) 
			{
				try {				
					const descriptors = await characteristic.getDescriptors();
				
					for (let descriptor of descriptors) {
						const value = await descriptor.readValue();
						console.debug('Found Descriptor', descriptor.uuid, value);				
					}
				} catch (e) {

				}

				console.debug('Found Characteristic', characteristic.uuid, characteristic.properties, service.uuid);										

				if (characteristic.properties.read) {
					handlers[characteristic.uuid] = characteristic;	
					
					handlers[characteristic.uuid].addEventListener('characteristicvaluechanged',  (evt) => {
						const {buffer}  = evt.target.value;
						const eventData = new Uint8Array(buffer);					
						
						for (let i in eventData) console.debug("Read", eventData.length, i + ":" + eventData[i]);						
					});					

				}
				else
					
				if (characteristic.properties.writeWithoutResponse) {
					writeCharacteristic = characteristic;	
					// TODO
					//setTimeout(setLiberLiveChordMappings);
					setTimeout(setLavaGenieSettings, 1000);
				}
				else
					
				if (characteristic.properties.notify) {
					console.debug('Setup Notifier', characteristic.uuid);					
					handlers[characteristic.uuid] = await characteristic.startNotifications();
					
					let cannotFire = true;
					let haveFired = false;					
					
					if (!game) {
						setup();
						resetGuitarHero();
					}	

					document.getElementById("extern-device").innerHTML = "Lava Genie Guitar";
					document.getElementById("lavagenie").style.display = "";
					
					handlers[characteristic.uuid].addEventListener('characteristicvaluechanged', (evt) => {
						const {buffer}  = evt.target.value;
						const eventData = new Uint8Array(buffer);
						
						for (let i in eventData) console.debug("Event", eventData.length, i + ":" + eventData[i]);	

						let chordSelected = false;
						let paddleMoved = false;
						resetGuitarHero();
						
						if (eventData[0] == 202 && eventData[1] == 2 && eventData[2] == 101) { // control buttons
								
							if (eventData[3] == 2 && eventData[4] == 103) {	

								if (!styleStarted) {
									pad.buttons[LOGO] = true;		// START
								} else {
									pad.buttons[STARPOWER] = true;	// next style
								}
							}
							else
								
							if (eventData[3] == 0 && eventData[4] == 101) {	
								if (styleStarted) {
									pad.buttons[LOGO] = true;		// STOP
								}
							}							
	
						}
						else

						if (eventData[0] == 202 && eventData[1] == 2 && eventData[2] == 92) { // chord key press	
						
							if (eventData[3] == 25 && eventData[4] == 69) {
								pad.buttons[YELLOW] = true;		// 7b			
								pad.buttons[RED] = true;								
								chordSelected = true;
							}
							else
								
							if (eventData[3] == 20 && eventData[4] == 72) {
								pad.buttons[YELLOW] = true;		// 5b			
								pad.buttons[GREEN] = true;								
								pad.buttons[RED] = true;							
								chordSelected = true;
							}
							else

							if (eventData[3] == 17 && eventData[4] == 77) {
								pad.buttons[YELLOW] = true;		// 7b			
								pad.buttons[RED] = true;								
								chordSelected = true;
							}
							else
								
							if (eventData[3] == 52 && eventData[4] == 104) {
								pad.buttons[RED] = true;		// 6m
								chordSelected = true;
							}
							else

							if (eventData[3] == 57 && eventData[4] == 101) {
								pad.buttons[RED] = true;		// 6
								pad.buttons[YELLOW] = true;
								pad.buttons[BLUE] = true;							
								chordSelected = true;
							}
							else
								
							if (eventData[3] == 49 && eventData[4] == 109) {
								pad.buttons[RED] = true;		// 6
								pad.buttons[YELLOW] = true;
								pad.buttons[BLUE] = true;							
								chordSelected = true;
							}
							else
								
							if (eventData[3] == 84 && eventData[4] == 8) {
								pad.buttons[GREEN] = true;		// 5								
								chordSelected = true;
							}
							else
								
							if (eventData[3] == 81 && eventData[4] == 13) {
								pad.buttons[GREEN] = true;		// 5sus							
								pad.buttons[YELLOW] = true;						
								chordSelected = true;
							}
							else
								
							if (eventData[3] == 89 && eventData[4] == 5) {
								pad.buttons[GREEN] = true;		// 5/7
								pad.buttons[RED] = true;							
								chordSelected = true;
							}													
							else
								
							if (eventData[3] == 97 && eventData[4] == 61) {
								pad.buttons[YELLOW] = true;		// 1
								chordSelected = true;
							}
							else
								
							if (eventData[3] == 100 && eventData[4] == 56) {
								pad.buttons[YELLOW] = true;		// 1sus
								pad.buttons[ORANGE] = true;							
								chordSelected = true;
							}
							else

							if (eventData[3] == 105 && eventData[4] == 53) {
								pad.buttons[YELLOW] = true;		// 1/3
								pad.buttons[BLUE] = true;							
								chordSelected = true;
							}
							else						
								
							if (eventData[3] == 129 && eventData[4] == 221) {
								pad.buttons[ORANGE] = true;		// 4								
								chordSelected = true;
							}
							else
								
							if (eventData[3] == 132 && eventData[4] == 216) {
								pad.buttons[ORANGE] = true;		// 3b
								pad.buttons[BLUE] = true;		
								pad.buttons[RED] = true;							
								chordSelected = true;
							}
							else

							if (eventData[3] == 137 && eventData[4] == 213) {
								pad.buttons[ORANGE] = true;		// 4/6
								pad.buttons[BLUE] = true;							
								chordSelected = true;
							}
							else						
								
							if (eventData[3] == 164 && eventData[4] == 248) {
								pad.buttons[BLUE] = true;		// 2m
								chordSelected = true;
							}
							else
								
							if (eventData[3] == 161 && eventData[4] == 253) {
								pad.buttons[BLUE] = true;		// 2
								pad.buttons[RED] = true;							
								chordSelected = true;
							}
							else
								
							if (eventData[3] == 169 && eventData[4] == 245) {
								pad.buttons[ORANGE] = true;		// 4m
								pad.buttons[RED] = true;							
								chordSelected = true;
							}	
							else
								
							if (eventData[3] == 199 && eventData[4] == 155) {
								pad.buttons[GREEN] = true;		// 3m
								pad.buttons[BLUE] = true;								
								chordSelected = true;
							}
							else
								
							if (eventData[3] == 196 && eventData[4] == 152) {
								pad.buttons[GREEN] = true;		// 3
								pad.buttons[YELLOW] = true;								
								pad.buttons[BLUE] = true;								
								chordSelected = true;
							}						
							else
								
							if (eventData[3] == 201 && eventData[4] == 149) {
								pad.buttons[GREEN] = true;		// 5m
								pad.buttons[ORANGE] = true;															
								chordSelected = true;
							} 		
						}
				
						if (chordSelected) { 
							pad.axis[STRUM] = autoStrumUpDown();								
						}

						if (pad.buttons[LOGO]) {
							toggleStartStop();
						} else {
							updateCanvas();	

							if (pad.axis[STRUM] == STRUM_UP || pad.axis[STRUM] == STRUM_DOWN || pad.buttons[START] || pad.buttons[STARPOWER]) {			
								doChord();				
							}	
						}												
					});					
				}
			}
		}
	}						
}

async function setLavaGenieSettings() {
	// bluetooth.addr==dd:22:33:44:67:fc
	// bluetooth.addr==dd:22:33:44:67:fc && btatt.opcode.method==0x12
	
	/*
	// Startup 
	writeGenie([0xac, 0x2, 0xe6, 0x1, 0xe7]);
	writeGenie([0xac, 0x2, 0x4e, 0x52, 0x1c]);
	writeGenie([0xac, 0x2, 0x4e, 0x4a, 0x4]);
	writeGenie([0xac, 0x2, 0x4e, 0x57, 0x19]);
	writeGenie([0xac, 0x2, 0x4e, 0x59, 0x17]);
	writeGenie([0xac, 0x2, 0x4e, 0x5a, 0x14]);
	writeGenie([0xac, 0x2, 0x44, 0x0, 0x44]);
	writeGenie([0xac, 0x2, 0x44, 0x1, 0x45]);
	writeGenie([0xac, 0x2, 0x44, 0x2, 0x46]);
	writeGenie([0xac, 0x2, 0x44, 0x3, 0x47]);
	writeGenie([0xac, 0x2, 0x44, 0x4, 0x40]);
	writeGenie([0xac, 0x2, 0x44, 0x5, 0x41]);
	writeGenie([0xac, 0x1, 0x46, 0x46]);
	writeGenie([0xac, 0x2, 0x4e, 0x63, 0x2d]);
	writeGenie([0xac, 0x2, 0x4e, 0x4c, 0x2]);
	writeGenie([0xac, 0x2, 0x4e, 0x49, 0x7]);
	writeGenie([0xac, 0x2, 0x4e, 0x4f, 0x1]);
	writeGenie([0xac, 0x1, 0xe2, 0xe2]);
	writeGenie([0xac, 0x2, 0x4e, 0xe8, 0xa6]);
	writeGenie([0xac, 0x2, 0x4e, 0x65, 0x2b]);
	writeGenie([0xac, 0x2, 0x4e, 0x6a, 0x24]);
	writeGenie([0xac, 0x2, 0x4e, 0xe9, 0xa7]);
	writeGenie([0xac, 0x4, 0xee, 0x0, 0x0, 0x0, 0xee]);
	writeGenie([0xad, 0x4, 0xee, 0x0, 0x0, 0x0, 0xee]);

	// song mode
	writeGenie([0xac, 0x2, 0xe6, 0x0, 0xe6]);
	writeGenie([0xad, 0x1a, 0x70, 0x7, 0x1, 0xfb, 0x1, 0xf0, 0x1, 0xef, 0x1, 0xee, 0x1, 0xea, 0x1, 0xe9, 0x1, 0xe8, 0x1, 0xe7, 0x1, 0xe4, 0x1, 0xe3, 0x1, 0xe2, 0x1, 0xe1, 0x75]);
	writeGenie([0xac, 0x2, 0x65, 0x0, 0x65]);
	writeGenie([0xad, 0x4, 0x70, 0x7, 0x1, 0xdc, 0xaa]);
	*/

	// enable key press events
	writeGenie([0xac, 0x2, 0x5d, 0x1, 0x5c]);

	// mapping
	//writeGenie([0xac, 0x2d, 0x67, 0x16, 0x4c, 0x11, 0x34, 0x54, 0x61, 0x81, 0xa4, 0xc7, 0x19, 0x39, 0x59, 0x69, 0x8b, 0xa9, 0xb1, 0x14, 0x31, 0x51, 0x64, 0x84, 0xa1, 0xc4, 0x8, 0x63, 0x11, 0x34, 0x54, 0x61, 0x81, 0xa4, 0xc7, 0x2, 0x49, 0x0, 0x2, 0x4a, 0x0, 0x2, 0x52, 0x4a, 0x2, 0x57, 0x1, 0x69]);

	// key 1 LED 
	//writeGenie([0xac, 0x6, 0x5c, 0x11, 0x1, 0x0, 0x0, 0x2, 0x4e]);
}

function writeGenie(bytes) {
	setTimeout(async () => {
		let dataView = new Uint8Array(bytes);	
		resp = await writeCharacteristic.writeValue(dataView);
		console.debug("writeGenie", bytes, resp);		
	}, lavaGenieWaitout);
	
	lavaGenieWaitout = lavaGenieWaitout + 300;
}

async function setLiberLiveChordMappings() {
	const hdr = packString("b11e");
	const offset = parseInt(keySign.value);	
	console.debug("setLiberLiveChordMappings", offset, hdr, writeCharacteristic);
	if (!writeCharacteristic) return;
	
	const keys = [
		{level: 8, type: 0},	// Ab	
		{level: 9, type: 3},	// Am7	
		{level: 7, type: 5},	// Gadd9	(G/B)	
		{level: 0, type: 5},	// Cadd9	(C/E)
		{level: 5, type: 5},	// Fadd9	(F/A)
		{level: 5, type: 1},	// Fm	
		{level: 7, type: 1},	// Gm		
		
		{level: 10, type: 0},	// Bb				
		{level: 9, type: 1},	// Am
		{level: 7, type: 0},	// G
		{level: 0, type: 0},	// C		
		{level: 5, type: 0},	// F			
		{level: 2, type: 1},	// Dm
		{level: 4, type: 1},	// Em	
		
		{level: 11, type: 0},	// B
		{level: 9, type: 0},	// A	
		{level: 7, type: 0},	// G (sus)
		{level: 0, type: 0},	// C (sus)		
		{level: 3, type: 0},	// Eb
		{level: 2, type: 0},	// D			
		{level: 4, type: 0},	// E		
	];
	
	const dataView = new Uint8Array(new ArrayBuffer(26));
	
	dataView[0]  = hdr[0];
	dataView[1]  = hdr[1];	
	dataView[2]  = 31;
	dataView[3]  = 21;
	dataView[4]  = 0;	

	let i = 0;
	
	for (let key of keys) {
		let keyVal = offset + key.level;
		if (keyVal > 11) keyVal = 0;
		if (keyVal < 0) keyVal = 11;
		
		dataView[5+i] = packString(parseChar(keyVal) + parseChar(key.type));
		i++;
	}
	
	const resp = await writeCharacteristic.writeValue(dataView);
	console.debug("setLiberLiveChordMappings", resp);	
}

async function setLiberLiveDeviceSettings() {
	const hdr = packString("b11e");	
	console.debug("setLiberLiveDeviceSettings", hdr, writeCharacteristic);	
	const dataView = new Uint8Array(new ArrayBuffer(17));

	let key = 0;
	if (keyChange == 2) key = 1;
	if (keyChange == 4) key = 2;
	if (keyChange == 5) key = 3;
	if (keyChange == 7) key = 4;
	if (keyChange == 9) key = 5;
	if (keyChange == 11) key = 6;
	
	dataView[0]  = hdr[0];
	dataView[1]  = hdr[1];	
	dataView[2]  = 35;
	dataView[3]  = 12;
	dataView[4]  = 0;
	dataView[5]  = 255;			// Song key. Don't change. Let liberlive control and decide
	dataView[6]  = tempo;
	dataView[7]  = 0;
	dataView[8]  = liberLive.drums1.split("/")[0];
	dataView[9]  = liberLive.drums1.split("/")[1];
	dataView[10] = liberLive.drums2.split("/")[0];
	dataView[11] = liberLive.drums2.split("/")[1];
	dataView[12] = liberLive.chord1.split("/")[1];
	dataView[13] = liberLive.chord1.split("/")[0];
	dataView[14] = liberLive.chord2.split("/")[1];
	dataView[15] = liberLive.chord2.split("/")[0];	
	dataView[17] = 0;	
	
	const resp = await writeCharacteristic.writeValue(dataView);
	console.debug("setLiberLiveDeviceSettings", resp);
}

function parseChar(integer) {
	return integer <= 9 ? "" + integer : integer == 10 ? "A" : integer == 11 ? "B" : integer == 12 ? "C" : integer == 13 ? "D" : integer == 14 ? "E" : integer == 15 ? "F" : "0";
}

function packString(str) {
	if (str == null || str == "") {
		return null;
	}
	
	if (str.length == 1) {
		str = "0" + str;
	}
	
	const upperCase = str.toUpperCase();
	const length = upperCase.length / 2;
	const charArray = Array.from(upperCase);
	const bArr = new Uint8Array(new ArrayBuffer(length))
	
	for (let i9 = 0; i9 < length; i9++) {
		const i10 = i9 * 2;
		bArr[i9] = (("0123456789ABCDEF".indexOf(charArray[i10 + 1])) | (("0123456789ABCDEF".indexOf(charArray[i10])) << 4));
	}
	return bArr;
}

async function fetchStreams() {
	console.debug("fetchStreams", _converse);

	const streamSong = document.querySelector("#stream_song");	
	activeStreams = document.querySelector("#activeStreams");	
	activeStreams.options[0] = new Option("NOT USED", "activeStreams", false, false);		

	activeStreams.addEventListener("click", async () => {
		console.debug("fetchStreams refresh streams");
		
		const res = await _converse.api.sendIQ(converse.env.$iq({type: 'get', to: _converse.api.domain}).c('whep', {xmlns: 'urn:xmpp:whep:0'}));
		console.debug('fetchStreams response', res);						
		const items = res.querySelectorAll('item');
		const temp = activeStreams.selectedIndex;
		activeStreams.innerHTML = "";
		activeStreams.options[0] = new Option("NOT USED", "activeStreams", false, false);					
		let count = 1;
		
		for (item of items) {		
			const id = item.getAttribute("id");
			activeStreams.options[count++] = new Option(id, id, false, false);	
		}
		
		activeStreams.selectedIndex = temp;
	});
	
	activeStreams.addEventListener("change", async function() {
		console.debug("fetchStreams selected stream", activeStreams.value);
		
		if ("activeStreams" == activeStreams.value) {
			if (watchConnection) {			
				watchConnection.close();
				watchConnection = null;
				
				const streamStarted = streamSong.innerText == "Stop Stream";
				streamSong.style.setProperty("--accent-fill-rest", streamStarted ? "red" : "green");					
			}
			
		} else {
			watchConnection = new RTCPeerConnection()
			watchConnection.addTransceiver('audio', { direction: 'recvonly' })

			watchConnection.ontrack = function (event) {
				document.getElementById('audioPlayer').srcObject = event.streams[0]
			}

			watchConnection.oniceconnectionstatechange = () => {
				console.debug("fetchStreams status", watchConnection.iceConnectionState);
				streamSong.style.setProperty("--accent-fill-rest", "purple");			
			}

			watchConnection.createOffer().then(async (offer) => {
				watchConnection.setLocalDescription(offer);
				console.debug('fetchStreams offer', offer.sdp);					
				
				const res = await _converse.api.sendIQ(converse.env.$iq({type: 'set', to: _converse.api.domain}).c('whep', {id: activeStreams.value, xmlns: 'urn:xmpp:whep:0'}).c('sdp', offer.sdp)); 
				console.debug('fetchStreams whep set response', res);						
				const answer = res.querySelector('sdp')?.innerHTML;
				const json = res.querySelector('json')?.innerHTML;
				console.debug('fetchStreams whep answer', answer, json);				
				
				if (answer) {
					watchConnection.setRemoteDescription({sdp: answer,  type: 'answer'});	
				}

				if (json) {
					const metaData = JSON.parse(json);
					setTempo(metaData.tempo);
					keyChange = metaData.keyChange;
					dokeyChange();
				}
			})		
		}
	});	
	
	const res = await _converse.api.sendIQ(converse.env.$iq({type: 'get', to: _converse.api.domain}).c('whep', {xmlns: 'urn:xmpp:whep:0'})); 
	console.debug('fetchStreams response', res);						
	const items = res.querySelectorAll('item');
	let count = 1;
	
	for (item of items) {		
		const id = item.getAttribute("id");
		activeStreams.options[count++] = new Option(id, id, false, false);	
	}
}

async function handleMediaStream(started) {
	console.debug("handleMediaStream", started);
		
	if (!started) {
		const gain = audioContext.createGain();	
		streamDestination = audioContext.createMediaStreamDestination();	
		gain.connect(streamDestination);	
		
		if (window.pedalOutput) pedalOutput.connect(streamDestination);	

		let mediaOptions = {audio: true, video: false}
		
		publishConnection = new RTCPeerConnection();

		publishConnection.oniceconnectionstatechange = () => {
			console.debug("handleMediaStream - status", publishConnection.iceConnectionState);
		}
		
		streamDestination.stream.getTracks().forEach(t => {
			if (t.kind === 'audio') {
				console.debug('handleMediaStream track', t.kind, t.id, t);				
				publishConnection.addTransceiver(t, {direction: 'sendonly'})
			}
		})		
		
		const json = {tempo, keyChange, name: arrSequence?.name};
		const offer = await publishConnection.createOffer();
		publishConnection.setLocalDescription(offer);
		console.debug('handleMediaStream offer', offer.sdp);	
		
		const res = await _converse.api.sendIQ(converse.env.$iq({type: 'set', to: _converse.api.domain}).c('whip', {xmlns: 'urn:xmpp:whip:0'}).c('sdp').t(offer.sdp).up().c('json', {xmlns: 'urn:xmpp:json:0'}).t(JSON.stringify(json)));
		const answer = res.querySelector('sdp').innerHTML;
		publishConnection.setRemoteDescription({sdp: answer,  type: 'answer'});	
		console.debug('handleMediaStream answer', answer);			
		
	} else {
		if (publishConnection) {			
			publishConnection.close();
			publishConnection = null;
		}
	}		
}

function startXMPP() {
	let conURI = localStorage.getItem("collaboration_server.server_url");
	let domain = localStorage.getItem("collaboration_server.domain");
	let username = localStorage.getItem("collaboration_server.username");
	let password = localStorage.getItem("collaboration_server.password");
	let roomName = localStorage.getItem("collaboration_server.room");	
	
	console.debug("startXMPP", conURI, username, domain);
	if (isNull(username) || isNull(password )|| isNull(conURI) || isNull(domain) || isNull(roomName)) return;
	
	username = JSON.parse(username);
	password = JSON.parse(password);	
	conURI = JSON.parse(conURI);
	domain = JSON.parse(domain);
	roomName = JSON.parse(roomName);
	
	const streamSong = document.querySelector("#stream_song");	
	const streamsList = document.querySelector("#streams_list");
	const toggleChat = document.querySelector("#toggle_chat");	
	const chordPro = document.querySelector("#chord_pro");		
	const chordpro = document.querySelector("#chordpro");		
	
	streamSong.addEventListener("click", async (evt) => {
		const streamStarted = streamSong.innerText == "Stop Stream";
		console.debug("Stream clicked", streamStarted);
		streamSong.innerText = streamStarted ? "Start Stream" : "Stop Stream";		
		await handleMediaStream(streamStarted);
		streamSong.style.setProperty("--accent-fill-rest", !streamStarted ? "red" : "green");			
	});	


	const MUC_AFFILIATION_CHANGES_LIST = ['owner', 'admin', 'member', 'exowner', 'exadmin', 'exmember', 'exoutcast']
	const MUC_ROLE_CHANGES_LIST = ['op', 'deop', 'voice', 'mute'];
	const MUC_TRAFFIC_STATES_LIST = ['entered', 'exited'];

	const MUC_INFO_CODES = {
		'visibility_changes': ['100', '102', '103', '172', '173', '174'],
		'self': ['110'],
		'non_privacy_changes': ['104', '201'],
		'muc_logging_changes': ['170', '171'],
		'nickname_changes': ['210', '303'],
		'disconnect_messages': ['301', '307', '321', '322', '332', '333'],
		'affiliation_changes': [MUC_AFFILIATION_CHANGES_LIST],
		'join_leave_events': [MUC_TRAFFIC_STATES_LIST],
		'role_changes': [MUC_ROLE_CHANGES_LIST],
	};

	const mucShowInfoMessages = [
		MUC_INFO_CODES.visibility_changes,
		MUC_INFO_CODES.self,
		MUC_INFO_CODES.non_privacy_changes,
		MUC_INFO_CODES.muc_logging_changes,
		MUC_INFO_CODES.nickname_changes,
		MUC_INFO_CODES.disconnect_messages,
		MUC_INFO_CODES.affiliation_changes,
		MUC_INFO_CODES.join_leave_events,
		MUC_INFO_CODES.role_changes,
	]	
	
	
	converse.plugins.add("orinayo", {
		dependencies: [],

		initialize: function () {
			console.debug("orinayo plugin initialize");				
			_converse = this._converse;
			const __ = _converse.__;
			const html = converse.env.html;
			const Strophe = converse.env.Strophe;
			
			_converse.api.listen.on('parseMessage', (stanza, attrs) => {
				return parseStanza(stanza, attrs);
			});	
			
			_converse.api.listen.on('parseMUCMessage', (stanza, attrs) => {
				return parseStanza(stanza, attrs);
			});				

			_converse.api.listen.on('getToolbarButtons', function(toolbar_el, buttons)	{
				let color = "fill:var(--chat-toolbar-btn-color);";
				
				if (toolbar_el.model.get("type") !== "chatbox") {
					color = "fill:var(--muc-toolbar-btn-color);";
					
				} else {				
					buttons.push(html`
						<button class="toolbar-utilities-hide" title="${__('Return to group chat')}" @click=${hideChat}/>
							<converse-icon style="width:18px; height:18px; ${color}" class="fa fa-minus" size="1em"></converse-icon>
						</button>
					`);						
				}
							
				buttons.push(html`
					<button class="toolbar-utilities-scroll" title="${__('Scroll to the bottom')}" @click=${scrollToBottom}/>
						<converse-icon style="width:18px; height:18px; ${color}" class="fa fa-angle-double-down" size="1em"></converse-icon>
					</button>
				`);

				buttons.push(html`
					<button class="toolbar-utilities-thrash" title="${__('Trash chat history')}" @click=${trashHistory}/>
						<converse-icon style="width:18px; height:18px; ${color}" class="far fa-trash-alt" size="1em"></converse-icon>
					</button>
				`);

				buttons.push(html`
					<button class="toolbar-utilities-refresh" title="${__('Refresh chat history')}" @click=${refreshHistory}/>
						<converse-icon style="width:18px; height:18px; ${color}" class="fa fa-sync" size="1em"></converse-icon>
					</button>
				`);			

				return buttons;
			});	

			_converse.api.listen.on('connected', function() {	
				streamSong.style.display = "";
				streamsList.style.display = "";
				toggleChat.style.display = "";
				
				const parts = conURI.split("/");
				chordpro.src = "https://" + parts[2] + "/orinayo/chordpro-pdf-online/";					
				chordPro.style.display = "";
				
				streamSong.style.setProperty("--accent-fill-rest", "green");
				setTimeout(fetchStreams);	
			});
			
		}
	});	

	whitelistedPlugins.push("orinayo");	
	whitelistedPlugins.push("screencast");		
	whitelistedPlugins.push("voicechat");	

		
	const options = {
		persistent_store: "localStorage", // TODO location.origin.startsWith("chrome-extension") ? 'BrowserExtLocal' : 'IndexedDB', 				
		discover_connection_methods: false,
		clear_cache_on_logout: true,
		assets_path: "./dist/",	
		sounds_path: "./dist/sounds/",	
		notification_icon: "./assets/icon_128.png",
		allow_logout: false, 
		allow_muc_invitations: false,                                          
		allow_contact_requests: false, 
		authentication: 'login',
		auto_reconnect: true,			
		auto_login: true,
		auto_join_rooms: [
			roomName + '@conference.' + domain,
		],
		websocket_url: conURI, 
		jid: username + "@" + domain,
		nickname: username,
		password: password,
		keepalive: true,
		hide_muc_server: true, 
		play_sounds: false,
		show_controlbox_by_default: false,	
		show_desktop_notifications: true,	
		hide_offline_users: true,		
		strict_plugin_dependencies: false,	
		singleton: true,
		view_mode: 'embedded',	
		theme: 'dracula',
		muc_show_logs_before_join: true,	
		muc_show_info_messages: [], //mucShowInfoMessages,
		loglevel: 'info',
		whitelisted_plugins: whitelistedPlugins					
	};
	console.debug("startXMPP - converse options", options);
	converse.initialize(options);	
}

function parseStanza(stanza, attrs) {
	console.debug("parseStanza", stanza, attrs);	
    const json = stanza.querySelector('json');	
		
    if (json) {	
		const metaData = JSON.parse(json.innerHTML);
		console.debug("parseStanza song metadata", metaData);	
		/*
			{
				"bassNote":30,"rootNote":54,"firstNote":50,"thirdNote":54,"fifthNote":57,"displaySymbol":"Dmaj/F#"
			}
		*/
		
		displayChordAndLyrics(metaData.displaySymbol, " ");
    }
	
	return attrs;
}

async function getSelectedChatBox() {
	var models = await _converse.api.chatboxes.get(); //_converse.chatboxes.models;
	console.debug("getSelectedChatBox", models);

	for (var i=0; i<models.length; i++) 
	{
		if (models[i].get('type') === "chatbox" && !models[i].get('hidden')) {
			return models[i].get('jid');
		}
	}
	return null;
}

async function doLiberLiveSetup(device) {
	console.debug('doLiberLiveSetup', device);

	if (device) {
		bluetoothEle.style.display = "none";
		const ui = document.getElementById("lyrics");

		device.addEventListener('gattserverdisconnected', (event) => {
			console.debug('Bluetooth device ' + device.name + ' is disconnected.', event);
			if (_converse.api.connection) _converse.api.disconnect();
		});
		
		const server = await device.gatt.connect();
		console.debug('GATT server', server);

		const services = await server.getPrimaryServices();
		
		for (let service of services) {
			const characteristics = await service.getCharacteristics();
			
			for (let characteristic of characteristics) 
			{
				try {				
					const descriptors = await characteristic.getDescriptors();
				
					for (let descriptor of descriptors) {
						const value = await descriptor.readValue();
						console.debug('Found Characteristic', service.uuid, characteristic.uuid, characteristic.properties.notify, descriptor.uuid, value);				
					}
				} catch (e) {

				}

				console.debug('Found Characteristic', service.uuid, characteristic.uuid, characteristic.properties.notify);										
				
				if (characteristic.properties.write) {
					writeCharacteristic = characteristic;	
					setTimeout(setLiberLiveChordMappings);
					setTimeout(setLiberLiveDeviceSettings, 1000);
				}
				else
					
				if (characteristic.properties.notify) {
					const handler = await characteristic.startNotifications();
					let cannotFire = true;
					let haveFired = false;				
					
					if (!game) {
						setup();
						resetGuitarHero();
					}	
					
					document.getElementById("liberlive").style.display = "";						

					if (mobileCheck() || mobileViewpoint) {
						document.getElementById("extern-device").innerHTML = "LiberLive C1 Guitar";						
						const controlDevice = document.getElementById("control-device");
						controlDevice.append(document.getElementById("ll-chord1"));			
						controlDevice.append(document.getElementById("ll-drums1"));	
						controlDevice.append(document.getElementById("ll-chord2"));	
						controlDevice.append(document.getElementById("ll-drums2"));	
						controlDevice.append(document.getElementById("ll-keysign"));							
					}				
					
					handler.addEventListener('characteristicvaluechanged', (evt) => {
						const {buffer}  = evt.target.value;
						const eventData = new Uint8Array(buffer);					
						
						if (eventData.length != 14 || (eventData.length == 14 && eventData[9] != 49 && eventData[9] != 50 && eventData[10] != 49 && eventData[10] != 50)) {
							//for (let i in eventData) console.debug("Event", eventData.length, i + ":" + eventData[i]);						
						}
						
						if (eventData[7]) {
							//tempo = eventData[7];
							//tempoDiv.innerHTML = tempo;								
							showVol.innerHTML = "Vol: " + Math.trunc(guitarVolume * 100); 							
						}
						
						/*let html = "<table><tr>";
						
						for (let i in eventData) {
							html += "<td>&nbsp;" + i + "&nbsp;</td>";
						}
						
						html += "</tr><tr>";
						
						for (let byt of eventData) {
							html += "<td>&nbsp;" + byt + "&nbsp;</td>";
						}						
						
						html += "</tr></table>"
						ui.innerHTML = html;*/				
						
						if ( eventData[5] == 0) {	// paddle is neutral
							const oldKey = keyChange;
							const offset = parseInt(keySign.value);
							
							if (eventData[1] == 0) keyChange = 0;	// C
							if (eventData[1] == 1) keyChange = 2;	// D
							if (eventData[1] == 2) keyChange = 4;	// E
							if (eventData[1] == 3) keyChange = 5;	// F
							if (eventData[1] == 4) keyChange = 7;	// G
							if (eventData[1] == 5) keyChange = 9;	// A
							if (eventData[1] == 6) keyChange = 11;	// B
							
							keyChange = keyChange + offset;
							if (keyChange < 0) keyChage = 11;
							if (keyChange > 11) keyChage = 0;
							
							if (oldKey != keyChange) {
								dokeyChange();
								setLiberLiveChordMappings();
							}
						}
						
						let chordSelected = false;
						let paddleMoved = false;
						resetGuitarHero();							
						
						cannotFire = eventData[5] == 0; // paddle in neutral
						
						if (haveFired && cannotFire) {
							haveFired = false;
							resetGuitarHero();	
							stopPads();
						}
						
						if (eventData[4] == 2) {
							pad.buttons[YELLOW] = true;		// 7b			
							pad.buttons[RED] = true;								
							chordSelected = true;
						}
						else
							
						if (eventData[2] == 8) {
							pad.buttons[GREEN] = true;		// 7							
							pad.buttons[RED] = true;								
							pad.buttons[YELLOW] = true;				
							pad.buttons[BLUE] = true;								
							chordSelected = true;
						}
						else

						if (eventData[3] == 4) {
							pad.buttons[YELLOW] = true;		// 5b			
							pad.buttons[GREEN] = true;								
							pad.buttons[RED] = true;								
							chordSelected = true;
						}
						else
							
						if (eventData[4] == 4) {
							pad.buttons[RED] = true;		// 6m
							chordSelected = true;
						}
						else
							
						if (eventData[2] == 16 || eventData[3] == 8) {
							pad.buttons[RED] = true;		// 6
							pad.buttons[YELLOW] = true;
							pad.buttons[BLUE] = true;							
							chordSelected = true;
						}
						else
							
						if (eventData[4] == 8) {
							pad.buttons[GREEN] = true;		// 5								
							chordSelected = true;
						}
						else
							
						if (eventData[2] == 32) {
							pad.buttons[GREEN] = true;		// 5sus							
							pad.buttons[YELLOW] = true;						
							chordSelected = true;
						}
						else
							
						if (eventData[3] == 16) {
							pad.buttons[GREEN] = true;		// 5/7
							pad.buttons[RED] = true;							
							chordSelected = true;
						}													
						else
							
						if (eventData[4] == 16) {
							pad.buttons[YELLOW] = true;		// 1
							chordSelected = true;
						}
						else
							
						if (eventData[2] == 64) {
							pad.buttons[YELLOW] = true;		// 1sus
							pad.buttons[ORANGE] = true;							
							chordSelected = true;
						}
						else

						if (eventData[3] == 32) {
							pad.buttons[YELLOW] = true;		// 1/3
							pad.buttons[BLUE] = true;							
							chordSelected = true;
						}
						else						
							
						if (eventData[4] == 32) {
							pad.buttons[ORANGE] = true;		// 4								
							chordSelected = true;
						}
						else
							
						if (eventData[2] == 128) {
							pad.buttons[ORANGE] = true;		// 3b
							pad.buttons[BLUE] = true;		
							pad.buttons[RED] = true;							
							chordSelected = true;
						}
						else

						if (eventData[3] == 64) {
							pad.buttons[ORANGE] = true;		// 4/6
							pad.buttons[BLUE] = true;							
							chordSelected = true;
						}
						else						
							
						if (eventData[4] == 64) {
							pad.buttons[BLUE] = true;		// 2m
							chordSelected = true;
						}
						else
							
						if (eventData[3] == 1) {
							pad.buttons[BLUE] = true;		// 2
							pad.buttons[RED] = true;							
							chordSelected = true;
						}
						else
							
						if (eventData[3] == 128) {
							pad.buttons[ORANGE] = true;		// 4m
							pad.buttons[RED] = true;							
							chordSelected = true;
						}	
						else
							
						if (eventData[4] == 128) {
							pad.buttons[GREEN] = true;		// 3m
							pad.buttons[BLUE] = true;								
							chordSelected = true;
						}
						else
							
						if (eventData[3] == 2) {
							pad.buttons[GREEN] = true;		// 3
							pad.buttons[YELLOW] = true;								
							pad.buttons[BLUE] = true;								
							chordSelected = true;
						}						
						else
							
						if (eventData[4] == 1) {
							pad.buttons[GREEN] = true;		// 5m
							pad.buttons[ORANGE] = true;															
							chordSelected = true;
						}						
							
							
						if (eventData[5] == 15) {			// Paddle A+B
							paddleMoved = true;	

							if (eventData[10] < 48) { // UP
								pad.buttons[LOGO] = true;
							}
							else
								
							if (eventData[10] > 58) { // DOWN
								pad.buttons[LOGO] = true;
							}							

						}	
						else							
						
						if (eventData[5] == 12) {			// Paddle A
							paddleMoved = true;	
							
							if (eventData[9] < 48) { // UP
								appliedVelocity = (50 - eventData[9]) / 50;

								if (chordSelected) {
									pad.axis[STRUM] = STRUM_UP; 
								} else {
									pad.buttons[START] = true;	// prev style
									pad.buttons[RED] = false;
									pad.buttons[YELLOW] = false;
									pad.buttons[GREEN] = false;
									pad.buttons[ORANGE] = false;
									pad.buttons[BLUE] = false;									
								}								

							}
							else
								
							if (eventData[9] > 58) { // DOWN
								appliedVelocity = eventData[9] / 50;
								
								if (chordSelected) {
									pad.axis[STRUM] = STRUM_DOWN; 
								} else {
									pad.buttons[STARPOWER] = true;	// next style
									pad.buttons[RED] = false;
									pad.buttons[YELLOW] = false;
									pad.buttons[GREEN] = false;
									pad.buttons[ORANGE] = false;
									pad.buttons[BLUE] = false;									
								}								
							}
								
						}
						else
							
						if (eventData[5] == 3) {			// Paddle B
							paddleMoved = true;	

							if (eventData[10] < 48) { // UP
								appliedVelocity = (50 - eventData[10]) / 50;							
							
								if (chordSelected) {
									pad.axis[STRUM] = STRUM_UP;
								} else {
									pad.axis[STRUM] = STRUM_UP;	// break
									pad.axis[TOUCH] = -0.7;		
									pad.buttons[RED] = false;
									pad.buttons[YELLOW] = false;
									pad.buttons[GREEN] = false;
									pad.buttons[ORANGE] = false;
									pad.buttons[BLUE] = false;																										
								}								
							}
							else
								
							if (eventData[10] > 58) { // DOWN
								appliedVelocity = eventData[9] / 50;

								if (chordSelected) {
									pad.axis[STRUM] = STRUM_DOWN;

								} else {
									pad.axis[STRUM] = STRUM_DOWN;	// fill
									pad.axis[TOUCH] = -0.7;		
									pad.buttons[RED] = false;
									pad.buttons[YELLOW] = false;
									pad.buttons[GREEN] = false;
									pad.buttons[ORANGE] = false;
									pad.buttons[BLUE] = false;																										
								}								
							}							

						}
						else
	
						if (eventData[5] == 64 && !styleStarted) {			// change pads mode only when not paying, otherwise prev variation will trigger
							paddleMoved = true;	
							
							pad.buttons[START] = true;		// set PadsMode/strum style	
							pad.buttons[RED] = false;
							pad.buttons[YELLOW] = false;
							pad.buttons[GREEN] = false;
							pad.buttons[ORANGE] = false;
							pad.buttons[BLUE] = false;	
							
							if (eventData[4] == 2) padsMode = 1;	// full chord up/down
							if (eventData[4] == 4) padsMode = 2;	// chord up/root note down	
							if (eventData[4] == 8) padsMode = 3;	// root note up/down
							if (eventData[4] == 16) padsMode = 4;	// 3rd note up/root note down
							if (eventData[4] == 32) padsMode = 5;	// 5th note up/root note down							
							if (eventData[4] == 64) padsMode = 0;	// reset
							if (eventData[4] == 128) padsMode = 0;	// reset							
						}
						else
	
						if (eventData[1] >= 16 && !styleStarted && eventData[5] == 0) {			// Tempo Pad on no paddle movement
							if (eventData[4] == 2) recallRegistration(1);	
							if (eventData[4] == 4) recallRegistration(2);		
							if (eventData[4] == 8) recallRegistration(3);	
							if (eventData[4] == 16) recallRegistration(4);	
							if (eventData[4] == 32) recallRegistration(5);								
							if (eventData[4] == 64) recallRegistration(6);	
							if (eventData[4] == 128) recallRegistration(7);	
						}					
							
						if (paddleMoved && !haveFired) {						
							haveFired = true;
							cannotFire = true;
							
							if (pad.buttons[LOGO]) {
								setTimeout(toggleStartStop);
							} else {
								updateCanvas();	

								if (pad.axis[STRUM] == STRUM_UP || pad.axis[STRUM] == STRUM_DOWN || pad.buttons[START] || pad.buttons[STARPOWER]) {			
									doChord();				
								}	
							}								
						}
					});	
				}
			}
		}
	}
}

function onChordaConnect() {
	console.debug('onChordaConnect');	

	const MIDI_SERVICE_UID            = '03B80E5A-EDE8-4B33-A751-6CE34EC4C700'.toLowerCase();
	const MIDI_IO_CHARACTERISTIC_UID  = '7772E5DB-3868-4112-A1A9-F2669D106BF3'.toLowerCase();

	navigator.bluetooth.requestDevice({
		filters: [{
		  services: [MIDI_SERVICE_UID],
		  name: "Artiphon Chorda"
		}]
	})
	.then(device => {
		bluetoothDevice = device;
		// Set up event listener for when device gets disconnected.
		console.debug('Connecting to GATT server of ' + device.name);
		device.addEventListener('gattserverdisconnected', onChordaDisconnected);
		return device.gatt.connect();
	})
	.then(server => {
		console.debug('Getting Service...');
		return server.getPrimaryService(MIDI_SERVICE_UID);
	})
	.then(service => {
		console.debug('Getting Characteristic...');
		return service.getCharacteristic(MIDI_IO_CHARACTERISTIC_UID);
	})
	.then(characteristic => {
		console.debug('Found Characteristic...');
		return characteristic.startNotifications();
	})
	.then(characteristic => {
		// Set up event listener for when characteristic value changes.
		characteristic.addEventListener('characteristicvaluechanged',	handleChordaMidiMessage);
		console.debug('Bluetooth MIDI Notifications have been started.')
		document.querySelector("#chorda_bluetooth").innerHTML = "BT ON";
	})
	.catch(error => { 
		console.error('ERRORCODE: ' + error); 
		document.querySelector("#chorda_bluetooth").innerHTML = "BT Error";		
	});	
}

function onChordaDisconnected(event) {
	document.querySelector("#chorda_bluetooth").innerHTML = "BT OFF";	
	if (!bluetoothDevice || !bluetoothDevice.gatt.connected) return;
	bluetoothDevice.gatt.disconnect();
	let device = event.target;
	console.debug('Device ' + device.name + ' is disconnected.');	
}

function handleChordaMidiMessage(evt) {
	const {buffer}  = evt.target.value;
	const eventData = new Uint8Array(buffer);

	bleMIDIrx(eventData);	
}

function loadMidiSynth() {
	if (smplrPads.length < 2 || smplrLeads.length < 1) {
		setTimeout(loadMidiSynth, 1000);	// we need to wait until smplrkeys and smplrPads (ch1 & ch2) are loaded.
		return;
	}
	
	var xhr = new XMLHttpRequest();

	xhr.open('GET', "./assets/gmgsx.sf2", true);
	xhr.responseType = 'arraybuffer';

	xhr.addEventListener('load', function(ev) {
		const midiSf2 = new Uint8Array(ev.target.response);
		console.debug("loadMidiSynth", midiSf2);
		
		midiSynth = new SoundFont.WebMidiLink();
		midiSynth.loadSoundFont(new Uint8Array(midiSf2));			
	});

	xhr.send();	
}

function initLiberLive() {
	console.debug("initLiberLive");
	
	if (inputDeviceType == "liberlivec1" && !textDecoder) {	
		onLiberLiveClick();			
	}	
}

function initLavaGenie() {
	console.debug("initLavaGenie");
	
	if (inputDeviceType == "lavagenie" && !textDecoder) {	
		onLavaGenieClick();			
	}	
}

function getConfig() {
	const data = localStorage.getItem("orin.ayo.config");
	let config = {};
	
	if (!data) {
		config = getDefaultData();	
	} else {
		config = JSON.parse(data);
	}
	return config;	
}

function saveConfig() {
    let config = {};
	config.droneActive = window.droneOn;
	config.mobileViewpoint = mobileViewpoint;
	config.registration = registration;
	config.tempo = tempo;
	config.guitarVolume = savedGuitarVolume;
	config.guitarName = guitarName;
	config.guitarIR = guitarIR;
	config.strum1 = strum1;
	config.strum2 = strum2;	
	config.strum3 = strum3;	
	config.padsMode = padsMode;
	config.keyChange = keyChange;
    config.midiOutput = midiOutput ? midiOutput.name : null;
    config.midiRealGuitar = midiRealGuitar ? midiRealGuitar.name : null;
    config.padsDevice = padsDevice ? padsDevice.name : null;	
	config.chordTracker = chordTracker ? chordTracker.name : null;
    config.input = input ? input.name : null;
	config.arranger = arranger;
	config.inputDeviceType = inputDeviceType;
	config.realGuitarStyle = realGuitarStyle;
	config.realDrum = realInstrument?.drumUrl;	
	config.realChord = realInstrument?.chordUrl;	
	config.realBass = realInstrument?.bassUrl;	
	config.realRiff = realInstrument?.riffUrl;		
	config.realdrumDevice = realdrumDevice ? realdrumDevice.deviceId : null;
	config.guitarDeviceId = guitarDeviceId;
	config.songName = (songSequence && songSequence.name != "playback") ? songSequence.name : null;
	config.arrName = arrSequence ? arrSequence.name : null;
	config.sf2Name = arrSynth ? arrSynth.name : null;
	config.arrangerGroup = arrangerGroup;
	config.rgIndex = rgIndex;
	config.autoFill = autoFillCheckedEle.checked;
	config.introEnd = introEndCheckedEle.checked;
	config.syncStart = syncStartCheckedEle.checked;
	config.reverb = guitarReverb.checked;
	config.microphone = microphone.checked;
	config.programChange = programChangeEle.checked;
	config.strumPos = guitarPosition?.selectedIndex;
	config.liberLiveChrd1 = liberLive.chord1;
	config.liberLiveChrd2 = liberLive.chord2;
	config.liberLiveDrms1 = liberLive.drums1;
	config.liberLiveDrms2 = liberLive.drums2;
	config.drumVol = savedDrumVol;
	config.chordVol = savedChordVol;
	config.bassVol = savedBassVol;
	config.keysSound1Vol = keysSound1Vol;
	config.keysSound2Vol = keysSound2Vol;
	config.keysSound3Vol = keysSound3Vol;
	
	for (let i=0; i<19; i++) {
		config["channel" + i] = document.getElementById("arr-instrument-" + i)?.checked;
		if (i < 16) config["instrument" + i] = document.getElementById("midi-channel-" + i)?.selectedIndex;
	}	
	
	console.debug("saveConfig", config);

    localStorage.setItem("orin.ayo.config", JSON.stringify(config));
	
	if (!bluetoothDevice) {
		return config;
	}
	console.debug('Disconnecting from Artiphone Bluetooth Chorda Device...');
	
	if (bluetoothDevice.gatt.connected) {
		bluetoothDevice.gatt.disconnect();
	}	
	return config;
}

function getDefaultData() {
	console.debug("getDefaultData");
	
	const data = {
		"mobileViewpoint": false,
		"registration": 0,
		"tempo": 120,
		"guitarVolume": 0.25,
		"guitarName": "0260_JCLive_sf2_file",
		"guitarIR": "Conic Long Echo Hall",
		"strum1": "4-3-4-2-4-3-1-3-2",
		"strum2": "[3+2+1]",
		"strum3": "3-2-4-1-4-2-4",
		"padsMode": 3,
		"keyChange": 7,
		"arranger": "webaudio",
		"inputDeviceType": "games-controller",
		"realGuitarStyle": "none",
		"realDrum": "assets/drums/beat-arp_120_2000_16000_2000_2000_4000.drum",
		"realChord": "assets/chords/acoustic-strum_120_4000_4000_2.chord",
		"realBass": "assets/bass/rock_120_8000.bass",
		"arrangerGroup": "yamaha",
		"rgIndex": 0,
		"autoFill": true,
		"introEnd": true,
		"reverb": true,
		"microphone": false,
		"programChange": false,
		"strumPos": 2,
		"liberLiveChrd1": "1/0",
		"liberLiveChrd2": "1/0",
		"liberLiveDrms1": "6/24",
		"liberLiveDrms2": "16/24",
		"drumVol": 100,
		"chordVol": 32,
		"bassVol": 60,
		"keysSound1Vol": 100,
		"keysSound2Vol": 50,
		"keysSound3Vol": 90,
		"channel0": true,
		"instrument0": 4,
		"channel1": true,
		"instrument1": 89,
		"channel2": false,
		"instrument2": 2,
		"channel3": false,
		"instrument3": 3,
		"channel4": false,
		"instrument4": 4,
		"channel5": false,
		"instrument5": 5,
		"channel6": false,
		"instrument6": 6,
		"channel7": false,
		"instrument7": 7,
		"channel8": false,
		"instrument8": 8,
		"channel9": true,
		"instrument9": 0,
		"channel10": true,
		"instrument10": 10,
		"channel11": true,
		"instrument11": 11,
		"channel12": true,
		"instrument12": 12,
		"channel13": true,
		"instrument13": 13,
		"channel14": true,
		"instrument14": 14,
		"channel15": true,
		"instrument15": 15,
		"channel16": true,
		"channel17": true,
		"channel18": true
	};
    localStorage.setItem("orin.ayo.config", JSON.stringify(data));	
	return data;
}

async function onloadHandler() {
	const config = getConfig();
	console.debug("onloadHandler", config);
	
	droneActive = config.droneActive || droneActive;
	mobileViewpoint = config.mobileViewpoint || mobileViewpoint;
	
	navigator.serviceWorker.register("./js/main-sw.js").then(res => console.debug("service worker registered")).catch(err => console.error("service worker not registered", err));	
	  					
	let version = "1.0.0";
	if (!!chrome.runtime?.getManifest) version = chrome.runtime.getManifest().version;
	document.title = "Orin Ayo | " + version;
  
	desktopContainer = document.getElementById("desktop");
	mobileContainer = document.getElementById("mobile");
	
	playButton = document.querySelector("#play");
	gamePadModeButton = document.querySelector("#gamepad_mode");
	styleType = document.querySelector("#style_type");
	tempoCanvas = orinayo = document.querySelector('#tempoCanvas');	
	orinayo = document.querySelector('#orinayo');
	orinayo_section = document.querySelector('#orinayo-section');
	orinayo_strum = document.querySelector('#orinayo-strum');
	orinayo_pad = document.querySelector('#orinayo-pad');
	orinayo_reg = document.querySelector('#orinayo-reg');	
	orinayo_pitch = document.querySelector('#orinayo-pitch');	
	guitarReverb = document.querySelector("#reverb");
	
  	keySign = document.getElementById("ll-keysign");	
	tempoDiv = document.getElementById('showTempo');
	showVol = document.getElementById('showVol');	
	
	programChangeEle = document.querySelector("#program-change");
	autoFillCheckedEle = document.querySelector("#autoFill");
	introEndCheckedEle = document.querySelector("#introEnd");	
	syncStartCheckedEle = document.querySelector("#syncStart");			
	loadFile = document.querySelector("#load_file");
	resetApp = document.querySelector("#reset_app");	
	bluetoothEle = document.querySelector("#bluetooth");		
  	tempoEle = document.querySelector("#tempo");
	
	const saveReg = document.querySelector("#save_reg");
	const realDrumsLoop = document.getElementById("realdrumLoop");	
	const realBassLoop = document.getElementById("realbassLoop");
	const realriffLoop = document.getElementById("realriffLoop");
	const realChordsLoop = document.getElementById("realchordLoop");		
	const guitarType = document.getElementById("guitarType");
	const guitarVolEle = document.querySelector("#volume");	
	const pedalBoard = document.querySelector("#pedal_board");
	const board = document.querySelector(".pedalboard");	
	const mobileBody = document.getElementById("mobile-body-detail"); 
	const midiInType = document.getElementById("midiInType");	
		
	if (mobileCheck() || mobileViewpoint) {
		desktopContainer.style.display = "none";	
		
		mobileContainer.style.display = "";
		window.resizeTo(450, 950);
		const mobileToolbar = document.getElementById("mobile-toolbar");
		mobileToolbar.append(playButton);
		mobileToolbar.append(loadFile);
		mobileToolbar.append(saveReg);
		mobileToolbar.append(resetApp);

		const mobileController = document.getElementById("mobile-controller");
		mobileController.append(midiInType);			
		
		//mobileToolbar.append(pedalBoard);
		//const mobileBodyContainer = document.getElementById("mobile-body");		
		//mobileBodyContainer.append(board);
		
		const chordView = document.getElementById("mobile-chord-view");	
		chordView.append(document.getElementById("orinayo"));
		
		const mobileTempo = document.getElementById("mobile-tempo");			
		mobileTempo.append(document.getElementById("tempo-toolbar"));
		
		const arrView = document.getElementById("mobile-arr-view");			
		arrView.append(document.getElementById("orinayo-section"));		
		
		drumKnob = createKnob("drum-volume", 50, 1, 100, '#88ff88');
		const drumChoice = document.getElementById("drum-choice");
		drumChoice.append(realDrumsLoop);
		
		drumKnob.addListener((knob, value) => {
			drumVol = value; 
			//savedDrumVol = drumVol;	
			if (drumLoop) drumLoop.setVolume(drumVol / 100);			
		});			
		
		bassKnob = createKnob("bass-volume", 50, 1, 100, '#ff8888');
		const bassChoice = document.getElementById("bass-choice");
		bassChoice.append(realBassLoop);
		
		bassKnob.addListener((knob, value) => {
			bassVol = value; 
			//savedBassVol = bassVol;	
			if (bassLoop) bassLoop.setVolume(bassVol / 100);			
		});			
		
		chordKnob = createKnob("chord-volume", 50, 1, 100, '#8888ff');
		const chordChoice = document.getElementById("chord-choice");
		chordChoice.append(realChordsLoop);
		
		chordKnob.addListener((knob, value) => {
			chordVol = value; 
			//savedChordVol = chordVol;	
			if (chordLoop) chordLoop.setVolume(chordVol / 100);			
		});		
		
		leadKnob = createKnob("lead-volume", 50, 1, 100, '#ff88ff');		
		const leadChoice = document.getElementById("lead-choice");
		leadChoice.append(guitarType);	

		leadKnob.addListener((knob, value) => {
			guitarVolume = value / 100; 
			//savedGuitarVolume = guitarVolume;
			showVol.innerHTML = "Vol: " + Math.trunc(guitarVolume * 100);		
		});	

		const controlItems = document.getElementById("control-items");	
		controlItems.append(document.getElementById("guitarStrum1"));
		controlItems.append(document.getElementById("guitarStrum2"));
		controlItems.append(document.getElementById("guitarStrum3"));				
		controlItems.append(document.getElementById("guitarPosition"));
		controlItems.append(document.getElementById("guitarIRDef"));
				
		const controlDevice = document.getElementById("control-device");
		controlDevice.append(document.getElementById("midiInSel"));	
		// TODO volume control for keyboard voices 1 & 2
		//controlDevice.append(document.getElementById("midiPadsSel"));	
		
		const songItems = document.getElementById("song-items");	
		songItems.append(document.getElementById("songSequence"));			
		songItems.append(document.getElementById("control-fill"));
		songItems.append(document.getElementById("control-intro"));	
		songItems.append(document.createElement("br"));			
		songItems.append(document.getElementById("song_control"));	

		const mobileLogo = document.querySelector("#mobile_logo");
	
		mobileLogo.addEventListener("click", function() {
			mobileViewpoint = false;
			saveConfig();
			reloadApp();
		});		

	} else {
		mobileContainer.style.display = "none";
		window.resizeTo(1300, 1140);
		desktopContainer.style.display = "";	

		const desktopLogo = document.querySelector("#desktop_logo");
	
		desktopLogo.addEventListener("click", function() {
			mobileViewpoint = true;
			saveConfig();
			reloadApp();
		});		
	}
	
	document.body.addEventListener('click', function(event) 	{
		// TODO			
		if (audioContext) audioContext.resume();
		if (inputDeviceType == "liberlivec1") initLiberLive();
		if (inputDeviceType == "lavagenie") initLavaGenie();		
	})
	
	
	guitarReverb.addEventListener('click', function(event) 
	{
		if (guitarReverb?.checked) {		

		} else {
			
		}
	});	

	microphone = document.querySelector("#microphone");
	
	microphone.addEventListener('click', function(event) {
		stopPlayingLeadInstrument();
		if (microphone?.checked) setupMicrophone();
	});	

	window.addEventListener("gamepadconnected", connectHandler);
	window.addEventListener("gamepaddisconnected", disconnectHandler);

	document.querySelector('#help').addEventListener("click", () => {	
		window.open("./help.html", "user-guide");
	});
	
	document.querySelector('#giglad').addEventListener("click", () => {			
		setTimeout(() => outputSendControlChange (85, 127, 4), 10000);	// FADE IN
		setTimeout(() => outputSendControlChange (86, 127, 4), 20000);	// FADE OUT
		setTimeout(() => outputSendControlChange (87, 127, 4), 30000);	// PLAY
		setTimeout(() => outputSendControlChange (88, 127, 4), 40000);	// STOP		
		
		setTimeout(() => outputSendControlChange (102, 127, 4), 50000);	// intro
		setTimeout(() => outputSendControlChange (103, 127, 4), 60000);
		setTimeout(() => outputSendControlChange (104, 127, 4), 70000);
		
		setTimeout(() => outputSendControlChange (108, 127, 4), 80000);	// Main
		setTimeout(() => outputSendControlChange (109, 127, 4), 90000);
		setTimeout(() => outputSendControlChange (110, 127, 4), 100000);
		setTimeout(() => outputSendControlChange (111, 127, 4), 110000);		
			
		setTimeout(() => outputSendControlChange (112, 127, 4), 120000);	// Fill/Break
		setTimeout(() => outputSendControlChange (113, 127, 4), 130000);
		setTimeout(() => outputSendControlChange (114, 127, 4), 140000);
		setTimeout(() => outputSendControlChange (115, 127, 4), 150000);
		setTimeout(() => outputSendControlChange (116, 127, 4), 160000);
		setTimeout(() => outputSendControlChange (117, 127, 4), 170000);
		setTimeout(() => outputSendControlChange (118, 127, 4), 180000);
		setTimeout(() => outputSendControlChange (119, 127, 4), 190000);	

		setTimeout(() => outputSendControlChange (105, 127, 4), 200000);	// End
		setTimeout(() => outputSendControlChange (106, 127, 4), 210000);
		setTimeout(() => outputSendControlChange (107, 127, 4), 220000);
			
	});

	const upload = document.getElementById("load-midifile");
	
	upload.addEventListener('change', function(event) {
		handleFileContent(event);
	});	

	const deleteStyle = document.querySelector("#delete_style");
	
	deleteStyle.addEventListener('click', function(event) {
		if (arrSequence?.name) {
			indexedDB.deleteDatabase(arrSequence.name);
			setTimeout(() => {
				reloadApp();	
			}, 1000)				
		}
	});		
	
	lyricsCanvas = document.querySelector("#lyrics");	
	lyricsContext = lyricsCanvas.getContext('2d');		
	
	chatViewEle = document.querySelector("#chatview");
	
	const gameCanvas = document.querySelector("#gameCanvas");
	const toggleChat = document.querySelector("#toggle_chat");
	const settings = document.querySelector("#settings");	

	function setMenuDefaults() {
		chatViewEle.style.display = "none";	
		toggleChat.style.setProperty("--accent-fill-rest", "#0066cc");		
		
		board.style.display = "none";
		pedalBoard.style.setProperty("--accent-fill-rest", "#0066cc");
			
		chordpro.style.display = "none";	
		chordPro.style.setProperty("--accent-fill-rest", "#0066cc");
			
		lyricsCanvas.style.display = "none";	
		showLyrics.style.setProperty("--accent-fill-rest", "#0066cc");			
	}
	
	toggleChat.addEventListener('click', function(event) {	
		setMenuDefaults();		
			
		if (settings.style.display == "none") {
			settings.style.display = "";
			mobileBody.style.display = "";
			gameCanvas.style.display = "";	
			
		} else {
			toggleChat.style.setProperty("--accent-fill-rest", "gray");	
			chatViewEle.style.display = "";
			settings.style.display = "none";
			mobileBody.style.display = "none";
			gameCanvas.style.display = "none";			
		}
	});
	
	pedalBoard.addEventListener('click', function(event) {	
		setMenuDefaults();		
			
		if (settings.style.display == "none") {
			settings.style.display = "";
			mobileBody.style.display = "";				
			
		} else if (guitarReverb?.checked) {
			pedalBoard.style.setProperty("--accent-fill-rest", "gray");				
			board.style.display = "";
			settings.style.display = "none";	
			mobileBody.style.display = "none";
		}
	});	
	
	const chordPro = document.querySelector("#chord_pro");
	
	chordPro.addEventListener('click', function(event) {
		setMenuDefaults();			
		
		if (settings.style.display == "none") {
			settings.style.display = "";
			mobileBody.style.display = "";	
			gameCanvas.style.display = "";							
			
		} else {
			chordPro.style.setProperty("--accent-fill-rest", "gray");				
			chordpro.style.display = "";
			settings.style.display = "none";	
			mobileBody.style.display = "none";	
			gameCanvas.style.display = "none";			
		}
	});	
	
	const showLyrics = document.querySelector("#show_lyrics");
	lyricsContext.fillStyle = "#000000";	
    lyricsContext.fillRect(0, 0, lyricsCanvas.width, lyricsCanvas.height);	
	setupLyrics();
	
	showLyrics.addEventListener('click', function(event) {
		setMenuDefaults();		
		
		if (settings.style.display == "none") {
			settings.style.display = "";
			mobileBody.style.display = "";	
			gameCanvas.style.display = "";						
			
		} else {
			showLyrics.style.setProperty("--accent-fill-rest", "gray");					
			lyricsCanvas.style.display = "";
			settings.style.display = "none";	
			mobileBody.style.display = "none";
			gameCanvas.style.display = "none";				
		}
	});		
	
	const configButton = document.querySelector("#config-button");
	const configDlg = document.querySelector("#settings-dialog");
	
	configButton.addEventListener("click", function(event) {
		setMenuDefaults();
		
		settings.style.display = "";		
		configDlg.style.display = "";
		configDlg.hidden = false;		
		
		document.querySelector("#dialogCloser").addEventListener("click", function(event) {
			configDlg.style.display = "none";
			configDlg.hidden = true;
		})
	});
		
	
	const chordaBluetooth = document.querySelector("#chorda_bluetooth");
	
	chordaBluetooth.addEventListener('click', function(event) {
		onChordaConnect(event);
	});		
		
	saveReg.addEventListener('click', function(event) {
		const slot = prompt("Enter save slot number");
		
		if (slot && slot != "") {
			saveRegistration(slot);
		}
	});
			
	resetApp.addEventListener('click', function(event) {
		registration = 0;
		reloadApp();
	});	
		
	loadFile.addEventListener('click', function(event) {
		upload.click();	
	});	
	
	styleType.addEventListener("click", function() {
		styleType.innerText = styleType.innerText == "DJ" ? "Normal" : "DJ";	
	});
	
	gamePadModeButton.addEventListener("click", function() {	
		gamePadModeButton.innerText = (gamePadModeButton.innerText == "Color Tabs" ? "Smart Strums" : (gamePadModeButton.innerText == "Smart Strums" ? "Smart Strings" : "Color Tabs"));	
	});	
	
	
	playButton.addEventListener("click", function() {	
		if (arranger == "webaudio" && realInstrument) {
			
			if (drumLoop || chordLoop || bassLoop) {
				toggleStartStop();
			} else {
				setupRealInstruments();	
			}
		} else {
			toggleStartStop();					
		}
	});	

	showVol.innerHTML = "Vol: " + Math.trunc(guitarVolume * 100);
	
	guitarVolEle.addEventListener("input", function(event) {
		guitarVolume = +event.target.value / 100; 
		savedGuitarVolume = guitarVolume;
		const displayVol =  Math.trunc(guitarVolume * 100);
		showVol.innerHTML = "Vol: " + displayVol;
		if (leadKnob) leadKnob.setValue(displayVol);
	});
	
	tempoEle.addEventListener("input", function(event) {
		updateTempo();
		saveConfig();
		// TODO implement tempo filter
		//createChordList(config, realChordsLoop)
	});
	
	document.querySelector("#tempo-label").addEventListener("click", function(event) {
		setTempo(savedTempo);
	});
	
	
	document.querySelector("#voice-commands").addEventListener("change", function(event) {
		console.debug("voice command", event.target.checked); 		
		if (!speechObject) setupVoiceCommands();	

		if ( event.target.checked) {
			//speechObject.start();
		} else {
			//speechObject.stop();
		}
	});
	
	document.addEventListener('keyup', (event) => {
		var name = event.key;
		var code = event.code;
		
		//console.debug("keyup", name, code);	
		keyboard.delete(name);			
	});
	
	document.addEventListener('keydown', (event) => {
		var name = event.key;
		var code = event.code;
		
		//console.debug("keydown", name, code);
		
		if (!keyboard.has(name)) {
			keyboard.set(name, true);			
			handleKeyboard(name, code);	
		}			
	});		

	document.querySelector("#stream_deck").addEventListener('click', async (event) => {	
		const devices = await navigator.hid.requestDevice({ filters: [{vendorId: 4057}] });	
		
		if (devices.length > 0) {
			navigator.hid.getDevices().then((browserDevices) => {
				browserDevices.map(async (dev) => {
					console.debug("found stream device", dev, streamDeck);
					
					if (dev.vendorId == 4057 && streamDeck) {
						await dev.forget();
						streamDeck = null;
					}					
				});
			});				
		}
	});
	
	muteChords = document.getElementById("mute-chords");
	vocalistMode = document.getElementById("vocalist-mode");
	
	try {
		const enableStreamDeck = localStorage.getItem("devices.enable_streamdeck");
		  
		if (enableStreamDeck && JSON.parse(enableStreamDeck) == true) {	
			getStreamDeck();
			console.debug("stream deck enabled");			
		}
		
	} catch (e) {
		console.error("stream deck fail", e);
	}
			
	audioContext = new AudioContext();
	guitarContext = audioContext;
	guitarSource = guitarContext.destination;
	setupPianos(audioContext);		
	letsGo(config);	
}

function reloadApp() {
	location.reload();	
}

async function getStreamDeck() {
	const devices = await (0, window.StreamDeckUI.getStreamDecks)();
	
	for (device of devices) 
	{
		if (device) {
			streamDeck = device;
			openStreamDeckDevice().catch(console.error);
			break;
		}
	}	
}

function closeDevice() {
	if (streamDeck) {
		if (interval) window.clearInterval(interval)
		console.debug('Closing streamDeck');
		try {streamDeck.close()} catch (e) {};
		streamDeck = null;
	}	
}

function handleEncoderRotate(encoder, amount, absolute) {
	if (encoder == 0) {		
		guitarVolume =  adjustVol(absolute, "#volume", amount, 100, 1) / 100;	
		savedGuitarVolume = guitarVolume;
		if (leadKnob) leadKnob.setValue(guitarVolume * 100);		
	}
	else
			
	if (encoder == 1) {		
		drumVol =  adjustVol(absolute, "#audio-vol-16", amount, 100, 0.0001);
		if (drumLoop) drumLoop.setVolume(drumVol / 100);	
		if (drumKnob) drumKnob.setValue(drumVol);			
	}
	else

	if (encoder == 2) {		
		bassVol =  adjustVol(absolute, "#audio-vol-17", amount, 100, 0.0001);			
		if (bassLoop) bassLoop.setVolume(bassVol / 100);	
		if (bassKnob) bassKnob.setValue(bassVol);			
	}
	else

	if (encoder == 3) {		
		chordVol =  adjustVol(absolute, "#audio-vol-18", amount, 100, 0.0001);				
		if (chordLoop) chordLoop.setVolume(chordVol / 100);	
		if (chordKnob) chordKnob.setValue(chordVol);		
	}	
}

function adjustVol(absolute, selector, amount, max, min) {
	const vol = document.querySelector(selector);
	
	if (absolute) {
		vol.value = amount;
	} else {
		const oldVol = parseInt(vol.value);
		vol.value = oldVol +  amount;
	}
	if (vol.value < min) vol.value = min;
	if (vol.value > max) vol.value = max;		
	return vol.value;
}

async function openStreamDeckDevice() {
    console.debug(`StreamDeck device opened. Serial: ${await streamDeck.getSerialNumber()} Firmware: ${await streamDeck.getFirmwareVersion()}`);
	
    streamDeck.on('down', (panel) => {
        console.debug(`Key ${panel} down`);
    });
	
    streamDeck.on('up', async (panel) => {
        console.debug(`Key ${panel} up`);	
		
		if (styleStarted) {
			sectionChange = panel % 4;
			
			if (midiNotes.size == 0) {
				changeArrSection(true);
			} else {
				if (panel > 3) doBreak(); else doFill();
			}
			
		} else {
			recallRegistration(panel + streamDeckPointer + 1);	
		}		
		
    });
	
    streamDeck.on('encoderDown', async (encoder) => {
        console.debug(`Encoder ${encoder} down`);				
    });
    streamDeck.on('encoderUp', (encoder) => {
        console.debug(`Encoder ${encoder} up`);
		handleEncoderPress(encoder);				
    });
	
    streamDeck.on('rotateLeft', async (encoder, amount) => {
        console.debug(`Encoder ${encoder} left (${amount})`);
		handleEncoderRotate(encoder, -amount);
    });
	
    streamDeck.on('rotateRight', async (encoder, amount) => {
        console.debug(`Encoder ${encoder} right (${amount})`);
		handleEncoderRotate(encoder, amount);
    });
	
    streamDeck.on('lcdShortPress', (encoder, position) => {
        console.debug(`LCD short press ${encoder} (${position.x},${position.y})`);
		drawButtons(1 + ( streamDeck.NUM_KEYS * encoder));	
    });
	
    streamDeck.on('lcdLongPress', (encoder, position) => {
        console.debug(`LCD long press ${encoder} (${position.x},${position.y})`);
		//handleAction('lcdLongPress', encoder, true);		
    });
	
    streamDeck.on('lcdSwipe', (_fromEncoder, _toEncoder, fromPosition, toPosition) => {
        console.debug(`LCD swipe (${fromPosition.x},${fromPosition.y}) -> (${toPosition.x},${toPosition.y})`);
		sectionChange = 0;
		toggleStartStop();
    });
	
	await streamDeck.clearPanel();	
	drawLogo();	
	drawButtons(1);
}

function clearLcd() {
	const canvas = new OffscreenCanvas(streamDeck.LCD_ENCODER_SIZE.width * 4, streamDeck.LCD_ENCODER_SIZE.height);	
	const background = "#000";
	const context = canvas.getContext('2d', { willReadFrequently: true });
	context.clearRect(0, 0, canvas.width, canvas.height);	
	
	for (let i=0; i<4; i++) {
		const imgData = context.getImageData(i * 200, 0, streamDeck.LCD_ENCODER_SIZE.width, canvas.height);
		streamDeck.fillEncoderLcd(i, Buffer.from(imgData.data), { format: 'rgba' });
	}				
}

function drawLogo() {
	if (streamDeck.PRODUCT_NAME !== 'Streamdeck +') return;
	
	const canvas = new OffscreenCanvas(streamDeck.LCD_ENCODER_SIZE.width * 4, streamDeck.LCD_ENCODER_SIZE.height);	
	const background = "#ffffff";
	const url = "./assets/login_logo.png";
	const context = canvas.getContext('2d', { willReadFrequently: true });
	const img = new Image;

	img.onload = function() {
		context.fillStyle = background;
		context.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
				
		for (let i=0; i<4; i++) {
			const imgData = context.getImageData(i * 200, 0, streamDeck.LCD_ENCODER_SIZE.width, canvas.height);
			streamDeck.fillEncoderLcd(i, Buffer.from(imgData.data), { format: 'rgba' });
		}				
	};
	img.src = url;
}

async function drawButtons(c) {
	let slotFound = false;
	const canvas = new OffscreenCanvas(streamDeck.ICON_SIZE, streamDeck.ICON_SIZE); //document.createElement('canvas');	
	const ctx = canvas.getContext('2d', { willReadFrequently: true });

	for (let i = 0; i < streamDeck.NUM_KEYS; i++) {
		const n = c + i;
		ctx.save();
		ctx.clearRect(0, 0, canvas.width, canvas.height);		
		
		if (localStorage.getItem("orin.ayo.slot." + n)) {
			slotFound = true;
			// Start with a font that's 80% as high as the button. maxWidth
			// is used on the stroke and fill calls below to scale down.
			ctx.font = `${canvas.height * 0.8}px "Arial"`;
			ctx.strokeStyle = 'blue';
			ctx.lineWidth = 1;
			ctx.strokeText(n.toString(), 8, canvas.height * 0.9, canvas.width * 0.8);
			ctx.fillStyle = 'white';
			ctx.fillText(n.toString(), 8, canvas.height * 0.9, canvas.width * 0.8);
		}
		const id = ctx.getImageData(0, 0, canvas.width, canvas.height);
		streamDeck.fillKeyBuffer(i, Buffer.from(id.data), { format: 'rgba' });		
		ctx.restore();		
	}
	if (slotFound) 	streamDeckPointer = c - 1;
}
	
async function setupMicrophone() {
	
	if (microphone.checked) {	
		console.debug("setupMicrophone");
		
		const stream = await navigator.mediaDevices.getUserMedia({
			"audio": {
				"mandatory": {
					"googEchoCancellation": "false",
					"googAutoGainControl": "false",
					"googNoiseSuppression": "false",
					"googHighpassFilter": "false"
				},
				"optional": []
			}
		});
		
        mediaStreamSource = audioContext.createMediaStreamSource(stream);
	    analyser = audioContext.createAnalyser();
	    analyser.fftSize = 2048;
	    mediaStreamSource.connect( analyser );
	    updatePitch();		
	}	
}

function noteFromPitch( frequency ) {
	var noteNum = 12 * (Math.log( frequency / 440 )/Math.log(2) );
	return Math.round( noteNum ) + 69;
}

function frequencyFromNoteNumber( note ) {
	return 440 * Math.pow(2,(note-69)/12);
}

function centsOffFromPitch( frequency, note ) {
	return Math.floor( 1200 * Math.log( frequency / frequencyFromNoteNumber( note ))/Math.log(2) );
}

function autoCorrelate( buf, sampleRate ) {
	// Implements the ACF2+ algorithm
	var SIZE = buf.length;
	var rms = 0;

	for (var i=0;i<SIZE;i++) {
		var val = buf[i];
		rms += val*val;
	}
	rms = Math.sqrt(rms/SIZE);
	
	if (rms<0.01) // not enough signal
		return -1;

	var r1=0, r2=SIZE-1, thres=0.2;
	
	for (var i=0; i<SIZE/2; i++)
		if (Math.abs(buf[i])<thres) { r1=i; break; }
	
	for (var i=1; i<SIZE/2; i++)
		if (Math.abs(buf[SIZE-i])<thres) { r2=SIZE-i; break; }

	buf = buf.slice(r1,r2);
	SIZE = buf.length;

	var c = new Array(SIZE).fill(0);
	
	for (var i=0; i<SIZE; i++)
		for (var j=0; j<SIZE-i; j++)
			c[i] = c[i] + buf[j]*buf[j+i];

	var d=0; while (c[d]>c[d+1]) d++;
	var maxval=-1, maxpos=-1;
	
	for (var i=d; i<SIZE; i++) {
		if (c[i] > maxval) {
			maxval = c[i];
			maxpos = i;
		}
	}
	
	var T0 = maxpos;

	var x1=c[T0-1], x2=c[T0], x3=c[T0+1];
	a = (x1 + x3 - 2*x2)/2;
	b = (x3 - x1)/2;
	if (a) T0 = T0 - b/(2*a);

	return sampleRate/T0;
}

function updatePitch() {
	var cycles = new Array;
	var buflen = 2048;
	var buf = new Float32Array( buflen );
	
	stopPlayingLeadInstrument();	
	
	analyser.getFloatTimeDomainData( buf );
	var ac = autoCorrelate( buf, audioContext.sampleRate );

 	if (ac == -1) {
		orinayo_pitch.innerHTML = "Pitch --";
				
 	} else {
	 	const pitch = ac;	
	 	const note =  noteFromPitch( pitch );
		const noteString = noteStrings[note%12];
		const detune = centsOffFromPitch( pitch, note );		
		
		if (detune == 0 ) {
			console.debug("updatePitch - confident", Math.round( pitch ), noteString);	
			
		} else {
			if (detune < 0) {
				//console.debug("updatePitch - flat", Math.round( pitch ), noteString, Math.abs( detune ));									
			} else {
				//console.debug("updatePitch - sharp", Math.round( pitch ), noteString, Math.abs( detune ));	
			}				
		}

		if (midiInstrCheckedEle[2]?.checked && activeChord) {		
			startPlayingLeadInstrument(note, detune);		
			orinayo_pitch.innerHTML = "Pitch " + noteString;	
		}			
	}

	if (microphone.checked) {
		window.requestAnimationFrame( updatePitch );
	}
}

function startPlayingLeadInstrument(note, detune) {
	//console.debug("startPlayingLeadInstrument", note, detune);
	// TODO use active chord and key to set midi note
				

	leadInstrument = smplrLeads[keysSelectedEle3.selectedIndex].instrument;					
	leadInstrument.output.setVolume(midiVolumeEle[2].value / 100 * 127);
	
	const pos = parseInt(guitarPosition.value);		
	const midiNote = 48 + (pos * 12) + (note % 12);
	leadInstrument.start({ note: midiNote, velocity: 100 }); 
	leadInstrument.stopId = midiNote;				
}

function stopPlayingLeadInstrument() {
	//console.debug("stopPlayingLeadInstrument", leadInstrument?.stopId);
	
	if (leadInstrument?.stopId) {
		leadInstrument.stop({ stopId: leadInstrument.stopId });	
		leadInstrument.stopId = null;
	}	
}

function handleFileContent(event) {
	console.debug("handleFileContent", event);	
	var files = event.target.files;

	for (const file of files) {
		var reader = new FileReader();

		reader.onload = function(event)	
		{
			if (file.name.toLowerCase().endsWith(".mid") || file.name.toLowerCase().endsWith(".sf2") || file.name.toLowerCase().endsWith(".kst") || file.name.toLowerCase().endsWith(".sty") || file.name.toLowerCase().endsWith(".prs") || file.name.toLowerCase().endsWith(".bcs") || file.name.toLowerCase().endsWith(".ac7") || file.name.toLowerCase().endsWith(".sas") || file.name.toLowerCase().endsWith(".bass") || file.name.toLowerCase().endsWith(".drum") || file.name.toLowerCase().endsWith(".chord") || file.name.toLowerCase().endsWith(".keys") || file.name.toLowerCase().endsWith(".pads") || file.name.toLowerCase().endsWith(".leads")) {
				handleBinaryFile(file.name, event.target.result);
			}	
			else
				
			if (file.name.toLowerCase().endsWith(".cho")) {
				handleChordPro(file, event.target.result);
			}
			else {
				alert("Only soundfonts, midi file or style files supported");
			}
		};

		reader.onerror = function(event) {
			console.error("handleFileContent - error", event);
		};

		reader.readAsArrayBuffer(file);
		break;
	}
}

async function handleChordPro(file, data) {
	const decoder = new TextDecoder("utf-8"); 
	const body = decoder.decode(data); 
	const song = chordproParser.parse(body);	// TODO - Implement server-side chord to midi
	console.debug("handleChordPro", file.name, song);	
	
	const parts = JSON.parse(localStorage.getItem("collaboration_server.server_url")).split("/");	
	const url = "https://" + parts[2] + "/orinayo/cp2midi";	
	const response = await fetch(url, {method: "POST", body});
	const blob = await response.blob();	
	const buffer = await blob.arrayBuffer();
	
	handleBinaryFile(file.name.replace(".cho", ".mid"), buffer);	
}

function handleBinaryFile(filename, data) {
	console.debug("handleBinaryFile", filename, data);
	
	const store = new idbKeyval.Store(filename, filename);

	idbKeyval.set(filename, data, store).then(function () {
		console.debug("handleBinaryFile set", filename, data);
		
		if (filename.toLowerCase().endsWith(".sf2")) {		
			arrSynth = {name: filename};
		}
		else
			
		if (filename.toLowerCase().endsWith(".keys") || filename.toLowerCase().endsWith(".pads") || filename.toLowerCase().endsWith(".leads")) {		
			// do nothing. handle on reload
		}
		else
			
		if (filename.toLowerCase().endsWith(".mid")) {		
			songSequence = {name: filename};
		}
		else
			
		if (filename.toLowerCase().endsWith(".drum")) {		
			realInstrument.drumUrl = filename;				
		}
		else
			
		if (filename.toLowerCase().endsWith(".chord")) {		
			realInstrument.drumUrl = filename;				
		}
		else
			
		if (filename.toLowerCase().endsWith(".bass")) {		
			realInstrument.bassUrl = filename;				
		}
		else {
			arrSequence = {name: filename};
			arrangerGroup = "imported";				
		}

		saveConfig();
		reloadApp();			
		
	}).catch(function (err) {
		console.error('handleBinaryFile set failed!', err)
	});			
}

function setTempo(tmpo) {
	console.debug("setTempo", tmpo);

	if (arranger == "webaudio") {			
		tempoEle.setAttribute("min", -6);
		tempoEle.setAttribute("max", 6);	
		tempoEle.setAttribute("step", 1);	
		tempoEle.value = Math.ceil(12 * (Math.log(tmpo / realInstrument.bpm) / Math.log(2)));	
		if (tempoEle.value < -6 || tempoEle.value > 6) tempoEle.value = 0;
		savedTempo = realInstrument.bpm;	
	} else {
		tempoEle.setAttribute("min", 40);
		tempoEle.setAttribute("max", 140);	
		tempoEle.setAttribute("step", 1);
		tempoEle.value = tmpo;	
		savedTempo = tmpo;			
	}
		
	updateTempo();	
}

function updateTempo() {
	if (arranger == "webaudio") {	
		tempo = Math.floor((2 ** (tempoEle.value / 12)) * savedTempo);	
	} else {
		tempo = tempoEle.value;
	}
	
	tempoDiv.innerText = tempo;	
	
	if (window.delay) delay.delayTime.value = 60 / tempo;
	
	if (writeCharacteristic) {	// liberlive sync
		setLiberLiveDeviceSettings() 
	}	
}

function handleKeyboard(name, code) {
	console.debug("handleKeyboard", name, code);
	
	if (!game) {
		setup();
		resetGuitarHero();
	}

	var handled = false;	
	
	if (inputDeviceType == "orinayo") {
		handled = handleSevenButtons(name, code);
		updateCanvas();			
	} else {
		handled = handleNumPad(name, code);	
		doChord();
		updateCanvas();
		resetGuitarHero();			
	}
}

function handleSevenButtons(name, code) {
	var handled = false;

	if (keyboard.get("1")) {
		pad.buttons[RED] = true; 
		pad.buttons[YELLOW] = true; 		
		handled = true;		
	}
	else

	if (keyboard.get("2")) {
		pad.buttons[RED] = true; 
		handled = true;		
	}
	else

	if (keyboard.get("3")) {
		pad.buttons[GREEN] = true; 
		handled = true;		
	}
	else

	if (keyboard.get("4")) {
		pad.buttons[YELLOW] = true; 
		handled = true;		
	}
	else

	if (keyboard.get("5")) {
		pad.buttons[ORANGE] = true; 
		handled = true;		
	}
	else

	if (keyboard.get("6")) {
		pad.buttons[BLUE] = true; 
		handled = true;		
	}
	else
		
	if (keyboard.get("7")) {
		pad.buttons[BLUE] = true; 
		pad.buttons[GREEN] = true; 		
		handled = true;		
	}	

	return handled;	
}

function handleNumPad(name, code) {
	if (chatViewEle.style.display != "none") return	// can't use keyboard input and chat
	
	var handled = false;

	if (!styleStarted && keyboard.get("0") && (keyboard.get("1") || keyboard.get("2") || keyboard.get("3") || keyboard.get("4") || keyboard.get("5") || keyboard.get("6") || keyboard.get("7") || keyboard.get("8") || keyboard.get("9"))) {
		console.debug("handleNumPad", keyboard.get("Shift"));
		
		if (keyboard.get("1")) recallRegistration(1);
		if (keyboard.get("2")) recallRegistration(2);
		if (keyboard.get("3")) recallRegistration(3);
		if (keyboard.get("4")) recallRegistration(4);
		if (keyboard.get("5")) recallRegistration(5);
		if (keyboard.get("6")) recallRegistration(6);
		if (keyboard.get("7")) recallRegistration(7);
		if (keyboard.get("8")) recallRegistration(8);
		if (keyboard.get("9")) recallRegistration(9);
					
		return true;
	}	
	
	if (keyboard.get(" ") || code == "NumpadEnter") {
		pad.buttons[LOGO] = true;
		if (keyboard.get("Backspace")) pad.buttons[YELLOW] = true; 	// End1
		handled = true;				
	}
	else
	  
	if (keyboard.get("+")) {
		pad.axis[STRUM] = STRUM_RIGHT;
		handled = true;			
	}	
	else
	  
	if (keyboard.get("-")) {
		pad.axis[STRUM] = STRUM_LEFT;
		handled = true;			
	}	
	  
	if (keyboard.get("0") || keyboard.get(".") || keyboard.get("1") || keyboard.get("2") || keyboard.get("3") || keyboard.get("4") || keyboard.get("5") || keyboard.get("6") || keyboard.get("7") || keyboard.get("8") || keyboard.get("9") || keyboard.get("*") || keyboard.get("/") || keyboard.get("Backspace")) {	
		pad.axis[STRUM] = autoStrumUpDown();
		
		if (midiRealGuitar) {
			midiRealGuitar.playNote(pad.axis[STRUM] == STRUM_UP ? 122 : 121, 1, {velocity: getVelocity(), duration: 1000});	
		}
		
		handled = true;			

		if (keyboard.get("Backspace") && keyboard.get("0")) {	// Fill
			pad.axis[TOUCH] = -0.7;
			pad.axis[STRUM] = STRUM_DOWN;			
		}
		else	
		
		if (keyboard.get(".") && !keyboard.get("0")) {		// style next
			pad.buttons[START] = true;
			handled = true;		
		}
		else

		if (keyboard.get("0") && !keyboard.get(".")) {		// style prev
			pad.buttons[STARPOWER] = true;
			handled = true;				
		}		
		else 
			
		if (keyboard.get("Backspace") && keyboard.get("1")) {	// Mute Drums
			handleEncoderPress(1);		
		}
		else 
			
		if (keyboard.get("Backspace") && keyboard.get("2")) {	// Mute Chord
			handleEncoderPress(3);				
		}
		else 
			
		if (keyboard.get("Backspace") && keyboard.get("3")) {	// Mute Bass
			handleEncoderPress(2);			
		}
		else 
			
		if (keyboard.get("7") && keyboard.get("8")) {			// 3
			pad.buttons[GREEN] = true;
			pad.buttons[YELLOW] = true;			
			pad.buttons[BLUE] = true;				
		}
		else 
			
		if (keyboard.get("1") && keyboard.get("2")) {			// 2
			pad.buttons[RED] = true;		
			pad.buttons[BLUE] = true;				
		}
		else 
			
		if (keyboard.get("4") && keyboard.get("5")) {			// 6
			pad.buttons[RED] = true;
			pad.buttons[YELLOW] = true;			
			pad.buttons[BLUE] = true;	
			
		}
		else 
			
		if (keyboard.get("5") && keyboard.get("6")) {			// 1sus
			pad.buttons[ORANGE] = true;
			pad.buttons[YELLOW] = true;	
		}
		else 
			
		if (keyboard.get("8") && keyboard.get("9")) {			// 5sus
			pad.buttons[GREEN] = true;
			pad.buttons[YELLOW] = true;	
			
		}
		else 
			
		if (keyboard.get("2") && keyboard.get("3")) {			// 4m
			pad.buttons[ORANGE] = true;
			pad.buttons[RED] = true;	
			
		}	

		else if (keyboard.get("5") && !keyboard.get("4") && !keyboard.get("6")) {
			pad.buttons[YELLOW] = true;		// 1	
			
		}
		else if (keyboard.get("2") && !keyboard.get("1") && !keyboard.get("3")) {
			pad.buttons[ORANGE] = true;		// 4	
			
		}			
		else if (keyboard.get("8") && !keyboard.get("7") && !keyboard.get("9")) {
			pad.buttons[GREEN] = true;	
			
		}			// 5
		else if (keyboard.get("4") && !keyboard.get("5")) {
			pad.buttons[RED] = true;								// 6m	
			
		}			
		else if (keyboard.get("1") && !keyboard.get("2")) {
			pad.buttons[BLUE] = true;								// 2m	
			
		}
		
		else if (keyboard.get("7") && !keyboard.get("8")) {														// 3m
			pad.buttons[GREEN] = true;
			pad.buttons[BLUE] = true;	
			
		}
		else if (keyboard.get("3") && !keyboard.get("2")) {														// 4/6
			pad.buttons[ORANGE] = true;
			pad.buttons[BLUE] = true;	
			
		}		
		else if (keyboard.get("6") && !keyboard.get("5")) {														// 1/3
			pad.buttons[BLUE] = true;
			pad.buttons[YELLOW] = true;	
			
		}
		else if (keyboard.get("9") && !keyboard.get("8")) {														// 5/7
			pad.buttons[GREEN] = true;
			pad.buttons[RED] = true;	
			
		}
		else if (keyboard.get("*") && keyboard.get("/")) {														// 3b
			pad.buttons[ORANGE] = true;		
			pad.buttons[BLUE] = true;
			pad.buttons[RED] = true;	
			
		}	
		else if (keyboard.get("/") && !keyboard.get("*")) {														// 5b			
			pad.buttons[YELLOW] = true;			
			pad.buttons[GREEN] = true;
			pad.buttons[RED] = true;	
			
		}		
		else if (keyboard.get("*") && !keyboard.get("/")) {														// 7b
			pad.buttons[YELLOW] = true;			
			pad.buttons[RED] = true;	
			
		}		
	}	
	return handled;
}

function autoStrumUpDown() {
	const sameChord = arraysEqual(lastChord, firstChord);
	console.debug("autoStrumUpDown", sameChord, firstChord, lastChord);
	
	if (sameChord) return STRUM_UP;
	return STRUM_DOWN;
}

function handleNoteOff(note, device, velocity, channel) {	
	console.debug("handleNoteOff", inputDeviceType, note);
	
	for (let [keyNote, value] of midiNotes)	
	{
		if (keyNote == note.number) {
			if (value.envelope1) value.envelope1.stop({ stopId: note.number });
			if (value.envelope2) value.envelope2.stop({ stopId: note.number });			
			midiNotes.delete(note.number);
		}
	}	
	
	if (midiNotes.size == 0) {
		midiNotesProceesed = false;
	}

	if (chordTracker) {
		chordTracker.stopNote(note.number, channel, {velocity});
	}
	
	if (inputDeviceType == "chorda" && device != "INSTRUMENT1") {
		//console.debug("chorda handleNoteOff", note.number, device, velocity, channel);
		translateChordaToI1(handleNoteOff, false, note.number, velocity, channel) 	// calls handleNoteOff again with device == INSTRUMENT1			
	}
	else
		
	if (inputDeviceType == "instrument1" || device == "INSTRUMENT1") {
		const fwdChord = [];
		
		if (!game) {
			setup();
			resetArtiphonI1Buttons();	
			resetArtiphonI1Axis();		
		}		
			
		if (gamePadModeButton.innerText == "Color Tabs") {
			if (pad.buttons[GREEN]) fwdChord.push(127);						
			if (pad.buttons[RED]) fwdChord.push(126);
			if (pad.buttons[YELLOW]) fwdChord.push(125);						
			if (pad.buttons[BLUE]) fwdChord.push(124);
			if (pad.buttons[ORANGE]) fwdChord.push(123);
			if (pad.axis[STRUM] == STRUM_UP) fwdChord.push(122);								
			if (pad.axis[STRUM] == STRUM_DOWN) fwdChord.push(121);	
			
			if (midiRealGuitar) midiRealGuitar.stopNote(fwdChord, 1, {velocity});	
			stopPads();
			
			if (note.number < artiphonI1Base + 10 && note.number >= artiphonI1Base) {
				stopChord();
			}			
			
		} else {
			
			if (pad.buttons[GREEN]) fwdChord.push(127);						
			if (pad.buttons[RED]) fwdChord.push(126);
			if (pad.buttons[YELLOW]) fwdChord.push(125);						
			if (pad.buttons[BLUE]) fwdChord.push(124);
			if (pad.buttons[ORANGE]) fwdChord.push(123);
			/*if (pad.axis[STRUM] == STRUM_UP) fwdChord.push(122);								
			if (pad.axis[STRUM] == STRUM_DOWN) fwdChord.push(121);*/

			pad.axis[STRUM] = STRUM_UP;
			fwdChord.push(122);	
			
			if (fretButton) {
				fwdChord.push(fretButton);
			}
			if (midiRealGuitar) midiRealGuitar.stopNote(fwdChord, 1, {velocity});
			stopPads();			
		}			
						
		if (note.number < artiphonI1Base + 10 && note.number >= artiphonI1Base) {
			pad.axis[STRUM] = 0;
			pad.buttons[CONTROL] = false;	
			pad.buttons[START] = false;	
			pad.buttons[STARPOWER] = false;	
			pad.axis[TOUCH] = 0;	

			if (padFretButton && midiRealGuitar) {
				const fwdChord = [119];
				fwdChord.push(padFretButton);	
				midiRealGuitar.stopNote(fwdChord, 1, {velocity});	
			}			
		}	
		else				

		if (note.number == artiphonI1Base + 24) {			// GREEN	
			pad.buttons[GREEN] = false;			
		}
		else 
			
		if (note.number == artiphonI1Base + 26) {			// RED		
			pad.buttons[RED] = false;				
		}
		else 
			
		if (note.number == artiphonI1Base + 28) {			// YELLOW		
			pad.buttons[YELLOW] = false;			
		}
		else 
			
		if (note.number == artiphonI1Base + 29) {			// BLUE		
			pad.buttons[BLUE] = false;
		}
		else 
			
		if (note.number == artiphonI1Base + 31) {			// ORANGE		
			pad.buttons[ORANGE] = false;	
		}
		else 
			
		if (note.number == artiphonI1Base + 33) {			// CONTROL		
			pad.buttons[CONTROL] = false;	
			pad.buttons[START] = false;	
			pad.buttons[STARPOWER] = false;				
		}
		else 
			
		if (note.number == artiphonI1Base + 35) {			// PLAY		
			pad.buttons[LOGO] = false;	
			pad.buttons[GREEN] = false;	
			pad.buttons[RED] = false;
			pad.buttons[YELLOW] = false;
			pad.buttons[BLUE] = false;
			pad.buttons[ORANGE] = false;			
		}		
		
		updateCanvas();				
	}				

	
}

function handleNoteOn(note, device, velocity, channel) {
	console.debug("handleNoteOn", inputDeviceType, note, device, velocity, channel);
	
	if (note.number > 95) {		// only 76 key used for playing note. 77 - 88 are for arranger control
	
		if (note.number < 108 && !styleStarted) {
			recallRegistration(note.number - 95);
		}
		else			
	
		if (note.number == 108) {			
			sectionChange = 0;
			
			pad.buttons[YELLOW] = false;		
			if (midiNotes.size > 0) pad.buttons[YELLOW] = true;	// play intro			
			toggleStartStop();	
		}	
		else
			
		if (note.number == 96) {		// variation A
			handleEncoderPress(8);
		}
		else
			
		if (note.number == 98) {		// variation B
			handleEncoderPress(9);
		}
		else
			
		if (note.number == 100) {		// variation C
			handleEncoderPress(10);
		}
		else
			
		if (note.number == 101) {		// variation D
			handleEncoderPress(11);
		}
		else
			
		if (note.number == 97) {		// fill
			handleButtonPress(1);
		}
		else
			
		if (note.number == 99) {		// break
			handleButtonPress(9);
		}	
		else
			
		if (note.number > 101 && note.number < 108) {		// mute / unmute
			handleEncoderPress(	note.number - 102);	
		}	
		
		return;
	}
	
	let envelope1, envelope2, thePiano = smplrKeys[0].instrument, thePad = smplrPads[0].instrument;
	
	if (keysSound1?.checked) 
	{		
		if (keysSelectedEle1.selectedIndex > 0) {
			thePiano = smplrKeys[keysSelectedEle1.selectedIndex].instrument;
		}
		
		envelope1 = thePiano;
		thePiano.output.setVolume(midiVolumeEle[0].value / 100 * 127);
		thePiano.start({ note: parseInt(note.number), velocity: velocity * 127 }); 		
	}
	
	if (keysSound2?.checked) 
	{
		if (keysSelectedEle2.selectedIndex > 0) {
			thePad = smplrPads[keysSelectedEle2.selectedIndex].instrument;
		}
		
		envelope2 = thePad;
		thePad.output.setVolume(midiVolumeEle[1].value / 100 * 127);		
		thePad.start({ note: parseInt(note.number), velocity: velocity * 127 }); 	
	}	
	
	midiNotes.set(note.number, {inputDeviceType, note, device, velocity, channel, envelope1, envelope2});		
	
	if (inputDeviceType != "keyboard") return; // guitar controllers have prime control of guitar and arranger 
		
	if (!midiNotesProceesed && midiNotes.size == 4 || midiNotes.size == 3) {
		const chord = []; 
		for (let [keyNote, value] of midiNotes) chord.push(value.note.number);	
		chord.sort();
		
		const sorted = [];
		for (no of chord)  sorted.push(Tonal.Midi.midiToNoteName(no));		
		const chords = Tonal.Chord.detect(sorted); // multiple indentifications
		
		if (chords.length > 0) {
			const chordName = (midiNotes.size == 4 && chords.length > 1) ? chords[1] : chords[0];			
			let detectedChord = Tonal.Chord.get(chordName);
			let tonic = Tonal.Midi.toMidi(detectedChord.tonic + "1") % 12;  		
			console.debug("detected chord", detectedChord, midiNotes.size, tonic);
						
			let arrChordType = (detectedChord.type == "suspended fourth" ? "sus" : (detectedChord.type == "minor" ? "min" : (detectedChord.type == "major" ? "maj" : null)));	
			
			if (!arrChordType) {
				arrChordType = "maj";
				detectedChord = Tonal.Chord.get((detectedChord.bass || detectedChord.tonic) + "M");	// use bass otherwise new tonic as root for major chord
				tonic = Tonal.Midi.toMidi(detectedChord.tonic + "1") % 12;
			}
			
			const chordKey = "key" + tonic + "_" + arrChordType + "_" + SECTION_IDS[sectionChange];
			const bassKey = "key" + (chord[0] % 12) + "_" + arrChordType + "_" + SECTION_IDS[sectionChange];			
			const chordSymbol = KEYS[tonic] + arrChordType + (chord.length == 4 ? "/" + KEYS[(chord[0] % 12)] : "");	

			orinayo.innerHTML = chordSymbol.replace("maj", "");	
			
			const chordTable = [0x31, 0x22, 0x32, 0x23, 0x33, 0x34, 0x25, 0x35, 0x26, 0x36, 0x27, 0x37];
			const typeHex = (arrChordType == "sus" ? 0x20 : (arrChordType == "min" ? 0x08 : (arrChordType == "maj7" ? 0x13 : 0x00)));			
			const bassHex = chordTable[chord[0] % 12];
			const rootHex = chordTable[tonic];
			
			activeChord = null;
			pad.axis[STRUM] = STRUM_DOWN;			
			playChord(chord, rootHex, typeHex, bassHex);
			
			midiNotesProceesed = true;	
		}
	}
	
	if (chordTracker) {
		chordTracker.playNote(note.number, channel, {velocity});
	}
	
	if (inputDeviceType == "chorda" && device != "INSTRUMENT1") {
		//console.debug("chorda handleNoteOn", note.number, device, velocity);		
		translateChordaToI1(handleNoteOn, true, note.number, velocity, channel) 	// calls handleNoteOn again with device == INSTRUMENT1	
	}
	else
		
	if (inputDeviceType == "instrument1" || device == "INSTRUMENT1") {
		
		if (!game) {
			setup();
			resetArtiphonI1Buttons();	
			resetArtiphonI1Axis();		
		}	
			
		if (note.number < artiphonI1Base + 10 && note.number >= artiphonI1Base) {			// STRUM UP/DOWN (BRIDGE Buttons)
			console.debug("handleNoteOn - strum up/down", pad.buttons[GREEN], pad.buttons[RED], pad.buttons[YELLOW], pad.buttons[BLUE], pad.buttons[ORANGE]);	

			if (!pad.buttons[GREEN] && !pad.buttons[RED] && !pad.buttons[YELLOW] && !pad.buttons[BLUE] && !pad.buttons[ORANGE] && !pad.buttons[CONTROL] && !pad.buttons[LOGO]) {
				
				if (note.number == artiphonI1Base + 9) {
					pad.axis[TOUCH] = -0.7;
					pad.axis[STRUM] = STRUM_DOWN;			// fill
				}
				else
					
				if (note.number == artiphonI1Base) {
					pad.axis[TOUCH] = -0.7;
					pad.axis[STRUM] = STRUM_UP;				// break
				}
				else				
					
				if (note.number == artiphonI1Base + 7) {
					pad.buttons[START] = false;	
					pad.buttons[STARPOWER] = true;			// next var				
				}				
				else
					
				if (note.number == artiphonI1Base + 5) {
					pad.buttons[START] = true;				// prev var
					pad.buttons[STARPOWER] = false;						
				}
				
				if (!styleStarted) {						
					if (note.number == artiphonI1Base) {
						padFretButton = (127);
						padsMode = 0;	
						seqIndex = 0;	
						orinayo_pad.innerHTML = "None";	
					}
					if (note.number == artiphonI1Base + 4) {
						padFretButton =(126);
						padsMode = 2;	
					}
					if (note.number == artiphonI1Base + 5) {
						padFretButton =(125);	
						padsMode = 3;	
					}
					if (note.number == artiphonI1Base + 7) {
						padFretButton =(124);	
						padsMode = 4;
					}
					if (note.number == artiphonI1Base + 9) {
						padFretButton = (123);
						padsMode = 5;
					}
					
					if (padsMode != 0) orinayo_pad.innerHTML = "Pad " + padsMode;						

					if (padFretButton) {
						if (padsDevice?.stopNote || padsDevice?.name == "soundfont") stopPads();
						const fwdChord = [119];
						fwdChord.push(padFretButton);	
						if (midiRealGuitar) midiRealGuitar.playNote(fwdChord, 1, {velocity});	
						return;
					}
				}
			}
			else
				
			if (gamePadModeButton.innerText == "Color Tabs") {
				
				if (note.number == artiphonI1Base) pad.axis[STRUM] = STRUM_UP;	
				if (note.number == artiphonI1Base + 2) pad.axis[STRUM] = STRUM_DOWN;	
				if (note.number == artiphonI1Base + 4) pad.axis[STRUM] = STRUM_UP;	
				if (note.number == artiphonI1Base + 5) pad.axis[STRUM] = STRUM_DOWN;	
				if (note.number == artiphonI1Base + 7) pad.axis[STRUM] = STRUM_UP;	
				if (note.number == artiphonI1Base + 9) pad.axis[STRUM] = STRUM_DOWN;								
			
			} else if (gamePadModeButton.innerText == "Smart Strums") {
					
				if (note.number == artiphonI1Base) fretButton = (127);	
				if (note.number == artiphonI1Base + 2) fretButton =(126);
				if (note.number == artiphonI1Base + 4) fretButton =(125);	
				if (note.number == artiphonI1Base + 5) fretButton =(124);	
				if (note.number == artiphonI1Base + 7) fretButton = (123);	

				const fwdChord = [fretButton];
				
				if (note.number == artiphonI1Base + 9) {
					pad.axis[STRUM] = STRUM_UP;
					fwdChord.push(122);						
				}
				
				midiRealGuitar.playNote(fwdChord, 1, {velocity});	
				
			} else if (gamePadModeButton.innerText == "Smart Strings") {
					
				if (note.number == artiphonI1Base) fretButton = (127);	
				if (note.number == artiphonI1Base + 2) fretButton =(126);
				if (note.number == artiphonI1Base + 4) fretButton =(125);	
				if (note.number == artiphonI1Base + 5) fretButton =(124);	
				if (note.number == artiphonI1Base + 7) fretButton = (123);	
				
				const fwdChord = [fretButton];			
				
				if (note.number == artiphonI1Base + 9) {
					fwdChord.push(121);	
					pad.axis[STRUM] = STRUM_DOWN;
				} else {
					fwdChord.push(122);	
					pad.axis[STRUM] = STRUM_UP;
					
				}					
				midiRealGuitar.playNote(fwdChord, 1, {velocity});					
			}
				
			if (pad.buttons[LOGO]) 
			{
				if (note.number == artiphonI1Base) pad.buttons[GREEN] = true;
				if (note.number == artiphonI1Base + 2) pad.buttons[RED] = true;
				if (note.number == artiphonI1Base + 4) pad.buttons[YELLOW] = true;
				if (note.number == artiphonI1Base + 5) pad.buttons[BLUE] = true;	
				if (note.number == artiphonI1Base + 7) pad.buttons[ORANGE] = true;			
			}				
		}
		else				

		if (note.number == artiphonI1Base + 24) {			// GREEN	
			pad.buttons[GREEN] = true;			
		}
		else 
			
		if (note.number == artiphonI1Base + 26) {			// RED		
			pad.buttons[RED] = true;				
		}
		else 
			
		if (note.number == artiphonI1Base + 28) {			// YELLOW		
			pad.buttons[YELLOW] = true;			
		}
		else 
			
		if (note.number == artiphonI1Base + 29) {			// BLUE		
			pad.buttons[BLUE] = true;
		}
		else 
			
		if (note.number == artiphonI1Base + 31) {			// ORANGE		
			pad.buttons[ORANGE] = true;	
		}	
		else 
			
		if (note.number == artiphonI1Base + 33) {			// FILL, NEXT and PREV				
			pad.buttons[CONTROL] = true;				
		}		
		else 
			
		if (note.number == artiphonI1Base + 35) {			// INTRO, END, START, STOP			
			pad.buttons[LOGO] = true;						// requires strum up/down to execute
		}		
		
		if (midiRealGuitar && gamePadModeButton.innerText == "Color Tabs") {
			const fwdChord = [];
			if (pad.buttons[GREEN]) fwdChord.push(127);						
			if (pad.buttons[RED]) fwdChord.push(126);
			if (pad.buttons[YELLOW]) fwdChord.push(125);						
			if (pad.buttons[BLUE]) fwdChord.push(124);
			if (pad.buttons[ORANGE]) fwdChord.push(123);
			if (pad.axis[STRUM] == STRUM_UP) fwdChord.push(122);								
			if (pad.axis[STRUM] == STRUM_DOWN) fwdChord.push(121);						
			
			if (fwdChord.length > 0) midiRealGuitar.playNote(fwdChord, 1, {velocity});
		}

		updateCanvas();	

		if (pad.axis[STRUM] == STRUM_UP || pad.axis[STRUM] == STRUM_DOWN || pad.buttons[START] || pad.buttons[STARPOWER]) {			
			doChord();				
		}
	}

}

function resetArtiphonI1Buttons() {
	for (var i=0; i<20; i++) {	  
	  pad.buttons[i] = false;
	}	
}

function resetArtiphonI1Axis() {
	for (var i=0; i<20; i++) {	  
	  pad.axis[i] = 0;
	}	
}

function resetGuitarHero() {
	for (var i=0; i<20; i++) {	  
	  pad.buttons[i] = false;
	  pad.axis[i] = 0;
	}	
}

function connectHandler(e) {
  console.debug("connectHandler " + e.gamepad.id, e.gamepad);	
  
  if (e.gamepad.id.indexOf("Guitar") > -1 || (e.gamepad.id.indexOf("248a") > -1 && e.gamepad.id.indexOf("8266") > -1) || e.gamepad.id == "Xbox 360 Controller for Windows (STANDARD GAMEPAD)" || e.gamepad.id == "DS4 Wired Controller (Vendor: 7545 Product: 1073)") {
	console.debug("connectHandler found gamepad " + e.gamepad.id, e.gamepad);
	
	inputDeviceType = "games-controller";
	if (!game) setup();
		  
	for (var i=0; i<e.gamepad.buttons.length; i++) {	  
	  pad.buttons[i] = false;
	}
	
	pad.axis[STRUM] = 0;
	
	window.setTimeout(updateStatus);  
  }
}

function disconnectHandler(e) {
  if (e.gamepad.id.indexOf("Guitar ") > -1)
  {
	  console.debug("removing guitar");	  
  }
}

function updateStatus() {
	var guitar = null
	var ring = null
	var riffMasterXbox = null;
	var riffMasterPS = null;
	var ds4WiredController = null;	
	
	var gamepads = navigator.getGamepads();	
	  
	for (var i = 0; i < gamepads.length; i++) {
		//console.debug("found gamepad " + gamepads[i].id, gamepads[i]);

		if (gamepads[i] && gamepads[i].id.indexOf("PDP RiffMaster Guitar") > -1) {
		  riffMasterPS = gamepads[i];
		  guitarAvailable = true;
		  break;
		}
		else
			
		if (gamepads[i] && gamepads[i].id.indexOf("DS4 Wired Controller (Vendor: 7545 Product: 1073)") > -1) {
		  ds4WiredController = gamepads[i];
		  guitarAvailable = true;
		  break;
		}
		else
			
		if (gamepads[i] && gamepads[i].id.indexOf("Guitar") > -1) {
		  guitar = gamepads[i];
		  guitarAvailable = true;
		  break;
		}
		else 
			
		if (gamepads[i] && gamepads[i].id.indexOf("248a") > -1 && gamepads[i].id.indexOf("8266") > -1) {
		  ring = gamepads[i];
		  guitarAvailable = true;
		  break;
		}
		else
			
		if (gamepads[i] && gamepads[i].id.indexOf("Xbox 360 Controller for Windows (STANDARD GAMEPAD)") > -1) {
		  riffMasterXbox = gamepads[i];
		  guitarAvailable = true;
		  break;
		}		
	
	}
	
	var updated = false;

	if (ring) {	
		for (var i=0; i<ring.buttons.length; i++) 
		{
			var val = ring.buttons[i];
			var touched = false;							
		  
			if (typeof(val) == "object") {	  			
				if ('touched' in val) {
				  touched = val.touched;
				}			
			}
		  
			if (pad.buttons[i] != touched) {
				console.debug("button " + i, touched, ring.axes[0], ring.axes[1]);									
				pad.buttons[i] = touched;
				//updated = true;
			}
		}

	}
	else	
		
	if (ds4WiredController) {
		//console.debug("using ds4 controller" + ds4WiredController.id, ds4WiredController);
		
		for (var i=0; i<ds4WiredController.buttons.length; i++) 
		{
			var val = ds4WiredController.buttons[i];
			var touched = false;							
		  
			if (typeof(val) == "object") 
			{	  			
				if ('touched' in val) {
				  touched = val.touched;
				}			
			}

			let j = i;
			if (i == BLUE) j = YELLOW;
			if (i == YELLOW) j = BLUE;	
			//if (i == 11) j = LOGO;
			//if (i == LOGO) j = 11;
			
			if (pad.buttons[j] != touched) {
				console.debug("button " + i, j, touched);									
				pad.buttons[j] = touched;
				updated = true;
			}
			
			
			if (i == 10) {
				pad.axis[TOUCH] = 0;
				
				if (pad.buttons[10]) {
					if (pad.buttons[GREEN]) pad.axis[TOUCH] = -0.7;	
					if (pad.buttons[RED]) pad.axis[TOUCH] = -0.4; 	
					if (pad.buttons[YELLOW]) pad.axis[TOUCH] = 0.2;	
					if (pad.buttons[BLUE]) pad.axis[TOUCH] = 0.4; 				
					if (pad.buttons[ORANGE]) pad.axis[TOUCH] = 1.0; 
					
					pad.buttons[GREEN] = false;
					pad.buttons[RED] = false;
					pad.buttons[YELLOW] = false;
					pad.buttons[BLUE] = false;
					pad.buttons[ORANGE] = false;					
				}					
			}			
		}
		
		if (ds4WiredController.axes.length > STRUM) 
		{			
			if (pad.axis[STRUM] != ds4WiredController.axes[STRUM].toFixed(4)) {
				//console.debug("strum", ds4WiredController.axes[STRUM].toFixed(4));							
				pad.axis[STRUM] = ds4WiredController.axes[STRUM].toFixed(4);
				updated = true;
			}

			if (pad.axis[JSTICKX] != ds4WiredController.axes[JSTICKX].toFixed(1)) {
				console.debug("joy stick X", ds4WiredController.axes[JSTICKX].toFixed(1));							
				pad.axis[JSTICKX] = ds4WiredController.axes[JSTICKX].toFixed(1);
				
				if (pad.axis[JSTICKX] == 1.0) {
					pad.buttons[LOGO] = true;
					updated = true;				
				}
			}	

			if (pad.axis[JSTICKY] != ds4WiredController.axes[JSTICKY].toFixed(1)) {
				console.debug("joy stick Y", ds4WiredController.axes[JSTICKY].toFixed(1));							
				pad.axis[JSTICKY] = ds4WiredController.axes[JSTICKY].toFixed(1);
				updated = true;				
			}			
		}		

	}		
	else	
		
	if (riffMasterXbox) {
		//console.debug("using riff master" + riffMasterXbox.id, riffMasterXbox);
		
		pad.axis[STRUM] = 0;
		
		for (var i=0; i<riffMasterXbox.buttons.length; i++) {
			var touched = false;	
			var val = riffMasterXbox.buttons[i];		
		  
			if (typeof(val) == "object") 
			{	  			
				if ('touched' in val) {
				  touched = val.touched;
				}			
			}
			
			let j = i;
			if (i == 0) j = GREEN;
			if (i == 1) j = RED;				
			if (i == 3) j = YELLOW;
			if (i == 2) j = BLUE;			
			if (i == 4) j = ORANGE;	
			if (i == 8) j = START;			
			if (i == 9) j = STARPOWER;			
			
			if (i == 12) j = 112;				
			if (i == 13) j = 113;			

			if (pad.buttons[j] != touched) {
				console.debug("button " + j, touched);	
				
				if (i == 12 || i == 13) {			
					if (touched) {
						pad.axis[STRUM] = (i == 12) ? STRUM_UP : STRUM_DOWN;
						updated = true;						
					}
					
				} 
				else
					
				if (i == 10) 	// Lower keys
				{
					if (pad.buttons[GREEN]) {
						pad.buttons[LOGO] = touched;
					}
					else

					if (pad.buttons[RED]) {						
						pad.axis[TOUCH] = -0.7;
						pad.axis[STRUM] = STRUM_DOWN;			// fill
					}
					else

					if (pad.buttons[YELLOW]) {						
						pad.axis[TOUCH] = -0.7;
						pad.axis[STRUM] = STRUM_UP;			// break
					}					
					
					updated = true;					
					
					pad.buttons[GREEN] = false;
					pad.buttons[RED] = false;
					pad.buttons[YELLOW] = false;
					pad.buttons[BLUE] = false;
					pad.buttons[ORANGE] = false;					
				} 				
				
				else {
					updated = true;
				}
				
				pad.buttons[j] = touched;				
			}					
		}
	}
	else
  
	if (guitar) {				
		//console.debug("using guitar" + guitar.id, guitar);
				
		for (var i=0; i<guitar.buttons.length; i++) 
		{
			var val = guitar.buttons[i];
			var touched = false;
			
			if (typeof(val) == "object") 
			{	  			
				if ('touched' in val) {
				  touched = val.touched;
				}			
			}			  
			
			if (mobileCheck()) {				
				let j = i;
				
				if (i == 0) j = YELLOW;
				if (i == 1) j = GREEN;	
				if (i == 2) j = BLUE;					
				if (i == 3) j = ORANGE;	
				
				if (i == 7) j = START;			
				if (i == 6) j = STARPOWER;								
				if (i == 16) j = LOGO;	

				if (i == 12) j = 112;				
				if (i == 13) j = 113;				
				if (i == 14) j = 114;				
				if (i == 15) j = 115;				

				if (pad.buttons[j] != touched) {
					console.debug("button " + j, touched);	
					
					if (i == 12 || i == 13 || i == 14 || i == 15) { // stum action	

						if (touched) {
							pad.axis[STRUM] = (i == 12 ? STRUM_UP : (i == 13 ? STRUM_DOWN : (i == 14 ? STRUM_LEFT : STRUM_RIGHT)));
							updated = true;	
							
							if (!pad.buttons[YELLOW] && !pad.buttons[GREEN]	&& !pad.buttons[BLUE] && !pad.buttons[ORANGE] && pad.axis[STRUM] != STRUM_LEFT && pad.axis[STRUM] != STRUM_RIGHT ) {
								pad.buttons[RED] = true;
							} else {
								pad.buttons[RED] = false;
							}
						}

						pad.buttons[j] = touched;							
					} 
					else

					if (i == 6 || i == 7 || i == 16) {			// style action
						updated = true;
						pad.buttons[j] = touched;							
					}					
					else
						
					if (i == 0 || i == 1 || i == 2 || i == 3) {
						pad.buttons[j] = touched;						
					}													
				}				
				
			} else {
		  
				if (pad.buttons[i] != touched) {
					//console.debug("button " + i, touched);									
					pad.buttons[i] = touched;
					updated = true;
				}	
			}				
		}
		
		if (guitar.axes.length > STRUM) 
		{			
			if (pad.axis[STRUM] != guitar.axes[STRUM].toFixed(4)) {
				//console.debug("strum", guitar.axes[STRUM].toFixed(4));							
				pad.axis[STRUM] = guitar.axes[STRUM].toFixed(4);
				updated = true;
			}

			if (pad.axis[TOUCH] != guitar.axes[TOUCH].toFixed(1)) {
				//console.debug("touch", guitar.axes[TOUCH].toFixed(1));							
				pad.axis[TOUCH] = guitar.axes[TOUCH].toFixed(1);
				updated = true;				
			}	

			if (pad.axis[WHAMMY] != guitar.axes[WHAMMY].toFixed(1)) {
				//console.debug("whammy", guitar.axes[WHAMMY].toFixed(1));							
				pad.axis[WHAMMY] = guitar.axes[WHAMMY].toFixed(1);
				updated = true;				
			}			
		}				
	}
	else
  
	if (riffMasterPS) {				
		//console.debug("using guitar" + riffMasterPS.id, riffMasterPS);
		
		for (var i=0; i<riffMasterPS.buttons.length; i++) 
		{
			var val = riffMasterPS.buttons[i];
			var touched = false;							
		  
			if (typeof(val) == "object") 
			{	  			
				if ('touched' in val) {
				  touched = val.touched;
				}			
			}

			let j = i;
			if (i == BLUE) j = YELLOW;
			if (i == YELLOW) j = BLUE;	
			//if (i == 11) j = LOGO;
			//if (i == LOGO) j = 11;
			
			if (pad.buttons[j] != touched) {
				console.debug("button " + i, j, touched);									
				pad.buttons[j] = touched;
				updated = true;
			}
			
			
			if (i == 10) {
				pad.axis[TOUCH] = 0;
				
				if (pad.buttons[10]) {
					if (pad.buttons[GREEN]) pad.axis[TOUCH] = -0.7;	
					if (pad.buttons[RED]) pad.axis[TOUCH] = -0.4; 	
					if (pad.buttons[YELLOW]) pad.axis[TOUCH] = 0.2;	
					if (pad.buttons[BLUE]) pad.axis[TOUCH] = 0.4; 				
					if (pad.buttons[ORANGE]) pad.axis[TOUCH] = 1.0; 
					
					pad.buttons[GREEN] = false;
					pad.buttons[RED] = false;
					pad.buttons[YELLOW] = false;
					pad.buttons[BLUE] = false;
					pad.buttons[ORANGE] = false;					
				}					
			}			
		}	
		if (riffMasterPS.axes.length > STRUM) 
		{			
			if (pad.axis[STRUM] != riffMasterPS.axes[STRUM].toFixed(4)) {
				//console.debug("strum", riffMasterPS.axes[STRUM].toFixed(4));							
				pad.axis[STRUM] = riffMasterPS.axes[STRUM].toFixed(4);
				updated = true;
			}

			if (pad.axis[JSTICKX] != riffMasterPS.axes[JSTICKX].toFixed(1)) {
				console.debug("joy stick X", riffMasterPS.axes[JSTICKX].toFixed(1));							
				pad.axis[JSTICKX] = riffMasterPS.axes[JSTICKX].toFixed(1);
				
				if (pad.axis[JSTICKX] == 1.0) {
					pad.buttons[LOGO] = true;
					updated = true;				
				}
			}	

			if (pad.axis[JSTICKY] != riffMasterPS.axes[JSTICKY].toFixed(1)) {
				console.debug("joy stick Y", riffMasterPS.axes[JSTICKY].toFixed(1));							
				pad.axis[JSTICKY] = riffMasterPS.axes[JSTICKY].toFixed(1);
				updated = true;				
			}			
		}				
	}	
		
	if (updated) {
		if (styleStarted && songSequence) {
			handleSongMode();
		} else {
			doChord();
		}
		updateCanvas();
		
		if (riffMasterXbox) {
			pad.buttons[LOGO] = false;
			pad.axis[TOUCH] = 0;
		}
		else	

		if (mobileCheck()) {
			pad.buttons[GREEN] = false;
			pad.buttons[RED] = false;
			pad.buttons[YELLOW] = false;
			pad.buttons[BLUE] = false;
			pad.buttons[ORANGE] = false;
		}
		else	
			
		if (riffMasterPS) {	
			pad.buttons[LOGO] = false;		
			pad.axis[TOUCH] = 0;
		}	
	}	
	
	window.setTimeout(updateStatus);
}

function handleSongMode() {
	let processed = false;
	
	if ((pad.buttons[YELLOW] || pad.buttons[BLUE] || pad.buttons[ORANGE] || pad.buttons[RED] || pad.buttons[GREEN]) && !pad.buttons[START] && !pad.buttons[STARPOWER]) {		
		processed = true;
	}	
	
	if (!processed) {
		doChord();
	}
}

function letsGo(config) {
	console.debug("letsGo", config, WebMidi);
	playButton.innerHTML = "On";	
	
    WebMidi.enable(async function (err) {	  
	  setupUI(config, err);		  
	  const enable_xmpp = localStorage.getItem("collaboration_server.enable_xmpp");
	  
	  if (enable_xmpp && JSON.parse(enable_xmpp) == true) {
		startXMPP();  
	  }
	  
    }, true);
}

function normaliseSffStyle() {
	if (arrSequence.data["Main A"] && arrSequence.data["Fill In AA"]) 
	{
		if (!arrSequence.data["Main B"] || arrSequence.data["Main B"].length == 0) {
			arrSequence.data["Main B"] = JSON.parse(JSON.stringify(arrSequence.data["Main A"]));
			arrSequence.data["Fill In BB"] = JSON.parse(JSON.stringify(arrSequence.data["Fill In AA"]));		
		}
		
		if (!arrSequence.data["Main C"] || arrSequence.data["Main C"].length == 0) {
			arrSequence.data["Main C"] = JSON.parse(JSON.stringify(arrSequence.data["Main A"]));
			arrSequence.data["Fill In CC"] = JSON.parse(JSON.stringify(arrSequence.data["Fill In AA"]));		
		}	
		
		if (!arrSequence.data["Main D"] || arrSequence.data["Main D"].length == 0) {
			arrSequence.data["Main D"] = JSON.parse(JSON.stringify(arrSequence.data["Main B"]));
			arrSequence.data["Fill In DD"] = JSON.parse(JSON.stringify(arrSequence.data["Fill In BB"]));		
		}	
		
		if (!arrSequence.data["Fill In BB"] || arrSequence.data["Fill In BB"].length == 0) {
			arrSequence.data["Fill In BB"] = JSON.parse(JSON.stringify(arrSequence.data["Fill In AA"]));		
		}		

		if (!arrSequence.data["Fill In DD"] || arrSequence.data["Fill In DD"].length == 0) {
			arrSequence.data["Fill In DD"] = JSON.parse(JSON.stringify(arrSequence.data["Fill In BB"]));		
		}

		if (!arrSequence.data["Fill In CC"] || arrSequence.data["Fill In CC"].length == 0) {
			arrSequence.data["Fill In CC"] = JSON.parse(JSON.stringify(arrSequence.data["Fill In AA"]));		
		}	
				
		const bpm = Math.floor(60 /(arrSequence.data.Hdr.setTempo.microsecondsPerBeat / 1000000))
		if (!registration || registration == 0) setTempo(bpm);	
		
		const initHdr = arrSequence.data["SFF1"] || arrSequence.data["SFF2"];
		
		if (initHdr && midiOutput) 
		{
			for (let event of initHdr) 
			{			
				if (event.type == "sysEx") {
					const params = new Uint8Array(event.data);
					const manufacturer = params[0];
					const ops = [];
					for (let i=1; i<params.length - 1; i++) ops.push(params[i]);
					
					console.debug("SFF sysEx", manufacturer, ops)	
					midiOutput.sendSysex(manufacturer, ops);				
				}				
			}
		}	
	}		
}

async function setupUI(config, err) {	
	console.debug("setupUI", config);
	
	//guitarDeviceId = config.guitarDeviceId;
	tempo = config.tempo ? config.tempo : tempo;
	guitarVolume = config.guitarVolume ? config.guitarVolume : guitarVolume;
	savedGuitarVolume = guitarVolume;
	bassVol = config.bassVol ? config.bassVol : bassVol;	
	drumVol = config.drumVol ? config.drumVol : drumVol;
	chordVol = config.chordVol ? config.chordVol : chordVol;
	keysSound1Vol = config.keysSound1Vol ? config.keysSound1Vol : keysSound1Vol;
	keysSound2Vol = config.keysSound2Vol ? config.keysSound2Vol : keysSound2Vol;	
	keysSound3Vol = config.keysSound3Vol ? config.keysSound3Vol : keysSound3Vol;	
	
	savedDrumVol = drumVol;
	savedBassVol = bassVol;	
	savedChordVol = chordVol;
	
	keyChange = config.keyChange ? config.keyChange : keyChange;
	dokeyChange();
	
	const midiIn = document.getElementById("midiInSel");
	const midiOut = document.getElementById("midiOutSel");
	const midiFwd = document.getElementById("midiFwdSel");
	const midiPads = document.getElementById("midiPadsSel");	
	const midiChordTracker = document.getElementById("midiChordTrackerSel");
	const songSeq = document.getElementById("songSequence");	
	const realguitar = document.getElementById("realguitar");
	
	let realGuitarIndex = 0;
	
	realguitar.options[0] = new Option("NOT USED", "none", config.realguitar == "none");
	realguitar.options[1] = new Option("Internal Guitar", "Internal_Guitar", config.realguitar == "Internal_Guitar");			
	realguitar.options[2] = new Option("Funk One - 16th (90-120 BPM)", "Funk1_S_16th_90_120", config.realguitar == "Funk1_S_16th_90_120");			
	realguitar.options[3] = new Option("Funk Three - 16th (90-120 BPM)", "Funk3_S_16th_90_120", config.realguitar == "Funk3_S_16th_90_120");
	realguitar.options[4] = new Option("4'4 Basic Strum 8th (100-200 BPM)", "Basic_B44_8th_100_200", config.realguitar == "Basic_B44_8th_100_200");
	realguitar.options[5] = new Option("4'4 Basic Picking 16th (50-90 BPM)", "Basic_P44_16T_50_90", config.realguitar == "Basic_P44_16T_50_90");

	realGuitarIndex = config.realGuitarStyle == "Internal_Guitar" 		? 1 : realGuitarIndex;
	realGuitarIndex = config.realGuitarStyle == "Funk1_S_16th_90_120" 	? 2 : realGuitarIndex;
	realGuitarIndex = config.realGuitarStyle == "Funk3_S_16th_90_120" 	? 3 : realGuitarIndex;				
	realGuitarIndex = config.realGuitarStyle == "Basic_B44_8th_100_200" ? 4 : realGuitarIndex;			
	realGuitarIndex = config.realGuitarStyle == "Basic_P44_16T_50_90" 	? 5 : realGuitarIndex;			
	realguitar.selectedIndex = realGuitarIndex;			
	realGuitarStyle = config.realGuitarStyle || "none";	
	
	if (window[realGuitarStyle]) {
		rgIndex = config.rgIndex || rgIndex;
		nextRgIndex = rgIndex;
		orinayo_strum.innerHTML = "Strum " + (rgIndex + 1) + "/" + window[realGuitarStyle].length;	
	}	

	const arrangerStyle =  document.getElementById("arrangerStyle");
	const arrangerGrp = document.getElementById("arrangerGroup");
	arrangerGroup = config.arrangerGroup || "yamaha";	
	
	arrangerGrp.options[0] = new Option("Imported Styles", "imported", arrangerGroup == "imported", arrangerGroup == "imported");
	arrangerGrp.options[1] = new Option("Yamaha PSR", "yamaha", arrangerGroup == "yamaha", arrangerGroup == "yamaha");
	arrangerGrp.options[2] = new Option("Ketron KST", "ketron", arrangerGroup == "ketron", arrangerGroup == "ketron");
	arrangerGrp.options[3] = new Option("Casio AC7", "casio", arrangerGroup == "casio", arrangerGroup == "casio");	
	arrangerGrp.options[4] = new Option("JJazzLab Community", "jjazzlab", arrangerGroup == "jjazzlab", arrangerGroup == "jjazzlab");
	arrangerGrp.options[5] = new Option("Soft Arranger", "sas", arrangerGroup == "sas", arrangerGroup == "sas");
	
	arrangerGrp.addEventListener("change", function()
	{
		createStyleList(config, arrangerStyle, arrangerGrp);
		
		if (arrangerGrp.selectedIndex == 0) arrangerGroup = "imported";
		if (arrangerGrp.selectedIndex == 1) arrangerGroup = "yamaha";
		if (arrangerGrp.selectedIndex == 2) arrangerGroup = "ketron";
		if (arrangerGrp.selectedIndex == 3) arrangerGroup = "casio";
		if (arrangerGrp.selectedIndex == 4) arrangerGroup = "jjazzlab";	
		if (arrangerGrp.selectedIndex == 5) arrangerGroup = "sas";		
		saveConfig();			
	});		
	
	createStyleList(config, arrangerStyle, arrangerGrp);
		
	const arrangerSf2 =  document.getElementById("arrangerSf2");
	arrangerSf2.options[0] = new Option("NOT USED", "arrangerSf2");	
	let sf2Selected = false;
	let iSf2 = 0;	
	
	indexedDB.databases().then(function (databases) 
	{
		databases.forEach(function (db) {
			console.debug("found database", db.name);
			
			if (db.name.toLowerCase().endsWith(".sf2")) {
				iSf2++;
				sf2Selected = config.sf2Name == db.name;
				arrangerSf2.options[iSf2] = new Option(db.name, db.name, sf2Selected, sf2Selected);				
			}
			else 
				
			if (db.name.toLowerCase().endsWith(".mid")) {
				song_sequences.unshift(db.name);
			}				
		});
		
		songSeq.options[0] = new Option("NOT USED", "songSeq");
		songSeq.options[1] = new Option("ChordPro Playback", "playback");
		
		for (var i=0; i<song_sequences.length; i++) {
			let selectedSong = false;
			const url = song_sequences[i];
			const songName = url.substring(url.lastIndexOf("/") + 1);	
			
			if (config?.songName == url) {
				selectedSong = true;
				songSequence = {name: url};				
			}
			songSeq.options[i + 2] = new Option(songName, url, selectedSong, selectedSong);
		}			
	})		
	
	const liberLiveChords = [];
	
	for (let i=1; i<3; i++) {
		liberLiveChords[i] = document.getElementById("ll-chord" + i);
		liberLiveChords[i].options[0] = new Option("Basic Single Strum", "1/0", config["liberLiveChrd" + i] == "1/0", config["liberLiveChrd" + i] == "1/0");			
		liberLiveChords[i].options[1] = new Option("Basic Picking 1", "2/0", config["liberLiveChrd" + i] == "2/0", config["liberLiveChrd" + i] == "2/0");					
		liberLiveChords[i].options[2] = new Option("Basic Picking 2", "3/0", config["liberLiveChrd" + i] == "3/0", config["liberLiveChrd" + i] == "3/0");			
		liberLiveChords[i].options[3] = new Option("Basic Column 2", "4/0", config["liberLiveChrd" + i] == "4/0", config["liberLiveChrd" + i] == "4/0");					
		liberLiveChords[i].options[4] = new Option("Basic Column 1", "5/0", config["liberLiveChrd" + i] == "5/0", config["liberLiveChrd" + i] == "5/0");			
		liberLiveChords[i].options[5] = new Option("Picking Subway", "1/1", config["liberLiveChrd" + i] == "1/1", config["liberLiveChrd" + i] == "1/1");					
		liberLiveChords[i].options[6] = new Option("Picking Paper Plane", "2/1", config["liberLiveChrd" + i] == "2/1", config["liberLiveChrd" + i] == "2/1");					
		liberLiveChords[i].options[7] = new Option("Picking Hotel", "3/1", config["liberLiveChrd" + i] == "3/1", config["liberLiveChrd" + i] == "3/1");					
		liberLiveChords[i].options[8] = new Option("Picking Memory", "4/1", config["liberLiveChrd" + i] == "4/1", config["liberLiveChrd" + i] == "4/1");					
		liberLiveChords[i].options[9] = new Option("Picking Remember", "5/1", config["liberLiveChrd" + i] == "5/1", config["liberLiveChrd" + i] == "5/1");					
		liberLiveChords[i].options[10] = new Option("Picking Glance", "6/1", config["liberLiveChrd" + i] == "6/1", config["liberLiveChrd" + i] == "6/1");					
		liberLiveChords[i].options[11] = new Option("Picking Trouble", "7/1", config["liberLiveChrd" + i] == "7/1", config["liberLiveChrd" + i] == "7/1");					
		liberLiveChords[i].options[12] = new Option("Picking Honey", "8/1", config["liberLiveChrd" + i] == "8/1", config["liberLiveChrd" + i] == "8/1");					
		liberLiveChords[i].options[13] = new Option("Picking Obsessed", "9/1", config["liberLiveChrd" + i] == "9/1", config["liberLiveChrd" + i] == "9/1");					
		liberLiveChords[i].options[14] = new Option("Picking Lapse", "11/1", config["liberLiveChrd" + i] == "11/1", config["liberLiveChrd" + i] == "11/1");					
		liberLiveChords[i].options[15] = new Option("Picking Family", "13/1", config["liberLiveChrd" + i] == "13/1", config["liberLiveChrd" + i] == "13/1");					
		liberLiveChords[i].options[16] = new Option("Picking Kid", "14/1", config["liberLiveChrd" + i] == "14/1", config["liberLiveChrd" + i] == "14/1");					
		liberLiveChords[i].options[17] = new Option("Picking Waltz (3/4)", "20/1", config["liberLiveChrd" + i] == "20/1", config["liberLiveChrd" + i] == "20/1");					
		liberLiveChords[i].options[18] = new Option("Picking Mortal (6/8)", "22/1", config["liberLiveChrd" + i] == "22/1", config["liberLiveChrd" + i] == "22/1");					
		liberLiveChords[i].options[19] = new Option("Picking Dairy (6/8)", "23/1", config["liberLiveChrd" + i] == "23/1", config["liberLiveChrd" + i] == "23/1");					
		liberLiveChords[i].options[20] = new Option("Strum Skyline", "1/2", config["liberLiveChrd" + i] == "1/2", config["liberLiveChrd" + i] == "1/2");					
		liberLiveChords[i].options[21] = new Option("Strum Freedom", "2/2", config["liberLiveChrd" + i] == "2/2", config["liberLiveChrd" + i] == "2/2");					
		liberLiveChords[i].options[22] = new Option("Strum Verse", "3/2", config["liberLiveChrd" + i] == "3/2", config["liberLiveChrd" + i] == "3/2");					
		liberLiveChords[i].options[23] = new Option("Strum Away", "4/2", config["liberLiveChrd" + i] == "4/2", config["liberLiveChrd" + i] == "4/2");					
		liberLiveChords[i].options[24] = new Option("Strum Strange", "6/2", config["liberLiveChrd" + i] == "6/2", config["liberLiveChrd" + i] == "6/2");					
		liberLiveChords[i].options[25] = new Option("Strum Wind", "7/2", config["liberLiveChrd" + i] == "7/2", config["liberLiveChrd" + i] == "7/2");					
		liberLiveChords[i].options[26] = new Option("Strum Apart", "8/2", config["liberLiveChrd" + i] == "8/2", config["liberLiveChrd" + i] == "8/2");					
		liberLiveChords[i].options[27] = new Option("Strum Luggage", "9/2", config["liberLiveChrd" + i] == "9/2", config["liberLiveChrd" + i] == "9/2");					
		liberLiveChords[i].options[28] = new Option("Strum Train", "32/2", config["liberLiveChrd" + i] == "32/2", config["liberLiveChrd" + i] == "32/2");					
		liberLiveChords[i].options[29] = new Option("Strum After School", "33/2", config["liberLiveChrd" + i] == "33/2", config["liberLiveChrd" + i] == "33/2");					
		liberLiveChords[i].options[30] = new Option("Strum Rock", "36/2", config["liberLiveChrd" + i] == "36/2", config["liberLiveChrd" + i] == "36/2");					
		liberLiveChords[i].options[31] = new Option("Strum Old Town (6/8)", "38/2", config["liberLiveChrd" + i] == "38/2", config["liberLiveChrd" + i] == "38/2");					
		liberLiveChords[i].options[32] = new Option("Performance Nibble", "1/3", config["liberLiveChrd" + i] == "1/3", config["liberLiveChrd" + i] == "1/3");					
		liberLiveChords[i].options[33] = new Option("Performance Heels", "2/3", config["liberLiveChrd" + i] == "2/3", config["liberLiveChrd" + i] == "2/3");					
		liberLiveChords[i].options[34] = new Option("Performance Juliet", "3/3", config["liberLiveChrd" + i] == "3/3", config["liberLiveChrd" + i] == "3/3");					
		liberLiveChords[i].options[35] = new Option("Performance Garden", "4/3", config["liberLiveChrd" + i] == "4/3", config["liberLiveChrd" + i] == "4/3");					
		liberLiveChords[i].options[36] = new Option("Performance Battle", "5/3", config["liberLiveChrd" + i] == "5/3", config["liberLiveChrd" + i] == "5/3");					
		liberLiveChords[i].options[37] = new Option("Performance Lemon", "6/3", config["liberLiveChrd" + i] == "6/3", config["liberLiveChrd" + i] == "6/3");					
		liberLiveChords[i].options[38] = new Option("Performance Encounter", "7/3", config["liberLiveChrd" + i] == "7/3", config["liberLiveChrd" + i] == "7/3");					
		liberLiveChords[i].options[39] = new Option("Performance Hearbeat", "8/3", config["liberLiveChrd" + i] == "8/3", config["liberLiveChrd" + i] == "8/3");					
		liberLiveChords[i].options[40] = new Option("Performance Journey", "9/3", config["liberLiveChrd" + i] == "9/3", config["liberLiveChrd" + i] == "9/3");					
		liberLiveChords[i].options[41] = new Option("Performance Waiting", "10/3", config["liberLiveChrd" + i] == "10/3", config["liberLiveChrd" + i] == "10/3");					
		liberLiveChords[i].options[42] = new Option("Performance Seasoned", "11/3", config["liberLiveChrd" + i] == "11/3", config["liberLiveChrd" + i] == "11/3");					
		liberLiveChords[i].options[43] = new Option("Performance Tide", "13/3", config["liberLiveChrd" + i] == "13/3", config["liberLiveChrd" + i] == "13/3");					
		liberLiveChords[i].options[44] = new Option("Performance Tipsy", "15/3", config["liberLiveChrd" + i] == "15/3", config["liberLiveChrd" + i] == "15/3");					
		liberLiveChords[i].options[45] = new Option("Performance Bell", "17/3", config["liberLiveChrd" + i] == "17/3", config["liberLiveChrd" + i] == "17/3");					
		liberLiveChords[i].options[46] = new Option("Performance Drug", "18/3", config["liberLiveChrd" + i] == "18/3", config["liberLiveChrd" + i] == "18/3");					
		liberLiveChords[i].options[47] = new Option("Performance Moon", "19/3", config["liberLiveChrd" + i] == "19/3", config["liberLiveChrd" + i] == "19/3");					
		liberLiveChords[i].options[48] = new Option("Performance Wander", "20/3", config["liberLiveChrd" + i] == "20/3", config["liberLiveChrd" + i] == "20/3");					
		liberLiveChords[i].options[49] = new Option("Performance Red Wine", "21/3", config["liberLiveChrd" + i] == "21/3", config["liberLiveChrd" + i] == "21/3");					
		liberLiveChords[i].options[50] = new Option("Performance Sweet Pick", "31/3", config["liberLiveChrd" + i] == "31/3", config["liberLiveChrd" + i] == "31/3");					
		liberLiveChords[i].options[51] = new Option("Piano Column 1", "0/4", config["liberLiveChrd" + i] == "0/4", config["liberLiveChrd" + i] == "0/4");					
		liberLiveChords[i].options[52] = new Option("Piano Column 2", "3/4", config["liberLiveChrd" + i] == "3/4", config["liberLiveChrd" + i] == "3/4");					
		liberLiveChords[i].options[53] = new Option("Piano Arpeggio 1", "4/4", config["liberLiveChrd" + i] == "4/4", config["liberLiveChrd" + i] == "4/4");					
		liberLiveChords[i].options[54] = new Option("Piano Arpeggio 2", "5/4", config["liberLiveChrd" + i] == "5/4", config["liberLiveChrd" + i] == "5/4");					
		liberLiveChords[i].options[55] = new Option("Piano Letter", "7/4", config["liberLiveChrd" + i] == "7/4", config["liberLiveChrd" + i] == "7/4");					
		liberLiveChords[i].options[56] = new Option("Piano Moonlight", "10/4", config["liberLiveChrd" + i] == "10/4", config["liberLiveChrd" + i] == "10/4");					
		liberLiveChords[i].options[57] = new Option("Piano Hesitate", "11/4", config["liberLiveChrd" + i] == "11/4", config["liberLiveChrd" + i] == "11/4");					
		liberLiveChords[i].options[58] = new Option("Piano Footprint", "12/4", config["liberLiveChrd" + i] == "12/4", config["liberLiveChrd" + i] == "12/4");					
		liberLiveChords[i].options[59] = new Option("Piano Chords", "21/4", config["liberLiveChrd" + i] == "21/4", config["liberLiveChrd" + i] == "21/4");					
		liberLiveChords[i].options[60] = new Option("Piano Embrace", "23/4", config["liberLiveChrd" + i] == "23/4", config["liberLiveChrd" + i] == "23/4");					
		liberLiveChords[i].options[61] = new Option("Piano Past", "24/4", config["liberLiveChrd" + i] == "24/4", config["liberLiveChrd" + i] == "24/4");					
		liberLiveChords[i].options[62] = new Option("Piano Cotton", "25/4", config["liberLiveChrd" + i] == "25/4", config["liberLiveChrd" + i] == "25/4");					
		liberLiveChords[i].options[63] = new Option("Piano Cloud Ladder", "26/4", config["liberLiveChrd" + i] == "26/4", config["liberLiveChrd" + i] == "26/4");					
		liberLiveChords[i].options[64] = new Option("Piano Warm Winter", "27/4", config["liberLiveChrd" + i] == "27/4", config["liberLiveChrd" + i] == "27/4");					
		liberLiveChords[i].options[65] = new Option("Piano Courage", "28/4", config["liberLiveChrd" + i] == "28/4", config["liberLiveChrd" + i] == "28/4");					
		liberLiveChords[i].options[66] = new Option("Piano Pipe", "29/4", config["liberLiveChrd" + i] == "29/4", config["liberLiveChrd" + i] == "29/4");					
		liberLiveChords[i].options[67] = new Option("Piano Spark", "30/4", config["liberLiveChrd" + i] == "30/4", config["liberLiveChrd" + i] == "30/4");					
		liberLiveChords[i].options[68] = new Option("Piano Sunshine", "31/4", config["liberLiveChrd" + i] == "31/4", config["liberLiveChrd" + i] == "31/4");					
		liberLiveChords[i].options[69] = new Option("Piano Dance Step (6/8)", "32/4", config["liberLiveChrd" + i] == "32/4", config["liberLiveChrd" + i] == "32/4");					
		liberLiveChords[i].options[70] = new Option("Piano Attached (6/8)", "33/4", config["liberLiveChrd" + i] == "33/4", config["liberLiveChrd" + i] == "33/4");					
		liberLiveChords[i].options[71] = new Option("Bass 1", "1/5", config["liberLiveChrd" + i] == "1/5", config["liberLiveChrd" + i] == "1/5");					
		liberLiveChords[i].options[72] = new Option("Bass 2", "2/5", config["liberLiveChrd" + i] == "2/5", config["liberLiveChrd" + i] == "2/5");					
		liberLiveChords[i].options[73] = new Option("Bass 3", "3/5", config["liberLiveChrd" + i] == "3/5", config["liberLiveChrd" + i] == "3/5");					
		liberLiveChords[i].options[74] = new Option("Bass 4", "4/5", config["liberLiveChrd" + i] == "4/5", config["liberLiveChrd" + i] == "4/5");					
		liberLiveChords[i].options[75] = new Option("Bass 11", "11/5", config["liberLiveChrd" + i] == "11/5", config["liberLiveChrd" + i] == "11/5");					
		liberLiveChords[i].options[76] = new Option("Bass 12", "12/5", config["liberLiveChrd" + i] == "12/5", config["liberLiveChrd" + i] == "12/5");					
		liberLiveChords[i].options[77] = new Option("Bass 13", "13/5", config["liberLiveChrd" + i] == "13/5", config["liberLiveChrd" + i] == "13/5");					
		liberLiveChords[i].options[78] = new Option("Bass 14", "14/5", config["liberLiveChrd" + i] == "14/5", config["liberLiveChrd" + i] == "14/5");					
		liberLiveChords[i].options[79] = new Option("Bass 17", "17/5", config["liberLiveChrd" + i] == "17/5", config["liberLiveChrd" + i] == "17/5");					
		liberLiveChords[i].options[80] = new Option("Bass 19", "19/5", config["liberLiveChrd" + i] == "19/5", config["liberLiveChrd" + i] == "19/5");					
		liberLiveChords[i].options[81] = new Option("Bass 21", "21/5", config["liberLiveChrd" + i] == "21/5", config["liberLiveChrd" + i] == "21/5");					
	}
	
	liberLive.chord1 = config.liberLiveChrd1 || liberLive.chord1;

	liberLiveChords[1].addEventListener("change", function()
	{
		liberLive.chord1 = liberLiveChords[1].value;
		console.debug("selected liberlive chord1", liberLive.chord1, liberLiveChords[1].value);				
		saveConfig();
		setLiberLiveDeviceSettings();
	});	
		
	liberLive.chord2 = config.liberLiveChrd2 || liberLive.chord2;
	
	liberLiveChords[2].addEventListener("change", function()
	{
		liberLive.chord2 = liberLiveChords[2].value;
		console.debug("selected liberlive chord2", liberLive.chord2, liberLiveChords[2].value);				
		saveConfig();
		setLiberLiveDeviceSettings();
	});		
	
	
	const liberLiveDrums = [];
	
	for (let i=1; i<3; i++) {
		liberLiveDrums[i] = document.getElementById("ll-drums" + i);
		liberLiveDrums[i].options[0] = new Option("Pop 1 (4/4)", "222/23", config["liberLiveDrms" + i] == "222/23", config["liberLiveDrms" + i] == "222/23");					
		liberLiveDrums[i].options[1] = new Option("Pop 2 (4/4)", "232/23", config["liberLiveDrms" + i] == "232/23", config["liberLiveDrms" + i] == "232/23");					
		liberLiveDrums[i].options[2] = new Option("Pop 3 (4/4)", "242/23", config["liberLiveDrms" + i] == "242/23", config["liberLiveDrms" + i] == "242/23");			
		liberLiveDrums[i].options[3] = new Option("Pop 4 (4/4)", "252/23", config["liberLiveDrms" + i] == "252/23", config["liberLiveDrms" + i] == "252/23");					
		liberLiveDrums[i].options[4] = new Option("Pop 5 (4/4)", "6/24", config["liberLiveDrms" + i] == "6/24", config["liberLiveDrms" + i] == "6/24");			
		liberLiveDrums[i].options[5] = new Option("Pop 6 (6/8)", "42/28", config["liberLiveDrms" + i] == "42/28", config["liberLiveDrms" + i] == "42/28");					
		liberLiveDrums[i].options[6] = new Option("Pop 7 (6/8)", "52/28", config["liberLiveDrms" + i] == "52/28", config["liberLiveDrms" + i] == "52/28");			
		liberLiveDrums[i].options[7] = new Option("Rock 1 (4/4)", "16/24", config["liberLiveDrms" + i] == "16/24", config["liberLiveDrms" + i] == "16/24");					
		liberLiveDrums[i].options[8] = new Option("Rock 2 (4/4)", "26/24", config["liberLiveDrms" + i] == "26/24", config["liberLiveDrms" + i] == "26/24");			
		liberLiveDrums[i].options[9] = new Option("Rock 3 (4/4)", "36/24", config["liberLiveDrms" + i] == "36/24", config["liberLiveDrms" + i] == "36/24");					
		liberLiveDrums[i].options[10] = new Option("Rock 4 (4/4)", "46/24", config["liberLiveDrms" + i] == "46/24", config["liberLiveDrms" + i] == "46/24");					
		liberLiveDrums[i].options[11] = new Option("Rock 5(4/4)", "136/24", config["liberLiveDrms" + i] == "136/24", config["liberLiveDrms" + i] == "136/24");					
		liberLiveDrums[i].options[12] = new Option("Vocal 1 (4/4)", "56/24", config["liberLiveDrms" + i] == "56/24", config["liberLiveDrms" + i] == "56/24");			
		liberLiveDrums[i].options[13] = new Option("Vocal 2 (4/4)", "66/24", config["liberLiveDrms" + i] == "66/24", config["liberLiveDrms" + i] == "66/24");					
		liberLiveDrums[i].options[14] = new Option("Vocal 3 (4/4)", "76/24", config["liberLiveDrms" + i] == "76/24", config["liberLiveDrms" + i] == "76/24");					
		liberLiveDrums[i].options[15] = new Option("Country (4/4)", "86/24", config["liberLiveDrms" + i] == "86/24", config["liberLiveDrms" + i] == "86/24");			
		liberLiveDrums[i].options[16] = new Option("Jazz (4/4)", "96/24", config["liberLiveDrms" + i] == "96/24", config["liberLiveDrms" + i] == "96/24");					
		liberLiveDrums[i].options[17] = new Option("Blues 1 (4/4)", "106/24", config["liberLiveDrms" + i] == "106/24", config["liberLiveDrms" + i] == "106/24");					
		liberLiveDrums[i].options[18] = new Option("Blues 2 (4/4)", "116/24", config["liberLiveDrms" + i] == "116/24", config["liberLiveDrms" + i] == "116/24");					
		liberLiveDrums[i].options[19] = new Option("Soul (4/4)", "126/24", config["liberLiveDrms" + i] == "126/24", config["liberLiveDrms" + i] == "126/24");			
		liberLiveDrums[i].options[20] = new Option("Waltz (3/4)", "82/28", config["liberLiveDrms" + i] == "82/28", config["liberLiveDrms" + i] == "82/28");					
	}
	
	liberLive.drums1 = config.liberLiveDrms1 || liberLive.drums1;

	liberLiveDrums[1].addEventListener("change", function()
	{
		liberLive.drums1 = liberLiveDrums[1].value;
		console.debug("selected liberlive drums1", liberLive.drums1, liberLiveDrums[1].value);				
		saveConfig();
		setLiberLiveDeviceSettings();
	});	
		
	liberLive.drums2 = config.liberLiveDrms2 || liberLive.drums2;
	
	liberLiveDrums[2].addEventListener("change", function()
	{
		liberLive.drums2 = liberLiveDrums[2].value;
		console.debug("selected liberlive drums2", liberLive.drums2, liberLiveDrums[2].value);				
		saveConfig();
		setLiberLiveDeviceSettings();
	});		
	
		
	const guitarStrum = [];
	
	for (let i=1; i<4; i++) {
		guitarStrum[i] = document.getElementById("guitarStrum" + i);		
		guitarStrum[i].options[0] = new Option("3-2-1-2", "3-2-1-2", config["strum" + i] == "3-2-1-2", config["strum" + i] == "3-2-1-2");			
		guitarStrum[i].options[1] = new Option("3-2-1-B2-3-2-1-B1", "3-2-1-B2-3-2-1-B1", config["strum" + i] == "3-2-1-B2-3-2-1-B1", config["strum" + i] == "3-2-1-B2-3-2-1-B1");	
		guitarStrum[i].options[2] = new Option("4-3-2-1-2-3", "4-3-2-1-2-3", config["strum" + i] == "4-3-2-1-2-3", config["strum" + i] == "4-3-2-1-2-3");
		guitarStrum[i].options[3] = new Option("4-3-4-2-4-3-1-3-2", "4-3-4-2-4-3-1-3-2", config["strum" + i] == "4-3-4-2-4-3-1-3-2", config["strum" + i] == "4-3-4-2-4-3-1-3-2");
		guitarStrum[i].options[4] = new Option("1-2-3-1-3-2 ", "1-2-3-1-3-2", config["strum" + i] == "1-2-3-1-3-2", config["strum" + i] == "1-2-3-1-3-2");
		guitarStrum[i].options[5] = new Option("1-3-1-2-3-1-2-1-3-2", "1-3-1-2-3-1-2-1-3-2", config["strum" + i] == "1-3-1-2-3-1-2-1-3-2", config["strum" + i] == "1-3-1-2-3-1-2-1-3-2");
		guitarStrum[i].options[6] = new Option("1-3-4-2", "1-3-4-2", config["strum" + i] == "1-3-4-2", config["strum" + i] == "1-3-4-2");
		guitarStrum[i].options[7] = new Option("1-3-4-2-3-1-3", "1-3-4-2-3-1-3", config["strum" + i] == "1-3-4-2-3-1-3", config["strum" + i] == "1-3-4-2-3-1-3");
		guitarStrum[i].options[8] = new Option("3-2-1-2-3-4-3-2", "3-2-1-2-3-4-3-2", config["strum" + i] == "3-2-1-2-3-4-3-2", config["strum" + i] == "3-2-1-2-3-4-3-2");
		guitarStrum[i].options[9] = new Option("3-2-1-2-3-1-2-3-1-2", "3-2-1-2-3-1-2-3-1-2", config["strum" + i] == "3-2-1-2-3-1-2-3-1-2", config["strum" + i] == "3-2-1-2-3-1-2-3-1-2");
		guitarStrum[i].options[10] = new Option("3-2-4-1-4-2-4", "3-2-4-1-4-2-4", config["strum" + i] == "3-2-4-1-4-2-4", config["strum" + i] == "3-2-4-1-4-2-4");
		guitarStrum[i].options[11] = new Option("3-2-4-2-3-1-3-1", "3-2-4-2-3-1-3-1", config["strum" + i] == "3-2-4-2-3-1-3-1", config["strum" + i] == "3-2-4-2-3-1-3-1");
		guitarStrum[i].options[12] = new Option("3-2-4-1-2-3-1-2-1", "3-2-4-1-2-3-1-2-1", config["strum" + i] == "3-2-4-1-2-3-1-2-1", config["strum" + i] == "3-2-4-1-2-3-1-2-1");
		guitarStrum[i].options[13] = new Option("3-[2+1]", "3-[2+1]", config["strum" + i] == "3-[2+1]", config["strum" + i] == "3-[2+1]");
		guitarStrum[i].options[14] = new Option("3-[2+1]-3-B2-3-[2+1]-3-B1", "3-[2+1]-3-B2-3-[2+1]-3-B1", config["strum" + i] == "3-[2+1]-3-B2-3-[2+1]-3-B1", config["strum" + i] == "3-[2+1]-3-B2-3-[2+1]-3-B1");  
		guitarStrum[i].options[15] = new Option("3-[2+1]-B2-[2+1]-B1", "3-[2+1]-B2-[2+1]-B1", config["strum" + i] == "3-[2+1]-B2-[2+1]-B1", config["strum" + i] == "3-[2+1]-B2-[2+1]-B1");
		guitarStrum[i].options[16] = new Option("4-[1+2+3]", "4-[1+2+3]", config["strum" + i] == "4-[1+2+3]", config["strum" + i] == "4-[1+2+3]");
		guitarStrum[i].options[17] = new Option("3-2-1-B2-3-[2+1]-3-B1", "3-2-1-B2-3-[2+1]-3-B1", config["strum" + i] == "3-2-1-B2-3-[2+1]-3-B1", config["strum" + i] == "3-2-1-B2-3-[2+1]-3-B1");
		guitarStrum[i].options[18] = new Option("2-str.chord", "[3+2]", config["strum" + i] == "[3+2]", config["strum" + i] == "[3+2]");
		guitarStrum[i].options[19] = new Option("3-str.chord", "[3+2+1]", config["strum" + i] == "[3+2+1]", config["strum" + i] == "[3+2+1]");
		guitarStrum[i].options[20] = new Option("lower 3-str.chord", "[4+3+2]", config["strum" + i] == "[4+3+2]", config["strum" + i] == "[4+3+2]");
		guitarStrum[i].options[21] = new Option("3-str.chord,BassII", "[3+2+1]-B2-[3+2+1]-B1", config["strum" + i] == "[3+2+1]-B2-[3+2+1]-B1", config["strum" + i] == "[3+2+1]-B2-[3+2+1]-B1");
		guitarStrum[i].options[22] = new Option("3-str.chord,4th", "[3+2+1]-4-[3+2]", config["strum" + i] == "[3+2+1]-4-[3+2]", config["strum" + i] == "[3+2+1]-4-[3+2]");	
		guitarStrum[i].options[22] = new Option("Bass", "B1", config["strum" + i] == "B1", config["strum" + i] == "B1");
	}
	
		
	strum1 = config.strum1 || strum1;
	strum2 = config.strum2 || strum2;
	strum3 = config.strum3 || strum3;
	
	guitarIR = config.guitarIR || guitarIR;

	guitarIRDef =  document.getElementById("guitarIRDef");
	guitarIRDef.options[0] = new Option("Conic Long Echo Hall", "Conic Long Echo Hall", config.guitarIR == "Conic Long Echo Hall", config.guitarIR == "Conic Long Echo Hall");	
	guitarIRDef.options[1] = new Option("hall", "hall", config.guitarIR == "hall", config.guitarIR == "hall");	
	guitarIRDef.options[2] = new Option("pcm 90 clean plate", "pcm 90 clean plate", config.guitarIR == "pcm 90 clean plate", config.guitarIR == "pcm 90 clean plate");	
	guitarIRDef.options[3] = new Option("plate", "plate", config.guitarIR == "plate", config.guitarIR == "plate");	
	guitarIRDef.options[4] = new Option("room", "room", config.guitarIR == "room", config.guitarIR == "room");	
	guitarIRDef.options[5] = new Option("space", "space", config.guitarIR == "space", config.guitarIR == "space");	
	guitarIRDef.options[6] = new Option("spring", "spring", config.guitarIR == "spring", config.guitarIR == "spring");	
	guitarIRDef.options[7] = new Option("captain 1960", "captain 1960", config.guitarIR == "captain 1960", config.guitarIR == "captain 1960");
	guitarIRDef.options[8] = new Option("AK SPKRS Vintage US", "AK SPKRS Vintage US", config.guitarIR == "AK SPKRS Vintage US", config.guitarIR == "AK SPKRS Vintage US");
	guitarIRDef.options[9] = new Option("AKIR Dual Springer", "AKIR Dual Springer", config.guitarIR == "AKIR Dual Springer", config.guitarIR == "AKIR Dual Springer");
	guitarIRDef.options[10] = new Option("1st baptist nashville balcony", "1st baptist nashville balcony", config.guitarIR == "1st baptist nashville balcony", config.guitarIR == "1st baptist nashville balcony");
	guitarIRDef.options[11] = new Option("1st baptist nashville far close", "1st baptist nashville far close", config.guitarIR == "1st baptist nashville far close", config.guitarIR == "1st baptist nashville far close");
	guitarIRDef.options[12] = new Option("1st baptist nashville fa _wide", "1st baptist nashville far wide", config.guitarIR == "1st baptist nashville far wide", config.guitarIR == "1st baptist nashville far wide");

	guitarIRDef.addEventListener("change", function() {
		guitarIR = guitarIRDef.value;
		console.debug("selected guitar IR", guitarIR, guitarIRDef.value);	

		fetch("./audio/ir/" + guitarIR + ".wav")
		.then(response => response.arrayBuffer())
		.then(data => {
		  return ctx.decodeAudioData(data, b => {
			console.debug("pedalboard IR loader", guitarIR, b);
			window.buffer = b;
			window.convolver.buffer = b;
			saveConfig();			
		  });
		})
		.catch(e => onError('Failed to load reverb impulse'));
	});
	
	
	guitarPosition = document.getElementById("guitarPosition");
	guitarPosition.selectedIndex = config.strumPos	
	
	guitarStrum[1].addEventListener("change", function()
	{
		strum1 = guitarStrum[1].value;
		console.debug("selected guitar strum1", strum1, guitarStrum[1].value);				
		saveConfig();
	});		

	guitarStrum[2].addEventListener("change", function()
	{
		strum2 = guitarStrum[2].value;
		console.debug("selected guitar strum2", strum2, guitarStrum[2].value);				
		saveConfig();
	});	

	guitarStrum[3].addEventListener("change", function()
	{
		strum3 = guitarStrum[3].value;
		console.debug("selected guitar strum3", strum3, guitarStrum[3].value);				
		saveConfig();
	});	

	const guitarType = document.getElementById("guitarType");
	guitarType.options[0] = new Option("NOT USED", "none", config.guitarName == "none");	
	guitarType.options[1] = new Option("RG Acoustic", "0250_RG_Acoustic_SF2_file", config.guitarName == "0250_RG_Acoustic_SF2_file", config.guitarName == "0250_RG_Acoustic_SF2_file");	
	guitarType.options[2] = new Option("Acoustic Guitar", "0253_Acoustic_Guitar_sf2_file", config.guitarName == "0253_Acoustic_Guitar_sf2_file", config.guitarName == "0253_Acoustic_Guitar_sf2_file");	
	guitarType.options[3] = new Option("Aspirin", "0250_Aspirin_sf2_file", config.guitarName == "0250_Aspirin_sf2_file", config.guitarName == "0250_Aspirin_sf2_file");	
	guitarType.options[4] = new Option("Chaos Steel", "0250_Chaos_sf2_file", config.guitarName == "0250_Chaos_sf2_file", config.guitarName == "0250_Chaos_sf2_file");	
	guitarType.options[5] = new Option("LK Acoustic Steel", "0250_LK_AcousticSteel_SF2_file", config.guitarName == "0250_LK_AcousticSteel_SF2_file", config.guitarName == "0250_LK_AcousticSteel_SF2_file");	
	guitarType.options[6] = new Option("Electric Bass Guitar (pick)", "0341_Aspirin_sf2_file", config.guitarName == "0341_Aspirin_sf2_file", config.guitarName == "0341_Aspirin_sf2_file");	
	guitarType.options[7] = new Option("Electric Guitar FSBS", "0270_EGuitar_FSBS_SF2_file", config.guitarName == "0270_EGuitar_FSBS_SF2_file", config.guitarName == "0270_EGuitar_FSBS_SF2_file");	
	guitarType.options[8] = new Option("JC Live", "0260_JCLive_sf2_file", config.guitarName == "0260_JCLive_sf2_file", config.guitarName == "0260_JCLive_sf2_file");	

	guitarType.addEventListener("change", function() {
		guitarStrum[1].style.display = "none";		
		guitarStrum[2].style.display = "none";		
		guitarStrum[3].style.display = "none";	
		guitarPosition.style.display = "none";
		guitarIRDef.style.display = "none";
		
		guitarName = guitarType.value;
		
		if (guitarName != "none") {
			guitarStrum[1].style.display = "";		
			guitarStrum[2].style.display = "";		
			guitarStrum[3].style.display = "";	
			guitarPosition.style.display = "";	
			guitarIRDef.style.display = "";
				
			if (guitarReverb.checked) {		

			} else {
		
			}	

			midiGuitar = window["_tone_" + guitarName];		
			player.loader.decodeAfterLoading(guitarContext, '_tone_' + guitarName);	
			enableSequencer(realGuitarStyle != "none");				
		}			
		console.debug("selected guitar", guitarName, guitarType.value);				
		saveConfig();
	});

	guitarName = config.guitarName || guitarName;
	
	if (guitarName == "none") {
		for (let i=1; i<4; i++) guitarStrum[i].style.display = "none";
		guitarPosition.style.display = "none";	
		guitarIRDef.style.display = "none";
	}		
	
	if (guitarName != "none") 
	{			
		if (guitarReverb.checked) {		

		} else {
		
		}

		midiGuitar = window["_tone_" + guitarName];				
		player.loader.decodeAfterLoading(guitarContext, '_tone_' + guitarName);
		padsMode = config.padsMode || 3;
		orinayo_pad.innerHTML = "Pad " + padsMode;			
	}	
	
	
	const arrangerType =  document.getElementById("arrangerType");	
	arrangerType.options[0] = new Option("Style Files Format", "sff", config.arranger == "sff");		
	arrangerType.options[1] = new Option("Web Audio Files", "webaudio", config.arranger == "webaudio");		
	arrangerType.options[2] = new Option("Ketron SD/Event", "ketron", config.arranger == "ketron");
	arrangerType.options[3] = new Option("Yamaha MODX", "modx", config.arranger == "modx");
	arrangerType.options[4] = new Option("Yamaha Montage", "montage", config.arranger == "montage");	
	arrangerType.options[5] = new Option("Yamaha PRS SX", "psrsx", config.arranger == "psrsx");	
	arrangerType.options[6] = new Option("Yamaha QY100", "qy100", config.arranger == "qy100");		
	arrangerType.options[7] = new Option("Korg Micro Arranger", "microarranger", config.arranger == "microarranger");				
	arrangerType.options[8] = new Option("Giglad Arranger", "giglad", config.arranger == "giglad");	
	arrangerType.options[9] = new Option("Boss RC Loop Station", "rclooper", config.arranger == "rclooper");	
	arrangerType.options[10] = new Option("Aeros Loop Studio", "aeroslooper", config.arranger == "aeroslooper");	
	
	let arrangerIndex = 0;
	arrangerIndex = config.arranger == "webaudio" ? 1 : arrangerIndex;
	arrangerIndex = config.arranger == "ketron" ? 2 : arrangerIndex;
	arrangerIndex = config.arranger == "modx" ? 3 : arrangerIndex;		
	arrangerIndex = config.arranger == "montage" ? 4 : arrangerIndex;
	arrangerIndex = config.arranger == "psrsx" ? 5 : arrangerIndex;			
	arrangerIndex = config.arranger == "qy100" ? 6 : arrangerIndex;		
	arrangerIndex = config.arranger == "microarranger" ? 7 : arrangerIndex;				
	arrangerIndex = config.arranger == "giglad" ? 8 : arrangerIndex;				
	arrangerIndex = config.arranger == "rclooper" ? 9 : arrangerIndex;	
	arrangerIndex = config.arranger == "aeroslooper" ? 10 : arrangerIndex;		
	arrangerType.selectedIndex = arrangerIndex;	
	
	arranger = config.arranger || "sff";	
	handleRecordSong(arranger == "webaudio");	
	
	const midiInType = document.getElementById("midiInType");	
	midiInType.options[0] = new Option("Guitar Games Controller", "games-controller", config.inputDeviceType == "games-controller");		
	midiInType.options[1] = new Option("Orin Ayo Controller", "orinayo", config.inputDeviceType == "orinayo");		
	midiInType.options[2] = new Option("Artiphon Instrument 1", "instrument1", config.inputDeviceType == "instrument1");		
	midiInType.options[3] = new Option("Artiphon Chorda", "chorda", config.inputDeviceType == "chorda");
	midiInType.options[4] = new Option("LiberLive C1", "liberlivec1", config.inputDeviceType == "liberlivec1");
	midiInType.options[5] = new Option("Lava Genie", "lavagenie", config.inputDeviceType == "lavagenie");	
	midiInType.options[6] = new Option("Keyboard", "keyboard", config.inputDeviceType == "keyboard");	
	
	let deviceIndex = 0;
	deviceIndex = config.inputDeviceType == "games-controller" ? 0 : deviceIndex;
	deviceIndex = config.inputDeviceType == "orinayo" ? 1 : deviceIndex;
	deviceIndex = config.inputDeviceType == "instrument1" ? 2 : deviceIndex;
	deviceIndex = config.inputDeviceType == "chorda" ? 3 : deviceIndex;	
	deviceIndex = config.inputDeviceType == "liberlivec1" ? 4 : deviceIndex;		
	deviceIndex = config.inputDeviceType == "lavagenie" ? 5 : deviceIndex;	
	deviceIndex = config.inputDeviceType == "keyboard" ? 6 : deviceIndex;
	midiInType.selectedIndex = deviceIndex;	
	
	inputDeviceType = config.inputDeviceType;
	
	if (inputDeviceType == "liberlivec1") {
		initLiberLive();	
		handleLiberLive(inputDeviceType == "liberlivec1");
		
	} else if (inputDeviceType == "lavagenie") {
		initLavaGenie();
		handleLavaGenie(inputDeviceType == "lavagenie");		
	}	

	midiInType.addEventListener("click", function()
	{
		bluetoothEle.style.display = (midiInType.value == "liberlivec1" || midiInType.value == "lavagenie") ? "" : "none";
	});
	
	midiInType.addEventListener("change", function()
	{
		inputDeviceType = midiInType.value;
		console.debug("selected midi device type", inputDeviceType, midiInType.value);				
		saveConfig();			
		
		if (inputDeviceType == "liberlivec1") {
			handleLiberLive(inputDeviceType == "liberlivec1");
			
		} else if (inputDeviceType == "lavagenie") {
			handleLavaGenie(inputDeviceType == "lavagenie");		
		}
	});	

	setGigladUI();
   
	midiOut.options[0] = new Option("NOT USED", "midiOutSel");
	midiFwd.options[0] = new Option("NOT USED", "midiFwdSel");
	midiPads.options[0] = new Option("NOT USED", "midiPadsSel");	

	midiChordTracker.options[0] = new Option("NOT USED", "midiChordTrackerSel");
	midiIn.options[0] = new Option("NOT USED", "midiInSel");
	midiPads.options[1] = new Option("Keyboard Voice 2", "soundfont");	
	
	if (config.padsDevice == "soundfont") {
		padsDevice = {name : "soundfont"};	
		midiPads.options[1] = new Option("Keyboard Voice 2", "soundfont", true, true);		
	}	

	if (!err) for (var i=0; i<WebMidi.outputs.length; i++) 	{
		let outSelected = false;		
		
		if (config.midiOutput && config.midiOutput == WebMidi.outputs[i].name) {
			outSelected = true;
			midiOutput = WebMidi.outputs[i];
		}
		midiOut.options[i + 1] = new Option(WebMidi.outputs[i].name.trim(), WebMidi.outputs[i].name.trim(), outSelected, outSelected);

		let padsSelected = false;
		
		if (config.padsDevice && config.padsDevice == WebMidi.outputs[i].name) {
			padsSelected = true;
			padsDevice = WebMidi.outputs[i];
		}
		midiPads.options[i + 2] = new Option(WebMidi.outputs[i].name, WebMidi.outputs[i].name, padsSelected, padsSelected);

		let fwdSelected = false;
		
		if (config.midiRealGuitar && config.midiRealGuitar == WebMidi.outputs[i].name) {
			fwdSelected = true;
			midiRealGuitar = WebMidi.outputs[i];
		}
		midiFwd.options[i + 1] = new Option(WebMidi.outputs[i].name.trim(), WebMidi.outputs[i].name.trim(), fwdSelected, fwdSelected);

		let chordTrackerSelected = false;	
	
		if (config.chordTracker && config.chordTracker == WebMidi.outputs[i].name) {
			chordTrackerSelected = true;
			chordTracker = WebMidi.outputs[i];
		}
		midiChordTracker.options[i + 1] = new Option(WebMidi.outputs[i].name, WebMidi.outputs[i].name, chordTrackerSelected, chordTrackerSelected);
	}

	if (!err) for (var i=0; i<WebMidi.inputs.length; i++) {
		let selected = false;	
		
		if (config.input && config.input == WebMidi.inputs[i].name) {
			selected = true;
			input = WebMidi.inputs[i];
		}
		midiIn.options[i + 1] = new Option(WebMidi.inputs[i].name, WebMidi.inputs[i].name, selected, selected);
	}

	if (!err) midiIn.addEventListener("change", function()
	{
		input = null;

		if (midiIn.value != "midiInSel") {
			input = WebMidi.getInputByName(midiIn.value);
			saveConfig();			
			console.debug("selected input midi port", input, midiIn.value);
		}
	});

	if (!err) midiOut.addEventListener("change", function()
	{
		midiOutput = null;

		if (midiOut.value != "midiOutSel") {
			midiOutput = WebMidi.getOutputByName(midiOut.value);
			saveConfig();			
			console.debug("selected midiOutput midi port", midiOutput, midiOut.value);
		}
	});
	
	if (!err) midiPads.addEventListener("change", function()
	{
		padsDevice = null;

		if (midiPads.value != "midiPadsSel" && midiPads.value != "soundfont") {
			padsDevice = WebMidi.getOutputByName(midiPads.value);
			saveConfig();			
			console.debug("selected pads midi port", padsDevice, midiPads.value);
		} 
		else
			
		if ( midiPads.value == "soundfont") {
			console.debug("SoundFont pads");
			padsDevice = {name: "soundfont"};
			saveConfig();			
		}			
	});

	if (!err) midiFwd.addEventListener("change", function()
	{
		midiRealGuitar = null;
		enableSequencer(guitarName != "none" && realGuitarStyle != "none");

		if (midiFwd.value != "midiFwdSel") {
			midiRealGuitar = WebMidi.getOutputByName(midiFwd.value);
			saveConfig();			
			enableSequencer((!!midiRealGuitar || guitarName != "none" ) && realGuitarStyle != "none");
			console.debug("selected midiRealGuitar midi port", midiRealGuitar, midiFwd.value);
		}
	});
	
	if (!err) midiChordTracker.addEventListener("change", function()
	{
		chordTracker = null;

		if (midiChordTracker.value != "midiChordTrackerSel") {
			chordTracker = WebMidi.getOutputByName(midiChordTracker.value);
			saveConfig();			
			console.debug("selected chordTracker midi port", chordTracker, midiChordTracker.value);
		}
	});

	
	arrangerType.addEventListener("change", function()
	{
		arranger = arrangerType.value;
		setGigladUI(); // reset. remove if no more giglad
		console.debug("selected arranger type", arranger, arrangerType.value);				
		saveConfig();
		handleRecordSong(arranger == "webaudio");
	});
	
	arrangerStyle.addEventListener("change", function()
	{
		arrSequence = null
		
		if (arrangerStyle.value != "arrangerStyle") {		
			arrSequence = {name: arrangerStyle.value};
		}
		saveConfig();			
	});	
	
	arrangerSf2.addEventListener("change", function()
	{
		arrSynth = null;
		if (arrangerSf2.value == "arrangerSf2") return;	
		
		arrSynth = {name: arrangerSf2.value};
		saveConfig();			
	});
	
	realguitar.addEventListener("change", function()
	{
		realGuitarStyle = realguitar.value;
		console.debug("selected realguitar style", realGuitarStyle, realguitar.value);				
		saveConfig();
	});
	
	songSeq.addEventListener("change", function()
	{
		songSequence = null;
		document.querySelector("#tempoCanvas").style.display = "none";		

		if (songSeq.value != "songSeq") {
			songSequence = {name: songSeq.value};	
			document.querySelector("#tempoCanvas").style.display = "";			
			console.debug("selected song sequence", songSequence, songSeq.value);
		}
		saveConfig();		
	});	

	const guitarDevice = document.getElementById("inputAudioDevice");						
	const realDrumsDevice = document.getElementById("outputAudioDevice");	
	const realDrumsLoop = document.getElementById("realdrumLoop");	
	const realBassLoop = document.getElementById("realbassLoop");		
	const realChordsLoop = document.getElementById("realchordLoop");
	const realRiffLoop = document.getElementById("realriffLoop");	

	guitarDevice.options[0] = new Option("NOT USED", "guitarDevice", false, false);	
	realDrumsDevice.options[0] = new Option("NOT USED", "realDrumsDevice", false, false);
	realDrumsLoop.options[0] = new Option("NOT USED", "realDrumsLoop", false, false);		
	realBassLoop.options[0] = new Option("NOT USED", "realBassLoop", false, false);		
	realChordsLoop.options[0] = new Option("NOT USED", "realChordsLoop", false, false);
	realRiffLoop.options[0] = new Option("NOT USED", "realRiffLoop", false, false);	
	
	let drumIndex = 0;
			
	for (var i=0; i<drum_loops.length; i++) {
		const drumLoop = drum_loops[i];
		if (drumLoop.startsWith("extra") && (location.protocol == "chrome-extension:" && chrome.runtime.id != CHROME_EXTN_ID)) continue;
				
		let selectedDrum = false;	
		const loopData = drumLoop.substring(drumLoop.lastIndexOf("/") + 1).replace(".drum", "");
		const metaData = loopData.split("_");		
		const drumName = metaData[0] + " (" + metaData[1] + ")";			
		
		if (config.realDrum && config.realDrum == drumLoop) {
			if (!realInstrument) realInstrument = {};			
			selectedDrum = true;
			realInstrument.drum = metaData;				
			realInstrument.drumUrl = drumLoop;		
		}
		realDrumsLoop.options[drumIndex + 1] = new Option(drumName, drumLoop, selectedDrum, selectedDrum);
		drumIndex++;
	}

	let bassIndex = 0;
	
	for (var i=0; i<bass_loops.length; i++) {
		const bassLoop = bass_loops[i];
		if (bassLoop.startsWith("extra") && (location.protocol == "chrome-extension:" && chrome.runtime.id != CHROME_EXTN_ID)) continue;
		
		let selectedBass = false;	
		const loopData = bassLoop.substring(bassLoop.lastIndexOf("/") + 1).replace(".bass", "");
		const metaData = loopData.split("_");		
		const bassName = metaData[0] + " (" + metaData[1] + ")";		
		
		if (config.realBass && config.realBass == bassLoop) {
			if (!realInstrument) realInstrument = {};			
			selectedBass = true;
			realInstrument.bass = metaData;	
			realInstrument.bassUrl = bassLoop;				
		}
		realBassLoop.options[bassIndex + 1] = new Option(bassName, bassLoop, selectedBass, selectedBass);
		bassIndex++;
	}

	let chordIndex = 0;
	
	for (var i=0; i<chord_loops.length; i++) {
		const chordLoop = chord_loops[i];
		if (chordLoop.startsWith("extra") && (location.protocol == "chrome-extension:" && chrome.runtime.id != CHROME_EXTN_ID)) continue;
		
		let selectedChord = false;	
		const loopData = chordLoop.substring(chordLoop.lastIndexOf("/") + 1).replace(".chord", "");
		const metaData = loopData.split("_");		
		const chordName = metaData[0] + " (" + metaData[1] + ")";		
		
		if (config.realChord && config.realChord == chordLoop) {
			if (!realInstrument) realInstrument = {};			
			selectedChord = true;
			realInstrument.chord = metaData;	
			realInstrument.chordUrl = chordLoop;				
		}
		realChordsLoop.options[chordIndex + 1] = new Option(chordName, chordLoop, selectedChord, selectedChord);
		chordIndex++;
	}
	
	let riffIndex = 0;
	
	for (var i=0; i<riff_loops.length; i++) {
		const riffLoop = riff_loops[i];
		if (riffLoop.startsWith("extra") && (location.protocol == "chrome-extension:" && chrome.runtime.id != CHROME_EXTN_ID)) continue;
		
		let selectedRiff = false;	
		const loopData = riffLoop.substring(riffLoop.lastIndexOf("/") + 1).replace(".riff", "");
		const metaData = loopData.split("_");		
		const riffName = metaData[0] + " (" + metaData[1] + ")";		
		
		if (config.realRiff && config.realRiff == riffLoop) {
			if (!realInstrument) realInstrument = {};			
			selectedRiff = true;
			realInstrument.riff = metaData;	
			realInstrument.riffUrl = riffLoop;				
		}
		realRiffLoop.options[riffIndex + 1] = new Option(riffName, riffLoop, selectedRiff, selectedRiff);
		riffIndex++;
	}	
	
	indexedDB.databases().then(function (databases) 
	{
		databases.forEach(function (db) {				
			const loop = db.name;
			//console.debug("IndexedDB file", loop);
			
			let selectedLoop = false;			
		
			if (db.name.toLowerCase().endsWith(".drum")) {
				selectedLoop = db.name == config.realDrum;
				const loopData = loop.replace(".drum", "");
				const metaData = loopData.split("_");		
				const drumName = metaData[0] + " (" + metaData[1] + ")";
				
				if (selectedLoop) {
					if (!realInstrument) realInstrument = {};					
					realInstrument.drum = metaData;				
					realInstrument.drumUrl = loop;	
				}

				realDrumsLoop.options[drumIndex++] = new Option("*" + drumName, loop, selectedLoop, selectedLoop);
			}
			else
				
			if (db.name.toLowerCase().endsWith(".chord")) {
				selectedLoop = db.name == config.realChord;
				const loopData = loop.replace(".chord", "");
				const metaData = loopData.split("_");		
				const chordName = metaData[0] + " (" + metaData[1] + ")";
				
				if (selectedLoop) {
					if (!realInstrument) realInstrument = {};
					realInstrument.chord = metaData;	
					realInstrument.chordUrl = loop;	
				}

				realChordsLoop.options[chordIndex++] = new Option("*" + chordName, loop, selectedLoop, selectedLoop);
			}
			else
				
			if (db.name.toLowerCase().endsWith(".bass")) {
				selectedLoop = db.name == config.realBass;
				const loopData = loop.replace(".bass", "");
				const metaData = loopData.split("_");		
				const bassName = metaData[0] + " (" + metaData[1] + ")";
				
				if (selectedLoop) {
					if (!realInstrument) realInstrument = {};
					realInstrument.bass = metaData;	
					realInstrument.bassUrl = loop;	
				}

				realBassLoop.options[bassIndex++] = new Option("*" + bassName, loop, selectedLoop, selectedLoop);
			}

			else
				
			if (db.name.toLowerCase().endsWith(".riff")) {
				selectedLoop = db.name == config.realRiff;
				const loopData = loop.replace(".riff", "");
				const metaData = loopData.split("_");		
				const riffName = metaData[0] + " (" + metaData[1] + ")";
				
				if (selectedLoop) {
					if (!realInstrument) realInstrument = {};
					realInstrument.riff = metaData;	
					realInstrument.riffUrl = loop;	
				}

				realRiffLoop.options[riffIndex++] = new Option("*" + riffName, loop, selectedLoop, selectedLoop);
			}			
		})	
	});	
	

	realRiffLoop.addEventListener("change", function() {
		if (styleStarted) return;		
		riffLoopChanged(realRiffLoop);		
	});	
		
	realBassLoop.addEventListener("change", function() {
		if (styleStarted) return;		
		bassLoopChanged(realBassLoop);		
	});	
		
	realDrumsLoop.addEventListener("change", function() {
		if (styleStarted) return;		
		drumLoopChanged(realDrumsLoop);		
	});		

	realChordsLoop.addEventListener("change", function() {
		if (styleStarted) return;			
		chordLoopChanged(config, realChordsLoop, realDrumsLoop, realBassLoop, realRiffLoop);
	});	
	
	console.debug("WebMidi devices", input, midiOutput, midiRealGuitar, chordTracker);
	
	if (guitarDevice.value != "guitarDevice") {	
		const audioMedia = await navigator.mediaDevices.getUserMedia({audio:true});
		audioMedia.getTracks().forEach( (track) => track.stop());				
	}
	
	const devices = await navigator.mediaDevices.enumerateDevices();
	const outputs = devices.filter(({ kind }) => kind === 'audiooutput');			
	const inputs = devices.filter(({ kind }) => kind === 'audioinput');

	for (var i=0; i<inputs.length; i++) 	{
		let selectedDevice = false;			
		
		if (config.guitarDeviceId && config.guitarDeviceId == inputs[i].deviceId) {
			selectedDevice = true;
			guitarDeviceId = inputs[i].deviceId;			
		}
		guitarDevice.options[i + 1] = new Option(inputs[i].label, inputs[i].deviceId, selectedDevice, selectedDevice);
	}
	
	guitarDevice.addEventListener("change", async function()
	{
		guitarDeviceId = null;

		if (guitarDevice.value != "guitarDevice") {
			const audioMedia = await navigator.mediaDevices.getUserMedia({audio:true});
			audioMedia.getTracks().forEach( (track) => track.stop());				
			const devices = await navigator.mediaDevices.enumerateDevices();
			const inputs = devices.filter(({ kind }) => kind === 'audioinput');
			
			for (let input of inputs) 
			{
				if (guitarDevice.value == input.deviceId) {
					guitarDeviceId = input.deviceId;
					saveConfig();					
					break;
				}						
			}
			console.debug("selected guitar device ", guitarDevice, guitarDevice.value);
		}
	});		
	
	for (var i=0; i<outputs.length; i++) 	{
		let selectedDevice = false;			
		
		if (config.realdrumDevice && config.realdrumDevice == outputs[i].deviceId) {
			selectedDevice = true;
			realdrumDevice = outputs[i];
			guitarContext.setSinkId(realdrumDevice.deviceId);
			audioContext.setSinkId(realdrumDevice.deviceId);			
		}
		realDrumsDevice.options[i + 1] = new Option(outputs[i].label, outputs[i].deviceId, selectedDevice, selectedDevice);
	}	

	realDrumsDevice.addEventListener("change", async function()
	{
		realdrumDevice = null;

		if (realDrumsDevice.value != "realDrumsDevice") {
			const audioMedia = await navigator.mediaDevices.getUserMedia({audio:true});
			audioMedia.getTracks().forEach( (track) => track.stop());				
			const devices = await navigator.mediaDevices.enumerateDevices();
			const outputs = devices.filter(({ kind }) => kind === 'audiooutput');
			
			for (let output of outputs) 
			{
				if (realDrumsDevice.value == output.deviceId) {
					realdrumDevice = output;
					guitarContext.setSinkId(realdrumDevice.deviceId);
					audioContext.setSinkId(realdrumDevice.deviceId);					
					setupRealInstruments();
					saveConfig();					
					break;
				}						
			}
			console.debug("selected real drums device ", realdrumDevice, realDrumsDevice.value);
		}
	});		


	registration = parseInt(config.registration || registration);
	orinayo_reg.innerHTML = "Slot " + registration;	
	if (registration) setTempo(config.tempo || tempo); 	
	
	if (input)
	{
		input.addListener('noteon', "all", function (e) {		
			//console.debug("Received 'noteon' message (" + e.note.name + " " + e.note.name + e.note.octave + ").", e.note, e);
			handleNoteOn(e.note, midiIn.value, e.velocity, e.channel);
			if (midiIn.value == "X-TOUCH MINI") handleXTouchNoteEvent(e);			
		});

		input.addListener("noteoff", "all", function (e) {
			//console.debug("Received noteoff message", e);
			handleNoteOff(e.note, midiIn.value, e.velocity, e.channel);			
		});	
		
		input.addListener("keyaftertouch", "all", function (e) {
			//console.debug("Received after touch message", e);
		});		
		
		input.addListener("programchange", "all", function (e) {	// recall slot - use with m-vave foot control and desktop app BLE -> MIDI IN
			console.debug("Received program change message", e.value);
			
			if (!styleStarted && e.value < 8) {	// recall ony 1-7 slots
				recallRegistration(e.value + 1);				
			} else {
				handleEncoderPress(e.value);
			}
		});		

		
		input.addListener("pitchbend", "all", function (e) {
			//console.debug("Received pitchbend", e);
		});		

		input.addListener('controlchange', "all", function (e) {
			console.debug("Received control-change (CC)", e?.controller?.number, e.value);	
					
			if (arranger == "aeroslooper" && e?.controller.number == 113) 
			{					
				if (e.value == 0) {
					console.debug("Aeros section change message", aerosChordTrack);			  
					outputSendControlChange (39, aerosChordTrack, 4); 	// play current chord on new part					
					
					if (aerosAux) {	
						aerosAux = false;

						// switch to aux part
						
						if (aerosChordTrack == 1) { // intro
							console.debug("Aeros section intro message");						
							setTimeout(() => outputSendControlChange (113, 91, 4), 300); // switch to main part at end of loop
						}
						else
							
						if (aerosChordTrack == 6) { // end
							console.debug("Aeros section end message");							
							setTimeout(() => outputSendControlChange (43, 3, 4), 300); // stop at end of loop
						}					
						
					}					
				}
				else
					
				if (e.value == 3) {	// switched to aux mode
					aerosAuxMode = true;
				}					
				
			} else {
				// CC 12 - Keyboard piano volume
				// CC 13 - Keyboard pads volume				
				// CC 1 - All Audio loops vol
				// CC 14 - prev variation
				// CC 15 - start/stop
				// CC 16 - next variation

				const keysSound1El = midiVolumeEle[0];
				const keysSound2El = midiVolumeEle[1];
				
				const drumEl = midiVolumeEle[16];
				const bassEl = midiVolumeEle[17];
				const chordEl = midiVolumeEle[18];			
				
				if (e?.controller.number == 14 && e.value == 127) 
				{					
					if (midiNotes.size == 0) {
						sectionChange--;
						if (sectionChange < 0) sectionChange = 3;						
						changeArrSection(true);
					} else {
						doFill();
					}					
				}
				else
					
				if (e?.controller.number == 16 && e.value == 127) {

					if (midiNotes.size == 0) {
						sectionChange++;
						if (sectionChange > 3) sectionChange = 0;						
						changeArrSection(true);
					} else {
						doBreak();
					}					
				}
				else

				if (e?.controller.number == 15 && e.value == 127) {
					sectionChange = 0;				
					toggleStartStop();
				}
				else 

				if (e?.controller.number == 12) {
					if (keysSound1El) {
						keysSound1El.value = (e.value / 127) * 100;
						keysSound1Vol = keysSound1El.value;
					}
				}					
				else 

				if (e?.controller.number == 13) 
				{
					if (keysSound2El) {
						keysSound2El.value = (e.value / 127) * 100;
						keysSound2Vol = keysSound2El.value;						
					}						
				}
				else 

				if (e?.controller.number == 1) {
					setGuitarVolume(e.value);	
					
					if (drumLoop) {
						drumEl.value = (e.value / 127) * savedDrumVol;
						drumLoop.setVolume(drumEl.value / 100);
						drumVol = drumEl.value;
					}
					
					if (bassLoop) {
						bassEl.value = (e.value / 127) * savedBassVol;
						bassLoop.setVolume(bassEl.value / 100);
						bassVol = bassEl.value;
					}

					if (chordLoop) {
						chordEl.value = (e.value / 127) * savedChordVol;
						chordLoop.setVolume(chordEl.value / 100);
						chordVol = chordEl.value;
					}					
				}	

				if (midiIn.value == "X-TOUCH MINI") handleXTouchControlEvent(e);
			}
		});
		

		if (midiIn.value == "X-TOUCH MINI") {	
			resetXTouch();	

			if (registration && parseInt(registration) > 0 && midiOutput && midiOutput.name == "X-TOUCH MINI") {
				//const slot = registration > 8 ? registration - 1 : registration;
				//setXTouchButton(slot, "flash");
			}					
		}			
	}									
	
	autoFillCheckedEle.checked = config.autoFill;	
	introEndCheckedEle.checked = config.introEnd;
	syncStartCheckedEle.checked = config.syncStart;	
	
	guitarReverb.checked = config.reverb;
	setupPedalBoard(guitarContext, guitarName, guitarDeviceId, guitarReverb.checked);
	
	microphone.checked = config.microphone;	
	setupMicrophone();	
	programChangeEle.checked = config.programChange;	
	document.querySelector("#volume").value = (config.guitarVolume || guitarVolume) * 100;
	
	enableSequencer((!!midiRealGuitar || guitarName != "none" ) && realGuitarStyle != "none");	

	if (config.songName) {	
		songSequence = {name: config.songName};
		getSongSequence(config.songName);
		document.getElementById("song_control").style.display = "";		
	}

	if (config.arrName) {	
		arrSynth = {name: config.sf2Name};	
		getArrSequence(config.arrName, arrSequenceLoaded);	
		document.querySelector("#delete_style").style.display = "";		
	}
	else {

		if (arranger != "sff") {

			if (config.sf2Name) {
				arrSynth = {name: config.sf2Name};	
				getArrSynth(arrSynth.name);	// load sf2 file				
			} else {
				// use gmgsx.sf2 as dummy midiSynth
				loadMidiSynth();
				
				if (arranger != "webaudio") {
					playButton.innerText = "Play";				
					playButton.style.setProperty("--accent-fill-rest", "green");
				}
			}
			
			if (arranger == "webaudio" && realInstrument) {
				setupRealInstruments();				
			}			
		}			
		setupMidiChannels();		
	}	
};

function setGuitarVolume(value) {
	const guitarVol = document.querySelector("#volume");
	guitarVol.value = (value / 127) * (savedGuitarVolume * 100);					
	showVol.innerHTML = "Vol: " + guitarVol.value;	
	guitarVolume = guitarVol.value / 100;	
	if (leadKnob) leadKnob.setValue(guitarVol.value);	
}

function riffLoopChanged(realRiffLoop) {
	if (!realInstrument) realInstrument = {};		
	realInstrument.riff = null;
	realInstrument.riffUrl = null;
	
	if (realRiffLoop.value != "realRiffLoop") {
		realInstrument.riffUrl = realRiffLoop.value;		
		const loopData = realRiffLoop.value.replace(".bass", "");
		realInstrument.riff = loopData.split("_");						
	}
	if (!styleStarted) setupRealInstruments();		
	saveConfig();		
	console.debug("selected real riff loop", realInstrument, realRiffLoop.value);		
}

function bassLoopChanged(realBassLoop) {
	if (!realInstrument) realInstrument = {};		
	realInstrument.bass = null;
	realInstrument.basses = null;
	realInstrument.bassUrl = null;
	
	if (realBassLoop.value != "realBassLoop") {
		realInstrument.bassUrl = realBassLoop.value;		
		const loopData = realBassLoop.value.replace(".bass", "");
		realInstrument.bass = loopData.split("_");						
	}
	if (!styleStarted) setupRealInstruments();		
	saveConfig();		
	console.debug("selected real drums loop", realInstrument, realBassLoop.value);		
}

function chordLoopChanged(config, realChordsLoop, realDrumsLoop, realBassLoop, realRiffLoop) {
	if (!realInstrument) realInstrument = {};		
	realInstrument.chord = null;
	realInstrument.chords = null;
	realInstrument.chordUrl = null;		
			
	if (realChordsLoop.value != "realChordsLoop") {
		realInstrument.chordUrl = realChordsLoop.value;				
		const loopData = realChordsLoop.value.replace(".chord", "");
		realInstrument.chord = loopData.split("_");			
		if (!styleStarted) setupRealInstruments();
		saveConfig();	

		createDrumList(config, realDrumsLoop, realChordsLoop);					
		createBassList(config, realBassLoop, realChordsLoop);			
		createRiffList(config, realRiffLoop, realChordsLoop);
		setTempo(realInstrument.bpm);
	}
	
	console.debug("selected real chord loop", realInstrument, realChordsLoop.value);		
}

function drumLoopChanged(realDrumsLoop) {
	if (!realInstrument) realInstrument = {};		
	realInstrument.drum = null;
	realInstrument.drums = null;
	realInstrument.drumUrl = null;
	
	if (realDrumsLoop.value != "realDrumsLoop") {
		realInstrument.drumUrl = realDrumsLoop.value;		
		const loopData = realDrumsLoop.value.replace(".drum", "");
		realInstrument.drum = loopData.split("_");							
	}
	if (!styleStarted) setupRealInstruments();		
	saveConfig();	
	console.debug("selected real drums loop", realInstrument, realDrumsLoop.value);		
}

function createDrumList(config, realDrumsLoop, realChordsLoop) {
	realDrumsLoop.innerHTML = "";
	realDrumsLoop.options[0] = new Option("NOT USED", "realDrumsLoop");	
	realDrumsLoop.selectedIndex = 0;
	
	let s = 1;
	let selectedIndex = 1; // first style as default match
	
	for (var i=0; i<drum_loops.length; i++) {
		const drumLoop = drum_loops[i];
		let selectedDrum = false;	
		const styleName = realInstrument.chord[0].substring(realInstrument.chord[0].lastIndexOf("/") + 1);
		const loopData = drumLoop.substring(drumLoop.lastIndexOf("/") + 1).replace(".drum", "");		
		const metaData = loopData.split("_");		
		const drumName = metaData[0] + " (" + metaData[1] + ")";			

		if (realInstrument.chord[1] == metaData[1]) 
		{
			if (config.realDrum && config.realDrum == drumLoop) {
				if (!realInstrument) realInstrument = {};			
				selectedDrum = true;			
				realInstrument.drum = metaData;				
				realInstrument.drumUrl = drumLoop;		
			}
			if (styleName == metaData[0]) selectedIndex = s;	// same style name. best match						
			realDrumsLoop.options[s++] = new Option(drumName, drumLoop, selectedDrum, selectedDrum);			
		}
	}	
	
	if (s > 1) {
		realDrumsLoop.selectedIndex = selectedIndex;		
	}

	drumLoopChanged(realDrumsLoop);		
}

function createChordList(config, realChordsLoop) {
	const oldValue = realChordsLoop.value;
	realChordsLoop.innerHTML = "";
	realChordsLoop.options[0] = new Option("NOT USED", "realChordsLoop");	
	
	let s = 1;
	
	for (var i=0; i<chord_loops.length; i++) {
		let selectedChord = false;				
		const chordLoop = chord_loops[i];
		const loopData = chordLoop.substring(chordLoop.lastIndexOf("/") + 1).replace(".chord", "");		
		const metaData = loopData.split("_");		
		const chordName = metaData[0] + " (" + metaData[1] + ")";			

		if (Math.abs(tempo - parseInt(metaData[1])) < 5) 
		{
			if (oldValue == chordLoop) {			
				selectedChord = true;				
			}
					
			realChordsLoop.options[s++] = new Option(chordName, chordLoop, selectedChord, selectedChord);			
		}
	}	
}

function createRiffList(config, realRiffLoop, realChordsLoop) {
	realRiffLoop.innerHTML = "";
	realRiffLoop.options[0] = new Option("NOT USED", "realRiffLoop");	
	realRiffLoop.selectedIndex = 0;		
	
	let s = 1;
	let selectedIndex = 1; // first style as default match
	
	for (var i=0; i<riff_loops.length; i++) {
		const riffLoop = riff_loops[i];
		let selectedRiff = false;	
		const styleName = realInstrument.chord[0].substring(realInstrument.chord[0].lastIndexOf("/") + 1);
		const loopData = riffLoop.substring(riffLoop.lastIndexOf("/") + 1).replace(".riff", "");		
		const metaData = loopData.split("_");		
		const riffName = metaData[0] + " (" + metaData[1] + ")";			

		if (realInstrument.chord[1] == metaData[1]) 
		{
			if (config.realRiff && config.realRiff == riffLoop) {
				if (!realInstrument) realInstrument = {};			
				selectedRiff = true;			
				realInstrument.riff = metaData;				
				realInstrument.riffUrl = riffLoop;		
			}
			if (styleName == metaData[0]) selectedIndex = s;	// same style name. best match						
			realRiffLoop.options[s++] = new Option(riffName, riffLoop, selectedRiff, selectedRiff);			
		}
	}	
	
	if (s > 1) {
		realRiffLoop.selectedIndex = selectedIndex;		
	}

	riffLoopChanged(realRiffLoop);		
}

function createBassList(config, realBassLoop, realChordsLoop) {
	realBassLoop.innerHTML = "";
	realBassLoop.options[0] = new Option("NOT USED", "realBassLoop");	
	realBassLoop.selectedIndex = 0;		
	
	let s = 1;
	let selectedIndex = 1; // first style as default match
	
	for (var i=0; i<bass_loops.length; i++) {
		const bassLoop = bass_loops[i];
		let selectedBass = false;	
		const styleName = realInstrument.chord[0].substring(realInstrument.chord[0].lastIndexOf("/") + 1);
		const loopData = bassLoop.substring(bassLoop.lastIndexOf("/") + 1).replace(".bass", "");		
		const metaData = loopData.split("_");		
		const bassName = metaData[0] + " (" + metaData[1] + ")";			

		if (realInstrument.chord[1] == metaData[1]) 
		{
			if (config.realBass && config.realBass == bassLoop) {
				if (!realInstrument) realInstrument = {};			
				selectedBass = true;			
				realInstrument.bass = metaData;				
				realInstrument.bassUrl = bassLoop;		
			}
			if (styleName == metaData[0]) selectedIndex = s;	// same style name. best match						
			realBassLoop.options[s++] = new Option(bassName, bassLoop, selectedBass, selectedBass);			
		}
	}	
	
	if (s > 1) {
		realBassLoop.selectedIndex = selectedIndex;		
	}

	bassLoopChanged(realBassLoop);		
}

function createStyleList(config, arrangerStyle, arrangerGrp) {
	arrangerStyle.innerHTML = "";
	arrangerStyle.options[0] = new Option("NOT USED", "arrangerStyle");	
	let styleSelected = false;
	let iStyle = 0;
	
	if (arrangerGrp.selectedIndex == 0) 
	{
		indexedDB.databases().then(function (databases) 
		{
			databases.forEach(function (db) {
				console.debug("found database", db.name);
					
				if (db.name.toLowerCase().endsWith(".kst") || db.name.toLowerCase().endsWith(".sty") || db.name.toLowerCase().endsWith(".prs")  || db.name.toLowerCase().endsWith(".bcs") || db.name.toLowerCase().endsWith(".ac7") || db.name.toLowerCase().endsWith(".sas")) {
					iStyle++;
					styleSelected = config.arrName == db.name;
					arrangerStyle.options[iStyle] = new Option(db.name, db.name, styleSelected, styleSelected);				
				}
			})	
		});
		
	} else {
	
		for (internalStyle of internal_styles[arrangerGrp.selectedIndex - 1]) {
			iStyle++;
			const styleName = internalStyle.substring(internalStyle.lastIndexOf("/") + 1);
			styleSelected = config.arrName == internalStyle;
			arrangerStyle.options[iStyle] = new Option(styleName, internalStyle, styleSelected, styleSelected);			
		}	
	}		
}

function arrSequenceLoaded() {
	
	if (realInstrument) {
		setupRealInstruments()
	}	
	
	if (arrSynth?.name) {					
		getArrSynth(arrSynth.name);	// load sf2 file
	}
	else

	if (arranger == "sff") {	// use gmgsx.sf2 as dummy midiSynth
		loadMidiSynth();
	}	
	
	setupSongSequence();
	setupMidiChannels();	
}

function setupMidiChannels() {
	if (!document.getElementById("arr-instrument-18")) {
		setTimeout(setupMidiChannels, 1000);
		return;
	}
	
	config = getConfig();
	
	keysSelectedEle1 = document.getElementById("midi-channel-0");
	keysSelectedEle1.selectedIndex = config["instrument0"];
	
	if (keysSelectedEle1.selectedIndex && smplrKeys[keysSelectedEle1.selectedIndex]?.sf2) {
		smplrKeys[keysSelectedEle1.selectedIndex].instrument.loadInstrument(smplrKeys[keysSelectedEle1.selectedIndex].name);
	}
		
	keysSelectedEle1.addEventListener("change", function(event) {
		console.debug("Switching keys SF", smplrKeys[keysSelectedEle1.selectedIndex]);
		
		if (smplrKeys[keysSelectedEle1.selectedIndex]?.sf2)	{
			smplrKeys[keysSelectedEle1.selectedIndex].instrument.loadInstrument(smplrKeys[keysSelectedEle1.selectedIndex].name);
		}
	});		
	
	keysSelectedEle2 = document.getElementById("midi-channel-1");	
	keysSelectedEle2.selectedIndex = config["instrument1"];	
	
	if (keysSelectedEle2.selectedIndex && smplrPads[keysSelectedEle2.selectedIndex]?.sf2) {
		smplrPads[keysSelectedEle2.selectedIndex].instrument.loadInstrument(smplrPads[keysSelectedEle2.selectedIndex].name);
	}
		
	keysSelectedEle2.addEventListener("change", function(event) {
		console.debug("Switching pads SF", smplrPads[keysSelectedEle2.selectedIndex]);		
		
		if (smplrPads[keysSelectedEle2.selectedIndex]?.sf2) {			
			smplrPads[keysSelectedEle2.selectedIndex].instrument.loadInstrument(smplrPads[keysSelectedEle2.selectedIndex].name);
		}
	});		

	keysSelectedEle3 = document.getElementById("midi-channel-2");	
	keysSelectedEle3.selectedIndex = config["instrument2"];	
	
	if (keysSelectedEle3.selectedIndex && smplrLeads[keysSelectedEle3.selectedIndex]?.sf2) {
		smplrLeads[keysSelectedEle3.selectedIndex].instrument.loadInstrument(smplrLeads[keysSelectedEle3.selectedIndex].name);
	}
		
	keysSelectedEle3.addEventListener("change", function(event) {
		console.debug("Switching pads SF", smplrLeads[keysSelectedEle3.selectedIndex]);		
		
		if (smplrLeads[keysSelectedEle3.selectedIndex]?.sf2) {			
			smplrLeads[keysSelectedEle3.selectedIndex].instrument.loadInstrument(smplrLeads[keysSelectedEle3.selectedIndex].name);
		}
	});		
	
	drumCheckedEle = document.getElementById("arr-instrument-16");
	bassCheckedEle = document.getElementById("arr-instrument-17");
	chordCheckedEle = document.getElementById("arr-instrument-18");
	
	if (mobileCheck() || mobileViewpoint) {
		const chordMute = document.getElementById("chord-mute");
		chordMute.append(chordCheckedEle);
		
		const drumMute = document.getElementById("drum-mute");
		drumMute.append(drumCheckedEle);

		const bassMute = document.getElementById("bass-mute");
		bassMute.append(bassCheckedEle);		
	}
	
	drumCheckedEle.addEventListener("click", function(event) {
		pressFootSwitch(7, true);
	});

	bassCheckedEle.addEventListener("click", function(event) {
		pressFootSwitch(8, true);		
	});
	
	chordCheckedEle.addEventListener("click", function(event) {
		pressFootSwitch(9, true);		
	});	
	
	for (let i=0; i<19; i++) {
		midiVolumeEle[i] = document.getElementById("audio-vol-" + i);
		midiInstrCheckedEle[i] = document.getElementById("arr-instrument-" + i);
		
		if (midiInstrCheckedEle[i]) midiInstrCheckedEle[i].checked = !!config["channel" + i];
	}	
	
	keysSound1 = midiInstrCheckedEle[0];
	keysSound2 = midiInstrCheckedEle[1];
	
	midiVolumeEle[0].value = keysSound1Vol;
	midiVolumeEle[1].value = keysSound2Vol;	
	midiVolumeEle[2].value = keysSound3Vol;	
	
	midiVolumeEle[0].addEventListener("input", function(event) {
		keysSound1Vol = +event.target.value; 			
	});

	midiVolumeEle[1].addEventListener("input", function(event) {
		keysSound2Vol = +event.target.value; 			
	});

	midiVolumeEle[2].addEventListener("input", function(event) {
		keysSound3Vol = +event.target.value; 			
	});
	
	if (drumKnob) drumKnob.setValue(midiVolumeEle[16].value);
	if (chordKnob) chordKnob.setValue(midiVolumeEle[18].value);
	if (bassKnob) bassKnob.setValue(midiVolumeEle[17].value);	
	if (leadKnob) leadKnob.setValue(Math.trunc(guitarVolume * 100));	
	
	midiVolumeEle[16].addEventListener("input", function(event) {
		drumVol = +event.target.value; 
		savedDrumVol = drumVol;	
		if (drumKnob) drumKnob.setValue(drumVol);
		if (drumLoop) drumLoop.setVolume(drumVol / 100);			
	});

	midiVolumeEle[17].addEventListener("input", function(event) {
		bassVol = +event.target.value; 
		savedBassVol = bassVol;	
		if (bassKnob) bassKnob.setValue(bassVol);		
		if (bassLoop) bassLoop.setVolume(bassVol / 100);			
	});
	
	midiVolumeEle[18].addEventListener("input", function(event) {
		chordVol = +event.target.value; 
		savedChordVol = chordVol;	
		if (chordKnob) chordKnob.setValue(chordVol);		
		if (chordLoop) chordLoop.setVolume(chordVol / 100);			
	});	
}

function getSongSequence(songName, callback) {
	console.debug("getSongSequence", songName, styleStarted );

	if (songName.startsWith("assets/songs/")) {
		var xhr = new XMLHttpRequest();

		xhr.open('GET', escape(songName), true);
		xhr.responseType = 'arraybuffer';

		xhr.addEventListener('load', function(ev) {
			const data = new Uint8Array(ev.target.response);
			console.debug("getSongSequence", songName, data);

			songSequence = parseMidi(data, songName);	
			songSequence.name = songName;	

			setupSongSequence();			
			if (callback) callback();							
		});

		xhr.send();			
		
	} else {
		const dbName = songName.substring(0);
		const store = new idbKeyval.Store(dbName, dbName);		

		idbKeyval.get(dbName, store).then(function (raw) 
		{
			if (raw) {
				const data = new Uint8Array(raw);				
				console.debug("getSongSequence", dbName, data);
				songSequence = parseMidi(data, dbName);	
				songSequence.name = songName;	
				
				setupSongSequence();
				if (callback) callback();				
			}			
		}).catch(function (err) {
			console.error('getSongSequence failed!', err)
		});	
	}	
}

function getArrSequence(arrName, callback) {
	console.debug("getArrSequence", arrName);
	arrSequence = {name: arrName};
	
	if (arrName.startsWith("assets/styles/")) {
		var xhr = new XMLHttpRequest();

		xhr.open('GET', escape(arrName), true);
		xhr.responseType = 'arraybuffer';

		xhr.addEventListener('load', function(ev) {
			const data = ev.target.response;
			console.debug("getArrSequence", arrName, data);

			arrSequence = parseMidi(data, arrName);
			normaliseSffStyle();	
			arrSequence.name = arrName;	
			
			if (callback) callback();							
		});

		xhr.send();			
		
	} else {	
		const store = new idbKeyval.Store(arrName, arrName);		

		idbKeyval.get(arrName, store).then(function (data) 
		{
			if (data) {
				console.debug("getArrSequence", arrName, data);
				arrSequence = parseMidi(data, arrName);
				normaliseSffStyle();	
				arrSequence.name = arrName;	
				
				if (callback) callback();				
			}			
		}).catch(function (err) {
			console.error('getArrSequence failed!', err)
		});	
	}
}

function getArrSynth(sf2Name) {
	if (smplrPads.length < 2 || smplrLeads.length < 1) {
		setTimeout(() => getArrSynth(sf2Name), 1000);	// we need to wait until smplrkeys and smplrPads (ch1 & ch2) are loaded.
		return;
	}
	
	console.debug("getArrSynth", sf2Name);
	arrSynth = {name: sf2Name};
	
	const store = new idbKeyval.Store(sf2Name, sf2Name);		

	idbKeyval.get(sf2Name, store).then(function (data) 
	{
		if (data) {
			console.debug("sf2 get", sf2Name, data);
			
			arrSynth = new SoundFont.WebMidiLink();
			arrSynth.loadSoundFont(new Uint8Array(data));	
			arrSynth.name = sf2Name;
			//arrSynth.setReverb(true);			
		}			
	}).catch(function (err) {
		console.error('getArrSynth failed!', err)
	});	
}

function setGigladUI() {
	document.getElementById("giglad").style.display = "none";
	if (arranger == "giglad") document.getElementById("giglad").style.display = "";	
}

function doBreak() {
	console.debug("doBreak " + arranger);	

	if (((drumLoop || chordLoop  || bassLoop) && realInstrument) && drumCheckedEle?.checked) 	
	{
		if (sectionChange == 0) {
			drumLoop.update('brka', false);		
		}
		if (sectionChange == 1) {
			drumLoop.update('brkb', false);			
		}
		if (sectionChange == 2) {
			drumLoop.update('brkc', false);			
		}
		
		if (sectionChange == 3) {
			drumLoop.update('brkd', false);			
		}
	}
	
	if (arranger == "sff") {
	
	} 	
	else 	
		
	if (arranger == "ketron") {
		sendKetronSysex(0x0B + sectionChange);		
	} 	
	else 
		
	if (arranger == "microarranger") {
        if (midiOutput) outputSendProgramChange(90, 4);
	} 
	else 
		
	if (arranger == "psrsx") {
		sendYamahaSysEx(0x18);		// Yamaha break
	}
	else 
		
	if (arranger == "qy100") {
		doQY100Fill();		
	}	
	else 
		
	if (arranger == "giglad") {
		doGigladFill();  			
	}
	else 
		
	if (arranger == "aeroslooper") {
		aerosAux = true;
		aerosChordTrack = 4;
		
		if (aerosAuxMode) {
			outputSendControlChange (39, aerosChordTrack, 4);
		} else  {
			outputSendControlChange (113, 73, 4);	// switch to aux part												
		}
		
	} 	
	else 

	if (arranger == "rclooper") {
		doRcLooperFill(false);  			
	} 	
	else 	
	
	if (arranger == "modx" || arranger == "montage") {
		doModxFill();		
	}
}

function doFill() {
	console.debug("doFill " + arranger);
	
	
	if (realInstrument && drumCheckedEle?.checked) {
		console.debug("doFill webaudio", sectionChange);
		
		if (drumLoop && sectionChange == 0) drumLoop.update('fila', false);
		if (drumLoop && sectionChange == 1) drumLoop.update('filb', false);
		if (drumLoop && sectionChange == 2) drumLoop.update('filc', false);
		if (drumLoop && sectionChange == 3) drumLoop.update('fild', false);
	}
	
	if (arranger == "sff") {
		doSffFill(false);
	} 	
	else 
			
	if (arranger == "ketron") {
		sendKetronSysex(0x07 + sectionChange);		
	}
	else 
		
	if (arranger == "microarranger") {
		doKorgFill();	
	} 	
	else 
		
	if (arranger == "psrsx") {		
		doPsrSxFill();		
	}
	else 
		
	if (arranger == "qy100") {		
		doQY100Fill();		
	}	
	else 
		
	if (arranger == "aeroslooper") {
		aerosAux = true;	
		aerosChordTrack = 5;
		
		if (aerosAuxMode) {
			outputSendControlChange (39, aerosChordTrack, 4);
		} else  {
			outputSendControlChange (113, 73, 4);	// switch to aux part												
		}								
	}	
	else
		
	if (arranger == "rclooper") {
		doRcLooperFill(false);  			
	}	
	else 
		
	if (arranger == "giglad") {
		doGigladFill(); 		
	} 	
	else 
	
	if (arranger == "modx" || arranger == "montage") {
		doModxFill();		
	}
}

function doRcLooperFill(newSection) {
	if (!midiOutput) return;
	
	console.debug("doRcLooperFill", newSection, sectionChange);	

	if (sectionChange == 0) {
		if (newSection) {
			outputSendControlChange (64, 127, 4); 			
		} else {
			outputSendControlChange (66, 127, 4); 
			setTimeout(() => outputSendControlChange (64, 127, 4), 1000); 		
		}
	}
	
	if (sectionChange == 1) {
		if (newSection) {
			outputSendControlChange (65, 127, 4); 			
		} else {		
			outputSendControlChange (67, 127, 4); 	
			setTimeout(() => outputSendControlChange (65, 127, 4), 1000); 	
		}			
	}
	if (sectionChange == 2) {
		if (newSection) {
			outputSendControlChange (66, 127, 4); 			
		} else {		
			outputSendControlChange (64, 127, 4); 
			setTimeout(() => outputSendControlChange (66, 127, 4), 1000); 			
		}
	}		
	if (sectionChange == 3) {
		if (newSection) {
			outputSendControlChange (67, 127, 4); 			
		} else {		
			outputSendControlChange (65, 127, 4); 
			setTimeout(() => outputSendControlChange (67, 127, 4), 1000); 	
		}			
	}	
}

function doGigladFill() {
	if (!midiOutput) return;	
	console.debug("doGigladFill " + sectionChange);	

	if (sectionChange == 0) {
		outputSendControlChange (112, 127, 4); 			
		setTimeout(() => outputSendControlChange (108, 127, 4), 2000); 
	}
	if (sectionChange == 1) {
		outputSendControlChange (113, 127, 4); 	
		setTimeout(() => outputSendControlChange (109, 127, 4), 2000);  			
	}
	if (sectionChange == 2) {
		outputSendControlChange (114, 127, 4); 			
		setTimeout(() => outputSendControlChange (110, 127, 4), 2000);  
	}		
	if (sectionChange == 3) {
		outputSendControlChange (115, 127, 4); 			
		setTimeout(() => outputSendControlChange (111, 127, 4), 2000); 
	}	
}

function doModxFill() {
	if (!midiOutput) return;	
	console.debug("doModxFill " + sectionChange);	
	
	if (arranger == "modx") 
	{
		if (sectionChange == 0) {
			outputSendControlChange (92, 32, 4); 			
			setTimeout(() => outputSendControlChange (92, 16, 4), 2000); 
		}
		if (sectionChange == 1) {
			outputSendControlChange (92, 32, 4); 	
			setTimeout(() => outputSendControlChange (92, 48, 4), 2000);  			
		}
		if (sectionChange == 2) {
			outputSendControlChange (92, 64, 4); 			
			setTimeout(() => outputSendControlChange (92, 80, 4), 2000);  
		}		
		if (sectionChange == 3) {
			outputSendControlChange (92, 96, 4); 			
			setTimeout(() => outputSendControlChange (92, 80, 4), 2000); 
		}	
	} 
	
	else 
		
	if (arranger == "montage") 	{	
		if (sectionChange == 0) {
			outputSendControlChange (92, 64, 4); 			
			setTimeout(() => outputSendControlChange (92, 16, 4), 2000); 
		}
		if (sectionChange == 1) {
			outputSendControlChange (92, 64, 4); 	
			setTimeout(() => outputSendControlChange (92, 32, 4), 2000);  			
		}
		if (sectionChange == 2) {
			outputSendControlChange (92, 80, 4); 			
			setTimeout(() => outputSendControlChange (92, 48, 4), 2000);  
		}		
		if (sectionChange == 3) {
			outputSendControlChange (92, 96, 4); 			
			setTimeout(() => outputSendControlChange (92, 48, 4), 2000); 
		}		
	}
}

function doKorgFill() {
	if (!midiOutput) return;	
	console.debug("doKorgFill " + arranger);			
	const tempArr = sectionChange % 2;
	
	if (tempArr == 0) {
		if (midiOutput) outputSendProgramChange(86, 4);
		setTimeout(() => outputSendProgramChange(80 + sectionChange, 4), 1000);			
		console.debug("doKorgFill A");		
	} else {
		if (midiOutput) outputSendProgramChange(87, 4);
		setTimeout(() => outputSendProgramChange(80 + sectionChange, 4), 1000);			
		console.debug("doKorgFill B");					
	}		
}

function doPsrSxFill() {
	console.debug("doPsrSxFill " + arranger);			

	if (sectionChange == 0) {
		sendYamahaSysEx(0x10);
		setTimeout(() => sendYamahaSysEx(0x08), 1000);			
	}
	if (sectionChange == 1) {
		sendYamahaSysEx(0x11);	
		setTimeout(() => sendYamahaSysEx(0x09), 1000);		
	}
	if (sectionChange == 2) {		
		sendYamahaSysEx(0x12); 
		setTimeout(() => sendYamahaSysEx(0x0A), 1000);			
	}		
	if (sectionChange == 3) {
		sendYamahaSysEx(0x13);
		setTimeout(() => sendYamahaSysEx(0x0B), 1000);			
	}		
}

function doQY100Fill() {
	console.debug("doQY100Fill " + arranger);			
	const tempArr = sectionChange % 2;
	
	if (tempArr == 0) {
		sendYamahaSysEx(0x0C);
		setTimeout(() => sendYamahaSysEx(0x09), 1000);			
		console.debug("doQY100Fill qy100 A");		
	} else {
		sendYamahaSysEx(0x0B);	
		setTimeout(() => sendYamahaSysEx(0x0A), 1000);				
		console.debug("doQY100Fill qy100 B");					
	}		
}

function setSffVar(changed) {
	const autoFill = autoFillCheckedEle?.checked;
	
	if (sectionChange == 0) {
		currentSffVar = "Main A";		
		if ((autoFill && changed) || !changed) currentSffVar = "Fill In AA";
	}
	if (sectionChange == 1) {
		currentSffVar = "Main B";			
		if ((autoFill && changed) || !changed) currentSffVar = "Fill In BB";	
	}
	if (sectionChange == 2) {		
		currentSffVar = "Main C";
		if ((autoFill && changed) || !changed) currentSffVar = "Fill In CC";		
	}		
	if (sectionChange == 3) {
		currentSffVar = "Main D";	
		if ((autoFill && changed) || !changed) currentSffVar = "Fill In DD";		
	}
	
	orinayo_section.innerHTML = currentSffVar;		
}

function doSffSInt() {
	for (let evt in arrSequence.data["SInt"]) {			
		const event = arrSequence.data["SInt"][evt];
		
		if (event.type == "programChange") sendProgramChange(event);	
		if (event.type == "controller") sendControlChange(event);				
	}	
}
	
function doSffFill(changed) {
	if (!styleStarted || !arrSequence?.data) return;
	
	setSffVar(changed);	
	
	if (!arrSequence.data[currentSffVar]) {
		sectionChange++;
		if (sectionChange > 3) sectionChange = 0;
		orinayo_section.innerHTML = SECTIONS[sectionChange];
		setSffVar(changed);
		if (!arrSequence.data[currentSffVar]) return;
	}
	
	currentPlayNote = 0;
	nextNoteTime = playStartTime;
	currentPlayNote = -1;

	while (nextNoteTime < audioContext.currentTime + scheduleAheadTime && currentPlayNote < arrSequence.data[currentSffVar].length - 1) {
		currentPlayNote++;
		const timestamp = arrSequence.data[currentSffVar][currentPlayNote].deltaTime * (60 / (tempo * arrSequence.header.ticksPerBeat));
		nextNoteTime = nextNoteTime + timestamp;
	}
	
	clearAllSffNotes();
	doSffSInt();

	//console.debug("doSffFill", currentSffVar, arrangerBeat, currentPlayNote, arrSequence.data[currentSffVar].length);	
}

function checkForTouchArea() {
	console.debug("checkForTouchArea", pad.axis[TOUCH]);	
	
	if (pad.axis[TOUCH] == -0.7 || pad.axis[TOUCH] == -0.8) { 
		console.debug("GREEN Touch");		

		if (pad.axis[STRUM] == STRUM_UP) {
			doBreak();			
		}
		else
			
		if (pad.axis[STRUM] == STRUM_DOWN) {
			doFill();
		}
	}
	else
		
	if (pad.axis[TOUCH] == -0.4 || pad.axis[TOUCH] == -0.3) { 
		console.debug("RED Touch");		

		if (pad.axis[STRUM] == STRUM_UP) pressFootSwitch(9);	// FSW 9
		if (pad.axis[STRUM] == STRUM_DOWN) pressFootSwitch(8);	// FSW-8
	}
	else
		
	if (pad.axis[TOUCH] == 0.2 || pad.axis[TOUCH] == 0.1) { 
		console.debug("YELLOW Touch");		

		if (pad.axis[STRUM] == STRUM_UP) pressFootSwitch(11);	// FSW 11
		if (pad.axis[STRUM] == STRUM_DOWN) pressFootSwitch(10);	// FSW-10
	}		
	else
		
	if (pad.axis[TOUCH] == 0.4 || pad.axis[TOUCH] == 0.5) { 
		console.debug("BLUE Touch");		

		if (pad.axis[STRUM] == STRUM_UP) pressFootSwitch(13);	// FSW 13
		if (pad.axis[STRUM] == STRUM_DOWN) pressFootSwitch(12);	// FSW-12
	}		
	else
		
	if (pad.axis[TOUCH] == 1.0) { 
		console.debug("ORANGE Touch");	
			
		if (pad.axis[STRUM] == STRUM_UP) pressFootSwitch(7);	// FSW 7
		if (pad.axis[STRUM] == STRUM_DOWN) pressFootSwitch(6);	// FSW-6
	}			
}

function stopSynthNote(note, channel, velocity) {
	const eventTypeByte = 0x80 | channel;
	const evt = {data: "midi," + eventTypeByte + "," + note + "," + velocity}
	arrSynth.onmessage(evt);	
}

function stopPads() {
	console.debug("stopPads");
			
	if (padsDevice?.stopNote) {
		padsDevice.stopNote(firstChord, 2, {velocity: getVelocity()}); 
		if (firstChord instanceof Array && firstChord.length == 4) padsDevice.stopNote(firstChord[0] + 24, 2, {velocity: getVelocity()}); 
		
	} else {
		for (let note of padsEnvelopes)	smplrPads[0].instrument.stop({ stopId: note });		
		padsEnvelopes = [];	
	}
}

function getVelocity() {
	//return 0.5;	
	//return 1.00 - pad.axis[WHAMMY];
	let velocity = appliedVelocity;
	if (velocity == 0) velocity = 0.5 + (Math.random() * 0.5);
	return velocity;
}

function getPitches(seq) {
	const pos = parseInt(guitarPosition.value);
	__6th = E +O*(pos+2), __5th = A +O*(pos+2), __4th = D +O*(pos+2), __3rd = G +O*(pos+2), __2nd = B +O*(pos+2), __1st = E +O*(pos+3);	
	const p = [];
	const arrChord = (firstChord.length == 4 ? firstChord[1] : firstChord[0]) % 12;
	const chordType = (arrChordType == "sus" ? 2 : (arrChordType == "min" ? 1 : 0));	
	const frets = chordChart[arrChord][chordType].strings;
	const stringFrets = [__6th,__5th,__4th,__3rd,__2nd,__1st];

	if (!seq) seq = "6+5+4+3+2+1"; // full strum	
	if (seq.startsWith("[")) seq = seq.substring(1, seq.length - 1);
	
	const seqList = seq.split("+");
	//console.debug("getPitches", arrChord, arrChordType, seqList, frets);
	
	for(var i=0;i<seqList.length;i++){
		const z = 6 - parseInt(seqList[i]);
		
		if(frets[z]>-1){
			p.push(stringFrets[z] + frets[z]);
		}
	}
	return p;
}

function playSynthNote(note, channel, velocity) {
	const eventTypeByte = 0x90 | channel;
	const evt = {data: "midi," + eventTypeByte + "," + note + "," + velocity}
	arrSynth.onmessage(evt);	
}

function playPads(chords, opts) {
	console.debug("playPads", chords, opts);
	
	if (padsDevice?.playNote) {
		padsDevice.playNote(chords, 2, opts);	
		
	} else {
		const keysPadName = keysSelectedEle2.selectedIndex  == 89 ? "0890_FluidR3_GM_sf2_file" : "0940_FluidR3_GM_sf2_file";		
		padsEnvelopes = [];	
		smplrPads[0].instrument.output.setVolume(midiVolumeEle[1].value / 100 * 127);	
	
		if (chords instanceof Array) 
		{
			for (note of chords) {	
				smplrPads[0].instrument.start({ note: parseInt(note), velocity: opts.velocity * 127 }); 
				padsEnvelopes.push(note);
			}
			
		} else {
			smplrPads[0].instrument.start({ note: parseInt(chords), velocity: opts.velocity * 127 });
			padsEnvelopes.push(chords);
		}		
	}
}

function playChord(chord, root, type, bass) {	
	console.debug("playChord", chord, root, type, bass);

	const guitarPos = guitarPosition.selectedIndex;	
	const guitarDuration = 240 / tempo; 
	const bassNote = (chord.length == 4 ? chord[0] : chord[0] - 12);
	const rootNote = (chord.length == 4 ? chord[0] : chord[0] - 12) + (guitarPos * 12);	
	const firstNote = (chord.length == 4 ? chord[1] : chord[0]);	
	const thirdNote = (chord.length == 4 ? chord[2] : chord[1]);	
	const fifthNote = (chord.length == 4 ? chord[3] : chord[2]);
	

	arrChordType = (type == 0x20 ? "sus" : (type == 0x08 ? "min" : (type == 0x13 ? "maj7" : "maj")));	
	
	if (!activeChord) {
		lastChord = firstChord;	
		firstChord = chord;
		
		if (inputDeviceType == "lavagenie" || inputDeviceType == "keyboard" || songSequence?.data?.music) {
			pad.axis[STRUM] = autoStrumUpDown();
		}
			
		const arrChord = (firstChord.length == 4 ? firstChord[1] : firstChord[0]) % 12;
		const key = "key" + arrChord + "_" + arrChordType + "_" + SECTION_IDS[sectionChange];
		const bassKey = "key" + (bassNote % 12) + "_" + arrChordType + "_" + SECTION_IDS[sectionChange];
		const chordSymbol = KEYS[arrChord] + arrChordType + (firstChord.length == 4 ? "/" + KEYS[(bassNote % 12)] : "");
		const displaySymbol = chordSymbol.replace("maj", "");
		
		orinayo.innerHTML = displaySymbol;
		
		if (guitarName != "none" && !guitarDeviceId) 
		{	
			if (pad.axis[STRUM] == STRUM_UP || pad.axis[STRUM] == STRUM_DOWN)	
			{
				if (padsMode == 1) {
					if (pad.axis[STRUM] == STRUM_UP) player.queueStrumUp(guitarContext, guitarSource, midiGuitar, 0, getPitches(), guitarDuration, guitarVolume, undefined, guitarReverb.checked);
					if (pad.axis[STRUM] == STRUM_DOWN) player.queueStrumDown(guitarContext, guitarSource, midiGuitar, 0, getPitches(), guitarDuration, guitarVolume, undefined, guitarReverb.checked);
				}		
				else
					
				if (padsMode == 2) {
					if (pad.axis[STRUM] == STRUM_UP) player.queueStrumUp(guitarContext, guitarSource, midiGuitar, 0, getPitches(), guitarDuration, guitarVolume / 2, undefined, guitarReverb.checked);
					if (pad.axis[STRUM] == STRUM_DOWN) 	player.queueWaveTable(guitarContext, guitarSource, midiGuitar, 0, bassNote, guitarDuration, guitarVolume, undefined, guitarReverb.checked);
				}	
				else
					
				if (padsMode == 3 || padsMode == 4 || padsMode == 5) {			
					const guitarSeq = window["strum" + (padsMode - 2)].split("-"); 
					
					if (seqIndex >= guitarSeq.length) seqIndex = 0;						
					const arpChord = guitarSeq[seqIndex];												
					//console.debug("playChord arps", arpChord, seqIndex, getPitches(arpChord), rootNote, guitarSeq);				
					
					if (arpChord) 
					{				
						if (pad.axis[STRUM] == STRUM_UP) 
						{
							if (arpChord.startsWith("B")) {
								player.queueWaveTable(guitarContext, guitarSource, midiGuitar, 0, bassNote, guitarDuration, guitarVolume, undefined, guitarReverb.checked);
							} else {						
								player.queueStrum(guitarContext, guitarSource, midiGuitar, 0, getPitches(arpChord), guitarDuration, guitarVolume, undefined, guitarReverb.checked);							
							}							
						}
						else
							
						if (pad.axis[STRUM] == STRUM_DOWN) {
							player.queueWaveTable(guitarContext, guitarSource, midiGuitar, 0, arpChord.startsWith("B") ? bassNote : rootNote, guitarDuration, guitarVolume, undefined, guitarReverb.checked);				
						}
						
						seqIndex++;
						if (seqIndex >= guitarSeq.length) seqIndex = 0;							
					}
				}
			}
		}

		if (pad.axis[STRUM] == STRUM_UP || pad.axis[STRUM] == STRUM_DOWN)	{
			const drumChecked = drumCheckedEle?.checked;
			const bassChecked = bassCheckedEle?.checked;
			const chordChecked = chordCheckedEle?.checked;
			
			if (padsDevice?.stopNote || padsDevice?.name == "soundfont") {
				//console.debug("playChord pads", chord);
			
				if (padsMode == 1) {
					if (pad.axis[STRUM] == STRUM_UP) playPads(rootNote + 12, {velocity: getVelocity()});		// up root
					if (pad.axis[STRUM] == STRUM_DOWN) playPads(rootNote, {velocity: getVelocity()});   // down	root				
				}		
				else
					
				if (padsMode == 2) {
					if (pad.axis[STRUM] == STRUM_DOWN) playPads(chord, {velocity: getVelocity()});		// down chord
					if (pad.axis[STRUM] == STRUM_UP) playPads(rootNote + 12, {velocity: getVelocity()});     // up	root				
				}	
				else
					
				if (padsMode == 3) {
					if (pad.axis[STRUM] == STRUM_UP) playPads(thirdNote, {velocity: getVelocity()});	// up third
					if (pad.axis[STRUM] == STRUM_DOWN) playPads(rootNote + 12, {velocity: getVelocity()});   // down	root				
				}
				else
					
				if (padsMode == 4) {
					if (pad.axis[STRUM] == STRUM_UP) playPads(fifthNote, {velocity: getVelocity()});	// up fifth
					if (pad.axis[STRUM] == STRUM_DOWN) playPads(rootNote + 12, {velocity: getVelocity()});   // down	root				
				}
				else
					
				if (padsMode == 5) {
					if (pad.axis[STRUM] == STRUM_UP) playPads(chord, {velocity: getVelocity()});		// up chord
					if (pad.axis[STRUM] == STRUM_DOWN) playPads(chord, {velocity: getVelocity()});   	// down	chord				
				}			
			}
			
			if (styleType.innerText == "Normal" && (styleStarted  || (arranger != "aeroslooper" && arranger != "rclooper"))) {		
				console.debug("playChord output", chord, key, bassKey);
									
				if (chordTracker) {		
					const trasposedRoot = transposeNote(root);
					const transposedBass = transposeNote(bass);
					chordTracker.sendSysex(0x43, [0x7E, 0x02, trasposedRoot, type, transposedBass, type]);				
				}
				
				if (arranger == "webaudio" && realInstrument) 
				{	
					if (styleStarted) 
					{			
						if (bassLoop && bassChecked) 
						{
							if (bassLoop.loop.riffUrl && pad.axis[STRUM] == STRUM_UP && keyChange == arrChord && lastChord[0] != chord[0]) {			// play riff if on root major chord and up-strum
								bassLoop.update('key' + keyChange + '_maj_int3', false);
							} else {
								bassLoop.update(bassKey, false);
							}
						}
						
						if (chordLoop && chordChecked) 
						{
							if (chordLoop.loop.riffUrl && pad.axis[STRUM] == STRUM_UP && keyChange == arrChord && lastChord[0] != chord[0]) {			// play riff if on root major chord and up-strum
								chordLoop.update('key' + keyChange + '_maj_int3', false);
							} else {
								chordLoop.update(key, false);
							}		
						}
					} 
					else 
					
					if (syncStartCheckedEle.checked && playButton.innerText == "Play") {
						toggleStartStop();
						syncStartCheckedEle.checked = false;
					}
				}
				else
					
				if ((arranger == "aeroslooper" || arranger == "rclooper") && midiOutput) {
					//console.debug("playChord looper ", rcLooperChord, root);
			

					if (arranger == "rclooper") 
					{
						if (rcLooperChord != root) 
						{					
							if (root > 48 && root < 55) {					
								outputSendControlChange ((root - 28), 127, 4);	
							}

							rcLooperChord = root;	
						}						
					}
					else
						
					if (arranger == "aeroslooper" && aerosPart < 3) 
					{
						if (root > 48 && root < 55) {
							aerosChordTrack = root - 48;	
							//console.debug("playChord aeros looper ", aerosChordTrack, aerosPart);						
							outputSendControlChange (39, aerosChordTrack, 4);
						}						
					}	
					
				} else {
					
					if (styleStarted) 
					{					
						if (arranger == "sff") {
							if (realInstrument) {				
								if (bassLoop && bassChecked) bassLoop.update(bassKey, false);
								if (chordLoop && chordChecked) chordLoop.update(key, false);		
							}					
							if (styleStarted) setTimeout(clearAllSffNotes);
							
						} else if (midiOutput) {
							if (pad.axis[STRUM] == STRUM_UP) outputPlayNote(chord, [4], {velocity: getVelocity()});		// up
							if (pad.axis[STRUM] == STRUM_DOWN) outputPlayNote(chord, [4], {velocity: getVelocity()});   	// down	
						}
						
						if (!guitarAvailable && midiRealGuitar) 
						{
							if (gamePadModeButton.innerText != "Color Tabs") {					
								midiRealGuitar.playNote(chord, 1, {velocity: getVelocity()});
							} else {
								forwardChord = [];
								if (pad.buttons[GREEN]) forwardChord.push(127);						
								if (pad.buttons[RED]) forwardChord.push(126);
								if (pad.buttons[YELLOW]) forwardChord.push(125);						
								if (pad.buttons[BLUE]) forwardChord.push(124);
								if (pad.buttons[ORANGE]) forwardChord.push(123);
								if (pad.axis[STRUM] == STRUM_UP) forwardChord.push(122);								
								if (pad.axis[STRUM] == STRUM_DOWN) forwardChord.push(121);						
								
								if (forwardChord.length > 0) midiRealGuitar.playNote(forwardChord, 1, {velocity: getVelocity()});							
							}
						}
					}
					else 
					
					if (syncStartCheckedEle.checked && playButton.innerText == "Play") {
						toggleStartStop();
						syncStartCheckedEle.checked = false;
					}						
				}
				
			} else {
				if (arranger == "aeroslooper" && aerosPart < 3) aerosChordTrack = root - 48;
			}		
		}

		if (_converse) {
			const jid = getSelectedChatBox();
			
			if (jid) {
				const json = {bassNote, rootNote, firstNote, thirdNote, fifthNote, displaySymbol};
				_converse.api.send(converse.env.$msg({to: jid, type: 'chat'}).c("json", {'xmlns': 'urn:xmpp:json:0'}).t(JSON.stringify(json)));							
			}
		}		
		
		activeChord = chord;
	}
}

function clearAllSffNotes() {
	//console.debug("clearAllSffNotes");
	
	var events = Object.getOwnPropertyNames(tempVariation);

	for (var i=0; i<events.length; i++) {
		const event = tempVariation[events[i]].event;
		const channel = getCasmChannel(currentSffVar, event.channel);
		const note = tempVariation[events[i]].note;
		
		if (midiOutput) {						
			outputStopNote(note, channel + 1, {velocity: event.velocity});
			
			if (midiSynth) {
				const instrumentNode = midiInstrCheckedEle[channel];
				if (instrumentNode) instrumentNode.parentNode.parentNode.parentNode.parentNode.querySelector("tbody > tr:nth-child(" + (parseInt(channel) + 1) + ") > td:nth-child(" + (4 + parseInt(note) + 1) + ")").classList.remove("note-on");				
			}
		}
		else
			
		if (arrSynth?.onmessage) {
			const eventTypeByte = 0x80 | channel;
			const evt = {data: "midi," + eventTypeByte + "," + note + "," + event.velocity};
			arrSynth.onmessage(evt);
		}							
	}	
}

function transposeNote(root) {
	// TODO	
	
	if (keyChange == 1) {
		if (root == 0x31) root = 0x41;
		else if (root == 0x32) root = 0x42;		
		else if (root == 0x33) root = 0x34;
		else if (root == 0x34) root = 0x44;	
		else if (root == 0x35) root = 0x45;
		else if (root == 0x36) root = 0x46;	
		else if (root == 0x37) root = 0x31;
		
		else if (root == 0x23) root = 0x33;	
		else if (root == 0x26) root = 0x36;
		else if (root == 0x27) root = 0x37;					
	}
	else
	if (keyChange == 2) {
		if (root == 0x31) root = 0x32;
		else if (root == 0x32) root = 0x33;		
		else if (root == 0x33) root = 0x44;
		else if (root == 0x34) root = 0x35;	
		else if (root == 0x35) root = 0x36;
		else if (root == 0x36) root = 0x37;	
		else if (root == 0x37) root = 0x41;
		
		else if (root == 0x23) root = 0x34;	
		else if (root == 0x26) root = 0x46;
		else if (root == 0x27) root = 0x31;					
	}			
	else
	if (keyChange == 3) {
		if (root == 0x31) root = 0x42;
		else if (root == 0x32) root = 0x34;		
		else if (root == 0x33) root = 0x35;
		else if (root == 0x34) root = 0x45;	
		else if (root == 0x35) root = 0x46;
		else if (root == 0x36) root = 0x31;	
		else if (root == 0x37) root = 0x32;
		
		else if (root == 0x23) root = 0x44;	
		else if (root == 0x26) root = 0x37;
		else if (root == 0x27) root = 0x41;					
	}
	else
	if (keyChange == 4) {
		if (root == 0x31) root = 0x33;
		else if (root == 0x32) root = 0x44;		
		else if (root == 0x33) root = 0x45;
		else if (root == 0x34) root = 0x36;	
		else if (root == 0x35) root = 0x37;
		else if (root == 0x36) root = 0x41;	
		else if (root == 0x37) root = 0x42;
		
		else if (root == 0x23) root = 0x35;	
		else if (root == 0x26) root = 0x31;
		else if (root == 0x27) root = 0x32;					
	}	
	else
	if (keyChange == 5) {
		if (root == 0x31) root = 0x34;
		else if (root == 0x32) root = 0x35;		
		else if (root == 0x33) root = 0x36;
		else if (root == 0x34) root = 0x46;	
		else if (root == 0x35) root = 0x31;
		else if (root == 0x36) root = 0x32;	
		else if (root == 0x37) root = 0x33;
		
		else if (root == 0x23) root = 0x45;	
		else if (root == 0x26) root = 0x41;
		else if (root == 0x27) root = 0x42;					
	}	
	else
	if (keyChange == 6) {
		if (root == 0x31) root = 0x44;
		else if (root == 0x32) root = 0x45;		
		else if (root == 0x33) root = 0x46;
		else if (root == 0x34) root = 0x31;	
		else if (root == 0x35) root = 0x41;
		else if (root == 0x36) root = 0x42;	
		else if (root == 0x37) root = 0x34;
		
		else if (root == 0x23) root = 0x36;	
		else if (root == 0x26) root = 0x32;
		else if (root == 0x27) root = 0x33;		
	}		
	else
	if (keyChange == 7) {
		if (root == 0x31) root = 0x35;
		else if (root == 0x32) root = 0x36;		
		else if (root == 0x33) root = 0x37;
		else if (root == 0x34) root = 0x41;	
		else if (root == 0x35) root = 0x32;
		else if (root == 0x36) root = 0x33;	
		else if (root == 0x37) root = 0x44;
		
		else if (root == 0x23) root = 0x46;	
		else if (root == 0x26) root = 0x42;
		else if (root == 0x27) root = 0x34;				
	}	
	else
	if (keyChange == 8) {
		if (root == 0x31) root = 0x45;
		else if (root == 0x32) root = 0x46;		
		else if (root == 0x33) root = 0x31;
		else if (root == 0x34) root = 0x32;	
		else if (root == 0x35) root = 0x42;
		else if (root == 0x36) root = 0x34;	
		else if (root == 0x37) root = 0x35;
		
		else if (root == 0x23) root = 0x31;	
		else if (root == 0x26) root = 0x33;
		else if (root == 0x27) root = 0x44;				
	}
	else
	if (keyChange == 9) {
		if (root == 0x31) root = 0x36;
		else if (root == 0x32) root = 0x37;		
		else if (root == 0x33) root = 0x41;
		else if (root == 0x34) root = 0x42;	
		else if (root == 0x35) root = 0x33;
		else if (root == 0x36) root = 0x44;	
		else if (root == 0x37) root = 0x45;
		
		else if (root == 0x23) root = 0x41;	
		else if (root == 0x26) root = 0x34;
		else if (root == 0x27) root = 0x35;				
	}	
	else
	if (keyChange == 10) {
		if (root == 0x31) root = 0x46;
		else if (root == 0x32) root = 0x31;		
		else if (root == 0x33) root = 0x32;
		else if (root == 0x34) root = 0x33;	
		else if (root == 0x35) root = 0x43;
		else if (root == 0x36) root = 0x35;	
		else if (root == 0x37) root = 0x36;
		
		else if (root == 0x23) root = 0x32;	
		else if (root == 0x26) root = 0x44;
		else if (root == 0x27) root = 0x45;				
	}	
	else
	if (keyChange == 11) {
		if (root == 0x31) root = 0x37;
		else if (root == 0x32) root = 0x41;		
		else if (root == 0x33) root = 0x42;
		else if (root == 0x34) root = 0x34;	
		else if (root == 0x35) root = 0x34;
		else if (root == 0x36) root = 0x45;	
		else if (root == 0x37) root = 0x46;
		
		else if (root == 0x23) root = 0x42;	
		else if (root == 0x26) root = 0x35;
		else if (root == 0x27) root = 0x36;				
	}	
	return root;
}

function sendYamahaSysEx(code) {
    if (midiOutput) { 
        console.debug("sendYamahaSysEx", code)	
		midiOutput.sendSysex(0x43, [0x7E, 0x00, code, 0x7F]);	
		
		setTimeout(() => {
			midiOutput.sendSysex(0x43, [0x7E, 0x00, code, 0x00]);	
		}, 500);		
	}	
}

function sendKetronSysex(code) {
    if (midiOutput) { 
        console.debug("sendKetronSysex", code)	
		midiOutput.sendSysex(0x26, [0x79, 0x05, 0x00, code, 0x7F]);
		
		setTimeout(() => {
			midiOutput.sendSysex(0x26, [0x79, 0x05, 0x00, code, 0x00]);	
		}, 500);		
	}	
}

function pressFootSwitch(code, noupdate) {
	console.debug("pressFootSwitch", code)	

	if (arranger == "sff") 
	{				
		if (code == 6) {	// drum toggle
			const instrumentNode = midiInstrCheckedEle[9];		
			if (!noupdate) instrumentNode.checked = !instrumentNode.checked;			
		}
		else
			
		if (code == 7) {	// drum toggle
			const instrumentNode = midiInstrCheckedEle[10];		
			if (!noupdate) instrumentNode.checked = !instrumentNode.checked;			
		}
		
		if (code == 8 || code == 9) {	// chord toggle
			const chord1 = midiInstrCheckedEle[11];		
			if (!noupdate) chord1.checked = !chord1.checked;

			const chord2 = midiInstrCheckedEle[12];		
			if (!noupdate) chord2.checked = !chord2.checked;

			const chord3 = midiInstrCheckedEle[13];		
			if (!noupdate) chord3.checked = !chord3.checked;

			const chord4 = midiInstrCheckedEle[14];		
			if (!noupdate) chord4.checked = !chord4.checked;

			const chord5 = midiInstrCheckedEle[15];		
			if (!noupdate) chord5.checked = !chord5.checked;			
		}		
		
	} 	
	else 
		
	if (arranger == "webaudio" && realInstrument) {
		
		if (code == 7 && drumLoop?.gainNode) {		
			if (!noupdate) drumCheckedEle.checked = !drumCheckedEle.checked;
			drumLoop.muteToggle();
			if (input?.name == "X-TOUCH MINI") setXTouchSpeaker(encoder, !drumCheckedEle.checked ? "flash": "off");			
		}
		else

		if ((code == 6 || code == 8) && bassLoop?.gainNode) {		
			if (!noupdate) bassCheckedEle.checked = !bassCheckedEle.checked;	
			bassLoop.muteToggle();	
			if (input?.name == "X-TOUCH MINI") setXTouchSpeaker(encoder, !bassCheckedEle.checked ? "flash": "off");		
		}
		else

		if ((code == 6 || code == 9) && chordLoop?.gainNode) {		
			if (!noupdate) chordCheckedEle.checked = !chordCheckedEle.checked;	
			chordLoop.muteToggle();
			if (input?.name == "X-TOUCH MINI") setXTouchSpeaker(encoder, !chordCheckedEle.checked ? "flash": "off");		
		}			
	}
	else	
		
	if (arranger == "aeroslooper" && midiOutput) {
		aerosAux = true;	
		
		if (code == 6) {					
			aerosChordTrack = 2;	// drum A	
		}			
		
		else
			
		if (code == 7) {					
			aerosChordTrack = 3;	// drum B
		}
		
		if (aerosAuxMode) {
			outputSendControlChange (39, aerosChordTrack, 4);
		} else  {
			outputSendControlChange (113, 73, 4);	// switch to aux part												
		}
		
	}
	else	
		
	if (arranger == "rclooper" && midiOutput) {
		if (code == 7) outputSendControlChange (69, 127, 4);	// mute/unmute drums
		
		if (code == 6) 
		{
			if (footSwCode7Enabled) {
				outputSendControlChange (71, 127, 4);			// loop volume off 
			} else {
				outputSendControlChange (70, 127, 4)			// loop volume on
			}
			footSwCode7Enabled = !footSwCode7Enabled;			
		}
	}
	else
	
    if (midiOutput && arranger == "ketron") { 
		midiOutput.sendSysex(0x26, [0x7C, 0x05, 0x01, 0x55 + code, 0x7F]);
		
		setTimeout(() => {
			midiOutput.sendSysex(0x26, [0x7C, 0x05, 0x01, 0x55 + code, 0x00]);	
		}, 500);		
	}	
}

function resetArrToA() {
	sectionChange = 0;
	//rgIndex = 0;
	//nextRgIndex = 0;
	
	if (arranger == "sff") {
	
	} 	
	else 	
	
	if (arranger == "ketron") {
		sendKetronSysex(3 + sectionChange);	
		console.debug("resetArrToA Ketron " + sectionChange);		
	} 	
	else 
		
	if (arranger == "psrsx") {
		sendYamahaSysEx(0x00);	
		console.debug("resetArrToA PSR SX " + sectionChange);			
	}
	else 
		
	if (arranger == "qy100") {
		sendYamahaSysEx(0x09);	
		console.debug("resetArrToA QY100 " + sectionChange);			
	} 	
	else 
		
	if (arranger == "microarranger") {
		if (midiOutput) outputSendProgramChange(80, 4);	
		console.debug("resetArrToA Micro Arranger " + sectionChange);			
	} 	
	else	
	
	if (arranger == "aeroslooper") {
		if (midiOutput) {
			aerosPart = 1;	
			aerosChordTrack = 1;
			//outputSendControlChange (113, 70 + aerosPart, 4);				// switch to main part	
		}
		console.debug("resetArrToA Aeros Looper " + sectionChange);			
	}
	else	
	
	if (arranger == "rclooper") {
		if (midiOutput) outputSendControlChange (64, 127, 4);
		console.debug("resetArrToA RC Looper " + sectionChange);			
	}	
	else	
	
	if (arranger == "giglad") {
		if (midiOutput) outputSendControlChange (108, 127, 4);
		console.debug("resetArrToA Giglad " + sectionChange);			
	}	
	else	
	
	if (arranger == "modx") {
		if (midiOutput) outputSendControlChange (92, 16, 4);
		console.debug("resetArrToA MODX " + sectionChange);			
	}
	else
		
	if (arranger == "montage") {
		if (midiOutput) outputSendControlChange (92, 16, 4);
		console.debug("resetArrToA Montage " + sectionChange);			
	}
	
	orinayo_section.innerHTML = SECTIONS[sectionChange];
	
	if (window[realGuitarStyle]) {
		//orinayo_strum.innerHTML = "Strum " + (rgIndex + 1) + "/" + window[realGuitarStyle].length;	
	}		
}

function stopChord() {			
	if (pad.axis[STRUM] == STRUM_UP || pad.axis[STRUM] == STRUM_DOWN) {

		stopPlayingLeadInstrument();
		
		if (padsDevice?.stopNote || padsDevice?.name == "soundfont") {
			stopPads();
		}
		
		if (activeChord) {
			console.debug("stopChord", pad);
			
			if (midiOutput) outputStopNote(activeChord, [4], {velocity: getVelocity()}); 
			if (!guitarAvailable && midiRealGuitar) midiRealGuitar.stopNote(activeChord, 1, {velocity: getVelocity()});		
			if (guitarName != "none" && !guitarDeviceId) player.cancelQueue(guitarContext);
			
			if (!guitarAvailable && midiRealGuitar) 
			{
				if (gamePadModeButton.innerText != "Color Tabs") {					
					midiRealGuitar.stopNote(activeChord, 1);
				} else if (forwardChord) {
					midiRealGuitar.stopNote(forwardChord, 1);
					forwardChord = null;					
				}
			}			
			
			activeChord = null;
		}	   
	}
}

function playSectionCheck() {
	//console.debug("playSectionCheck", sectionChange);
	
	let arrChanged = false;
	const oldSection = sectionChange;
				
	if (pad.buttons[STARPOWER]) {	// next variation. jump to section of button pressed

		if (pad.buttons[YELLOW]) sectionChange = 0;
		else if (pad.buttons[BLUE]) sectionChange = 1;		
		else if (pad.buttons[RED]) sectionChange = 2;
		else if (pad.buttons[ORANGE] || pad.buttons[GREEN]) sectionChange = 3;	
		else {
			sectionChange++;
			if (sectionChange > 3) sectionChange = 0;			
		}
		
		if (window[realGuitarStyle]) {
			nextRgIndex++;
			if (nextRgIndex ==  window[realGuitarStyle].length) nextRgIndex = 0;
		}
	} 
	else 
		
	if (pad.buttons[START]) {		// prev variation. do nothing if button pressed (used by guitar and realguitar)
	
		if (!pad.buttons[YELLOW] && !pad.buttons[BLUE] && !pad.buttons[ORANGE] && !pad.buttons[RED]  && !pad.buttons[GREEN]) {
			sectionChange--;		
			if (sectionChange < 0) sectionChange = 3;

			if (window[realGuitarStyle]) {			
				nextRgIndex--;				
				if (nextRgIndex < 0) nextRgIndex = window[realGuitarStyle].length - 1;		
			}	
			
		} else {	// guitar - do nothing with style
			return;
		}		
	}	
	
	arrChanged = oldSection != sectionChange;	
	if (realGuitarStyle == "none" && styleStarted) changeArrSection(arrChanged);		

	if (window[realGuitarStyle]) {
		orinayo_strum.innerHTML = ">Strum " + (nextRgIndex + 1) + "/" + window[realGuitarStyle].length;	
	}
	
	if (padsDevice?.playNote) padsDevice.sendControlChange(105 + sectionChange, 127, 2);		
	
	orinayo_section.innerHTML = SECTIONS[sectionChange];
}

function changeArrSection(changed) {	
	
	if (arranger == "webaudio") {
		const autoFill = autoFillCheckedEle?.checked;	
		orinayo_section.innerHTML = SECTIONS[sectionChange];		
				
		if (realInstrument && drumLoop && drumCheckedEle?.checked) {
			console.debug("changeArrSection pressed " + changed, sectionChange);		
			
			if (sectionChange == 0) drumLoop.update(!changed || !autoFill ? 'arra': 'fila', false);
			if (sectionChange == 1) drumLoop.update(!changed || !autoFill ? 'arrb': 'filb', false);
			if (sectionChange == 2) drumLoop.update(!changed || !autoFill ? 'arrc': 'filc', false);
			if (sectionChange == 3) drumLoop.update(!changed || !autoFill ? 'arrd': 'fild', false);		
		}
	}
	else
		
	if (arranger == "sff") {
		doSffFill(changed);		
		console.debug("changeArrSection SFF " + sectionChange);	
	} 	
	else 	
	
	if (arranger == "ketron") {
		sendKetronSysex(3 + sectionChange);	
		console.debug("changeArrSection Ketron " + sectionChange);		
	}
	else 
		
	if (arranger == "psrsx") {
		doPsrSxFill();
		console.debug("changeArrSection PSR SX " + sectionChange);			
	} 	
	else 
		
	if (arranger == "qy100") {
		doQY100Fill();
		console.debug("changeArrSection QY100 " + sectionChange);			
	} 
	else 
		
	if (arranger == "aeroslooper") {
		// auto-fill in loop. nothing to do if not changed
		
		if (changed) {
			aerosAuxMode = false;			
			aerosPart = (sectionChange == 0 || sectionChange == 2) ? 1 : 2;
			outputSendControlChange (113, 80 + aerosPart, 4);			
		}
		console.debug("changeArrSection Aeros Looper " + sectionChange);			
	}
	else 
		
	if (arranger == "rclooper") {
		doRcLooperFill(changed);  	
		console.debug("changeArrSection RC Looper " + sectionChange);			
	}	
	else 
		
	if (arranger == "giglad") {
		doGigladFill();
		console.debug("changeArrSection Giglad " + sectionChange);			
	} 	
	else 
		
	if (arranger == "microarranger") {
		doKorgFill();
		console.debug("changeArrSection Micro Arranger " + sectionChange);			
	} 	
	else	
	
	if (arranger == "modx" || arranger == "montage") {
		doModxFill();
		console.debug("changeArrSection MODX " + sectionChange);			
	}
}

function dokeyUp() {
    keyChange++;
    if (keyChange > 11) keyChange = 0	
    dokeyChange();
}

function dokeyDown() {
    keyChange--;
    if (keyChange < 0) keyChange = 11
    dokeyChange();	
}

function dokeyChange() {
    keyChange = (keyChange % 12);
    console.debug("Received 'key change (" + KEYS[keyChange] + ")", keySign.value);

    orinayo.innerHTML = KEYS[keyChange];
    key = KEYS[keyChange];
    base = BASE + keyChange;

    if (midiRealGuitar) midiRealGuitar.playNote(84 + keyChange, 1, {velocity: getVelocity(), duration: 1000});
	if (padsDevice?.playNote) padsDevice.sendControlChange(104, keyChange, 2);	
	
	if (window.droneOn) {
		window.dispatchEvent(new CustomEvent('MIDI', { detail: 11 }));	 //stop
		setTimeout(() => {window.dispatchEvent(new CustomEvent('MIDI', { detail: 11 }))}, 250); // restart
	}
}

function doChord() {
  //console.debug("doChord", pad)
  stopChord();

  if (!window.droneOn && droneActive) {
     window.dispatchEvent(new CustomEvent('MIDI', { detail: 11 }));
  }  

  if (!pad.buttons[YELLOW] && !pad.buttons[BLUE] && !pad.buttons[ORANGE] && !pad.buttons[RED]  && !pad.buttons[GREEN]) 
  {
	  if (pad.axis[STRUM] == STRUM_LEFT)
	  {
		dokeyDown();
	  }
	  else
		  
	  if (pad.axis[STRUM] == STRUM_RIGHT)
	  {
		dokeyUp();
	  }
	  
	  if (guitarName != "none" && !guitarDeviceId && (pad.axis[STRUM] == STRUM_UP || pad.axis[STRUM] == STRUM_DOWN) && padsMode != 0 && padsMode != 3 && padsMode != 4 && padsMode != 5) {
		const arrChord = (firstChord.length == 4 ? firstChord[1] : firstChord[0]) % 12;
		const guitarDuration = 240 / tempo;
		player.queueSnap(guitarContext, guitarSource, midiGuitar, 0, getPitches(), guitarDuration, guitarVolume/4, undefined, guitarReverb.checked);					  
	  }
  }
  else
	  
  if (pad.axis[STRUM] == STRUM_RIGHT && !styleStarted) {
	if (pad.buttons[GREEN]) recallRegistration(1);	
	if (pad.buttons[RED]) recallRegistration(2);	
	if (pad.buttons[YELLOW]) recallRegistration(3);	
	if (pad.buttons[BLUE]) recallRegistration(4);	
	if (pad.buttons[ORANGE]) recallRegistration(5);	
  }
  else
	  
  if (pad.axis[STRUM] == STRUM_LEFT && !styleStarted)  {
	if (pad.buttons[GREEN]) recallRegistration(6);	
	if (pad.buttons[RED]) recallRegistration(7);	
	if (pad.buttons[YELLOW]) recallRegistration(8);	
	if (pad.buttons[BLUE]) recallRegistration(9);	
	if (pad.buttons[ORANGE]) recallRegistration(10);	
  }  
  
  if (pad.buttons[START] || pad.buttons[STARPOWER])
  {
	if (pad.buttons[START]) {	// start + button activates pad mode
	
		if (pad.buttons[YELLOW] && pad.buttons[BLUE]) { // Guitar position C3
 			guitarPosition.selectedIndex = 2;			
		}
		else 
			
		if (pad.buttons[GREEN] && pad.buttons[RED]) { // Guitar position C4
			guitarPosition.selectedIndex = 0;
		}
		
		else 
			
		if (pad.buttons[RED] && pad.buttons[YELLOW]) { // Guitar postion C5
			guitarPosition.selectedIndex = 1;			
		}
		else 
			
		if (pad.buttons[BLUE] && pad.buttons[ORANGE]) { // mute internal guitar
			padsMode = 0;
			seqIndex = 0;
			orinayo_pad.innerHTML = "None";			
		} 
		else {		
			if (pad.buttons[GREEN]) padsMode = 1;	// full chord up/down
			if (pad.buttons[RED]) padsMode = 2;		// chord up/root note down	
			if (pad.buttons[YELLOW]) padsMode = 3;	// root note up/down
			if (pad.buttons[BLUE]) padsMode = 4;	// 3rd note up/root note down
			if (pad.buttons[ORANGE]) padsMode = 5;	// 5th note up/root note down
			
			if (padsMode != 0) orinayo_pad.innerHTML = "Pad " + padsMode;		
		}			
	}
	
	playSectionCheck();

  }

  if (pad.buttons[LOGO])
  {
	if (pad.buttons[YELLOW] && pad.buttons[BLUE] && !pad.buttons[BLUE] && !pad.buttons[RED] && !pad.buttons[GREEN]) {	
		styleStarted = false;	
		resetArrToA();
		playButton.innerText = !styleStarted ? "Play" : "Stop";	
		playButton.style.setProperty("--accent-fill-rest", !styleStarted ? "green" : "red");		
		
	} else {		
		if (handledStartStop) 
		{		
			if (arranger == "webaudio" && realInstrument) {
				
				if (drumLoop || chordLoop || bassLoop) {
					toggleStartStop();
				} else {
					setupRealInstruments();	
				}
			} else {
				toggleStartStop();					
			}
		}			
		return;		
	}
  }  

   if (pad.axis[STRUM] == STRUM_UP || pad.axis[STRUM] == STRUM_DOWN) {
		if (styleStarted) checkForTouchArea();
   }

  if ((pad.axis[STRUM] != STRUM_UP && pad.axis[STRUM] != STRUM_DOWN) || pad.buttons[STARPOWER] || pad.buttons[START]) {
	  return;
  }

  // --- F/C

  if (pad.buttons[YELLOW] && pad.buttons[BLUE] && pad.buttons[ORANGE] && pad.buttons[RED])
  {
    playChord([base - 12, base + 5, base + 9, base + 12], 0x34, 0x00, 0x31);
  }
  else

  // --- G/C

  if (pad.buttons[YELLOW] && pad.buttons[BLUE] && pad.buttons[ORANGE] && pad.buttons[GREEN])
  {
    playChord([base - 12, base + 7, base + 11, base + 14], 0x35, 0x00, 0x31);
  }
  else

  // -- B

  if (pad.buttons[RED] && pad.buttons[YELLOW] && pad.buttons[BLUE] && pad.buttons[GREEN])
  {
    playChord([base - 1, base + 3, base + 6], 0x37, 0x00, 0x37);
  }
  else

  if (pad.buttons[RED] && pad.buttons[YELLOW] && pad.buttons[GREEN])     // Ab
  {
    playChord([base - 4, base, base + 3], 0x26, 0x00, 0x26);
  }
  else

  if (pad.buttons[RED] && pad.buttons[YELLOW] && pad.buttons[BLUE])     // A
  {
    playChord([base - 3, base + 13, base + 16], 0x36, 0x00, 0x36);
  }
  else

  if (pad.buttons[BLUE] && pad.buttons[YELLOW] && pad.buttons[GREEN])     // E
  {
    playChord([base - 8, base + 8, base + 11], 0x33, 0x00, 0x33);
  }
  else


  if (pad.buttons[BLUE] && pad.buttons[RED] && pad.buttons[ORANGE])     // Eb
  {
    //playChord([base - 29, base + 9, base + 12, base + 16]);
    //// orinayo.innerHTML = key + " - " + "Am/G";
    playChord([base - 9, base + 7, base + 10], 0x23, 0x00, 0x23);
  }
  else

  if (pad.buttons[YELLOW] && pad.buttons[BLUE] && pad.buttons[ORANGE])    // F/G
  {
    playChord([base - 17, base + 5, base + 9, base + 12], 0x34, 0x00, 0x35);
  }
  else

  if (pad.buttons[RED] && pad.buttons[YELLOW])     // Bb
  {
    playChord([base - 2, base + 2, base + 5], 0x27, 0x00, 0x27);
  }
  else

  if (pad.buttons[GREEN] && pad.buttons[YELLOW])     // Gsus
  {
    playChord([base - 5, base + 12, base + 14], 0x35, 0x20, 0x35);
  }
  else

  if (pad.buttons[ORANGE] && pad.buttons[YELLOW])     // Csus
  {
    playChord([base, base + 5, base + 7], 0x31, 0x20, 0x31);
  }
  else

  if (pad.buttons[YELLOW] && pad.buttons[BLUE])    // C/E
  {
    playChord([base - 20, base, base + 4, base + 7], 0x31, 0x00, 0x33);
  }
  else

  if (pad.buttons[GREEN] && pad.buttons[RED])     // G/B
  {
    playChord([base - 13, base + 7, base + 11, base + 14], 0x35, 0x00, 0x37);
  }
  else

  if (pad.buttons[BLUE] && pad.buttons[ORANGE])     // F/A
  {
    playChord([base - 15, base + 5, base + 9, base + 12], 0x34, 0x00, 0x36);
  }
  else

  if (pad.buttons[GREEN] && pad.buttons[BLUE])     // Em
  {
    playChord([base - 8, base + 7, base + 11], 0x33, 0x08, 0x33);
  }
  else

   if (pad.buttons[ORANGE] && pad.buttons[RED])   // Fm
   {
     playChord([base - 7, base + 8, base + 12], 0x34, 0x08, 0x34);
   }
   else

   if (pad.buttons[GREEN] && pad.buttons[ORANGE])     // Gm
   {
     playChord([base - 5, base + 10, base + 14], 0x35, 0x08, 0x35);
   }
  else

  if (pad.buttons[RED] && pad.buttons[BLUE])     // D
  {
    playChord([base + 2, base + 6, base + 9], 0x32, 0x00, 0x32);
  }
  else

  if (pad.buttons[YELLOW])    // C
  {
    playChord([base, base + 4, base + 7], 0x31, 0x00, 0x31);
  }
  else

  if (pad.buttons[BLUE])      // Dm
  {
    playChord([base + 2, base + 5, base + 9], 0x32, 0x08, 0x32);
  }
  else

  if (pad.buttons[ORANGE])   // F
  {
    playChord([base - 7, base + 9, base + 12], 0x34, 0x00, 0x34);
  }
  else

  if (pad.buttons[GREEN])     // G
  {
    playChord([base - 5, base + 11, base + 14], 0x35, 0x00, 0x35);
  }
  else

  if (pad.buttons[RED])     // Am
  {
    playChord([base - 3, base + 12, base + 16], 0x36, 0x08, 0x36);
  }
}

function webAudioStyleEnded() {
	const ended = (!chordLoop || !chordLoop.looping) && (!drumLoop || !drumLoop.looping) && (!bassLoop || !bassLoop.looping);	
	console.debug("webAudioStyleEnded", ended);
	return ended;	
}

function webAudioStyleStarted() {
	const started = (!chordLoop || chordLoop.looping) && (!drumLoop || drumLoop.looping) && (!bassLoop || bassLoop.looping);	
	console.debug("webAudioStyleStarted", started);
	return started;	
}

function webAudioStyleReady() {
	const ready = (!drumLoop || !!window.loopCache[drumLoop.loop.url]) && (!bassLoop || !!window.loopCache[bassLoop.loop.url]) && (!chordLoop || !!window.loopCache[chordLoop.loop.url]);
	console.debug("webAudioStyleReady", ready);
	return ready;
}

function verifyStartStopWebAudio() {
	styleStarted = chordLoop?.looping || drumLoop?.looping || bassLoop?.looping;
	handleStartStopButton();	
}

function startStopWebAudio() {
	let gapTime = 0.5;
	const stillPlaying = webAudioStyleStarted();
	const ready = webAudioStyleReady();

	console.debug("startStopWebAudio", styleStarted, stillPlaying, ready, pad.buttons[YELLOW]);
	
	if (!ready) {
		playButton.innerText = "Wait..";
		playButton.style.setProperty("--accent-fill-rest", "red");		
		return 0;
	}
	
	if (!styleStarted) {	
		if (recordMode) startRecording();				
		let goTime = audioContext.currentTime + gapTime;										
		const playbackRate = 2 ** (parseInt(tempoEle.value) / 12);

			const introEnd = introEndCheckedEle?.checked;
			
			if (((pad.buttons[GREEN] || pad.buttons[RED] || pad.buttons[YELLOW] || pad.buttons[BLUE] || pad.buttons[ORANGE]) || midiNotes.size > 2) && introEnd && drumLoop) {		// intro requires drumbeat	
				orinayo_section.innerHTML = "Arr A";
				
				if (syncStartCheckedEle.checked) {			// start on next 1/4 beat sync start
					goTime = audioContext.currentTime + ((60 / tempo) * 1);							
				}
										
				if (drumLoop && drumCheckedEle?.checked) {
					drumLoop.start('int1', goTime);	
				
					if (bassLoop && bassCheckedEle?.checked) {
						bassLoop.start("key" + (keyChange % 12), goTime + (realInstrument.drums.int1.stop / 1000 / playbackRate));
					}
					
					if (chordLoop && chordCheckedEle?.checked) {
						chordLoop.start("key" + (keyChange % 12), goTime + (realInstrument.drums.int1.stop / 1000 / playbackRate));			
					}
				}
			} else {
				if (drumLoop && drumCheckedEle?.checked) drumLoop.start('arra', goTime);						
				if (bassLoop && bassCheckedEle?.checked) bassLoop.start("key" + (keyChange % 12), goTime);
				if (chordLoop && chordCheckedEle?.checked) chordLoop.start("key" + (keyChange % 12), goTime);							
			}
			
		
	} else {
		endAudioStyle();
		if (recordMode) setTimeout(stopRecording, 10000);				
	}

	handleStartStopButton();
	return gapTime;
}

function endAudioStyle() {
	console.debug("endAudioStyle", styleStarted, webAudioStyleReady(), webAudioStyleStarted());

	if (((pad.buttons[GREEN] || pad.buttons[RED] || pad.buttons[YELLOW] || pad.buttons[BLUE] || pad.buttons[ORANGE]) || midiNotes.size > 2) && introEnd) {	
		orinayo_section.innerHTML = "End";

		if (drumLoop) 
		{	
			if (introEndCheckedEle?.checked) 
			{
				if (drumLoop.loop.riffUrl) {
					drumLoop.update('end3', false);	
				} else {
					drumLoop.update('end1', false);					
				}
			} else {
				drumLoop.finished = true;
				drumLoop.stop();				
			}
		}	
		
		if (bassLoop) {	

			if (bassLoop.loop.riffUrl && introEndCheckedEle?.checked) {
				bassLoop.update('key' + keyChange + '_maj_end3', false);	
			} else {
				bassLoop.finished = true;
				bassLoop.stop();				
			}
		}	

		if (chordLoop) {	

			if (chordLoop.loop.riffUrl && introEndCheckedEle?.checked) {
				chordLoop.update('key' + keyChange + '_maj_end3', false);	
			} else {
				chordLoop.finished = true;
				chordLoop.stop();				
			}
		}			
		
	} else {

		if (drumLoop) {		
			orinayo_section.innerHTML = "End";
			drumLoop.finished = true;
			drumLoop.stop();
		}
		
		if (bassLoop) {	
			bassLoop.finished = true;
			bassLoop.stop();
		}

		if (chordLoop) {
			chordLoop.finished = true;		
			chordLoop.stop();
		}		
	}	
}

function toggleStartStop() {
	console.debug("toggleStartStop", styleStarted);
	audioContext.resume();
	
	handledStartStop = false;
	
	if (!styleStarted) {
		resetArrToA();

	    if (!window.droneOn && droneActive) {
		    window.dispatchEvent(new CustomEvent('MIDI', { detail: 11 }));
	    } 		
	}
		
	if (((midiRealGuitar || guitarName != "none") && realGuitarStyle != "none" && window[realGuitarStyle]) || songSequence || (arrSequence && arranger == "sff")) 
	{
		if (playButton.innerText != "On" && playButton.innerText != "Off") {
			startStopSequencer();

			if (songSequence || arranger == "sff") {
				handledStartStop = true;				
				return;	
			}				
		}			
	}
	
	const introEnd = introEndCheckedEle?.checked;	
		
	if (arranger == "webaudio") {				
		if ((drumLoop || chordLoop || bassLoop) && realInstrument) {
			startStopWebAudio();
			handledStartStop = true;
			return;			
		}
			
	}
	else

	if (midiOutput) { 			
		if (arranger == "ketron") {		
			outputPlayNote(firstChord, [4], {velocity: getVelocity()});
				
			let startEndType = 0x12; // default start/stop
		
			if (pad.buttons[YELLOW]) startEndType = 0x0F;	// INTRO/END-1
			if (pad.buttons[RED]) startEndType = 0x10;		// INTRO/END-2
			if (pad.buttons[GREEN]) startEndType = 0x11;	// INTRO/END-3		
			if (pad.buttons[BLUE]) startEndType = 0x17;		// TO END
			if (pad.buttons[ORANGE]) startEndType = 0x35;	// FADE			
			
			sendKetronSysex(startEndType);
			console.debug("toggle start/stop", startEndType);
			styleStarted = !styleStarted;				
		}
		else

		if (arranger == "modx" || arranger == "montage") 
		{		
			if (!styleStarted)
			{
				console.debug("start key pressed");  
				outputPlayNote(firstChord, [4], {velocity: getVelocity()});				
				outputSendControlChange (92, 0, 4);  				    
				styleStarted = true;
			}
			else {
				console.debug("stop key pressed");				
				outputSendControlChange (92, 96, 4); 			
				setTimeout(() => outputSendControlChange (92, 112, 4), 2000);        
				styleStarted = false;
			}
		}	
		else

		if (arranger == "aeroslooper") 
		{				
			if (!styleStarted) {				
				console.debug("Aeros looper start key pressed");  
				
				if (midiOutput) {
					aerosAux = true;
						
					if (pad.buttons[YELLOW] || pad.buttons[ORANGE] || pad.buttons[GREEN] || pad.buttons[RED] || pad.buttons[BLUE]) {
						aerosChordTrack = 1;
						aerosPart = 1;
						console.debug("Aeros intro start"); 
						outputSendControlChange (113, 73, 4);	// switch to aux part	
						setTimeout(() => outputSendControlChange (39, aerosChordTrack, 4), 500);						
						setTimeout(() => outputSendControlChange (113, 90 + aerosChordTrack, 4), 1000);
						
					} else {	
						console.debug("Aeros main start"); 
						outputSendControlChange (113, 71, 4);	// switch to main part													
					}										
					
				}     
				styleStarted = true;
			}
			else {				
				console.debug("Aeros looper stop key pressed");
				
				if (midiOutput) {
					if (pad.buttons[YELLOW] || pad.buttons[ORANGE] || pad.buttons[GREEN] || pad.buttons[RED] || pad.buttons[BLUE]) {
						aerosChordTrack = 6;
						aerosAux = true
						outputSendControlChange (113, 73, 4);	// switch to aux part

					} else {
						outputSendControlChange (43, 0, 4);	// stop all						
					}
										
				}	      
				styleStarted = false;
			}			
		}
		else

		if (arranger == "rclooper") {		
			outputSendControlChange (68, 127, 4);						
			console.debug("RC looper start/stop key pressed"); 
			styleStarted = !styleStarted; 			
		}
		else

		if (arranger == "giglad") 
		{		
			if (!styleStarted)
			{
				console.debug("start key pressed");  
				
				if (midiOutput) {
					outputPlayNote(firstChord, [4], {velocity: getVelocity()});
				
					if (pad.buttons[YELLOW]) {
						outputSendControlChange (102, 127, 4); 	// INTRO 1
						sectionChange = 0;						
					} else if (pad.buttons[RED]) {
						outputSendControlChange (103, 127, 4); 	// INTRO 2	
						sectionChange = 1;							
					} else if (pad.buttons[GREEN]){
						outputSendControlChange (104, 127, 4); 	// INTRO 3
						sectionChange = 2;							
					} else if (pad.buttons[ORANGE]){
						outputSendControlChange (85, 127, 4); 		// FADE IN				
					}						
					outputSendControlChange (87, 127, 4);			// START
					
				}     
				styleStarted = true;
			}
			else {
				console.debug("stop key pressed");
				
				if (midiOutput) {
					if (pad.buttons[YELLOW]) {
						outputSendControlChange (105, 127, 4); 
					} else if (pad.buttons[RED]) {
						outputSendControlChange (106, 127, 4); 						
					} else  if (pad.buttons[GREEN]) {
						outputSendControlChange (107, 127, 4); 	
					} else if (pad.buttons[ORANGE]){
						outputSendControlChange (86, 127, 4); 		// FADE OUT						
					} else {
						outputSendControlChange (88, 127, 4);		// STOP
					}				
				}	      
				styleStarted = false;
			}
		}		
		else

		if (arranger == "psrsx") 
		{		
			if (!styleStarted)
			{
				console.debug("start key pressed"); 
				outputPlayNote(firstChord, [4], {velocity: getVelocity()});
				
				let startEndType = 0x00;
				if (pad.buttons[YELLOW]) startEndType = 0x00;	// INTRO-1
				if (pad.buttons[RED]) startEndType = 0x01;		// INTRO-2
				if (pad.buttons[GREEN]) startEndType = 0x02;	// INTRO-3		
				if (pad.buttons[BLUE]) startEndType = 0x01;		// INTRO-2		
				if (pad.buttons[ORANGE]) startEndType = 0x02;	// INTRO-3	
				
				sendYamahaSysEx(0x10);							// ARRA		
				sendYamahaSysEx(startEndType);	
				midiOutput.sendSysex(0x43, [0x60, 0x7A]);			// Yamaha Sysex for Accomp start
		
				styleStarted = true;
			}
			else {
				console.debug("stop key pressed");				
				let startEndType = -1;
				if (pad.buttons[YELLOW]) startEndType = 0x20;	// END-1
				if (pad.buttons[RED]) startEndType = 0x21;		// END-2
				if (pad.buttons[GREEN]) startEndType = 0x22;	// END-3		
				if (pad.buttons[BLUE]) startEndType = 0x21;		// END-2	
				if (pad.buttons[ORANGE]) startEndType = 0x22;	// END-3
				
				if (startEndType == -1) {
					midiOutput.sendSysex(0x43, [0x60, 0x7D]);	// Yamaha Sysex for Accomp stop
				} else {
					sendYamahaSysEx(startEndType);						
				}
   
				styleStarted = false;
			}
		}
		else

		if (arranger == "qy100") 
		{		
			if (!styleStarted)
			{
				console.debug("start key pressed");  
				outputPlayNote(firstChord, [4], {velocity: getVelocity()});				
				sendYamahaSysEx(0x08);	
				midiOutput.sendSysex(0x43, [0x60, 0x7A]);			// Yamaha Sysex for Accomp start				
				styleStarted = true;
			}
			else {
				console.debug("stop key pressed");					

				if (!pad.buttons[YELLOW]) {
					midiOutput.sendSysex(0x43, [0x60, 0x7D]);	// Yamaha Sysex for Accomp stop
				} else {
					sendYamahaSysEx(0x0D);						
				}
				
				styleStarted = false;
			}
		}		
		else

		if (arranger == "microarranger") 
		{		
			if (!styleStarted)
			{
				console.debug("start key pressed");  				
				
				if (midiOutput) {
					outputPlayNote(firstChord, [4], {velocity: getVelocity()});
				
					if (pad.buttons[YELLOW]) {
						outputSendProgramChange(85, 4);
					} else if (pad.buttons[ORANGE]) {
						outputSendProgramChange(91, 4);							
					} else if (pad.buttons[GREEN]){
						outputSendProgramChange(84, 4);						
					} else {
						midiOutput.sendStart();
					}
					
				}     
				styleStarted = true;
			}
			else {
				console.debug("stop key pressed");
				
				if (midiOutput) {
					outputPlayNote(firstChord, [4], {velocity: getVelocity()});
				
					if (pad.buttons[YELLOW]) {
						outputSendProgramChange(89, 4);
					} else if (pad.buttons[ORANGE]) {
						outputSendProgramChange(91, 4);						
					} else  if (pad.buttons[GREEN]) {
						outputSendProgramChange(88, 4);
					} else {
						midiOutput.sendStop();						
					}
				}	      
				styleStarted = false;
			}
		}	

		orinayo_section.innerHTML = SECTIONS[sectionChange];			
	}	

	handleStartStopButton();
	handledStartStop = true;
}

function handleStartStopButton() {
	playButton.innerText = !styleStarted ? "Play" : "Stop";
	playButton.style.setProperty("--accent-fill-rest", !styleStarted ? "green" : "red");
	playButton.style.backgroundColor = !styleStarted ? "green" : "red";
	
	if (midiOutput?.name == "X-TOUCH MINI" && !styleStarted) {
		resetXTouch();	
	}
	
	if (chrome.action) {
		chrome.action.setBadgeBackgroundColor({ color: !styleStarted ? "green" : "red"});
		chrome.action.setBadgeText({ text: !styleStarted ? " " : " " });	
	}
}

function updateCanvas() {
	canvas.context.fillStyle = "#080018";
    canvas.context.fillRect(0, 0, canvas.gameWidth, canvas.gameHeight);
    canvas.context.strokeStyle = "#000000";
    canvas.context.strokeRect(0, 0, canvas.gameWidth, canvas.gameHeight);
	game.update();
}

async function setup() {
	var gameCanvas = document.getElementById('gameCanvas');
	gameCanvas.width = window.innerWidth  * 0.88;
	canvas.context = gameCanvas.getContext('2d');
	canvas.gameWidth = gameCanvas.width;
	canvas.gameHeight = gameCanvas.height;

	if (!game) {
		game = new GameBoard(canvas.context, canvas.gameWidth / 4, 0,  canvas.gameWidth / 2, canvas.gameHeight);
		document.addEventListener("pointerlockchange", lockChangeAlert, false);

		if (inputDeviceType == "orinayo") 
		{
		  if (!document.pointerLockElement) {
			await document.body.requestPointerLock({
			  unadjustedMovement: true,
			});
		  } 
		}
	}
}

function lockChangeAlert() {
  if (document.pointerLockElement === document.body) {
    console.debug("The pointer lock status is now locked");
	lock = {counter: 0, up: 0, down: 0, button: -1};
    document.body.addEventListener("mousemove", updatePosition, false);
    document.body.addEventListener("mousedown", updateButton, false); 	

  } else {
	lock = {counter: 0, up: 0, down: 0, button: -1};
    console.debug("The pointer lock status is now unlocked");
    document.body.removeEventListener("mousemove", updatePosition, false); 
    document.body.removeEventListener("mousedown", updateButton, false); 
  }
}

function updateButton(e) {
	let handled = false;
	lock.button = e.buttons;
	console.debug("updateButton", e.buttons);	
	
	if (e.buttons == 3) {
		pad.buttons[LOGO] = true;
		if (keyboard.get("4")) pad.buttons[YELLOW] = true; 
		handled = true;				
	}
	else

	if (e.buttons == 2) {
		pad.buttons[START] = true;
		handled = true;				
	}
	else

	if (e.buttons == 1) {
		pad.buttons[STARPOWER] = true;
		handled = true;				
	}		
	
	if (handled) {
		doChord();
		updateCanvas();			
		resetGuitarHero();	
	}	
}

function updatePosition(e) {
	lock.counter++;
	
	if (e.movementY > 0) lock.down++;
	if (e.movementY < 0) lock.up++;
	
	if (lock.counter > 50) {
		console.debug("updatePosition", lock.down > lock.up ? "DOWN" : "UP");
		
		lock = {counter: 0, up: 0, down: 0, button: -1};		
		pad.axis[STRUM] = lock.down > lock.up ? STRUM_DOWN : STRUM_UP;	

		doChord();
		updateCanvas();			
		resetGuitarHero();	
	}
}

function enableSequencer(flag) {	
	document.querySelector("#tempoCanvas").style.display = flag ? "" : "none";

	if (!canvasContext && flag) {
		console.debug("enableSequencer", flag);		
		canvasContext = tempoCanvas.getContext( '2d' );    
		canvasContext.strokeStyle = "#ffffff";
		canvasContext.lineWidth = 2;

		window.onorientationchange = resetCanvas;
		window.onresize = resetCanvas;

		requestAnimFrame(draw);    // start the drawing loop.

		timerWorker = new Worker("./js/metronome-worker.js");
		
		if (!midiRealGuitar && window[realGuitarStyle][rgIndex]) {			
			window[realGuitarStyle][rgIndex].restart();
		}

		timerWorker.onmessage = function(e) {
			if (e.data == "tick") {
				// console.debug("tick!");
				guitarScheduler();
			}
			else
				console.debug("message: " + e.data);
		};
		timerWorker.postMessage({"interval":lookahead});	
	}
}

function startStopSequencer() {
	console.debug("startStopSequencer", styleStarted, songSequence);

	if (songSequence) 
	{
		if (!styleStarted) 	
		{		
			if (!unlocked && arranger == "sff") {
			  // play silent buffer to unlock the audio
			  var buffer = audioContext.createBuffer(1, 1, 22050);
			  var node = audioContext.createBufferSource();
			  node.buffer = buffer;
			  node.start(0);
			  unlocked = true;
			}
			
			if (songSequence.data?.music) {
				doStartStopSequencer();				
			} else {
				getSongSequence(songSequence.name, doStartStopSequencer);				
			}

		} else {
			if (timerWorker) timerWorker.postMessage("stop");	
			notesInQueue = []; 
			doStartStopSequencer();	
		}		
	}
	else
		
	if (arrSequence && realGuitarStyle == "none") 	
	{		
		if (!styleStarted) 	
		{
			if (arrSequence.name && !arrSequence.data) {
				getArrSequence(arrSequence.name, doStartStopSequencer);
			}
			else {
				doStartStopSequencer();
			}
		} else {
			doStartStopSequencer();			
		}
	}
	else doStartStopSequencer();	
}

function sendProgramChange(event) {
	const channel = getCasmChannel(currentSffVar, event.channel);
	const programChannel = midiInstrCheckedEle[channel];
	
	if (programChannel && programChangeEle?.checked) {
		event.programNumber = programChannel.selectedIndex;	
	}
		
	if (midiOutput) {
		outputSendProgramChange(event.programNumber, channel + 1);
		
		if (midiSynth) {
			const eventTypeByte = 0xC0 | channel;
			const evt = {data: "midi," + eventTypeByte + "," + event.programNumber};
			midiSynth.onmessage(evt);
		}		
	}
	else 
		
	if (arrSynth?.onmessage) {
		const eventTypeByte = 0xC0 | channel;
		const evt = {data: "midi," + eventTypeByte + "," + event.programNumber};
		arrSynth.onmessage(evt);
	}	
}

function sendControlChange(event) {
	const channel = getCasmChannel(currentSffVar, event.channel);
	//console.debug("sendControlChange",  event.channel, channel, currentSffVar, event);
	
	if (midiOutput) {
		if (event.controllerType < 120) {
			outputSendControlChange(event.controllerType, event.value, channel + 1);
		} else  {
			outputSendChannelMode(event.controllerType, event.value, channel + 1);			
		}
		
		if (midiSynth) {
			const eventTypeByte = 0xB0 | channel;
			const evt = {data: "midi," + eventTypeByte + "," + event.controllerType + "," + event.value};
			midiSynth.onmessage(evt);
		}		
	}
	else
		
	if (arrSynth?.onmessage) {
		const eventTypeByte = 0xB0 | channel;
		const evt = {data: "midi," + eventTypeByte + "," + event.controllerType + "," + event.value};
		arrSynth.onmessage(evt);
	}	
}

function doStartStopSequencer() {
	console.debug("doStartStopSequencer", styleStarted);
	
	if (!styleStarted) 	{
		let syncGap = 0;
		
		if (arranger == "webaudio" && songSequence) {
			syncGap = startStopWebAudio() + ((songSequence.data.Hdr.setTempo.microsecondsPerBeat / 1000) * 1);	
		}
	
		if (arrSequence && realGuitarStyle == "none") 
		{	
			if (requestArrEnd) {
				requestArrEnd = false;
				styleStarted = !styleStarted;	
				playButton.innerText = !styleStarted ? "Play" : "Stop";	
				playButton.style.setProperty("--accent-fill-rest", !styleStarted ? "green" : "red");	
				orinayo_section.innerHTML = currentSffVar;				
				endAudioStyle();
				return;
			}
			
			doSffSInt();	

			const introEnd = introEndCheckedEle?.checked;

			if (introEnd) {
				currentSffVar = "Intro A";	
				if (pad.buttons[BLUE]) currentSffVar = "Intro B";	
				if (pad.buttons[ORANGE]) currentSffVar = "Intro C";
			} else {
				currentSffVar = "Main A";	
			}
			
			if (!arrSequence.data[currentSffVar] || arrSequence.data[currentSffVar].length == 0) currentSffVar = "Main A";
			orinayo_section.innerHTML = currentSffVar;	
		}			
		
		arrangerBeat = 0;
        current16thNote = 0;
		currentPlayNote = 0;
		currentSongNote = 0;
		
        nextNoteTime = audioContext.currentTime;
		nextBeatTime = nextNoteTime;
		playStartTime = nextNoteTime;
		
		nextSongNoteTime = audioContext.currentTime;
		songStartTime = nextSongNoteTime;
		
        if (timerWorker) setTimeout(() => timerWorker.postMessage("start"), syncGap);
	} else {		
		requestArrEnd = true;
		requestedEnd = "Ending A";
		
		if (pad.buttons[BLUE]) requestedEnd = "Ending B";	
		if (pad.buttons[ORANGE]) requestedEnd = "Ending C";		

		orinayo_section.innerHTML = "Ending";	
			
		if (arrSequence && realGuitarStyle == "none") {

		} else {
			endAudioStyle();	
			if (recordMode) setTimeout(stopRecording, 10000);	
			
			if (timerWorker) timerWorker.postMessage("stop");	
			notesInQueue = []; 
		}		
	}

	if (arranger != "webaudio" || !songSequence) {
		styleStarted = !styleStarted;	
		playButton.innerText = !styleStarted ? "Play" : "Stop";		
		playButton.style.setProperty("--accent-fill-rest", !styleStarted ? "green" : "red");	
	}		
}

function resetCanvas (e) {
    // resize the canvas - but remember - this clears the canvas too.
    tempoCanvas.width = 1100;
    tempoCanvas.height = 50;

    //make sure we scroll to the top left.
    window.scrollTo(0,0); 
}

function draw() {
    var currentNote = last16thNoteDrawn;
    if (audioContext) {
        var currentTime = audioContext.currentTime;

        while (notesInQueue.length && notesInQueue[0].time < currentTime) {
            currentNote = notesInQueue[0].note;
            notesInQueue.splice(0,1);   // remove note from queue
        }

        // We only need to draw if the note has moved.
        if (last16thNoteDrawn != currentNote) {
            var x = Math.floor( tempoCanvas.width / 18 );
            canvasContext.clearRect(0,0,tempoCanvas.width, tempoCanvas.height); 
            for (var i=0; i<16; i++) {
                canvasContext.fillStyle = ( currentNote == i ) ? 
                    ((currentNote%4 === 0)?"red":"blue") : "black";
                canvasContext.fillRect( x * (i), 5, x/2, x/2 );
            }
            last16thNoteDrawn = currentNote;
        }
    }
    // set up to draw again
    requestAnimFrame(draw);
}

function nextGuitarNote() {	

	if (midiRealGuitar) {	
		currentPlayNote++;	
		const tempRatio = tempo / window[realGuitarStyle][rgIndex].header.bpm ;
		//console.debug("nextGuitarNote", currentPlayNote, tempRatio, tempo);	
	
		if (currentPlayNote == window[realGuitarStyle][rgIndex].tracks[1].notes.length) {			
			currentPlayNote = 0;
			playStartTime = playStartTime + (window[realGuitarStyle][rgIndex].tracks[1].duration / tempRatio);	

			if (rgIndex != nextRgIndex) {
				rgIndex = nextRgIndex;
				orinayo_strum.innerHTML = "Strum " + (nextRgIndex + 1) + "/" + window[realGuitarStyle].length;				
			}		
		}

		const timestamp = window[realGuitarStyle][rgIndex].tracks[1].notes[currentPlayNote].time / tempRatio;
		nextNoteTime = playStartTime + timestamp;		
		
	} else {
		var secondsPerBeat = 60 / tempo / 4;
		nextNoteTime += secondsPerBeat; 
		
		if (rgIndex != nextRgIndex) {
			rgIndex = nextRgIndex;
			orinayo_strum.innerHTML = "Strum " + (nextRgIndex + 1) + "/" + window[realGuitarStyle].length;				
		}
		
	}
}

function scheduleGuitarNote() {
		
	if (midiRealGuitar) 
	{	
		if (window[realGuitarStyle][rgIndex]?.tracks[1]?.notes[currentPlayNote]) {
			const note = window[realGuitarStyle][rgIndex].tracks[1].notes[currentPlayNote].midi;
			const velocity = window[realGuitarStyle][rgIndex].tracks[1].notes[currentPlayNote].velocity;
			const duration = window[realGuitarStyle][rgIndex].tracks[1].notes[currentPlayNote].duration * 1000;	
			midiRealGuitar.playNote(note, 1, {velocity, duration});
			//console.debug("scheduleGuitarNote", window[realGuitarStyle][rgIndex].tracks[1].notes[currentPlayNote].midi);			
		}
	} else {
		const pattern = window[realGuitarStyle][rgIndex];
		const beat = pattern?.next();
		
		if (beat) {
			const strumDuration = beat.duration * 60 / tempo / 4;
			const arrChord = (firstChord.length == 4 ? firstChord[1] : firstChord[0]) % 12;

			if (beat.element == _V){
				player.queueStrumDown(guitarContext, guitarContext.destination, midiGuitar, 0, getPitches(), strumDuration, guitarVolume / 3, undefined, guitarReverb.checked);				
			}
			else

			if (beat.element == _A){
				player.queueStrumUp(guitarContext, guitarContext.destination, midiGuitar, 0, getPitches(), strumDuration, guitarVolume / 3, undefined, guitarReverb.checked);				
			} 
			else
				
			if (beat.element == _X){
				player.queueSnap(guitarContext, guitarContext.destination, midiGuitar, 0, getPitches(), strumDuration, guitarVolume / 3, undefined, guitarReverb.checked);								
			}
		}
	}			
}

function guitarScheduler() {
	//console.debug("guitarScheduler", nextNoteTime, currentPlayNote);

    var secondsPerBeat = 60.0 / tempo;
    nextBeatTime += (0.25 * secondsPerBeat); 	
	
    current16thNote++;   
	
    if (current16thNote == 16) {
        current16thNote = 0;
    }	

	notesInQueue.push( { note: current16thNote, time: nextBeatTime } );	
	
    while (nextNoteTime < audioContext.currentTime + scheduleAheadTime ) {
        scheduleGuitarNote();
        nextGuitarNote();
    }
}

function nextSongNote() {			

	if (songSequence) {
		currentSongNote++;			
		console.debug("nextSongNote", currentSongNote, nextSongNoteTime);	
		
		if (currentSongNote >= songSequence.data.music.length) {			
			toggleStartStop();
			//if (timerWorker) timerWorker.postMessage("stop");
			//notesInQueue = [];
			
		} else {		
			const timestamp = songSequence.data.music[currentSongNote].deltaTime * (60 / (tempo * songSequence.header.ticksPerBeat));
			nextSongNoteTime = nextSongNoteTime + timestamp;	
		}
	}
}

function nextArrNote() {			

	if (arrSequence) {
		let offset = 0;		
		currentPlayNote++;		
		//console.debug("nextArrNote old", currentSffVar);

		const introEnd = introEndCheckedEle?.checked;
			
		if (currentPlayNote >= arrSequence.data[currentSffVar].length) {			
			currentPlayNote = 0;
			// TODO HACK
			// KST files need padding at end of loop
			if (arrSequence.name.toLowerCase().endsWith(".kst") || arrSequence.name.toLowerCase().endsWith(".ac7")) {
				offset = arrSequence.data.Hdr.setTempo.microsecondsPerBeat / 1000000;
			}
			else if ( arrSequence.name.toLowerCase().endsWith(".sas")) {
				offset = (15 - current16thNote) * arrSequence.data.Hdr.setTempo.microsecondsPerBeat / 1000000;				
			}
				

			if ("Intro A" == currentSffVar) currentSffVar = "Main A";
			if ("Intro B" == currentSffVar) currentSffVar = "Main B";			
			if ("Intro C" == currentSffVar) currentSffVar = "Main C";
			
			if ("Fill In AA" == currentSffVar) currentSffVar = "Main A";
			if ("Fill In BB" == currentSffVar) currentSffVar = "Main B";			
			if ("Fill In CC" == currentSffVar) currentSffVar = "Main C";			
			if ("Fill In DD" == currentSffVar) currentSffVar = "Main D";			
			if ("Fill In BA" == currentSffVar) currentSffVar = "Main A";
			
			orinayo_section.innerHTML = currentSffVar;				
			
			//console.debug("nextArrNote new", currentSffVar);

			if (currentSffVar.startsWith("Ending")) {
				endSffStyle();
			}	

			if (requestArrEnd && introEnd) 	{			
				currentSffVar = requestedEnd;
				orinayo_section.innerHTML = currentSffVar;						
			}				
			
		}
		
		if (requestArrEnd && !introEnd) {
			endSffStyle();				
		}		
		
		if (arrSequence.data[currentSffVar]) {
			const timestamp = (offset + arrSequence.data[currentSffVar][currentPlayNote].deltaTime) * (60 / (tempo * arrSequence.header.ticksPerBeat));
			nextNoteTime = nextNoteTime + timestamp;
		}			
	}
}

function endSffStyle() {
	requestArrEnd = false;
	endAudioStyle();	
	timerWorker.postMessage("stop");	
	notesInQueue = [];				

	setTimeout(() => {
		console.debug("nextSongNote clear notes", currentSffVar);
		
		for (let i=0; i<16; i++) 
		{
			if (arrSynth?.onmessage) {						
				const eventTypeByte = 0xB0 | i;
				
				const evt1 = {data: "midi," + eventTypeByte + ",120"};
				arrSynth.onmessage(evt1);
				
				const evt2 = {data: "midi," + eventTypeByte + ",121"};	
			}
			else
				
			if (midiOutput) {
				outputSendChannelMode (120, 0, i + 1);
				outputSendChannelMode (121, 0, i + 1);							
			}
		}

		clearAllSffNotes();		
	}, 1000);
}

function getChordType(type) {
    if (type == 0x00)  return ""	
    if (type == 0x01)  return "6";	
    if (type == 0x02)  return "7";
    if (type == 0x03)  return "7#11";
    if (type == 0x04)  return "9";
    if (type == 0x05)  return "7-9";
    if (type == 0x06)  return "6-9";
    if (type == 0x07)  return "aug";
    if (type == 0x08)  return "min";		
    if (type == 0x09)  return "min6";
    if (type == 0x0A)  return "min7";
    if (type == 0x0B)  return "min7b5";
	if (type == 0x0C)  return "min9";
    if (type == 0x0D)  return "min7-9";
    if (type == 0x0E)  return "min7-11";	
    if (type == 0x0F)  return "minmaj7";
    if (type == 0x10)  return "minmaj7-9";	
    if (type == 0x11)  return "dim";		
    if (type == 0x12)  return "dim7";	
    if (type == 0x13)  return "7";
    if (type == 0x14)  return "7sus4";
    if (type == 0x15)  return "7b5";
    if (type == 0x16)  return "7-9";
    if (type == 0x17)  return "7#11";
    if (type == 0x18)  return "7-13";
    if (type == 0x19)  return "7b9";
    if (type == 0x1A)  return "7b13";
    if (type == 0x1B)  return "7#9";
    if (type == 0x1D)  return "7aug";
    if (type == 0x1E)  return "8";
    if (type == 0x1F)  return "5";
    if (type == 0x20)  return "sus4";
    if (type == 0x21)  return "sus2";
}

function getNoteName(chordRoot) {	
	let note = BASE;
		
	if (chordRoot == 33) { note = BASE - 1} // b
	
	else if (chordRoot == 34) { note = BASE + 1 } // db	
	else if (chordRoot == 35) { note = BASE + 3 } // eb
	else if (chordRoot == 36) { note = BASE + 4 } // e				
	else if (chordRoot == 37) { note = BASE + 6 } // gb				
	else if (chordRoot == 38) { note = BASE + 8 } // ab			
	else if (chordRoot == 39) { note = BASE + 10} // bb				
	
	else if (chordRoot == 49) { note = BASE }     // c
	else if (chordRoot == 50) { note = BASE + 2 } // d	
	else if (chordRoot == 51) { note = BASE + 4 } // e
	else if (chordRoot == 52) { note = BASE + 5 } // f	
	else if (chordRoot == 53) { note = BASE + 7 } // g	
	else if (chordRoot == 54) { note = BASE + 9 } // a
	else if (chordRoot == 55) { note = BASE + 11} // b			

	else if (chordRoot == 65) { note = BASE + 1 } // c#
	else if (chordRoot == 66) { note = BASE + 3 } // d#	
	else if (chordRoot == 67) { note = BASE + 5 } // f
	else if (chordRoot == 68) { note = BASE + 6 } // f#				
	else if (chordRoot == 69) { note = BASE + 8 } // g#				
	else if (chordRoot == 70) { note = BASE + 10} // a#	
	
	if (songSequence.data?.Hdr?.keySignature?.tonic) {
		note = note + keyChange - songSequence.data.Hdr.keySignature.tonic;
	}
	const shape = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"][note % 12];
	return {note, shape};
}

function scheduleSongNote() {
	
	if (songSequence?.data.music[currentSongNote]) {			
		const event = songSequence.data.music[currentSongNote];	
		console.debug("scheduleSongNote", event);		
		
		if (event?.sysexType == "section-control") {
			console.debug("scheduleSongNote section control", event.section);
					
			if (event.section == 0x08) {
				 sectionChange = 0; 
				 changeArrSection(true);	
				 clearLyrics();					 
			}
			else 
				
			if (event.section == 0x09) {
				sectionChange = 1;
				changeArrSection(true);	
				clearLyrics();					
			}			
			else 
				
			if (event.section == 0x0A) {
				sectionChange = 2;
				changeArrSection(true);	
				clearLyrics();					
			}	
			else 
				
			if (event.section == 0x0B) {
				sectionChange = 3;
				changeArrSection(true);
				clearLyrics();	
			}
			else 
				
			if (event.section == 0x10 || event.section == 0x11 || event.section == 0x12 || event.section == 0x13) {
				 doFill();				
			}						
			else 
				
			if (event.section == 0x18) {
				 doBreak();				
			}
			
			if (event.section == 0x20 || event.section == 0x21 || event.section == 0x22 || event.section == 0x23) {			
				pad.buttons[YELLOW] = true;
				toggleStartStop();
				stopChord();
			}	
		}
		else
		
		if (event?.sysexType == "chord") {
			console.debug("scheduleSongNote - chord", event);				
			let chord = [];
			const chordShape = getNoteName(event.chordRoot);	
			const bassShape = getNoteName(event.chordBass);
			
			const note = chordShape.note;
			
			chord = [note, note + 4, note + 7];
			
			if (event.chordType == 0) 			// maj
				chord = [note, note + 4, note + 7];
			
			else if (event.chordType == 8)		// min
				chord = [note, note + 3, note + 7];	

			else if (event.chordType == 32)		// sus
				chord = [note, note + 5, note + 7];	
				
			displayShape = chordShape.shape +  " " + getChordType(event.chordType);

			if (event.chordRoot != event.chordBass) {
				chord.unshift(bassShape.note);
				displayShape = displayShape + "/" + bassShape.shape;
			}
			
			if (chord.length > 0) {
				activeChord = null;
				pad.axis[STRUM] = autoStrumUpDown();		
				orinayo.innerHTML = displayShape;	

				if (!game) {
					setup();
					resetGuitarHero();
				}
				
				if (!muteChords.checked) {
					stopChord();
					playChord(chord, event.chordRoot,  event.chordType, event.chordBass);
					//updateCanvas();				
				}
			}
		}
		else
			
		if (event?.sysexType == "start-sequence") {
			console.debug("scheduleSongNote - start-sequence", event);	
			clearLyrics();				
		}
		else
			
		if (event?.sysexType == "stop-sequence") {
			console.debug("scheduleSongNote - stop-sequence", event);								
		}			
		else
			
		if (event.type == "lyrics") {
			
			if (event.text == "\n") {
				console.debug("scheduleSongNote page break");
				clearLyrics();					
			
			} else {
				console.debug("scheduleSongNote lyrics", event.text);
				
				if (lyricsCanvas.style.display == "none") {			
					const cntrl = document.getElementById("lyrics");
					let lyrics = cntrl.innerHTML + event.text;
					
					if (cntrl.innerHTML.length > 80) {
						lyrics = event.text;
					}

					cntrl.innerHTML = lyrics;
				}
				else {
					
					if (vocalistMode.checked) {		// show only lyrics
						lyricsContext.font = "14px Arial";				
						const width = lyricsContext.measureText(event.text).width;
						
						if ((lyricsX + width) >= lyricsCanvas.width) {
							lyricsX = 2;
							lyricsY = lyricsY + 18;					
						}
						
						if (lyricsY > lyricsCanvas.height) {
							clearLyrics();				
						}

						lyricsContext.fillStyle = "#ffffff";
						lyricsContext.fillText(event.text, lyricsX, lyricsY);				
						lyricsX = lyricsX + width;	
						
					} else {	// show both chords and lyrics
						displayChordAndLyrics(displayShape, event.text);
					}
				}						
			}
		}
	}
}

function displayChordAndLyrics(chord, lyrics) {
	console.debug("displayChord", chord);
	
	lyricsContext.font = "10px Arial";				
	const width1 = lyricsContext.measureText(lyrics).width;
	let width = lyricsContext.measureText(chord + " ").width;
	if (width1 > width) width = width1;

	if ((lyricsX + width) >= lyricsCanvas.width) {
		lyricsX = 2;
		lyricsY = lyricsY + 24;					
	}

	if (lyricsY > lyricsCanvas.height) {
		clearLyrics();				
	}

	lyricsContext.fillStyle = "#ffffff";
	lyricsContext.fillText(chord, lyricsX, lyricsY);
	lyricsContext.fillText(lyrics, lyricsX, lyricsY + 12);					
	lyricsX = lyricsX + width;	
}

function clearLyrics() {
	lyricsX = 2;					
	lyricsY = 18;
	lyricsContext.fillStyle = "#000000";
	lyricsContext.fillRect(0, 0, lyricsCanvas.width, lyricsCanvas.height);	
	lyricsContext.drawImage(lyricsImage, 0, 0, lyricsImage.width, lyricsImage.height, 0, 0, lyricsCanvas.width, lyricsCanvas.height);
}

function setupLyrics() {
	lyricsImage = new Image;

	lyricsImage.onload = function() {
		lyricsContext.drawImage(lyricsImage, 0, 0, lyricsImage.width, lyricsImage.height, 0, 0, lyricsCanvas.width, lyricsCanvas.height);				
	};
	
	let wallPaperUrl = localStorage.getItem("songs.wall_paper");
	
	if (!wallPaperUrl) {
		wallPaperUrl = "assets/backgrounds/wheat.png";
	} else {
		wallPaperUrl = JSON.parse(wallPaperUrl);
	}
	
	lyricsImage.src = wallPaperUrl;	
}

function scheduleArrNote() {
	
	if (arrSequence) {
		let event = arrSequence.data[currentSffVar][currentPlayNote];
		//console.debug("scheduleArrNote", event);

		const secondsPerBeat = 60.0 / tempo; 
		const beatTime = (0.25 * secondsPerBeat); 		
		const goTime = audioContext.currentTime + beatTime;
		
		// TODO SFF plus WebAudio
		/*
		if (drumLoop && !drumLoop.looping && drumCheckedEle?.checked) {
			drumLoop.start("arra", goTime);
		}	

		if (bassLoop && !bassLoop.looping && bassCheckedEle?.checked) {
			bassLoop.start("key" + (keyChange % 12), goTime);
		}
		
		if (chordLoop && !chordLoop.looping && chordCheckedEle?.checked) {
			chordLoop.start("key" + (keyChange % 12), goTime);
		}		
		*/
		
		// TODO implement CASM
		const channel = getCasmChannel(currentSffVar, event.channel); 

		const instrumentNode = midiInstrCheckedEle[channel];				
		if (!instrumentNode?.checked) return;
			
		if (event?.type == "noteOn") {
			const note = harmoniseNote(event, channel);
				
			if (midiOutput) {
				outputPlayNote(note, channel + 1, {velocity: event.velocity / 127});
				
				if (midiSynth && instrumentNode) {
					instrumentNode.parentNode.parentNode.parentNode.parentNode.querySelector("tbody > tr:nth-child(" + (parseInt(channel) + 1) + ") > td:nth-child(" + (4 + parseInt(note) + 1) + ")").classList.add("note-on");
				}				
			}
			else
				
			if (arrSynth?.onmessage) {
				const eventTypeByte = 0x90 | channel;
				const evt = {data: "midi," + eventTypeByte + "," + note + "," + event.velocity}
				arrSynth.onmessage(evt);
			}	
		}
		else
			
		if (event?.type == "noteOff") {	
			const note = tempVariation[channel + "-" + event.noteNumber]?.note;
			
			if (note) {	
				delete tempVariation[channel + "-" + event.noteNumber];
				
				if (midiOutput) {		
					outputStopNote(note, channel + 1, {velocity: event.velocity / 127});

					if (midiSynth && instrumentNode) {
						instrumentNode.parentNode.parentNode.parentNode.parentNode.querySelector("tbody > tr:nth-child(" + (parseInt(channel) + 1) + ") > td:nth-child(" + (4 + parseInt(note) + 1) + ")").classList.remove("note-on");
					}					
				}
				else
					
				if (arrSynth?.onmessage) {
					const eventTypeByte = 0x80 | channel;
					const evt = {data: "midi," + eventTypeByte + "," + note + "," + event.velocity}
					arrSynth.onmessage(evt);						
				}
			}				
		}
		else
			
		if (event?.type == "programChange") {
			sendProgramChange(event);	
		}
		else
			
		if (event?.type == "controller") {
			sendControlChange(event);	
		}			
	}
}

function balanceNote(root) {
	if (root > 5) {
		return (root - 12);
	} else {
		return root;
	}	
}

function harmoniseNote(event, channel) {
	const root = (firstChord.length == 4 ? firstChord[1] : firstChord[0]) % 12;
	const bass = firstChord[0] % 12;
	
	let note = event.noteNumber;

	if (channel != 9 && channel != 8) 
	{	
		if (!currentSffVar.startsWith("Ending") && !currentSffVar.startsWith("Intro")) {
			if (arrChordType != "7" && (note % 12) == 9) note = note + 3;	// change A to C unless 7
			if (arrChordType != "maj7" && (note % 12) == 11) note = note + 1;	// change B to C unless maj7
			if (arrChordType == "min" && (note % 12) == 4) note = note - 1;	// change E to D# when min
			if (arrChordType == "sus" && (note % 12) == 4) note = note + 1;	// change E to F when sus4	
			if (arrChordType == "maj" && (note % 12) == 3) note = note + 1;	// change D# to E when maj	

			if (channel == 10) 
			{
				if ((note % 12) == 0) {
					note = note + bass;
				} else {
					note += balanceNote(root);
				}				
			} else {
				note += balanceNote(root);
			}
			note = note % 128
		} else {
			note += keyChange;
		}
	}
	
	tempVariation[channel + "-" + event.noteNumber] = {note, event};	
		
	//console.debug("harmoniseNote", arrChordType, root, bass, note, event.noteNumber, event.channel, channel);	
	return note;
}

function songScheduler() {
	//console.debug("songScheduler", nextNoteTime, currentPlayNote, currentSongNote);

    var secondsPerBeat = 60.0 / tempo; 
    nextBeatTime += (0.25 * secondsPerBeat); 	
	
    current16thNote++; 
	if (current16thNote == 16) current16thNote = 0;
	notesInQueue.push( { note: current16thNote, time: nextBeatTime } );	
			
	if (arrSequence && arrSequence?.data && arrSequence.data[currentSffVar]) {
		arrangerBeat++;	
		
		if (arrangerBeat >=  9600 / tempo) {
			arrangerBeat = 0;
			playStartTime = audioContext.currentTime;
		}	
		
		while ((nextNoteTime < audioContext.currentTime + scheduleAheadTime) && currentPlayNote < arrSequence.data[currentSffVar].length ) {
			scheduleArrNote();
			nextArrNote();
			if (!arrSequence.data[currentSffVar]) break;
		}		
	}
	
	if (songSequence) 
	{
		while ((nextSongNoteTime < audioContext.currentTime + scheduleAheadTime) && currentSongNote < songSequence.data.music.length ) {
			scheduleSongNote();
			nextSongNote();
		}
	} 
	
}

function setupSongSequence() {
	const flag = songSequence || arrSequence;
		
	if (songSequence?.data) {
		console.debug("setupSongSequence", flag, songSequence);	
		
		playButton.innerText = "Wait..";
		playButton.style.setProperty("--accent-fill-rest", "red");
		
		if (arranger != "webaudio") {
			const bpm = Math.floor(60 /(songSequence.data.Hdr.setTempo.microsecondsPerBeat / 1000000))
			if (!registration || registration == 0) setTempo(bpm);	
		}
		
		document.getElementById("song_control").style.display = "";	

		keyChange = songSequence.data.Hdr.keySignature.tonic;		
	} 
	else
		
	if (arrSequence?.data?.Hdr) {
		
		if (realInstrument) {
			if (!registration || registration == 0) setTempo(realInstrument.bpm);	
		} else {
			const bpm = Math.floor(60 /(arrSequence.data.Hdr.setTempo.microsecondsPerBeat / 1000000))
			if (!registration || registration == 0) setTempo(bpm);			
		}

		if (arrSequence.data[currentSffVar]?.length) {
			console.debug("setupSongSequence", flag, currentSffVar, arrSequence.data[currentSffVar]);						
		}			
	}
	
	dokeyChange();
	
	document.querySelector("#tempoCanvas").style.display = flag ? "" : "none";

	if (!canvasContext && flag) {
		canvasContext = tempoCanvas.getContext( '2d' );    
		canvasContext.strokeStyle = "#ffffff";
		canvasContext.lineWidth = 2;

		window.onorientationchange = resetCanvas;
		window.onresize = resetCanvas;

		requestAnimFrame(draw);    // start the drawing loop.

		timerWorker = new Worker("./js/metronome-worker.js");

		timerWorker.onmessage = function(e) {
			if (e.data == "tick") {
				// console.debug("tick!");
				songScheduler();
			}
			else
				console.debug("message: " + e.data);
		};
		timerWorker.postMessage({"interval":lookahead});	
	}	

	if (arranger != "webaudio") {
		playButton.innerText = "Play";	
		playButton.style.setProperty("--accent-fill-rest", "green");	
	}
}

function setupRealInstruments() {
	console.debug("setupRealInstruments", realInstrument);
	playButton.innerText = "Wait..";
	playButton.style.setProperty("--accent-fill-rest", "red");	
	
	realInstrument.size = 0;

	if (realInstrument.drum && realInstrument.drum.length == 7) {	
		realInstrument.drums = {};
		realInstrument.drums.url = realInstrument.drumUrl;		
		realInstrument.bpm = parseInt(realInstrument.drum[1]);	
		
		let int1Len = parseInt(realInstrument.drum[2]);
		let arrLen = parseInt(realInstrument.drum[3]);
		let fillLen = parseInt(realInstrument.drum[4]);
		let brkLen = parseInt(realInstrument.drum[5]);		
		let end1Len = parseInt(realInstrument.drum[6]);
		
		realInstrument.drums["int1"] = {start: 0, stop: int1Len};		
		realInstrument.drums["arra"] = {start: int1Len, stop: int1Len + arrLen};	
		realInstrument.drums["fila"] = {start: int1Len + arrLen, stop: int1Len + arrLen + fillLen};		
		realInstrument.drums["arrb"] = {start: int1Len + arrLen + fillLen, stop: int1Len + arrLen + fillLen + arrLen};	
		realInstrument.drums["filb"] = {start: int1Len + arrLen + fillLen + arrLen, stop: int1Len + arrLen + fillLen + arrLen + fillLen};			
		realInstrument.drums["arrc"] = {start: int1Len + arrLen + fillLen + arrLen + fillLen, stop: int1Len + arrLen + fillLen + arrLen + fillLen + arrLen};			
		realInstrument.drums["filc"] = {start: int1Len + arrLen + fillLen + arrLen + fillLen + arrLen, stop: int1Len + arrLen + fillLen + arrLen + fillLen + arrLen + fillLen};	
		realInstrument.drums["arrd"] = {start: int1Len + arrLen + fillLen + arrLen + fillLen + arrLen + fillLen, stop: int1Len + arrLen + fillLen + arrLen + fillLen + arrLen + fillLen + arrLen};			
		realInstrument.drums["fild"] = {start: int1Len + arrLen + fillLen + arrLen + fillLen + arrLen + fillLen + arrLen, stop: int1Len + arrLen + fillLen + arrLen + fillLen + arrLen + fillLen + arrLen + fillLen};			
		
		let start = int1Len + arrLen + fillLen + arrLen + fillLen + arrLen + fillLen + arrLen + fillLen;
		let stop = int1Len + arrLen + fillLen + arrLen + fillLen + arrLen + fillLen + arrLen + fillLen + brkLen;
		realInstrument.drums["brka"] = {start, stop};			
		realInstrument.drums["brkb"] = {start, stop};
		realInstrument.drums["brkc"] = {start, stop};
		realInstrument.drums["brkd"] = {start, stop};

		start = stop;
		stop += end1Len;
		realInstrument.drums["end1"] = {start, stop};
		realInstrument.size += (int1Len + (arrLen * 4) + (fillLen * 4) + brkLen + end1Len);
	}

	if (realInstrument.chord && realInstrument.chord.length > 2) {	
		realInstrument.chords = {};	
		realInstrument.chords.url = realInstrument.chordUrl;			
		realInstrument.bpm = parseInt(realInstrument.chord[1]);	
		
		let variations = 1;
		if (realInstrument.chord.length == 5) variations = parseInt(realInstrument.chord[4]);
		
		for (let v=0; v<variations; v++) {				
			let size = parseInt(realInstrument.chord[2]);
			let start = v * (realInstrument.chord.length >= 4 ? ((size * 24) + (parseInt(realInstrument.chord[3] * 12))) : (size * 36));
			let stop = start + size;
			
			for (let i=0; i<3; i++) {
				if (realInstrument.chord.length >= 4 && i == 2) size = parseInt(realInstrument.chord[3]); // SUS4 shorter length
					
				for (let j=0; j<12; j++) {
					const tonic = j;
					let key = "key" + j;
					let variation = "";
					
					if (v == 0) variation = "_arra";
					if (v == 1) variation = "_arrb";
					if (v == 2) variation = "_arrc";
					if (v == 3) variation = "_arrd";
					
					if (i == 0) key = "key" + j + "_maj" + variation;
					if (i == 1) key = "key" + j + "_min" + variation;
					if (i == 2) key = "key" + j + "_sus" + variation;	
				
					realInstrument.chords[key] = {start, stop, tonic};
					start += size;
					stop += size;
				}				
			}
			
			realInstrument.size += stop;		
		}
		
		// fill missing variations from defined 
		
		let toVariation = "";
		let fromVariation = "_arra";
		
		for (let v=variations; v<4; v++) 
		{	
			if (v == 1) {
				fromVariation = "_arra";				
				toVariation = "_arrb";
			}
			if (v == 2) {
				fromVariation = "_arra";				
				toVariation = "_arrc";
			}
			
			if (v == 3) {
				fromVariation = "_arrb";				
				toVariation = "_arrd";
			}
					
			for (let i=0; i<3; i++) 
			{
				for (let j=0; j<12; j++) {
					realInstrument.chords["key" + j + "_maj" + toVariation] = realInstrument.chords["key" + j + "_maj" + fromVariation];
					realInstrument.chords["key" + j + "_min" + toVariation] = realInstrument.chords["key" + j + "_min" + fromVariation];
					realInstrument.chords["key" + j + "_sus" + toVariation] = realInstrument.chords["key" + j + "_sus" + fromVariation];
				}					
			}
		}		
	}	
	
	if (realInstrument.bass && realInstrument.bass.length > 2) {	
		realInstrument.basses = {};	
		realInstrument.basses.url = realInstrument.bassUrl;			
		realInstrument.bpm = parseInt(realInstrument.bass[1]);	
		
		let variations = 1;
		if (realInstrument.bass.length == 4) variations = parseInt(realInstrument.bass[3]);
		
		for (let v=0; v<variations; v++) {				
			let size = parseInt(realInstrument.bass[2]);
			let start = v * (size * 24);
			let stop = start + size;
			
			for (let i=0; i<2; i++) 
			{				
				for (let j=0; j<12; j++) {
					const tonic = j;					
					let key = "key" + j;
					let variation = "";
					
					if (v == 0) variation = "_arra";
					if (v == 1) variation = "_arrb";
					if (v == 2) variation = "_arrc";
					if (v == 3) variation = "_arrd";
					
					if (i == 0) key = "key" + j + "_maj" + variation;
					if (i == 1) key = "key" + j + "_min" + variation;
				
					realInstrument.basses[key] = {start, stop, tonic};
					start += size;
					stop += size;
				}				
			}
			
			realInstrument.size += stop;			
		}
		
		// fill missing variations from defined 
		
		let toVariation = "";
		let fromVariation = "_arra";
		
		for (let v=variations; v<4; v++) 
		{	
			if (v == 1) {
				fromVariation = "_arra";				
				toVariation = "_arrb";
			}
			if (v == 2) {
				fromVariation = "_arra";				
				toVariation = "_arrc";
			}
			
			if (v == 3) {
				fromVariation = "_arrb";				
				toVariation = "_arrd";
			}
					
			for (let i=0; i<3; i++) 
			{
				for (let j=0; j<12; j++) {
					realInstrument.basses["key" + j + "_maj" + toVariation] = realInstrument.basses["key" + j + "_maj" + fromVariation];
					realInstrument.basses["key" + j + "_min" + toVariation] = realInstrument.basses["key" + j + "_min" + fromVariation];
					realInstrument.basses["key" + j + "_sus" + toVariation] = realInstrument.basses["key" + j + "_sus" + fromVariation];
				}					
			}
		}		
	}	

	if (realInstrument.riff && realInstrument.riff.length > 2 && realInstrument.drums) {			
		let int1Len = parseInt(realInstrument.riff[2]);
		let size = parseInt(realInstrument.riff[2]);	
		let start = 0;
		let stop = start + size;
			
		realInstrument.drums["int3"] = {start, stop};	
		start += size;
		stop += size;
		
		realInstrument.drums["end3"] = {start, stop};
		start += size;
		stop += size;						

		for (let s=0; s<2; s++) 											// bass, chords
		{
			for (let v=0; v<2; v++) 										// end3, int3
			{					
				for (let i=0; i<2; i++) 									// maj, min
				{				
					for (let j=0; j<12; j++) {
						const tonic = j;					
						let key = "key" + j;
						
						if (v == 0) variation = "_end3";
						if (v == 1) variation = "_int3";					
						
						if (i == 0) key = "key" + j + "_maj" + variation;
						if (i == 1) key = "key" + j + "_min" + variation;
					
						if (s == 0 && realInstrument.basses) {
							realInstrument.bass[key] = {start, stop, tonic};
						}
						
						if (s == 1 && realInstrument.chords) {
							realInstrument.chords[key] = {start, stop, tonic};
						}
						
						start += size;
						stop += size;
					}				
				}	
			}
		}
		realInstrument.size += stop;
	}	

	drumLoop = null;	
	bassLoop = null;
	chordLoop = null;
	riffLoop = null;
	
	loopWait = 1000;
	
	if (realInstrument.drums) {

		if (window.loopCache[realInstrument.drums.url]) {
			loopWait += realInstrument.size / 500;
		} else {
			loopWait+= realInstrument.size / 1000;
			fetchLoopSample(realInstrument.drums.url);		
		}
		
		drumLoop = new AudioLooper("drum");
		drumLoop.callback(soundsLoaded, eventStatus);				
		drumLoop.addUri(realInstrument.drums, realdrumDevice, realInstrument.bpm);
	}
	
	if (realInstrument.basses) {
		
		if (window.loopCache[realInstrument.basses.url]) {
			loopWait += realInstrument.size / 500;
		} else {
			loopWait += realInstrument.size / 1000;
			fetchLoopSample(realInstrument.basses.url);				
		}
		
		bassLoop = new AudioLooper("bass");
		bassLoop.callback(soundsLoaded, eventStatus);		
		bassLoop.addUri(realInstrument.basses, realdrumDevice, realInstrument.bpm);	
	}
	
	if (realInstrument.chords) {
		
		if (window.loopCache[realInstrument.chords.url]) {
			loopWait += realInstrument.size / 500;
		} else {
			loopWait += realInstrument.size / 1000;
			fetchLoopSample(realInstrument.chords.url);				
		}
		
		chordLoop = new AudioLooper("chord");
		chordLoop.callback(soundsLoaded, eventStatus);		
		chordLoop.addUri(realInstrument.chords, realdrumDevice, realInstrument.bpm);		
	}

	if (realInstrument.riffUrl) {	
		if (realInstrument.chords) realInstrument.chords.riffUrl = realInstrument.riffUrl;	
		if (realInstrument.basses) realInstrument.basses.riffUrl = realInstrument.riffUrl;	
		if (realInstrument.drums) realInstrument.drums.riffUrl = realInstrument.riffUrl;			
		
		if (window.loopCache[realInstrument.riffUrl]) {
			loopWait += realInstrument.size / 50;
		} else {
			loopWait += realInstrument.size / 100;
			fetchLoopSample(realInstrument.riffUrl);			
		}	
	}
	
	if (realInstrument.bpm) {	
		setTempo(realInstrument.bpm);
	}
	
	setTimeout(() => {
		console.debug("loop loaded timeout", realInstrument.size, Math.ceil(loopWait));
		
		playButton.innerText = "Play";
		playButton.style.setProperty("--accent-fill-rest", "green");	

		if (midiOutput?.name == "X-TOUCH MINI") {
			const slot = registration > 8 ? registration + 1 : (registration == 0 ? 0 : registration);
			setXTouchButton(slot, "flash");
		}		
	}, loopWait);	
}

function fetchLoopSample(url) {
	if (window.loopCache[url]) return;

	console.debug("fetchLoopSample", url);
	
	if (url.startsWith("assets") || url.startsWith("extra")) 	{
		fetch(url)
			.then(response => response.arrayBuffer())
			.then(buffer => this.audioContext.decodeAudioData(buffer))
			.then(sample => {
				window.loopCache[url] = sample;
				console.debug("fetchLoopSample fetched", url, sample);
				
		}).catch(function (err) {
			console.error('fetchLoopSample failed!', err)
		});
		
	} else {
		const dbName = url;
		const store = new idbKeyval.Store(dbName, dbName);		

		idbKeyval.get(dbName, store).then((data) => 
		{
			if (data) {
				console.debug("get ogg file", dbName, data);
				
				this.audioContext.decodeAudioData(data).then(sample => 
				{
					window.loopCache[url] = sample;
					console.debug("fetchLoopSample DB retrieve", url, sample);
				});				
				
			}			
		}).catch(function (err) {
			console.error('fetchLoopSample failed!', err)
		});		
	}	
}

function soundsLoaded(cached) {
	console.debug("audio loaded ok", cached);
}

function eventStatus(event, id) {
	console.debug(event, id);

	if (event == "_eventPlaying") {
		if (id == "arra") orinayo_section.innerHTML = SECTIONS[0];
		if (id == "arrb") orinayo_section.innerHTML = SECTIONS[1];
		if (id == "arrc") orinayo_section.innerHTML = SECTIONS[2];
		if (id == "arrd") orinayo_section.innerHTML = SECTIONS[3];		
		
		if (id == "int1") orinayo_section.innerHTML = SECTIONS[4];
		if (id == "end1") orinayo_section.innerHTML = SECTIONS[5];			
/*			
		if (id == "end1") {
			if (bassLoop) bassLoop.stop();			
			
			setTimeout(() => {
				drumLoop.stop();				
			}, realInstrument["end1"].drums.duration - 1000);
		}
*/		
	}
}

function outputSendProgramChange(program, channel) {
	if (midiOutput?.name == "X-TOUCH MINI") return;	
	midiOutput.sendProgramChange(program, channel);	
}

function outputSendControlChange(cc, value, channel) {
	if (midiOutput?.name == "X-TOUCH MINI") return;	
	midiOutput.sendControlChange(cc, value, channel);	
}

function outputSendChannelMode(cc, value, channel) {
	midiOutput.sendChannelMode(cc, value, channel);	
}

function outputPlayNote(chord, channel, options) {
	if (midiOutput?.name == "X-TOUCH MINI") return;
	midiOutput.playNote(chord, channel, options);	
}

function outputStopNote(chord, channel, options) {
	if (midiOutput?.name == "X-TOUCH MINI") return;	
	midiOutput.stopNote(chord, channel, options)	
}

function getCasmChannel(style, source) {
	let found = null;
	let destination = source;
	
	if (arrSequence?.casm) for (casm of arrSequence.casm) 
	{
		if (casm.styles.indexOf(style) > -1) {
			found = casm;
			break;
		}
	}
	
	if (found) 
	{
		for (ctab of found.ctabs) 
		{	
			if (ctab.source == source) {
				destination = ctab.destination;
				break;
			}
		}	
	}
	//console.debug("getCasmChannel", style, source, destination, found);
	return destination;
}

function recallRegistration(slot) {
	console.debug("recallRegistration", slot);
	
	let data = localStorage.getItem("orin.ayo.slot." + slot);	
	
	if (data) {
		registration = parseInt(slot);		
		localStorage.setItem("orin.ayo.config", data);
		setTimeout(() => reloadApp(), 500 );		
	}

}

function saveRegistration(slot) {
	console.debug("saveRegistration", slot);
	registration = parseInt(slot);
	const config = saveConfig();
	localStorage.setItem("orin.ayo.slot." + slot, JSON.stringify(config));
	if (streamDeck) drawButtons(streamDeckPointer + 1);
}

function midiProgramChangeEvent(target) {
	console.debug("midiProgramChangeEvent", target.selectedIndex, target.id);
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function mobileCheck() {
	let check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
};

function createKnob(id, value, valMin, valMax, color) {
	const knob = pureknob.createKnob(125, 125);

	knob.setProperty('angleStart', -0.75 * Math.PI);
	knob.setProperty('angleEnd', 0.75 * Math.PI);
	knob.setProperty('colorFG', color);
	knob.setProperty('trackWidth', 0.4);
	knob.setProperty('valMin', valMin);
	knob.setProperty('valMax', valMax);

	knob.setValue(value);
	document.getElementById(id).appendChild(knob.node());	
	return knob;
}

// -------------------------------------------------------
//
//  X-Touch MIDI Controller Device
//
// -------------------------------------------------------

function resetXTouch() {	
	if (!midiOutput) return;
	
	for (let i=0; i<32; i++) setXTouchButton(i, "off");
	for (let i=0; i<16; i++) setXTouchSpeaker(i, "off");

	setTimeout(() => midiOutput.sendProgramChange(0), 1000);
	
	for (let i=0; i<32; i++) {
		const slot = (i > 8) ? i - 1 : i; 
		
		if (localStorage.getItem("orin.ayo.slot." + slot)) {
			console.debug("resetXTouch - found slot", slot);
			setXTouchButton(i, "on");
		}
	}	
}

function setXTouchButton(button, state) {
	if (!midiOutput) return;
	
	const i = button % 16;
	const value = (state == "flash" ? 2: (state == "off" ? 0 : 1));
	
	setTimeout(() => {
		if (button < 16) midiOutput.sendProgramChange(0);		
		if (button > 15) midiOutput.sendProgramChange(1);
	}, 500);
	
	setTimeout(() => {
		midiOutput.playNote(i, "all", {rawVelocity: true, release:value, velocity:value})	
	}, 500);	
}

function setXTouchSpeaker(button, state) {
	if (!midiOutput) return;
	
	const i = button % 8;
	const value = (state == "flash" ? 28: (state == "off" ? 0 : 27));
	
	setTimeout(() => {
		if (button < 8) midiOutput.sendProgramChange(0);		
		if (button > 7) midiOutput.sendProgramChange(1);
	}, 500);

	setTimeout(() => {midiOutput.sendControlChange(i + 9, value, "all")}, 500);	
}

function handleXTouchControlEvent(event) {
	console.debug("handleXTouchControlEvent", event.controller.number, event.value);

	if (event.controller.number == 9 || event.controller.number == 10) // main volume
	{		
		if (drumLoop) {
			const drumEl = midiVolumeEle[16];			
			drumEl.value = (+event.value / 127) * savedDrumVol;
			drumLoop.setVolume(drumEl.value / 100);
			if (drumKnob) drumKnob.setValue(drumEl.value);			
		}
		
		if (bassLoop) {
			const bassEl = midiVolumeEle[17];			
			bassEl.value = (+event.value / 127) * savedBassVol;
			bassLoop.setVolume(bassEl.value / 100);		
			if (bassKnob) bassKnob.setValue(bassEl.value);						
		}

		if (chordLoop) {
			const chordEl = midiVolumeEle[18];								
			chordEl.value = (+event.value / 127) * savedChordVol;
			chordLoop.setVolume(chordEl.value / 100);	
			if (chordKnob) chordKnob.setValue(chordEl.value);						
		}	
		
		setGuitarVolume(event.value);	
	}
	else

	if (event.controller.number < 5) {	
		handleEncoderRotate(event.controller.number - 1, event.value, true);
	}
}

function handleXTouchNoteEvent(event) {
	console.debug("handleXTouchNoteEvent", event.note.number);
	
	if (event.note.number > 7 && event.note.number < 16) {	// layer A top row
		handleButtonPress(event.note.number - 8);
	}
	else
		
	if (event.note.number > 15 && event.note.number < 24) {	// layer A bottom row
		handleButtonPress(event.note.number - 8);
	}	
	else

	if (event.note.number > 31 && event.note.number < 40) {	// layer B top row
		handleButtonPress(event.note.number - 16);
	}
	else
		
	if (event.note.number > 39 && event.note.number < 48) {	// layer B bottom row
		handleButtonPress(event.note.number - 16);
	}
	else
		
	if (event.note.number > -1 && event.note.number < 8) {	// layer A speakers
		handleEncoderPress(event.note.number);
	}						
	else
		
	if (event.note.number > 23 && event.note.number < 32) {	// layer B speakers
		handleEncoderPress(event.note.number - 16);
	}	
}

function handleButtonPress(panel) {
	console.debug("handleButtonPress", panel);	
	
	if (panel == 0 || panel == 8) {			
		sectionChange = 0;
		
		pad.buttons[YELLOW] = false;		
		if (panel == 8) pad.buttons[YELLOW] = true;	// play intro
		
		toggleStartStop();	
	}
	else
	
	if (styleStarted) 
	{		
		if (panel == 1) {
			doFill();
		}
		else
			
		if (panel == 9) {
			doBreak();
		}
		else
			
		if (panel == 2 || panel == 10 || panel == 3 || panel == 11) {		
			if (panel == 2) sectionChange = 0;
			if (panel == 10) sectionChange = 2;
			if (panel == 3) sectionChange = 1;
			if (panel == 11) sectionChange = 3;
			
			changeArrSection(true);
		}
		
	} else {
		recallRegistration(panel > 8 ? panel - 1 : panel);			
	}		
}

function handleEncoderPress(encoder) {
	console.debug("handleEncoderPress", encoder);	
	
	if (encoder == 0) {		// BANK 1 - MUTE Instruments
		savedPadsMode = padsMode == 0 ? savedPadsMode : padsMode;	
		padsMode = padsMode == 0 ? savedPadsMode : 0;		
		orinayo_pad.innerHTML =  padsMode == 0 ? "None" : "Pad " + padsMode;
		if (input?.name == "X-TOUCH MINI") setXTouchSpeaker(encoder, padsMode == 0  ? "flash": "off");		
	}
	else
		
	if (encoder == 1) {		
		drumCheckedEle.checked = !drumCheckedEle.checked;
		pressFootSwitch(7);
		if (input?.name == "X-TOUCH MINI") setXTouchSpeaker(encoder, !drumCheckedEle.checked ? "flash": "off");			
	}
	else

	if (encoder == 2) {		
		bassCheckedEle.checked = !bassCheckedEle.checked;	
		pressFootSwitch(8);	
		if (input?.name == "X-TOUCH MINI") setXTouchSpeaker(encoder, !bassCheckedEle.checked ? "flash": "off");		
	}
	else

	if (encoder == 3) {		
		chordCheckedEle.checked = !chordCheckedEle.checked;	
		pressFootSwitch(9);
		if (input?.name == "X-TOUCH MINI") setXTouchSpeaker(encoder, !chordCheckedEle.checked ? "flash": "off");		
	}	
	else
		
	if (encoder == 4) {	// BANK 2 - effects
      window.dispatchEvent(new CustomEvent('MIDI', { detail: 6 }));	// chorus effect
	}
	else
		
	if (encoder == 5) {
      window.dispatchEvent(new CustomEvent('MIDI', { detail: 10 }));	// reverb effect
	}	
	else
		
	if (encoder == 6) {
      window.dispatchEvent(new CustomEvent('MIDI', { detail: 7 }));	// delay effect
	}		
	else
		
	if (encoder == 7) {
      window.dispatchEvent(new CustomEvent('MIDI', { detail: 11 }));	// drone effect
	}	
	else
		
	if (encoder == 8) {	// BANK 3 - variations
		sectionChange = 0;
		changeArrSection(true);
    }
	else
		
	if (encoder == 9) {
		sectionChange = 1;
		changeArrSection(true);  
    }	
	else
		
	if (encoder == 10) {
		sectionChange = 2;
		changeArrSection(true);   
    }		
	else
		
	if (encoder == 11) {
		sectionChange = 3;
		changeArrSection(true);   
	}	
	else
		
	if (encoder == 12) {	// BANK 4 - Guitar strums
		padsMode = 2;		
		orinayo_pad.innerHTML = "Pad " + padsMode;
    }
	else
		
	if (encoder == 13) {
		padsMode = 3;		
		orinayo_pad.innerHTML = "Pad " + padsMode;
    }	
	else
		
	if (encoder == 14) {
		padsMode = 4;		
		orinayo_pad.innerHTML = "Pad " + padsMode;
  
    }		
	else
		
	if (encoder == 15) {
 		padsMode = 5;		
		orinayo_pad.innerHTML = "Pad " + padsMode;

	}	
}

// -------------------------------------------------------
//
//  Converse
//
// -------------------------------------------------------

function isNull(value) {
	return value == null || value == undefined || JSON.parse(value) == "";
}

function openChatbox(view) {
	let jid = view.model.get("jid");
	let type = view.model.get("type");

	console.debug("openChatbox", jid, type);

	if (jid)
	{
		if (type == "chatbox") _converse.api.chats.open(jid, {'bring_to_foreground': true}, true);
		else
		if (type == "chatroom") _converse.api.rooms.open(jid, {'bring_to_foreground': true}, true);
	}
}
	
function refreshHistory(ev) {
	ev.stopPropagation();
	ev.preventDefault();
	
	const toolbar_el = converse.env.utils.ancestor(ev.target, 'converse-chat-toolbar');
	const chatview = _converse.chatboxviews.get(toolbar_el.model.get('jid'));		
	console.debug("refreshHistory", chatview);

	chatview.close();
	setTimeout(function() { openChatbox(chatview) });
}

async function trashHistory(ev) {
	ev.stopPropagation();
	ev.preventDefault();

	const result = confirm(_converse.__('Are you sure you want to clear the messages from this conversation?'));

	if (result === true) {		
		const toolbar_el = converse.env.utils.ancestor(ev.target, 'converse-chat-toolbar');
		await toolbar_el.model.messages.clearStore(); 
		toolbar_el.model.messages.fetched.resolve();		
	}
}

function scrollToBottom(ev) {
	ev.stopPropagation();
	ev.preventDefault();
	
	const toolbar_el = converse.env.utils.ancestor(ev.target, 'converse-chat-toolbar');
	const chatview = _converse.chatboxviews.get(toolbar_el.model.get('jid'));		
	console.debug("scrollToBottom", chatview);

	if (chatview) chatview.scrollDown();
}

function hideChat(ev) {
	ev.stopPropagation();
	ev.preventDefault();

	const roomName = localStorage.getItem("collaboration_server.room");	
    const domain = localStorage.getItem("collaboration_server.domain");	
	
	if (roomName && domain) {
		_converse.api.rooms.open(JSON.parse(roomName) + '@conference.' + JSON.parse(domain), {'bring_to_foreground': true}, true);	
	}
}

function loadJS(name) {
	console.debug("loadJS", name);
	var head  = document.getElementsByTagName('head')[0];
	var s1 = document.createElement('script');
	s1.src = name;
	s1.async = false;
	head.appendChild(s1);
}

function loadCSS(name) {
	console.debug("loadCSS", name);
	var head  = document.getElementsByTagName('head')[0];
	var link  = document.createElement('link');
	link.rel  = 'stylesheet';
	link.type = 'text/css';
	link.href = name;
	head.appendChild(link);
}

// -------------------------------------------------------
//
//  Voice Commands
//
// -------------------------------------------------------

function setupVoiceCommands() {
	console.debug("setupVoiceCommands", speechObjectActive);	
		
}