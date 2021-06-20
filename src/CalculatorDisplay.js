import './CalculatorDisplay.css';

const CalculatorDisplay = ({ display }) => {
    return (
        <div className="calculatorDisplay">
            {display}
        </div>
    );
}

export default CalculatorDisplay;