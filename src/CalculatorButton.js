import './CalculatorButton.css';

const CalculatorButton = ({ display, isLong, highlight, onClick }) => {
    return (
        <div onClick={onClick} className={`calculatorButton${isLong ? ' calculatorButton--long' : ''}${highlight ? ' calculatorButton--' + highlight : ''}`}>
            {display}
        </div>
    );
}

export default CalculatorButton;