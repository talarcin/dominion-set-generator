import { Head } from "@inertiajs/react";
import { MultiSelect, Tabs, TextInput } from "@mantine/core";
import {
    MagnifyingGlassIcon,
    ExclamationCircleIcon,
    PlusIcon,
    CheckCircleIcon,
    Alert,
} from "@heroicons/react/24/outline";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import {
    tabClasses,
    multiSelectClasses,
    textInputClasses,
} from "./../styleConstants";

import { messages } from "@/inputMessages";

export default function Library(props) {
    const [showAlert, setShowAlert] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const {
        data: getData,
        setData: setGetData,
        get,
        processing: processingGet,
        errors: getErrors,
        reset: resetGetForm,
        progress: getProgress,
    } = useForm({
        title: "",
        playedCards: "[]",
    });
    const {
        data: postData,
        setData: setPostData,
        post,
        processing: processingPost,
        errors: postErrors,
        reset: resetPostForm,
        progress: postProgress,
    } = useForm({
        title: "",
        playedCards: "[]",
        author: "Unknown",
    });

    function handleSearch(event) {
        event.preventDefault();
        console.log(getData);
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(postData);
        isInputWrong()
            ? setShowAlert(true)
            : post(route("add-card-set"), {
                  preserveScroll: true,
                  onSuccess: () => handlePostSuccess(),
              });
    }

    function getAllCardsNames() {
        return props.allCards.map((card) => card.name);
    }

    function isInputWrong() {
        return (
            (postData.title === "") |
            (JSON.parse(postData.playedCards).length !== 10)
        );
    }

    function handlePostSuccess() {
        resetPostForm();
        setShowSuccess(true);
    }

    return (
        <>
            <Head>
                <title>Library</title>
            </Head>
            <main className="h-screen flex flex-col items-center p-24">
                <Tabs defaultValue="search" color="teal">
                    <Tabs.List
                        className="border-b-emerald-500 border-opacity-50"
                        position="center"
                    >
                        <Tabs.Tab
                            className={tabClasses}
                            value="search"
                            icon={<MagnifyingGlassIcon className="h-6" />}
                        >
                            Cardset Search
                        </Tabs.Tab>
                        <Tabs.Tab
                            className={tabClasses}
                            value="add-set"
                            icon={<PlusIcon className="h-6" />}
                        >
                            Add Cardset
                        </Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value="search" pt="xl">
                        <div className="font-medium text-md mb-16">
                            <form
                                className="flex flex-col gap-8 items-center"
                                onSubmit={handleSearch}
                            >
                                <div className="grid grid-cols-2 gap-8">
                                    <TextInput
                                        id="title"
                                        label="Cardset title"
                                        placeholder="Cardset title"
                                        classNames={textInputClasses}
                                        value={getData.title}
                                        onChange={(event) =>
                                            setGetData(
                                                "title",
                                                event.target.value
                                            )
                                        }
                                    ></TextInput>
                                    <MultiSelect
                                        id="contains-cards"
                                        label="Played cards"
                                        placeholder="Select played cards"
                                        variant="unstyled"
                                        classNames={multiSelectClasses}
                                        data={getAllCardsNames()}
                                        value={getData.playedCards}
                                        onChange={(event) =>
                                            setGetData(
                                                "playedCards",
                                                JSON.stringify(event)
                                            )
                                        }
                                    ></MultiSelect>
                                </div>
                                <button className="rounded-lg text-lg px-6 py-2 font-semibold uppercase bg-opacity-70 bg-emerald-500 hover:bg-opacity-100 transition duration-75">
                                    Search
                                </button>
                                <div>
                                    <h3 className="font-semibold text-xl text-center">
                                        Search Results
                                    </h3>
                                    <div>{props.cardSets}</div>
                                </div>
                            </form>
                        </div>
                    </Tabs.Panel>
                    <Tabs.Panel value="add-set" pt="xl">
                        <div className="font-medium text-md mb-16">
                            <form
                                className="flex flex-col gap-8 items-center"
                                onSubmit={handleSubmit}
                            >
                                <div className="grid grid-cols-2 gap-8">
                                    <TextInput
                                        id="title"
                                        label="Cardset title"
                                        placeholder="Cardset title"
                                        classNames={textInputClasses}
                                        value={postData.title}
                                        onChange={(event) =>
                                            setPostData(
                                                "title",
                                                event.target.value
                                            )
                                        }
                                    ></TextInput>
                                    <MultiSelect
                                        id="contains-cards"
                                        label="Played cards"
                                        placeholder="Select played cards"
                                        variant="unstyled"
                                        classNames={multiSelectClasses}
                                        data={getAllCardsNames()}
                                        value={postData.playedCards}
                                        onChange={(event) =>
                                            setPostData(
                                                "playedCards",
                                                JSON.stringify(event)
                                            )
                                        }
                                    ></MultiSelect>
                                </div>
                                <button className="rounded-lg text-lg px-6 py-2 font-semibold uppercase bg-opacity-70 bg-emerald-500 hover:bg-opacity-100 transition duration-75">
                                    Submit
                                </button>
                            </form>
                            {showAlert && (
                                <Alert
                                    className="mt-16 font-normal"
                                    icon={<ExclamationCircleIcon />}
                                    title="Input missing"
                                    color="red"
                                    withCloseButton
                                    closeButtonLabel="Close alert"
                                    onClose={() => setShowAlert(false)}
                                >
                                    {messages.setPostError}
                                </Alert>
                            )}
                            {showSuccess && (
                                <Alert
                                    className="mt-16 font-normal"
                                    title="Success"
                                    icon={<CheckCircleIcon />}
                                    color="teal"
                                    withCloseButton
                                    closeButtonLabel="Close alert"
                                    onClose={() => setShowSuccess(false)}
                                >
                                    {messages.setPostSuccess}
                                </Alert>
                            )}
                        </div>
                    </Tabs.Panel>
                </Tabs>
            </main>
        </>
    );
}