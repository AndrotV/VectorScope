class MicContext {
    micDataArray;
    micAnalyser;
    micGain;
    micContext;
    bufferLenght;
    fourierData;
    fourierFreq1;
    fourierFreq2;

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
        this.fourierData = new Float32Array(this.bufferLength);
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

    getMicRawData() {
        this.micAnalyser.getByteTimeDomainData(this.micDataArray);
        return this.micDataArray;
    }

    updateFourierData() {
        // this.fourierData = new Float32Array(this.bufferLength);
        this.fourierFreq1 = -Infinity;
        this.fourierFreq2 = -Infinity;
        this.micAnalyser.getFloatFrequencyData(this.fourierData);
        console.log(this.fourierData);
        for (let i = 0; i < this.bufferLength; i++) {
            let val = this.fourierData[i];
            if (val > this.fourierFreq1) {
                this.fourierFreq2 = this.fourierFreq1;
                this.fourierFreq1 = val;
            } else if (val > this.fourierFreq2) {
                this.fourierFreq2 = val;
            }
        }
    }

    getFourierFreq1() {
        return this.fourierFreq1;
    }

    getFourierFreq2() {
        return this.fourierFreq2;
    }

}
