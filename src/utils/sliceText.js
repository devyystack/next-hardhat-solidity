

export default function sliceText(text, start, end) {
    const stringSlice = (innerText) => {

        let startText = innerText.slice(start, end);
        let slicedText = startText + '...';
        return slicedText;
    };

    return text?.length > 15 ? stringSlice(text) : text;
}
