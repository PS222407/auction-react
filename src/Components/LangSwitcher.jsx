import {useTranslation} from "react-i18next";

function LangSwitcher() {
    const {i18n} = useTranslation();
    const languages = {
        "en": {nativeName: "English"},
        "nl": {nativeName: "Nederlands"}
    };

    return (
        <select defaultValue={localStorage.getItem("i18nextLng")} name="languages" id="languages"
                onChange={(e) => i18n.changeLanguage(e.target.value)}>
            {Object.keys(languages).map((language) => (
                <option key={language} value={language}>{languages[language].nativeName}</option>
            ))}
        </select>
    );
}

export default LangSwitcher;