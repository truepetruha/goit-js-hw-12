import iziToast from 'izitoast';

export const hiddenClass = 'is-hidden';

export function showErrorMessage(message) {
  iziToast.error({
    title: 'Error',
    titleSize: '30',
    messageSize: '25',
    message,
  });
}

export function hideElement(element) {
  element.classList.add(hiddenClass);
}

export function showElement(element) {
  element.classList.remove(hiddenClass);
}

export function resetForm(form) {
  form.reset();
}