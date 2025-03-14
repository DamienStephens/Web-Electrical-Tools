// VA Calculator Module
const VACalculator = {
    // DOM Elements
    elements: {
        voltage: document.getElementById('voltage2'),
        phase: document.getElementById('phase2'),
        ampsLoad: document.getElementById('ampsLoad'),
        result: document.getElementById('result2'),
        calculateBtn: document.querySelector('#vaCalc button')
    },

    // Initialize the calculator
    init() {
        this.setupEventListeners();
    },

    // Setup event listeners
    setupEventListeners() {
        this.elements.calculateBtn.addEventListener('click', () => this.calculate());
        
        // Add input validation
        this.elements.ampsLoad.addEventListener('input', (e) => {
            if (!App.validateNumericInput(e.target.value)) {
                App.showError('result2', 'Please enter a valid positive number');
            }
        });
    },

    // Calculate VA
    calculate() {
        try {
            // Get input values
            const voltage = parseFloat(this.elements.voltage.value);
            const phase = parseInt(this.elements.phase.value);
            const amps = parseFloat(this.elements.ampsLoad.value);

            // Validate inputs
            if (!App.validateNumericInput(amps)) {
                throw new Error('Please enter a valid amperage value');
            }

            // Calculate VA based on phase
            let va;
            if (phase === 1) {
                // Single phase calculation
                va = voltage * amps;
            } else {
                // Three phase calculation
                va = voltage * amps * Math.sqrt(3);
            }

            // Format and display result
            const formattedVA = App.formatNumber(va);
            App.showSuccess('result2', `Calculated VA: ${formattedVA} VA`);

        } catch (error) {
            App.showError('result2', error.message);
        }
    }
};

// Initialize the calculator when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => VACalculator.init());
