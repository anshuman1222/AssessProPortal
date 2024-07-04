import React , {useState , useEffect} from 'react'
import { useParams } from "react-router-dom";
import Loading from "../components/Loader";
import { useSelector, useDispatch } from 'react-redux'
import { getResultByTestId } from '../redux/actions/result';
import { getResultByTeacherByTestId } from '../redux/actions/result';
import AnalyseTestQuestion from '../components/AnalyseTestQuestion';
const AnalysisPage = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const { token } = useSelector((state) => state.user);
    const { loading, testpaper , testpaperquestions } = useSelector((state) => state.result);
    const id = params?.id || "";
    const userid = params?.userid || "";
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        if(userid){
            dispatch(getResultByTeacherByTestId(token,id,userid));
        }
        else{
        dispatch(getResultByTestId(token, id));
        }
        const timeoutId = setTimeout(() => {
            setIsLoaded(true);
        }, 3000); // Set delay to 3 seconds

        return () => clearTimeout(timeoutId);
    }, []);
    return loading || !isLoaded ? (
        <div>
            <Loading />
        </div>
    ) : (
    <div>
                { isLoaded && testpaper != null && testpaperquestions != null && <AnalyseTestQuestion questions={testpaperquestions} selectedOptions={testpaper?.answers} score={testpaper?.score}  />}
    </div>
  )
}

export default AnalysisPage
