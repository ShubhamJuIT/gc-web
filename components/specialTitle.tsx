import React from "react";


interface SpecialTitleProps {
    text: string;
    className: string;
}


const SpecialTitle: React.FC<SpecialTitleProps> = ({ text, className }) => {
    const parts = text?.split(/\{(.*?)\}/g);
    return parts?.map((part, index) => (
        <React.Fragment key={index}>
            {index % 2 === 1 && (
                <span className={className ? className : ''}>{part}</span>
            )}
            {index % 2 === 0 && part}
        </React.Fragment>
    ));;
};

export default SpecialTitle;
