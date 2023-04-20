import CustomButton from "./CustomButton.jsx";

export default function AIPicker({prompt, setPrompt, generatingImg, handleSubmit}) {
    return (
        <div className={'aipicker-container'}>
            <textarea
                className={'aipicker-textarea'}
                placeholder={'Ask AI to generate image'}
                rows={5}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            />
            <div className={'flex flex-wrap gap-3'}>
                {generatingImg ? (
                        <CustomButton
                            type={'outline'}
                            title={'Asking AI'}
                            customStyles={'text-xs'}
                        />
                    )
                    : (
                        <>
                            <CustomButton
                                type={'outline'}
                                title={'AI Logo'}
                                custom-styles={'text-xs'}
                                handleClick={() => handleSubmit('logo')}
                                customStyles={'text-xs'}
                            />
                            <CustomButton
                                type={'filled'}
                                title={'AI full'}
                                custom-styles={'text-xs'}
                                handleClick={() => handleSubmit('full')}
                                customStyles={'text-xs'}
                            />
                        </>
                    )
                }
            </div>
        </div>
    )
}