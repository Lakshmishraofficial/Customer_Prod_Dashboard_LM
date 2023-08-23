'use client'
import { useTheme } from '../app/themes/themeContext';
import "../app/globals.css";
import Image from "next/image";
function ThemeSwitcher() {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <div className="absolute flex items-center w-full justify-end mt-6" style={{justifyContent:"flex-end"}}>

            <label className="switch fixed" onClick={toggleTheme}>

                <span className={isDarkMode ? "toggle-buttndark" : "toggle-buttnday"}>
                    {isDarkMode ? (<Image
                        src="/assets/moon.svg"
                        alt="moon"
                        width={24}
                        height={24}
                        className="cursor-pointer object-contain"
                    />) : (<Image
                        src="/assets/sunlight.svg"
                        alt="sunlight"
                        width={24}
                        height={24}
                        className="cursor-pointer object-contain"
                    />)}</span>
                <span className={isDarkMode ? "sliderdark round fixed" : "sliderlight round fixed"}></span>
            </label>
        </div>
    );
}

export default ThemeSwitcher;
