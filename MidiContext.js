class MidiContext {
	context = null;
	// notes = [];

	constructor() {
		if (!navigator.requestMIDIAccess()) {
			window.alert("Your browser does not support MIDI :(");
		}
		this.context = new AudioContext();
	}

	newNote(freq, type) {
		let o = this.context.createOscillator();
		// o.frequency.setTargetAtTime(123, this.context.currentTime, 0);
		o.frequency.value = freq;
		o.type = type;
		console.log(o);
		o.connect(this.context.destination);
		o.start();
	}

	mute() {
		this.context.suspend();
	}
	
	unmute() {
		this.context.resume();
	}
}

