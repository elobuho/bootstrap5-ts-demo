import './style/style.scss';
import { Modal } from 'bootstrap';

const SMTPJS_URL = 'https://smtpjs.com/v3/smtp.js';
const ls = window.localStorage;
const form = document.getElementById('test-form');
const inputs = [...document.querySelectorAll('.form-control')];
const modal = new Modal(document.getElementById('form-modal')!);

async function getFile() {
  if (ls.getItem('file')) {
    return;
  }

  const response = await fetch(SMTPJS_URL);
  let file = '';

  if (response.ok) {
    file = await response.text();
  }

  try {
    ls.setItem('file', file);
  } catch {
    console.error("Couldn't save the file.");
  }
}

function setModal() {
  const name = (<HTMLFormElement>document.getElementById('name'))?.value;
  const message = (<HTMLFormElement>document.getElementById('message'))?.value;

  document.getElementById('modal-message-from')!.innerText = name;
  document.getElementById('modal-message-body')!.innerText = message;
  modal.show();
}

inputs.forEach(input => input.addEventListener('focus', getFile));

form?.addEventListener('submit', e => {
  e.preventDefault();
  setModal();
});
