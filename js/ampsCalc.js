// Amperage Calculator Module
const AmpsCalculator = {
    // DOM Elements
    elements: {
        voltage: document.getElementById('voltage1'),
        phase: document.getElementById('phase1'),
        vaLoad: document.getElementById('vaLoad'),
        result: document.getElementById('result1'),
        calculateBtn: document.querySelector('#ampsCalc button')
    },

    // Initialize the calculator
    init() {
        this.setupEventListeners();
    },

    // Setup event listeners
    setupEventListeners() {
        this.elements.calculateBtn.addEventListener('click', () => this.calculate());
        
        // Add input validation
        this.elements.vaLoad.addEventListener('input', (e) => {
            if (!App.validateNumericInput(e.target.value)) {
                App.showError('result1', 'Please enter a valid positive number');
            }
        });
    },

    // Calculate amperage
    calculate() {
        try {
            // Get input values
            const voltage = parseFloat(this.elements.voltage.value);
            const phase = parseInt(this.elements.phase.value);
            const vaLoad = parseFloat(this.elements.vaLoad.value);

            // Validate inputs
            if (!App.validateNumericInput(vaLoad)) {
                throw new Error('Please enter a valid VA load');
            }

            // Calculate amperage based on phase
            let amps;
            if (phase === 1) {
                // Single phase calculation
                amps = vaLoad / voltage;
            } else {
                // Three phase calculation
                amps = vaLoad / (voltage * Math.sqrt(3));
            }

            // Format and display result
            const formattedAmps = App.formatNumber(amps);
            App.showSuccess('result1', `Calculated Amperage: ${formattedAmps} A`);

        } catch (error) {
            App.showError('result1', error.message);
        }
    }
};

// Initialize the calculator when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => AmpsCalculator.init());
