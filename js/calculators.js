// Developed by Damien Stephens.
// Calculator functionality

// Amperage Calculator Module
const AmperageCalculator = {
    calculate() {
        const voltage = parseFloat(document.querySelector('input[name="amperageVoltage"]:checked').value);
        const phase = parseInt(document.querySelector('input[name="amperagePhase"]:checked').value);
        const power = parseFloat(document.getElementById('amperagePower').value);

        if (isNaN(power)) {
            this.showResult('Please enter a valid power value');
            return;
        }

        let amperage;
        if (phase === 1) {
            amperage = power / voltage;
        } else {
            amperage = power / (voltage * Math.sqrt(3));
        }

        this.showResult(`Amperage: ${amperage.toFixed(2)} A`);
    },

    showResult(message) {
        const resultDiv = document.getElementById('amperageResult');
        resultDiv.textContent = message;
        resultDiv.style.display = 'block';
    }
};

// VA Calculator Module
const VACalculator = {
    calculate() {
        const voltage = parseFloat(document.querySelector('input[name="vaVoltage"]:checked').value);
        const phase = parseInt(document.querySelector('input[name="vaPhase"]:checked').value);
        const amperage = parseFloat(document.getElementById('vaAmperage').value);

        if (isNaN(amperage)) {
            this.showResult('Please enter a valid amperage value');
            return;
        }

        let va;
        if (phase === 1) {
            va = voltage * amperage;
        } else {
            va = voltage * amperage * Math.sqrt(3);
        }

        this.showResult(`VA: ${va.toFixed(2)} VA`);
    },

    showResult(message) {
        const resultDiv = document.getElementById('vaResult');
        resultDiv.textContent = message;
        resultDiv.style.display = 'block';
    }
};

// Wire Size Calculator Module
const WireSizeCalculator = {
    // Wire size data (AWG to mm² conversion and ampacity)
    wireSizes: [
        { awg: '14', mm2: 2.08, maxAmps: 15 },
        { awg: '12', mm2: 3.31, maxAmps: 20 },
        { awg: '10', mm2: 5.26, maxAmps: 30 },
        { awg: '8', mm2: 8.37, maxAmps: 40 },
        { awg: '6', mm2: 13.3, maxAmps: 55 },
        { awg: '4', mm2: 21.2, maxAmps: 70 },
        { awg: '2', mm2: 33.6, maxAmps: 95 },
        { awg: '1', mm2: 42.4, maxAmps: 110 },
        { awg: '1/0', mm2: 53.5, maxAmps: 125 },
        { awg: '2/0', mm2: 67.4, maxAmps: 145 },
        { awg: '3/0', mm2: 85.0, maxAmps: 165 },
        { awg: '4/0', mm2: 107.2, maxAmps: 195 }
    ],

    calculate() {
        const voltage = parseFloat(document.querySelector('input[name="wireVoltage"]:checked').value);
        const phase = parseInt(document.querySelector('input[name="wirePhase"]:checked').value);
        const amperage = parseFloat(document.getElementById('wireAmperage').value);

        if (isNaN(amperage)) {
            this.showResult('Please enter a valid amperage value');
            return;
        }

        // Add 25% safety factor for continuous loads
        const requiredAmps = amperage * 1.25;
        
        // Find the first wire size that can handle the required amps
        const wireSize = this.wireSizes.find(size => size.maxAmps >= requiredAmps);
        
        if (!wireSize) {
            this.showResult('Required amperage exceeds available wire sizes. Please consult NEC tables for larger sizes.');
            return;
        }

        this.showResult(`Recommended Wire Size: ${wireSize.awg} AWG (${wireSize.mm2} mm²)\nMaximum Ampacity: ${wireSize.maxAmps} A`);
    },

    showResult(message) {
        const resultDiv = document.getElementById('wireSizeResult');
        resultDiv.textContent = message;
        resultDiv.style.display = 'block';
    }
}; 