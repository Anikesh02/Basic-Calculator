document.addEventListener('DOMContentLoaded', () => {

  const operationElement = document.querySelector('#operation');
  const totalElement = document.querySelector('#total');
  const keys = document.querySelectorAll('.key');

  const showTime = () => {
    const date = new Date();
    const h = date.getHours();
    const m = date.getMinutes();
    const minutes = m < 10 ? `0${m}` : m;
    const time = `${h}:${minutes}`;

    const timeElement = document.querySelector('#time');
    timeElement.innerText = time;

    setTimeout(showTime, 1000 * 60);
  }

  const writeTotal = val => totalElement.innerText = val;
  const writeText = text => !text ? operationElement.innerText = '' : operationElement.innerText += text;
  const onDelete = () => operationElement.innerText = operationElement.innerText.slice(0, -1);
  const onClear = () => totalElement.innerText = '0';
  const onEqual = () => {
    const val = eval(operationElement.innerText);
    writeTotal(val);
    operationElement.innerText = val;
  }

  const performScientificOperation = (operation) => {
    const currentInput = operationElement.innerText;
    let result;

    switch (operation) {
      case 'sin':
        result = Math.sin(Number(currentInput));
        break;
      case 'cos':
        result = Math.cos(Number(currentInput));
        break;
      case 'tan':
        result = Math.tan(Number(currentInput));
        break;
      case 'log':
        result = Math.log(Number(currentInput));
        break;
      case 'exp':
        result = Math.exp(Number(currentInput));
        break;
      case 'sqrt':
        result = Math.sqrt(Number(currentInput));
        break;
      default:
        return;
    }

    writeTotal(result);
    operationElement.innerText = result;
  };

  const action = keyElement => {
    const { id, innerText } = keyElement;
    switch (id) {
      case 'clear':
        writeText('');
        onClear();
        break;
      case 'delete':
        onDelete();
        break;
      case 'equal':
        onEqual();
        break;
      // Add cases for scientific operation buttons
      case 'sin':
      case 'cos':
      case 'tan':
      case 'log':
      case 'exp':
      case 'sqrt':
        performScientificOperation(id); // Call the function for scientific operations
        break;
      default:
        writeText(innerText);
        break;
    }
  }

  const keysListener = () => {
    keys.forEach(el => {
      el.addEventListener('click', () => action(el));
    });
  }

  const init = () => {
    showTime();
    keysListener();
  }

  init();
});
