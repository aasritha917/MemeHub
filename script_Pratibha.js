const imageInput = document.getElementById('imageInput');
const canvas = document.getElementById('memeCanvas');
const ctx = canvas.getContext('2d');

const topTextInput = document.getElementById('topText');
const bottomTextInput = document.getElementById('bottomText');
const fontSizeInput = document.getElementById('fontSizeRange');
const fontSizeValueDisplay = document.getElementById('fontSizeValue');
const textColorInput = document.getElementById('textColor');
const fontFamilyInput = document.getElementById('fontFamily');
const textAlignInput = document.getElementById('textAlign');
const templateSelect = document.getElementById('memeTemplate');

let uploadedImage = null;

const memeTemplates = {
  drake: 'https://i.imgflip.com/30b1gx.jpg',
  doge: 'https://i.imgflip.com/4t0m5.jpg',
  success: 'https://i.imgflip.com/1bhw.jpg'
};

// Draw meme
function drawMeme() {
  if (!uploadedImage) return;

  const topText = topTextInput.value.toUpperCase();
  const bottomText = bottomTextInput.value.toUpperCase();
  const fontSize = parseInt(fontSizeInput.value);
  const fontFamily = fontFamilyInput.value;
  const textColor = textColorInput.value;
  const textAlign = textAlignInput.value;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);

  ctx.fillStyle = textColor;
  ctx.strokeStyle = "black";
  ctx.lineWidth = fontSize / 10;
  ctx.font = `bold ${fontSize}px ${fontFamily}`;
  ctx.textAlign = textAlign;

  let x = textAlign === "left" ? 10 : textAlign === "right" ? canvas.width - 10 : canvas.width / 2;

  ctx.textBaseline = "top";
  ctx.fillText(topText, x, 10);
  ctx.strokeText(topText, x, 10);

  ctx.textBaseline = "bottom";
  ctx.fillText(bottomText, x, canvas.height - 10);
  ctx.strokeText(bottomText, x, canvas.height - 10);
}

//  Load uploaded image
imageInput.addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      uploadedImage = img;
      canvas.width = img.width;
      canvas.height = img.height;
      drawMeme();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
});

//  Load selected template
templateSelect.addEventListener('change', function () {
  const selected = this.value;
  if (memeTemplates[selected]) {
    loadImageOnCanvas(memeTemplates[selected]);
  }
});

//  Load random template
document.getElementById('randomTemplateBtn')?.addEventListener('click', () => {
  const keys = Object.keys(memeTemplates);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  const imageUrl = memeTemplates[randomKey];
  templateSelect.value = randomKey;
  loadImageOnCanvas(imageUrl);
});

// 📥 Utility to load image from URL
function loadImageOnCanvas(url) {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    uploadedImage = img;
    canvas.width = img.width;
    canvas.height = img.height;
    drawMeme();
  };
  img.src = url;
}

fontSizeInput.addEventListener('input', () => {
  fontSizeValueDisplay.textContent = fontSizeInput.value;
  drawMeme();
});

[topTextInput, bottomTextInput, fontSizeInput, textColorInput, fontFamilyInput, textAlignInput].forEach(input =>
  input.addEventListener('input', drawMeme)
);

function saveMeme() {
  const link = document.createElement('a');
  link.download = 'meme.png';
  link.href = canvas.toDataURL();
  link.click();
}
window.saveMeme = saveMeme;


function saveDraft() {
  const draft = {
    topText: topTextInput.value,
    bottomText: bottomTextInput.value,
    fontSize: fontSizeInput.value,
    textColor: textColorInput.value,
    fontFamily: fontFamilyInput.value,
    textAlign: textAlignInput.value,
    template: templateSelect.value
  };
  localStorage.setItem('memeDraft', JSON.stringify(draft));
  alert('Draft saved!');
}
document.getElementById('saveDraftBtn').addEventListener('click', saveDraft);


window.addEventListener('DOMContentLoaded', () => {
  const savedDraft = localStorage.getItem('memeDraft');
  if (savedDraft) {
    const draft = JSON.parse(savedDraft);
    topTextInput.value = draft.topText || '';
    bottomTextInput.value = draft.bottomText || '';
    fontSizeInput.value = draft.fontSize || '32';
    textColorInput.value = draft.textColor || '#ffffff';
    fontFamilyInput.value = draft.fontFamily || 'Impact';
    textAlignInput.value = draft.textAlign || 'center';
    templateSelect.value = draft.template || '';

    if (draft.template && memeTemplates[draft.template]) {
      loadImageOnCanvas(memeTemplates[draft.template]);
    }
  }
});