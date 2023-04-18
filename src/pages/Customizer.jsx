import {AnimatePresence, motion} from "framer-motion";
import {useSnapshot} from "valtio";
import state from "../store/Store.jsx";
import {fadeAnimation, slideAnimation} from "../config/motion.js";
import Tab from "../components/Tab.jsx";
import {EditorTabs, FilterTabs} from "../config/constants.js";
import CustomButton from "../components/CustomButton.jsx";
import CanvasModel from "../canvas/CanvasModel.jsx";
import {useState} from "react";
import ColorPicker from "../components/ColorPicker.jsx";
import FilePicker from "../components/FilePicker.jsx";
import AiPicker from "../components/AiPicker.jsx";

export default function Customizer() {
    let snapshot = useSnapshot(state);

    const [file, setFile] = useState('');
    const [prompt, setPrompt] = useState('');
    const [generatingImg, setGeneratingImg] = useState(false);

    const [activeFilterTab, setActiveFilterTab] = useState('');
    const [activeEditorTab, setActiveEditorTab] = useState('');
    const generateTabContent = () => {
        switch (activeEditorTab) {
            case 'colorpicker':
                return <ColorPicker/>
            case 'filepicker':
                return <FilePicker/>
            case 'aipicker':
                return <AiPicker/>
            default:
                return null
        }
    }
    return (
        <AnimatePresence>
            {!snapshot.intro && (<>
                    <motion.div
                        className={'absolute top-0 left-0 z-10'}
                        {...slideAnimation('left')}
                    >
                        <div className={'flex items-center min-h-screen'}>
                            <div className={'editortabs-container tabs'}>
                                {
                                    EditorTabs.map((tab) => (
                                            <Tab
                                                key={tab.name}
                                                tab={tab}
                                                handleClick={() => setActiveEditorTab(tab.name)}
                                            />
                                        )
                                    )
                                }
                                {generateTabContent()}
                            </div>
                        </div>

                    </motion.div>
                    <motion.div className={'absolute z-10 top-5 right-5'}
                                {...fadeAnimation}
                    >
                        <CustomButton
                            title={'Go back'}
                            handleClick={() => state.intro = true}
                            type={'filled'}
                            customStyles={'w-fit px-4 py-2.5 font-bold text-sm'}
                        />

                    </motion.div>

                    <motion.div className={'filtertabs-container'}
                                {...slideAnimation('up')}>
                        {
                            FilterTabs.map((tab) => (
                                    <Tab
                                        key={tab.name}
                                        tab={tab}
                                        handleClick={() => {

                                        }}
                                        isActiveTab={''}
                                    />
                                )
                            )
                        }

                    </motion.div>
                    <CanvasModel/>
                </>

            )}
        </AnimatePresence>
    )
}