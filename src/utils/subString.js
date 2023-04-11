export default function subSrting(text) {
  const stringSlice = (innerText) => {
    let startText = innerText.substring(0, 10);
    let endText = innerText.slice(-4);

    return startText + "..." + endText;
  };

  return text?.length > 15 ? stringSlice(text) : text;
}
