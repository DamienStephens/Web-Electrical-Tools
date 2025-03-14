// Developed by Damien Stephens.
// Main application functionality
const App = {
    // DOM Elements
    elements: {
        sidebar: document.querySelector('.sidebar'),
        content: document.querySelector('.content'),
        modules: {},
        themeToggle: document.getElementById('themeToggle')
    },

    // Initialize the application
    init() {
        this.initializeModules();
        this.setupEventListeners();
        this.showModule('amperageCalculator'); // Show default module
        
        // Set initial theme from localStorage or default to dark
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.setTheme(savedTheme);
        this.elements.themeToggle.checked = savedTheme === 'dark';

        // Set initial accent color from localStorage or default to blue
        const savedAccent = localStorage.getItem('accent') || 'blue';
        this.setAccentColor(savedAccent);

        // Initialize selector options
        this.initSelectors();
    },

    // Initialize all calculator modules
    initializeModules() {
        // Get all calculator containers
        const containers = document.querySelectorAll('.container');
        containers.forEach(container => {
            this.elements.modules[container.id] = container;
            container.style.display = 'none'; // Hide all modules initially
        });
    },

    // Setup event listeners
    setupEventListeners() {
        // Add event listeners for sidebar navigation
        const navItems = this.elements.sidebar.querySelectorAll('li');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const moduleId = e.target.getAttribute('onclick').match(/'([^']+)'/)[1];
                this.showModule(moduleId);
            });
        });
    },

    // Show selected module and hide others
    showModule(moduleId) {
        // Hide all modules
        Object.values(this.elements.modules).forEach(module => {
            module.style.display = 'none';
        });

        // Show selected module
        if (this.elements.modules[moduleId]) {
            this.elements.modules[moduleId].style.display = 'block';
        }
    },

    // Toggle theme
    toggleTheme(isDark) {
        const theme = isDark ? 'dark' : 'light';
        this.setTheme(theme);
    },

    // Set theme
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    },

    // Set accent color
    setAccentColor(color) {
        document.documentElement.setAttribute('data-accent', color);
        localStorage.setItem('accent', color);
        
        // Update active state of color options
        document.querySelectorAll('.color-option').forEach(option => {
            option.classList.remove('active');
            if (option.dataset.color === color) {
                option.classList.add('active');
            }
        });
    },

    // Utility function to format numbers
    formatNumber(number, decimals = 2) {
        return Number(number).toFixed(decimals);
    },

    // Utility function to validate numeric input
    validateNumericInput(value) {
        const num = parseFloat(value);
        return !isNaN(num) && num >= 0;
    },

    // Utility function to show error message
    showError(elementId, message) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = message;
            element.style.color = 'red';
        }
    },

    // Utility function to show success message
    showSuccess(elementId, message) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = message;
            element.style.color = 'green';
        }
    },

    // Initialize selector options
    initSelectors() {
        // Set active class on checked options when page loads
        document.querySelectorAll('.selector-option input[type="radio"]:checked').forEach(radio => {
            radio.closest('.selector-option').classList.add('active');
        });

        // Add change event listeners for phase selection
        document.querySelectorAll('input[name$="Phase"]').forEach(phaseRadio => {
            phaseRadio.addEventListener('change', function() {
                const calculator = this.closest('.calculator');
                const voltageGroup = calculator.querySelector('.selector-group');
                const selectedPhase = parseInt(this.value);
                
                // Show/hide voltage options based on phase
                voltageGroup.querySelectorAll('.selector-option').forEach(option => {
                    const optionPhases = option.dataset.phase.split(',').map(phase => parseInt(phase));
                    if (optionPhases.includes(selectedPhase)) {
                        option.style.display = 'block';
                    } else {
                        option.style.display = 'none';
                    }
                });

                // If current voltage selection is not valid for new phase, select first available voltage
                const currentVoltage = calculator.querySelector(`input[name$="Voltage"]:checked`);
                if (currentVoltage) {
                    const currentOption = currentVoltage.closest('.selector-option');
                    const currentPhases = currentOption.dataset.phase.split(',').map(phase => parseInt(phase));
                    if (!currentPhases.includes(selectedPhase)) {
                        // Find first available voltage for the new phase
                        const firstAvailableVoltage = calculator.querySelector(`.selector-option[data-phase*="${selectedPhase}"] input`);
                        if (firstAvailableVoltage) {
                            // Remove active class from all options first
                            voltageGroup.querySelectorAll('.selector-option').forEach(option => {
                                option.classList.remove('active');
                            });
                            // Set new selection
                            firstAvailableVoltage.checked = true;
                            firstAvailableVoltage.closest('.selector-option').classList.add('active');
                        }
                    }
                }
            });
        });

        // Add change event listeners for voltage selection
        document.querySelectorAll('.selector-option input[type="radio"]').forEach(radio => {
            radio.addEventListener('change', function() {
                // Remove active class from all options in the same group
                this.closest('.selector-group').querySelectorAll('.selector-option').forEach(option => {
                    option.classList.remove('active');
                });
                // Add active class to the selected option
                this.closest('.selector-option').classList.add('active');
            });
        });

        // Trigger initial phase change to set correct voltage options
        document.querySelectorAll('input[name$="Phase"]:checked').forEach(phaseRadio => {
            phaseRadio.dispatchEvent(new Event('change'));
        });
    }
};

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => App.init());
