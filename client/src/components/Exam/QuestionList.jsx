import { useSelector, useDispatch } from "react-redux";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { BsChevronExpand } from "react-icons/bs";
import clsx from "clsx";
import { MdCheck } from "react-icons/md";
import { getActiveQuestions } from "../../redux/actions/question"
import Loading from "../../components/Loader";
const QuestionList = ({ setPaper, paper }) => {
    const dispatch = useDispatch();
    const { loading, questionList } = useSelector((state) => state.question);
    const { token } = useSelector((state) => state.user);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    useEffect(() => {
        dispatch(getActiveQuestions(token));
    }, []);
    const handleChange = (el) => {
        setSelectedQuestions(el);
        setPaper(el);
    };
    return loading ? (
        <div>
            <Loading />
        </div>
    ) : (
        <div>
            <p className='text-gray-700'>Assign Questions: </p>
            <Listbox
                value={selectedQuestions}
                onChange={(el) => handleChange(el)}
                multiple

            >
                <div className='relative mt-1'>
                    <Listbox.Button className='relative w-full cursor-default rounded bg-white pl-3 pr-10 text-left px-3 py-2.5 2xl:py-3 border border-gray-300 sm:text-sm' >
                        <span className='block truncate'>
                            {selectedQuestions.length === 0 ? "Select Questions" : "Selected"}
                        </span>

                        <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                            <BsChevronExpand
                                className='h-5 w-5 text-gray-400'
                                aria-hidden='true'
                            />
                        </span>
                    </Listbox.Button>

                    <Transition
                        as={Fragment}
                        leave='transition ease-in duration-100'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <Listbox.Options className='z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm'>
                            {questionList?.map((question, index) => (
                                <Listbox.Option
                                    key={index}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4. ${active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                                        } `
                                    }
                                    value={question._id}
                                >
                                    {({ selected }) => (
                                        <>
                                            <div
                                                className={clsx(
                                                    "flex items-center gap-2 truncate",
                                                    selected ? "font-medium" : "font-normal"
                                                )}
                                            >
                                                <span>{question.body}</span>
                                            </div>
                                            {selected ? (
                                                <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
                                                    <MdCheck className='h-5 w-5' aria-hidden='true' />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
};

export default QuestionList;