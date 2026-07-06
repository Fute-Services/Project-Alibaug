import IntroSequence from "../components/Home/IntroSequence";
import { useNavigate } from "react-router-dom";

export default function IntroPage() {
    const navigate = useNavigate();
    return <IntroSequence onComplete={() => navigate("/home")} />;
}
