import PhoneInput from "react-native-phone-number-input";

export default function PhoneInputScreen({ phoneNumber, setPhoneNumber }) {
  function handleFormattedText(text) {
    setPhoneNumber(text);
  }

  return (
    <PhoneInput
      value={phoneNumber}
      defaultCode="IN"
      onChangeFormattedText={handleFormattedText}
      withDarkTheme
      withShadow
      autoFocus
      textInputStyle={{ fontFamily: "monospace" }}
      codeTextStyle={{
        fontFamily: "monospace",
        fontWeight: "900",
      }}
    />
  );
}
