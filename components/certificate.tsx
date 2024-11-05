import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";
import TooltipWarpper from "./tooltip-warpper";

const data: any[] = [
    '/images/courses/certificate.png',
    '/images/courses/certificate.png',
    '/images/courses/certificate.png',
    '/images/courses/certificate.png',
];

const Certificate = () => {
    const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

    const handleTemplateClick = (index: number) => {
        setSelectedTemplate(index);
    };

    return (
        <div>
            <div className="flex justify-between items-center gap-5 mb-4">
                <h2 className="lg:text-3xl text-2xl text-primary font-semibold">Certificate</h2>
                <Button variant="outline-secondary">
                    Save
                </Button>
            </div>
            <p className="mb-4 text-base text-white/70">Select Certificate Template</p>
            <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2  gap-7'>
                {data.map((item, i) => (
                    <div
                        className={`bg-black rounded-2xl overflow-hidden cursor-pointer  p-5 ${selectedTemplate === i ? 'border-2 border-primary' : ''}`}
                        key={i}
                        onClick={() => handleTemplateClick(i)}
                    >
                        <div className=" mb-3">
                            <Image src={item} alt='certificate' className="w-full h-full  rounded-xl" width={787} height={561} />
                        </div>
                        <div className="flex items-center gap-2">
                            <TooltipWarpper text="Select this Template">
                                <div className="radio-button-container">
                                    <input
                                        type="radio"
                                        name="correctOption"
                                        id={`option-${i}`}
                                        checked={selectedTemplate === i}
                                        readOnly
                                    />
                                </div>
                            </TooltipWarpper>
                            <p>Template {i + 1}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Certificate;
