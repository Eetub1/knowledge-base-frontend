import { BsGithub } from "react-icons/bs";

const Footer = () => {
    return (
        <footer className="d-flex justify-content-center align-items-center bg-dark text-white pt-4 pb-2 mt-auto">
            <a 
                href="https://github.com/Eetub1/knowledge-base-frontend"
                className="text-white text-decoration-none d-flex align-items-center gap-2">
                <BsGithub size={24} />
                <span>Frontend Code</span>
            </a>
        </footer>
    )
}

export default Footer