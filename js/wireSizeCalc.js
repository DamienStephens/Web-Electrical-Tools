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

    // DOM Elements
    elements: {
        voltage: document.getElementById('voltage3'),
        phase: document.getElementById('phase3'),
        ampsWire: document.getElementById('ampsWire'),
        result: document.getElementById('result3'),
        calculateBtn: document.querySelector('#wireSizeCalc button')
    },

    // Initialize the calculator
    init() {
        this.setupEventListeners();
    },

    // Setup event listeners
    setupEventListeners() {
        this.elements.calculateBtn.addEventListener('click', () => this.calculate());
        
        // Add input validation
        this.elements.ampsWire.addEventListener('input', (e) => {
            if (!App.validateNumericInput(e.target.value)) {
                App.showError('result3', 'Please enter a valid positive number');
            }
        });
    },

    // Find appropriate wire size
    findWireSize(amps) {
        // Add 25% safety factor for continuous loads
        const requiredAmps = amps * 1.25;
        
        // Find the first wire size that can handle the required amps
        const wireSize = this.wireSizes.find(size => size.maxAmps >= requiredAmps);
        
        if (!wireSize) {
            throw new Error('Required amperage exceeds available wire sizes');
        }

        return wireSize;
    },

    // Calculate wire size
    calculate() {
        try {
            // Get input values
            const voltage = parseFloat(this.elements.voltage.value);
            const phase = parseInt(this.elements.phase.value);
            const amps = parseFloat(this.elements.ampsWire.value);

            // Validate inputs
            if (!App.validateNumericInput(amps)) {
                throw new Error('Please enter a valid amperage value');
            }

            // Find appropriate wire size
            const wireSize = this.findWireSize(amps);

            // Format and display result
            const message = `Recommended Wire Size: ${wireSize.awg} AWG (${wireSize.mm2} mm²)\n` +
                          `Maximum Ampacity: ${wireSize.maxAmps} A`;
            App.showSuccess('result3', message);

        } catch (error) {
            App.showError('result3', error.message);
        }
    }
};

// Initialize the calculator when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => WireSizeCalculator.init());
