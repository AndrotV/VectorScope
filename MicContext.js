class MicContext {
    micDataArray;
    micAnalyser;
    micGain;
    micContext;
    bufferLenght;

    constructor() {
        let source;
        this.micContext = new AudioContext();
        let micContext = this.micContext;
        this.micAnalyser = this.micContext.createAnalyser();
        let micAnalyser = this.micAnalyser;
        this.micGain = this.micContext.createGain();
        let micGain = this.micGain;
        let mediaStream = navigator.mediaDevices.getUserMedia({audio: true})
            .then(function(stream) {
                source = micContext.createMediaStreamSource(stream);
                source.connect(micGain);
                micAnalyser.connect(micContext.destination);
                micGain.connect(micAnalyser);
            }
        );
        this.micAnalyser.fftSize = 2048;
        this.bufferLength = this.micAnalyser.frequencyBinCount;
        this.micDataArray = new Uint8Array(this.bufferLength);
    }

    resume() {
        this.micContext.resume();
    }

    suspend() {
        this.micContext.suspend();
    }

    getBufferLength() {
        return this.bufferLength;
    }

    setGain(gainval) {
        this.micGain.gain.value = gainval;
    }

    getData() {
        this.micAnalyser.getByteTimeDomainData(this.micDataArray);
        return this.micDataArray;
    }

}
