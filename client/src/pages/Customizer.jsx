import {AnimatePresence, motion} from "framer-motion";
import {useSnapshot} from "valtio";
import state from "../store/Store.jsx";
import {fadeAnimation, slideAnimation} from "../config/motion.js";
import Tab from "../components/Tab.jsx";
import {DecalTypes, EditorTabs, FilterTabs} from "../config/constants.js";
import CustomButton from "../components/CustomButton.jsx";
import {useState} from "react";
import ColorPicker from "../components/ColorPicker.jsx";
import FilePicker from "../components/FilePicker.jsx";
import {reader} from "../config/helpers.js";

export default function Customizer() {

    const snap = useSnapshot(state);

    const [file, setFile] = useState('');

    const [prompt, setPrompt] = useState('');
    const [generatingImg, setGeneratingImg] = useState(false);

    const [activeEditorTab, setActiveEditorTab] = useState("");
    const [activeFilterTab, setActiveFilterTab] = useState({
        logoShirt: true,
        stylishShirt: false,
    })

    // show tab content depending on the activeTab
    const generateTabContent = () => {
        switch (activeEditorTab) {
            case "colorpicker":
                return <ColorPicker/>
            case "filepicker":
                return <FilePicker
                    file={file}
                    setFile={setFile}
                    readFile={readFile}
                />
            case "aipicker":
                return <AIPicker
                    prompt={prompt}
                    setPrompt={setPrompt}
                    generatingImg={generatingImg}
                    handleSubmit={handleSubmit}
                />
            default:
                return null;
        }
    }

    const handleSubmit = async (type) => {
        if (!prompt) return alert("Please enter a prompt");

        try {
            setGeneratingImg(true);

            const response = await fetch('http://localhost:8080/api/v1/dalle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt,
                })
            })

            const data = await response.json();

            handleDecals(type, `data:image/png;base64,${data.photo}`)
        } catch (error) {
            alert(error)
        } finally {
            setGeneratingImg(false);
            setActiveEditorTab("");
        }
    }

    const handleDecals = (type, result) => {
        const decalType = DecalTypes[type];

        state[decalType.stateProperty] = result;

        if (!activeFilterTab[decalType.filterTab]) {
            handleActiveFilterTab(decalType.filterTab)
        }
    }

    const handleActiveFilterTab = (tabName) => {
        switch (tabName) {
            case "logoShirt":
                state.isLogoTexture = !activeFilterTab[tabName];
                break;
            case "stylishShirt":
                state.isFullTexture = !activeFilterTab[tabName];
                break;
            default:
                state.isLogoTexture = true;
                state.isFullTexture = false;
                break;
        }

        // after setting the state, activeFilterTab is updated

        setActiveFilterTab((prevState) => {
            return {
                ...prevState,
                [tabName]: !prevState[tabName]
            }
        })
    }

    const readFile = (type) => {
        reader(file)
            .then((result) => {
                handleDecals(type, result);
                setActiveEditorTab("");
            })
    }

    return (
        <AnimatePresence>
            {!snap.intro && (
                <>
                    <motion.div
                        key="custom"
                        className="absolute top-0 left-0 z-10"
                        {...slideAnimation('left')}
                    >
                        <div className="flex items-center min-h-screen">
                            <div className="editortabs-container tabs">
                                {EditorTabs.map((tab) => (
                                    <Tab
                                        key={tab.name}
                                        tab={tab}
                                        handleClick={() => setActiveEditorTab(tab.name)}
                                    />
                                ))}

                                {generateTabContent()}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="absolute z-10 top-5 right-5"
                        {...fadeAnimation}
                    >
                        <CustomButton
                            type="filled"
                            title="Go Back"
                            handleClick={() => state.intro = true}
                            customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                        />
                    </motion.div>

                    <motion.div
                        className='filtertabs-container'
                        {...slideAnimation("up")}
                    >
                        {FilterTabs.map((tab) => (
                            <Tab
                                key={tab.name}
                                tab={tab}
                                isFilterTab
                                isActiveTab={activeFilterTab[tab.name]}
                                handleClick={() => handleActiveFilterTab(tab.name)}
                            />
                        ))}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
    // let snapshot = useSnapshot(state);
    //
    // const [file, setFile] = useState('');
    // const [prompt, setPrompt] = useState('');
    // const [generatingImg, setGeneratingImg] = useState(false);
    //
    // const [activeFilterTab, setActiveFilterTab] = useState({
    //     logoShirt: true,
    //     stylishShirt: false,
    // })
    // const [activeEditorTab, setActiveEditorTab] = useState('');
    // const generateTabContent = () => {
    //     switch (activeEditorTab) {
    //         case 'colorpicker':
    //             return <ColorPicker/>
    //         case 'filepicker':
    //             return <FilePicker
    //                 file={file}
    //                 setFile={setFile}
    //             />
    //         case 'aipicker':
    //             return <AiPicker/>
    //         default:
    //             return null
    //     }
    // }
    //
    // const handleActiveFilterTab = (tabName) => {
    //     switch (tabName) {
    //         case "logoShirt":
    //             state.isLogoTexture = !activeFilterTab[tabName];
    //             break;
    //         case "stylishShirt":
    //             state.isFullTexture = !activeFilterTab[tabName];
    //             break;
    //         default:
    //             state.isLogoTexture = true;
    //             state.isFullTexture = false;
    //             break;
    //     }
    // }
    //
    // const handleDecals = (type, result) => {
    //     const decalType = DecalTypes[type]
    //
    //     state[decalType.stateProperty] = result
    //
    //     if (!activeFilterTab[decalType.filterTab]) {
    //         handleActiveFilterTab(decalType.filterTab)
    //     }
    // }
    //
    // const readFile = (type) => {
    //     reader(file).then(result => {
    //         handleDecals(type, result)
    //         setActiveEditorTab("")
    //     })
    // }
    //
    // // after setting the state, activeFilterTab is updated
    // //
    // // setActiveFilterTab((prevState) => {
    // //     return {
    // //         ...prevState,
    // //         [tabName]: !prevState[tabName]
    // //     }
    // // })
    // //
    // return (
    //     <AnimatePresence>
    //         {!snapshot.intro && (<>
    //                 <motion.div
    //                     className={'absolute top-0 left-0 z-10'}
    //                     {...slideAnimation('left')}
    //                 >
    //                     <div className={'flex items-center min-h-screen'}>
    //                         <div className={'editortabs-container tabs'}>
    //                             {
    //                                 EditorTabs.map((tab) => (
    //                                         <Tab
    //                                             key={tab.name}
    //                                             tab={tab}
    //                                             handleClick={() => setActiveEditorTab(tab.name)}
    //                                         />
    //                                     )
    //                                 )
    //                             }
    //                             {generateTabContent()}
    //                         </div>
    //                     </div>
    //
    //                 </motion.div>
    //                 <motion.div className={'absolute z-10 top-5 right-5'}
    //                             {...fadeAnimation}
    //                 >
    //                     <CustomButton
    //                         title={'Go back'}
    //                         handleClick={() => state.intro = true}
    //                         type={'filled'}
    //                         customStyles={'w-fit px-4 py-2.5 font-bold text-sm'}
    //                     />
    //
    //                 </motion.div>
    //
    //                 <motion.div
    //                     className='filtertabs-container'
    //                     {...slideAnimation("up")}
    //                 >
    //                     {FilterTabs.map((tab) => (
    //                         <Tab
    //                             key={tab.name}
    //                             tab={tab}
    //                             isFilterTab
    //                             isActiveTab={activeFilterTab[tab.name]}
    //                             handleClick={() => handleActiveFilterTab(tab.name)}
    //                         />
    //                     ))}
    //                 </motion.div>
    //                 {/*<CanvasModel/>*/}
    //             </>
    //
    //         )}
    //     </AnimatePresence>
    // )
}