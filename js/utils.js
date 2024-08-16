const triggerEvent = (input) =>{
    const event = new Event('input', {
        bubbles: true, // Allow the event to bubble up
        cancelable: true // Allow the event to be canceled
    });
    input.dispatchEvent(event);
}