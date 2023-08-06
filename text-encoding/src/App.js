import "./App.css";
import { useState } from "react";

function App() {
    const [inputs, setInputs] = useState();

    const onChangeInput = (e) => {
        const encoded_bits = encodeStringToBits(e.target.value);
        const encoded_ascii = encodeBitsToAscii(encoded_bits);
        const encoded_base64 = encodeAsciiToBase64(encoded_ascii);
        const decoded_ascii = decodeBase64ToAscii(encoded_base64);
        const decoded_utf16 = decodeAsciiToUtf16(decoded_ascii);

        setInputs({
            input: e.target.value,
            encoded_bits,
            encoded_ascii,
            encoded_base64,
            decoded_ascii,
            decoded_utf16,
        });
    };

    return (
        <div className="App">
            <h2>Text Encoding</h2>
            <h3>입력</h3>
            <textarea className="text" value={inputs?.input} onChange={onChangeInput}></textarea>
            <h3>bits</h3>
            <textarea className="text" value={inputs?.encoded_bits}></textarea>
            <h3>인코드: bits -{">"} ASCII</h3>
            <textarea className="text" value={inputs?.encoded_ascii}></textarea>
            <h3>인코드: ASCII -{">"} Base64</h3>
            <textarea className="text" value={inputs?.encoded_base64}></textarea>
            <h3>디코드: Base64 -{">"} ASCII</h3>
            <textarea className="text" value={inputs?.decoded_ascii}></textarea>
            <h3>디코드: ASCII -{">"} UTF-16</h3>
            <textarea className="text" value={inputs?.decoded_utf16}></textarea>
        </div>
    );
}

const encodeStringToBits = (str) => {
    const bits = [];
    for (let i = 0; i < str.length; i++) {
        const binary_code = str.charCodeAt(i).toString(2).padStart(16, "0");
        bits.push(binary_code);
    }
    return bits.join(" ");
};

const encodeBitsToAscii = (str) => {
    const bits = str.replaceAll(" ", "");
    const ascii = [];
    for (let i = 0; i < bits.length; i += 8) {
        const binary_byte = bits.slice(i, i + 8);
        const decimal_byte = parseInt(binary_byte, 2);
        const ascii_character = String.fromCharCode(decimal_byte);
        ascii.push(ascii_character);
    }
    return ascii.join("");
};

const encodeAsciiToBase64 = (str) => {
    return btoa(str);
};

const decodeBase64ToAscii = (str) => {
    return atob(str);
};

const decodeAsciiToUtf16 = (str) => {
    const bits = [];
    for (let i = 0; i < str.length; i++) {
        const binary_code = str.charCodeAt(i).toString(2).padStart(8, "0");
        bits.push(binary_code);
    }
    const bits_16 = [];
    for (let i = 0; i < bits.length; i += 2) {
        bits_16.push(bits[i] + bits[i + 1]);
    }
    const utf16 = bits_16.map((bits) => String.fromCharCode(parseInt(bits, 2)));

    return utf16.join("");
};

export default App;
